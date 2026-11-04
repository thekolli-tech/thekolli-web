import { NextRequest, NextResponse } from "next/server";
import { getSessionContext } from "@/server/auth/session";
import { NotificationService } from "@/server/services/NotificationService";

export async function GET(req: NextRequest) {
  const context = await getSessionContext();
  if (!context || !context.activeOrganisation) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notifications = await NotificationService.getUserNotifications(
    context.user.id,
    context.activeOrganisation.id
  );

  return NextResponse.json({ success: true, notifications });
}

export async function POST(req: NextRequest) {
  const context = await getSessionContext();
  if (!context || !context.activeOrganisation) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { notificationId } = await req.json();
  if (notificationId) {
    await NotificationService.markAsRead(
      notificationId,
      context.user.id,
      context.activeOrganisation.id
    );
  }

  return NextResponse.json({ success: true });
}
