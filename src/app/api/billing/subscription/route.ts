import { NextRequest, NextResponse } from "next/server";
import { getSessionContext } from "@/server/auth/session";
import { BillingService } from "@/server/services/BillingService";
import { z } from "zod";

const changePlanSchema = z.object({
  planCode: z.enum(["STARTER", "PROFESSIONAL", "ENTERPRISE"]),
});

export async function GET(req: NextRequest) {
  const context = await getSessionContext();
  if (!context || !context.activeOrganisation) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sub = await BillingService.getSubscription(
    context.user.id,
    context.activeOrganisation.id
  );

  return NextResponse.json({ success: true, subscription: sub });
}

export async function POST(req: NextRequest) {
  try {
    const context = await getSessionContext();
    if (!context || !context.activeOrganisation) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = changePlanSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid plan code" }, { status: 400 });
    }

    const updated = await BillingService.changeSubscriptionPlan(
      context.user.id,
      context.activeOrganisation.id,
      result.data.planCode
    );

    return NextResponse.json({
      success: true,
      subscription: updated,
      message: `Plan changed to ${result.data.planCode}.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update plan." },
      { status: 500 }
    );
  }
}
