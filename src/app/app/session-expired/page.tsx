"use client";

import React from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

export default function SessionExpiredPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-hand-body">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="border-2 border-[#242424] bg-[#FFFFFF] p-8 shadow-[0_12px_32px_rgba(36,36,36,0.08)] text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center border-2 border-[#242424] bg-[#F5F5F5] mb-4">
            <Clock className="h-7 w-7 text-[#242424]" />
          </div>

          <h2 className="font-hand-heading text-3xl font-bold text-[#242424] mb-2">
            Session Expired
          </h2>
          <p className="font-hand-body text-base text-[#777777] mb-6">
            For operational data security and tenant compliance, your active session has expired. Please sign in again.
          </p>

          <Link
            href="/app/login"
            className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] py-2.5 font-hand-heading text-xl font-bold cursor-pointer hover:bg-[#171717]"
          >
            <span>Sign In Again &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
