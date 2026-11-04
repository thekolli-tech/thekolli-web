"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MailCheck, CheckCircle2, AlertCircle } from "lucide-react";

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState(searchParams.get("token") || "");
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("IDLE");

    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("ERROR");
        setErrorMsg(data.error || "Verification failed");
      } else {
        setStatus("SUCCESS");
      }
    } catch {
      setStatus("ERROR");
      setErrorMsg("Network error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-2 border-[#242424] bg-[#FFFFFF] p-8 shadow-[0_12px_32px_rgba(36,36,36,0.08)]">
      <div className="flex h-12 w-12 items-center justify-center border border-[#242424] bg-[#F5F5F5] mb-4">
        <MailCheck className="h-6 w-6 text-[#242424]" />
      </div>

      <h2 className="font-hand-heading text-3xl font-bold text-[#242424] mb-2">
        Email Verification
      </h2>
      <p className="font-hand-body text-base text-[#777777] mb-6">
        Confirm your official work email address to secure your tenant account.
      </p>

      {status === "SUCCESS" && (
        <div className="border border-[#242424] bg-[#F5F5F5] p-4 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[#242424]" />
            <span className="font-hand-heading text-lg font-bold text-[#242424]">
              Email Verified Successfully
            </span>
          </div>
          <p className="font-hand-body text-base text-[#777777]">
            Your email has been confirmed. You may now access all authorized workspaces.
          </p>
          <Link
            href="/app/dashboard"
            className="inline-block mt-3 border border-[#242424] bg-[#242424] text-[#FFFFFF] px-4 py-2 font-hand-heading text-lg font-bold"
          >
            Go to Dashboard &rarr;
          </Link>
        </div>
      )}

      {status === "ERROR" && (
        <div className="mb-4 border border-[#242424] bg-[#F5F5F5] p-3 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-[#242424] flex-shrink-0 mt-0.5" />
          <p className="font-hand-body text-base text-[#242424]">{errorMsg}</p>
        </div>
      )}

      {status !== "SUCCESS" && (
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
              Verification Code or Token
            </label>
            <input
              type="text"
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste verification token"
              className="w-full border border-[#D9D9D9] hover:border-[#242424] focus:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-base text-[#242424] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] py-2.5 font-hand-heading text-xl font-bold cursor-pointer hover:bg-[#171717] disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify Email &rarr;"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-hand-body">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <VerifyEmailForm />
        </Suspense>
      </div>
    </div>
  );
}
