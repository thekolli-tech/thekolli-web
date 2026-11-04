import { cookies } from "next/headers";
import crypto from "crypto";
import { db } from "@/lib/db";
import { User, Organisation, Role } from "@prisma/client";

export const SESSION_COOKIE_NAME = "tk_session_token";
export const ACTIVE_ORG_COOKIE_NAME = "tk_active_org_id";

export interface AuthenticatedContext {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
    isTwoFactorEnabled: boolean;
  };
  session: {
    id: string;
    expiresAt: Date;
  };
  activeOrganisation?: {
    id: string;
    name: string;
    slug: string;
    role: {
      id: string;
      key: string;
      name: string;
    };
  } | null;
}

/**
 * Hashes raw token with SHA-256 for secure database lookup
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Creates a new session record in PostgreSQL and sets the HTTP-only cookie
 */
export async function createSession(
  userId: string,
  ipAddress?: string,
  userAgent?: string
): Promise<string> {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);

  // Default 7 days session
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await db.userSession.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
      ipAddress,
      userAgent,
      lastActiveAt: new Date(),
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, rawToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return rawToken;
}

/**
 * Destroys session in database and clears cookies
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (rawToken) {
    const tokenHash = hashToken(rawToken);
    await db.userSession.updateMany({
      where: { tokenHash },
      data: { revokedAt: new Date() },
    });
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
  cookieStore.delete(ACTIVE_ORG_COOKIE_NAME);
}

/**
 * Resolves currently authenticated user from session cookie.
 * Also verifies and resolves the user's active organisation.
 */
export async function getSessionContext(): Promise<AuthenticatedContext | null> {
  try {
    let cookieStore;
    try {
      cookieStore = await cookies();
    } catch {
      // In Next.js static prerendering, cookies() throws
      return null;
    }

    const rawToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!rawToken) {
      return null;
    }

    const tokenHash = hashToken(rawToken);
    const sessionRecord = await db.userSession.findUnique({
      where: { tokenHash },
      include: {
        user: {
          include: {
            memberships: {
              where: { status: "ACTIVE" },
              include: {
                organisation: true,
                role: true,
              },
            },
          },
        },
      },
    });

    if (!sessionRecord || sessionRecord.revokedAt || sessionRecord.expiresAt < new Date()) {
      return null;
    }

    // Check account status
    if (sessionRecord.user.status !== "ACTIVE") {
      return null;
    }

    // Resolve Active Organisation:
    // 1. Check preferred org from cookie
    // 2. Fall back to default membership
    // 3. Fall back to first membership
    const preferredOrgId = cookieStore.get(ACTIVE_ORG_COOKIE_NAME)?.value;
    const memberships = sessionRecord.user.memberships;

    let activeMembership = memberships.find(
      (m) => m.organisationId === preferredOrgId
    );

    if (!activeMembership && memberships.length > 0) {
      activeMembership =
        memberships.find((m) => m.isDefault) || memberships[0];
    }

    try {
      await db.userSession.update({
        where: { id: sessionRecord.id },
        data: { lastActiveAt: new Date() },
      });
    } catch {}

    return {
      user: {
        id: sessionRecord.user.id,
        email: sessionRecord.user.email,
        firstName: sessionRecord.user.firstName,
        lastName: sessionRecord.user.lastName,
        isEmailVerified: sessionRecord.user.isEmailVerified,
        isTwoFactorEnabled: sessionRecord.user.isTwoFactorEnabled,
      },
      session: {
        id: sessionRecord.id,
        expiresAt: sessionRecord.expiresAt,
      },
      activeOrganisation: activeMembership
        ? {
            id: activeMembership.organisation.id,
            name: activeMembership.organisation.name,
            slug: activeMembership.organisation.slug,
            role: {
              id: activeMembership.role.id,
              key: activeMembership.role.key,
              name: activeMembership.role.name,
            },
          }
        : null,
    };
  } catch {
    return null;
  }
}

/**
 * Sets the active organisation ID cookie for multi-tenant switching
 */
export async function setActiveOrganisationCookie(orgId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ACTIVE_ORG_COOKIE_NAME, orgId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
