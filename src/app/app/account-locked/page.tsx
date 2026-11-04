"use client";

import React from "react";
import Link from "next/link";
import { Lock, AlertOctagon, HelpCircle } from "lucide-react";

export default function AccountLockedPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-hand-body">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="border-2 border-[#242424] bg-[#FFFFFF] p-8 shadow-[0_12px_32px_rgba(36,36,36,0.08)]">
          <div className="flex h-14 w-14 items-center justify-center border-2 border-[#242424] bg-[#F5F5F5] mb-4">
            <AlertOctagon className="h-7 w-7 text-[#242424]" />
          </div>

          <h2 className="font-hand-heading text-3xl font-bold text-[#242424] mb-2">
            Account Temporarily Locked
          </h2>
          <p className="font-hand-body text-base text-[#777777] mb-4 leading-relaxed">
            Due to multiple consecutive unsuccessful login attempts, this account has been temporarily locked to prevent unauthorized tenant access.
          </p>

          <div className="border border-[#242424] bg-[#FCFCFC] p-4 mb-6">
            <span className="font-hand-draft text-xs uppercase tracking-wider text-[#777777] block mb-1">
              SECURITY POLICY PROTOCOL
            </span>
            <p className="font-hand-body text-base text-[#242424]">
              &bull; Standard lockout cooldown: 15 minutes.<br />
              &bull; An audit security event has been logged.<br />
              &bull; Contact your organization administrator for early unlocking.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/app/login"
              className="w-full inline-flex items-center justify-center border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] py-2.5 font-hand-heading text-xl font-bold cursor-pointer hover:bg-[#171717]"
            >
              Return to Sign In
            </Link>
            <Link
              href="/app/forgot-password"
              className="w-full inline-flex items-center justify-center border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] text-[#242424] py-2 font-hand-heading text-base font-semibold"
            >
              Reset Account Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
