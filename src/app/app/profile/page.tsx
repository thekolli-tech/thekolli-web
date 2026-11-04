"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { useApp } from "@/components/app/AppContext";
import { User, Shield, Key, Smartphone, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const { user } = useApp();
  const [is2FAEnabled, setIs2FAEnabled] = useState(user?.isTwoFactorEnabled || false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const toggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
    setNotificationMsg(
      !is2FAEnabled
        ? "Two-Factor Authentication policy active on this profile."
        : "Two-Factor Authentication disabled."
    );
  };

  return (
    <AppShell>
      <div className="max-w-4xl space-y-8">
        <div>
          <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
            IDENTITY &amp; SECURITY
          </span>
          <h1 className="font-hand-heading text-4xl font-bold text-[#242424]">
            User Profile &amp; Credentials
          </h1>
          <p className="font-hand-body text-xl text-[#777777]">
            Manage personal credentials, session security, and access factors.
          </p>
        </div>

        {notificationMsg && (
          <div className="border border-[#242424] bg-[#F5F5F5] p-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[#242424]" />
            <p className="font-hand-body text-base text-[#242424]">{notificationMsg}</p>
          </div>
        )}

        {/* Profile Card */}
        <div className="border-2 border-[#242424] bg-[#FFFFFF] p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] flex items-center justify-center font-hand-heading text-3xl font-bold">
              {user ? user.firstName.charAt(0) : "U"}
            </div>
            <div>
              <h2 className="font-hand-heading text-2xl font-bold text-[#242424]">
                {user ? `${user.firstName} ${user.lastName}` : "User"}
              </h2>
              <p className="font-hand-draft text-xs text-[#777777]">
                {user?.email} &bull; Identity ID: {user?.id.slice(0, 8)}...
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#D9D9D9] pt-4">
            <div>
              <span className="font-hand-draft text-xs uppercase text-[#777777]">First Name</span>
              <p className="font-hand-heading text-lg font-bold text-[#242424]">{user?.firstName}</p>
            </div>
            <div>
              <span className="font-hand-draft text-xs uppercase text-[#777777]">Last Name</span>
              <p className="font-hand-heading text-lg font-bold text-[#242424]">{user?.lastName}</p>
            </div>
            <div>
              <span className="font-hand-draft text-xs uppercase text-[#777777]">Work Email</span>
              <p className="font-hand-heading text-lg font-bold text-[#242424]">{user?.email}</p>
            </div>
            <div>
              <span className="font-hand-draft text-xs uppercase text-[#777777]">Email Status</span>
              <p className="font-hand-heading text-lg font-bold text-[#242424]">
                {user?.isEmailVerified ? "Verified" : "Pending Verification"}
              </p>
            </div>
          </div>
        </div>

        {/* Security & 2FA Card */}
        <div className="border border-[#242424] bg-[#FFFFFF] p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#242424]" />
            <h3 className="font-hand-heading text-2xl font-bold text-[#242424]">
              Multi-Factor Authentication (2FA)
            </h3>
          </div>
          <p className="font-hand-body text-base text-[#777777]">
            Protect your access to enterprise tenant ledgers with secondary one-time verification.
          </p>

          <div className="flex items-center justify-between border-t border-[#D9D9D9] pt-4">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-[#777777]" />
              <div>
                <span className="font-hand-heading text-lg font-bold text-[#242424] block">
                  Authenticator App
                </span>
                <span className="font-hand-draft text-xs text-[#777777]">
                  Status: {is2FAEnabled ? "Active & Enforced" : "Disabled"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={toggle2FA}
              className={`border px-4 py-1.5 font-hand-heading text-base font-bold cursor-pointer ${
                is2FAEnabled
                  ? "border-[#242424] bg-[#FFFFFF] text-[#242424] hover:bg-[#F5F5F5]"
                  : "border-[#242424] bg-[#242424] text-[#FFFFFF] hover:bg-[#171717]"
              }`}
            >
              {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
