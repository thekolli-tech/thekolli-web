"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, ArrowRight, Lock, Mail, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.locked) {
          router.push("/app/account-locked");
          return;
        }
        setError(data.error || "Authentication failed.");
        setIsLoading(false);
        return;
      }

      if (data.requiresTwoFactor) {
        router.push(`/app/two-factor?userId=${data.userId}`);
        return;
      }

      router.push("/app/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  const fillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-hand-body selection:bg-[#242424] selection:text-[#FFFFFF]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Sketch Emblem */}
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="flex h-12 w-12 items-center justify-center border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] font-hand-heading text-2xl font-bold">
            K
          </div>
        </Link>
        <h2 className="font-hand-heading text-4xl font-bold text-[#242424] tracking-tight">
          TK Business Suite
        </h2>
        <p className="mt-1 font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
          THEKOLLI &bull; BUSINESS OPERATING SYSTEM (BOS)
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="border-2 border-[#242424] bg-[#FFFFFF] p-8 shadow-[0_12px_32px_rgba(36,36,36,0.08)]">
          <h3 className="font-hand-heading text-2xl font-bold text-[#242424] mb-1">
            Sign In to Your Workspace
          </h3>
          <p className="font-hand-body text-base text-[#777777] mb-6">
            Enter your credentials to access your organisation&apos;s operations.
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
                  className="w-full border border-[#D9D9D9] hover:border-[#242424] focus:border-[#242424] bg-[#FFFFFF] pl-10 pr-3 py-2 font-hand-heading text-lg text-[#242424] outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424]">
                  Password
                </label>
                <Link
                  href="/app/forgot-password"
                  className="font-hand-draft text-xs text-[#777777] hover:text-[#242424] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-[#777777]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full border border-[#D9D9D9] hover:border-[#242424] focus:border-[#242424] bg-[#FFFFFF] pl-10 pr-3 py-2 font-hand-heading text-lg text-[#242424] outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 border-2 border-[#242424] bg-[#242424] hover:bg-[#171717] text-[#FFFFFF] py-2.5 font-hand-heading text-xl font-bold cursor-pointer transition-all disabled:opacity-50"
            >
              <span>{isLoading ? "Authenticating..." : "Sign In &rarr;"}</span>
            </button>
          </form>

          {/* Demonstration Credentials Box */}
          <div className="mt-6 border-t border-[#D9D9D9] pt-4">
            <span className="font-hand-draft text-[11px] uppercase tracking-wider text-[#777777] block mb-2">
              QUICK TEST CREDENTIALS (LOCAL DEV)
            </span>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => fillDemo("admin@thekolli.com", "Kolli@2026!Secure")}
                className="w-full flex items-center justify-between border border-[#D9D9D9] hover:border-[#242424] bg-[#FCFCFC] px-2.5 py-1.5 text-left cursor-pointer transition-colors"
              >
                <div>
                  <span className="font-hand-heading text-sm font-bold text-[#242424]">
                    THEKOLLI Owner
                  </span>
                  <span className="block font-hand-draft text-[10px] text-[#777777]">
                    admin@thekolli.com
                  </span>
                </div>
                <span className="font-hand-draft text-[10px] border border-[#242424] px-1 bg-[#FFFFFF]">
                  Auto Fill
                </span>
              </button>

              <button
                type="button"
                onClick={() => fillDemo("marcus.vance@vertex.io", "Vertex@2026!Secure")}
                className="w-full flex items-center justify-between border border-[#D9D9D9] hover:border-[#242424] bg-[#FCFCFC] px-2.5 py-1.5 text-left cursor-pointer transition-colors"
              >
                <div>
                  <span className="font-hand-heading text-sm font-bold text-[#242424]">
                    External Tenant (Vertex)
                  </span>
                  <span className="block font-hand-draft text-[10px] text-[#777777]">
                    marcus.vance@vertex.io
                  </span>
                </div>
                <span className="font-hand-draft text-[10px] border border-[#242424] px-1 bg-[#FFFFFF]">
                  Auto Fill
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center space-y-2">
          <p className="font-hand-body text-base text-[#777777]">
            Need a new tenant organisation?{" "}
            <Link href="/app/onboarding" className="text-[#242424] underline font-semibold">
              Create an Organisation
            </Link>
          </p>
          <p className="font-hand-draft text-xs text-[#777777]">
            <Link href="/" className="hover:underline">
              &larr; Return to THEKOLLI Corporate Website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
