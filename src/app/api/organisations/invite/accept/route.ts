import { NextRequest, NextResponse } from "next/server";
import { getSessionContext, setActiveOrganisationCookie } from "@/server/auth/session";
import { OrganisationService } from "@/server/services/OrganisationService";
import { z } from "zod";

const acceptSchema = z.object({
  token: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const context = await getSessionContext();
    if (!context) {
      return NextResponse.json(
        { error: "Please log in or register before accepting this invitation." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const result = acceptSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid invitation token." }, { status: 400 });
    }

    const membership = await OrganisationService.acceptInvitation(
      result.data.token,
      context.user.id
    );

    await setActiveOrganisationCookie(membership.organisationId);

    return NextResponse.json({
      success: true,
      message: "Invitation accepted. You are now a member of this organisation.",
      organisationId: membership.organisationId,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to accept invitation." },
      { status: 400 }
    );
  }
}
