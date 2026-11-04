import { NextRequest, NextResponse } from "next/server";
import { getSessionContext } from "@/server/auth/session";
import { BillingService } from "@/server/services/BillingService";

export async function GET(req: NextRequest) {
  const context = await getSessionContext();
  if (!context || !context.activeOrganisation) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const entitledModules = await BillingService.getEntitledModules(
    context.user.id,
    context.activeOrganisation.id
  );

  return NextResponse.json({ success: true, entitledModules });
}
