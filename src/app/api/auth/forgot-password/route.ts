import { NextRequest, NextResponse } from "next/server";
import { IdentityService } from "@/server/services/IdentityService";
import { z } from "zod";

const forgotSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = forgotSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const res = await IdentityService.requestPasswordReset(result.data.email);

    return NextResponse.json({
      success: true,
      message: "If an account exists with this email, instructions have been generated.",
      // Return dev token for local test harness
      debugResetToken: res.token,
    });
  } catch (error) {
    console.error("Forgot password API error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
