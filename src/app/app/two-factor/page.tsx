"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldAlert, ArrowLeft, AlertCircle } from "lucide-react";

function TwoFactorForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const userId = searchParams.get("userId") || "";
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/two-factor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, code }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid two-factor code.");
        setIsLoading(false);
        return;
      }

      router.push("/app/dashboard");
      router.refresh();
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

      <div className="flex h-12 w-12 items-center justify-center border border-[#242424] bg-[#F5F5F5] mb-4">
        <ShieldAlert className="h-6 w-6 text-[#242424]" />
      </div>

      <h2 className="font-hand-heading text-3xl font-bold text-[#242424] mb-2">
        Two-Factor Challenge
      </h2>
      <p className="font-hand-body text-base text-[#777777] mb-6">
        Enter the 6-digit verification code from your authenticator device.
      </p>

      {error && (
        <div className="mb-4 border border-[#242424] bg-[#F5F5F5] p-3 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-[#242424] flex-shrink-0 mt-0.5" />
          <p className="font-hand-body text-base text-[#242424]">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
            6-Digit Verification Code
          </label>
          <input
            type="text"
            required
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            className="w-full text-center tracking-widest border border-[#D9D9D9] hover:border-[#242424] focus:border-[#242424] bg-[#FFFFFF] px-3 py-3 font-hand-heading text-3xl text-[#242424] outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] py-2.5 font-hand-heading text-xl font-bold cursor-pointer hover:bg-[#171717] disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify & Sign In &rarr;"}
        </button>
      </form>

      <div className="mt-6 border-t border-[#D9D9D9] pt-3 text-center">
        <span className="font-hand-draft text-xs text-[#777777]">
          Local development fallback code: <strong className="text-[#242424]">123456</strong>
        </span>
      </div>
    </div>
  );
}

export default function TwoFactorPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-hand-body">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <TwoFactorForm />
        </Suspense>
      </div>
    </div>
  );
}
