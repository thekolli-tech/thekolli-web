import { NextRequest, NextResponse } from "next/server";
import { getSessionContext } from "@/server/auth/session";
import { OrganisationService } from "@/server/services/OrganisationService";
import { AccessPermissionService } from "@/server/services/AccessPermissionService";
import { z } from "zod";

const inviteSchema = z.object({
  email: z.string().email(),
  roleKey: z.string().default("EMPLOYEE"),
});

export async function POST(req: NextRequest) {
  try {
    const context = await getSessionContext();
    if (!context || !context.activeOrganisation) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // RBAC: Check permission to manage users
    const hasPerm = await AccessPermissionService.hasPermission(
      context.user.id,
      context.activeOrganisation.id,
      {
        module: "PLATFORM",
        resource: "USER",
        action: "MANAGE",
      }
    );

    if (!hasPerm) {
      return NextResponse.json(
        { error: "Forbidden: You lack permission to invite members." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = inviteSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    const invitation = await OrganisationService.inviteMember(
      context.activeOrganisation.id,
      context.user.id,
      result.data.email,
      result.data.roleKey
    );

    return NextResponse.json({
      success: true,
      message: `Invitation generated for ${result.data.email}.`,
      invitation: {
        id: invitation.id,
        email: invitation.email,
        role: invitation.role.name,
        token: invitation.token,
        expiresAt: invitation.expiresAt,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to invite member." },
      { status: 500 }
    );
  }
}
