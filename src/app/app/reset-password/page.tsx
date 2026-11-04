"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState(searchParams.get("token") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password.");
        setIsLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="border-2 border-[#242424] bg-[#FFFFFF] p-8 shadow-[0_12px_32px_rgba(36,36,36,0.08)]">
      <Link
        href="/app/login"
        className="inline-flex items-center gap-1 font-hand-draft text-xs text-[#777777] hover:text-[#242424] mb-4"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to sign in</span>
      </Link>

      <h2 className="font-hand-heading text-3xl font-bold text-[#242424] mb-2">
        Set New Password
      </h2>
      <p className="font-hand-body text-base text-[#777777] mb-6">
        Please enter a secure password with at least 8 characters.
      </p>

      {error && (
        <div className="mb-4 border border-[#242424] bg-[#F5F5F5] p-3 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-[#242424] flex-shrink-0 mt-0.5" />
          <p className="font-hand-body text-base text-[#242424]">{error}</p>
        </div>
      )}

      {success ? (
        <div className="border border-[#242424] bg-[#F5F5F5] p-4 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[#242424]" />
            <span className="font-hand-heading text-lg font-bold text-[#242424]">
              Password Updated Successfully
            </span>
          </div>
          <p className="font-hand-body text-base text-[#777777]">
            Your password has been changed. You may now sign in with your new credentials.
          </p>
          <Link
            href="/app/login"
            className="inline-block mt-3 border border-[#242424] bg-[#242424] text-[#FFFFFF] px-4 py-2 font-hand-heading text-lg font-bold"
          >
            Sign In Now &rarr;
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
              Reset Token
            </label>
            <input
              type="text"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste security reset token"
              className="w-full border border-[#D9D9D9] hover:border-[#242424] focus:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-base text-[#242424] outline-none"
            />
          </div>

          <div>
            <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-[#777777]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full border border-[#D9D9D9] hover:border-[#242424] focus:border-[#242424] bg-[#FFFFFF] pl-10 pr-3 py-2 font-hand-heading text-lg text-[#242424] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-[#777777]" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full border border-[#D9D9D9] hover:border-[#242424] focus:border-[#242424] bg-[#FFFFFF] pl-10 pr-3 py-2 font-hand-heading text-lg text-[#242424] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] py-2.5 font-hand-heading text-xl font-bold cursor-pointer hover:bg-[#171717] disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Set New Password &rarr;"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-hand-body">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
