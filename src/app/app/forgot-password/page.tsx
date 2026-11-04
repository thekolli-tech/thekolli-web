"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [debugToken, setDebugToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setSubmitted(true);
      if (data.debugResetToken) {
        setDebugToken(data.debugResetToken);
      }
    } catch {
      alert("Error requesting password reset.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-hand-body">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="border-2 border-[#242424] bg-[#FFFFFF] p-8 shadow-[0_12px_32px_rgba(36,36,36,0.08)]">
          <Link
            href="/app/login"
            className="inline-flex items-center gap-1 font-hand-draft text-xs text-[#777777] hover:text-[#242424] mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to sign in</span>
          </Link>

          <h2 className="font-hand-heading text-3xl font-bold text-[#242424] mb-2">
            Reset Password
          </h2>
          <p className="font-hand-body text-base text-[#777777] mb-6">
            Enter your verified work email address to receive password recovery instructions.
          </p>

          {submitted ? (
            <div className="border border-[#242424] bg-[#F5F5F5] p-4 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#242424]" />
                <span className="font-hand-heading text-lg font-bold text-[#242424]">
                  Reset Instructions Sent
                </span>
              </div>
              <p className="font-hand-body text-base text-[#777777]">
                If an active account exists for <strong>{email}</strong>, password reset instructions have been generated.
              </p>
              {debugToken && (
                <div className="mt-3 border-t border-[#D9D9D9] pt-3">
                  <span className="font-hand-draft text-[10px] text-[#777777] uppercase block mb-1">
                    LOCAL DEVELOPMENT DIRECT LINK
                  </span>
                  <Link
                    href={`/app/reset-password?token=${debugToken}`}
                    className="font-hand-draft text-xs text-[#242424] underline break-all block"
                  >
                    Click to Reset Password ({debugToken.slice(0, 12)}...)
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-[#777777]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full border border-[#D9D9D9] hover:border-[#242424] focus:border-[#242424] bg-[#FFFFFF] pl-10 pr-3 py-2 font-hand-heading text-lg text-[#242424] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] py-2.5 font-hand-heading text-xl font-bold cursor-pointer hover:bg-[#171717] disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send Reset Link &rarr;"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
