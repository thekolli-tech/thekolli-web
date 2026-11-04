import { NextRequest, NextResponse } from "next/server";
import { getSessionContext } from "@/server/auth/session";
import { OrganisationService } from "@/server/services/OrganisationService";
import { AccessPermissionService } from "@/server/services/AccessPermissionService";

export async function GET(req: NextRequest) {
  const context = await getSessionContext();

  if (!context) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const userOrgs = await OrganisationService.getUserOrganisations(context.user.id);

  let permissions: string[] = [];
  if (context.activeOrganisation) {
    permissions = await AccessPermissionService.getUserEffectivePermissions(
      context.user.id,
      context.activeOrganisation.id
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: context.user,
    activeOrganisation: context.activeOrganisation,
    organisations: userOrgs.map((m) => ({
      id: m.organisation.id,
      name: m.organisation.name,
      slug: m.organisation.slug,
      role: m.role.name,
      roleKey: m.role.key,
      isDefault: m.isDefault,
    })),
    permissions,
  });
}
