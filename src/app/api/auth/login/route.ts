import { NextRequest, NextResponse } from "next/server";
import { IdentityService } from "@/server/services/IdentityService";
import { createSession } from "@/server/auth/session";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email and password." },
        { status: 400 }
      );
    }

    const { email, password } = result.data;
    const ip = req.headers.get("x-forwarded-for") || undefined;
    const userAgent = req.headers.get("user-agent") || undefined;

    const authResult = await IdentityService.authenticateUser(email, password);

    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        {
          success: false,
          error: authResult.error || "Authentication failed",
          locked: authResult.locked,
        },
        { status: authResult.locked ? 423 : 401 }
      );
    }

    if (authResult.requiresTwoFactor) {
      return NextResponse.json({
        success: true,
        requiresTwoFactor: true,
        userId: authResult.user.id,
      });
    }

    // Create session and set HTTP-only cookie
    await createSession(authResult.user.id, ip, userAgent);

    return NextResponse.json({
      success: true,
      user: {
        id: authResult.user.id,
        email: authResult.user.email,
        firstName: authResult.user.firstName,
        lastName: authResult.user.lastName,
      },
    });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
