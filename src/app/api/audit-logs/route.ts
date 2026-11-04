import { NextRequest, NextResponse } from "next/server";
import { getSessionContext } from "@/server/auth/session";
import { AuditService } from "@/server/services/AuditService";

export async function GET(req: NextRequest) {
  const context = await getSessionContext();
  if (!context || !context.activeOrganisation) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const logs = await AuditService.getTenantLogs(
    context.user.id,
    context.activeOrganisation.id,
    50
  );

  return NextResponse.json({ success: true, logs });
}
