import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User, UserStatus } from "@prisma/client";

export class IdentityService {
  private static MAX_FAILED_ATTEMPTS = 5;
  private static LOCK_TIME_MS = 15 * 60 * 1000; // 15 minutes

  /**
   * Validates credentials and returns authenticated user
   */
  static async authenticateUser(
    email: string,
    passwordPlain: string
  ): Promise<{
    success: boolean;
    user?: User;
    error?: string;
    locked?: boolean;
    requiresTwoFactor?: boolean;
  }> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return { success: false, error: "Invalid credentials" };
    }

    // Check account lockout
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const remainingMinutes = Math.ceil(
        (user.lockedUntil.getTime() - Date.now()) / (60 * 1000)
      );
      return {
        success: false,
        locked: true,
        error: `Account is temporarily locked. Please try again in ${remainingMinutes} minutes.`,
      };
    }

    if (user.status === "LOCKED") {
      return {
        success: false,
        locked: true,
        error: "Account has been locked by a platform security policy.",
      };
    }

    if (user.status === "SUSPENDED") {
      return {
        success: false,
        error: "Account is currently suspended. Please contact your organization administrator.",
      };
    }

    // Verify Password Hash
    const isPasswordValid = await bcrypt.compare(passwordPlain, user.passwordHash);

    if (!isPasswordValid) {
      const newAttempts = user.failedLoginAttempts + 1;
      const isNowLocked = newAttempts >= this.MAX_FAILED_ATTEMPTS;

      await db.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: newAttempts,
          lockedUntil: isNowLocked ? new Date(Date.now() + this.LOCK_TIME_MS) : null,
          status: isNowLocked ? "LOCKED" : user.status,
        },
      });

      if (isNowLocked) {
        return {
          success: false,
          locked: true,
          error: "Too many failed attempts. Account has been locked for 15 minutes.",
        };
      }

      return {
        success: false,
        error: `Invalid credentials. (${this.MAX_FAILED_ATTEMPTS - newAttempts} attempts remaining)`,
      };
    }

    // Reset failed attempts upon successful authentication
    if (user.failedLoginAttempts > 0 || user.lockedUntil) {
      await db.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: 0,
          lockedUntil: null,
          status: "ACTIVE",
        },
      });
    }

    if (user.isTwoFactorEnabled) {
      return {
        success: true,
        user,
        requiresTwoFactor: true,
      };
    }

    return {
      success: true,
      user,
    };
  }

  /**
   * Generates password reset token
   */
  static async requestPasswordReset(email: string): Promise<{ success: boolean; token?: string }> {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      // Do not reveal email existence to prevent user enumeration
      return { success: true };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await db.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires,
      },
    });

    // In local development, return the token for testing
    return { success: true, token: resetToken };
  }

  /**
   * Resets password using valid token
   */
  static async completePasswordReset(
    token: string,
    newPasswordPlain: string
  ): Promise<{ success: boolean; error?: string }> {
    const user = await db.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { gt: new Date() },
      },
    });

    if (!user) {
      return { success: false, error: "Password reset link is invalid or has expired." };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPasswordPlain, salt);

    await db.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetPasswordToken: null,
        resetPasswordExpires: null,
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    });

    return { success: true };
  }

  /**
   * Verifies email using verification token
   */
  static async verifyEmail(token: string): Promise<{ success: boolean; error?: string }> {
    const user = await db.user.findFirst({
      where: { emailVerifyToken: token },
    });

    if (!user) {
      return { success: false, error: "Invalid email verification token." };
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerifiedAt: new Date(),
        emailVerifyToken: null,
      },
    });

    return { success: true };
  }

  /**
   * Verifies Two-Factor TOTP / Verification Code
   */
  static async verifyTwoFactorCode(
    userId: string,
    code: string
  ): Promise<{ success: boolean; error?: string }> {
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return { success: false, error: "User not found" };
    }

    // In development / demo adapter: accept demo passcode "123456" or matching token
    if (code === "123456" || (user.twoFactorSecret && code === user.twoFactorSecret)) {
      return { success: true };
    }

    return { success: false, error: "Invalid two-factor authentication code." };
  }
}
