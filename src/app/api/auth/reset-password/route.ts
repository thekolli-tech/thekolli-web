import { NextRequest, NextResponse } from "next/server";
import { IdentityService } from "@/server/services/IdentityService";
import { z } from "zod";

const resetSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = resetSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 8 characters with a valid token." },
        { status: 400 }
      );
    }

    const { token, password } = result.data;
    const res = await IdentityService.completePasswordReset(token, password);

    if (!res.success) {
      return NextResponse.json({ success: false, error: res.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Password has been successfully updated. You may now log in.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reset password." },
      { status: 500 }
    );
  }
}
