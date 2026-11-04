import { NextRequest, NextResponse } from "next/server";
import { IdentityService } from "@/server/services/IdentityService";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ success: false, error: "Missing token." }, { status: 400 });
    }

    const res = await IdentityService.verifyEmail(token);
    if (!res.success) {
      return NextResponse.json({ success: false, error: res.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Email successfully verified." });
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { success: false, error: "Email verification failed." },
      { status: 500 }
    );
  }
}
