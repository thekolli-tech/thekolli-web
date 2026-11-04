import { NextRequest, NextResponse } from "next/server";
import { getSessionContext, setActiveOrganisationCookie } from "@/server/auth/session";
import { AccessPermissionService } from "@/server/services/AccessPermissionService";
import { z } from "zod";

const switchSchema = z.object({
  organisationId: z.string().uuid(),
});

export async function POST(req: NextRequest) {
  try {
    const context = await getSessionContext();
    if (!context) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = switchSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ success: false, error: "Invalid organisation ID." }, { status: 400 });
    }

    const { organisationId } = result.data;

    // Strict Tenant Isolation Assertion: User must have an active membership in this organisation!
    const membership = await AccessPermissionService.assertTenantMembership(
      context.user.id,
      organisationId
    );

    await setActiveOrganisationCookie(organisationId);

    return NextResponse.json({
      success: true,
      message: `Active organisation switched to ${membership.organisation.name}.`,
      activeOrganisation: {
        id: membership.organisation.id,
        name: membership.organisation.name,
        slug: membership.organisation.slug,
        role: membership.role.name,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to switch organisation.",
      },
      { status: 403 }
    );
  }
}
