import { NextRequest, NextResponse } from "next/server";
import { IdentityService } from "@/server/services/IdentityService";
import { createSession } from "@/server/auth/session";
import { z } from "zod";

const twoFactorSchema = z.object({
  userId: z.string().uuid(),
  code: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = twoFactorSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 6-digit verification code." },
        { status: 400 }
      );
    }

    const { userId, code } = result.data;
    const res = await IdentityService.verifyTwoFactorCode(userId, code);

    if (!res.success) {
      return NextResponse.json({ success: false, error: res.error }, { status: 401 });
    }

    const ip = req.headers.get("x-forwarded-for") || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;
    await createSession(userId, ip, userAgent);

    return NextResponse.json({ success: true, message: "Two-factor verification successful." });
  } catch (error) {
    console.error("2FA API error:", error);
    return NextResponse.json(
      { success: false, error: "Two-factor verification failed." },
      { status: 500 }
    );
  }
}
