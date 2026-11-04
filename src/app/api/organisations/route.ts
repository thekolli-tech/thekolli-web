import { NextRequest, NextResponse } from "next/server";
import { getSessionContext, setActiveOrganisationCookie } from "@/server/auth/session";
import { OrganisationService } from "@/server/services/OrganisationService";
import { z } from "zod";

const createOrgSchema = z.object({
  name: z.string().min(2, "Organisation name is required"),
  legalName: z.string().optional(),
  orgType: z.string().default("ENTERPRISE"),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  country: z.string().default("India"),
  timezone: z.string().default("Asia/Kolkata"),
  currency: z.string().default("INR"),
  initialWorkspaceName: z.string().default("HQ Operations"),
  planCode: z.string().default("STARTER"),
});

export async function GET(req: NextRequest) {
  const context = await getSessionContext();
  if (!context) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const memberships = await OrganisationService.getUserOrganisations(context.user.id);
  return NextResponse.json({
    success: true,
    organisations: memberships.map((m) => ({
      id: m.organisation.id,
      name: m.organisation.name,
      legalName: m.organisation.legalName,
      slug: m.organisation.slug,
      role: m.role.name,
      roleKey: m.role.key,
      isDefault: m.isDefault,
      workspaces: m.organisation.workspaces,
      subscription: m.organisation.subscription,
    })),
  });
}

export async function POST(req: NextRequest) {
  try {
    const context = await getSessionContext();
    if (!context) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = createOrgSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.errors[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const { organisation, workspace } = await OrganisationService.createOrganisation({
      userId: context.user.id,
      ...result.data,
    });

    // Set new organisation as active
    await setActiveOrganisationCookie(organisation.id);

    return NextResponse.json({
      success: true,
      organisation,
      workspace,
      message: "Organisation successfully onboarded.",
    });
  } catch (error: any) {
    console.error("Organisation creation error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create organisation." },
      { status: 500 }
    );
  }
}
