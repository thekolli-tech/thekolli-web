"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/app/AppContext";
import { Building2, Check, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, refreshContext } = useApp();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    legalName: "",
    orgType: "ENTERPRISE",
    contactEmail: user?.email || "",
    contactPhone: "+91 ",
    country: "India",
    timezone: "Asia/Kolkata",
    currency: "INR",
    initialWorkspaceName: "HQ Operations",
    invitedEmail: "",
    planCode: "PROFESSIONAL",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleComplete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/organisations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to complete onboarding.");
        setIsLoading(false);
        return;
      }

      await refreshContext();
      router.push("/app/dashboard");
      router.refresh();
    } catch {
      setError("Network error during organization setup.");
      setIsLoading(false);
    }
  };

  const plans = [
    {
      code: "STARTER",
      name: "Starter BOS",
      price: "₹4,999/mo",
      onboarding: "₹9,999 one-time onboarding",
      users: "Up to 10 users",
      workspaces: "2 workspaces",
    },
    {
      code: "PROFESSIONAL",
      name: "Professional BOS (Recommended)",
      price: "₹14,999/mo",
      onboarding: "₹19,999 one-time onboarding",
      users: "Up to 50 users",
      workspaces: "10 workspaces",
    },
    {
      code: "ENTERPRISE",
      name: "Enterprise Multi-Entity",
      price: "₹49,999/mo",
      onboarding: "₹49,999 one-time onboarding",
      users: "Up to 500 users",
      workspaces: "Unlimited workspaces",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] py-12 px-4 sm:px-6 lg:px-8 font-hand-body">
      <div className="max-w-3xl mx-auto">
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] font-hand-heading text-xl font-bold">
              K
            </div>
          </Link>
          <h2 className="font-hand-heading text-3xl font-bold text-[#242424]">
            Organisation Setup &amp; Onboarding
          </h2>
          <p className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
            STAGE {step} OF 4 &bull; ENTERPRISE TENANT PROVISIONING
          </p>

          {/* Progress bar */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 w-16 transition-colors ${
                  s <= step ? "bg-[#242424]" : "bg-[#D9D9D9]"
                }`}
              />
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 border border-[#242424] bg-[#F5F5F5] p-3 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-[#242424] flex-shrink-0 mt-0.5" />
            <p className="font-hand-body text-base text-[#242424]">{error}</p>
          </div>
        )}

        <div className="border-2 border-[#242424] bg-[#FFFFFF] p-8 shadow-[0_12px_32px_rgba(36,36,36,0.08)]">
          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-hand-heading text-2xl font-bold text-[#242424]">
                  1. Organisation Identity &amp; Registration
                </h3>
                <p className="font-hand-body text-base text-[#777777]">
                  Define the legal entity and public workspace display name for your organisation.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                    Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="e.g. Acme Corporation"
                    className="w-full border border-[#D9D9D9] hover:border-[#242424] focus:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-lg text-[#242424] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                    Registered Legal Entity Name
                  </label>
                  <input
                    type="text"
                    value={formData.legalName}
                    onChange={(e) => updateField("legalName", e.target.value)}
                    placeholder="e.g. Acme Systems Private Limited"
                    className="w-full border border-[#D9D9D9] hover:border-[#242424] focus:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-lg text-[#242424] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                    Entity Structure
                  </label>
                  <select
                    value={formData.orgType}
                    onChange={(e) => updateField("orgType", e.target.value)}
                    className="w-full border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-base text-[#242424] outline-none cursor-pointer"
                  >
                    <option value="PRIVATE_LIMITED">Private Limited Company (Pvt Ltd)</option>
                    <option value="PUBLIC_LIMITED">Public Limited Company (Ltd)</option>
                    <option value="LLC">Limited Liability Company (LLC)</option>
                    <option value="PARTNERSHIP">Partnership / LLP</option>
                    <option value="ENTERPRISE">Enterprise Group / Conglomerate</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  disabled={!formData.name}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] px-6 py-2.5 font-hand-heading text-xl font-bold cursor-pointer disabled:opacity-50"
                >
                  <span>Next: Operations Details &rarr;</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: OPERATIONS */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-hand-heading text-2xl font-bold text-[#242424]">
                  2. Operations Contact &amp; Locale
                </h3>
                <p className="font-hand-body text-base text-[#777777]">
                  Configure administrative contact details and regional fiscal parameters.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                    Official Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => updateField("contactEmail", e.target.value)}
                    className="w-full border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-base text-[#242424] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.contactPhone}
                    onChange={(e) => updateField("contactPhone", e.target.value)}
                    className="w-full border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-base text-[#242424] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => updateField("country", e.target.value)}
                    className="w-full border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-base text-[#242424] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                    Timezone
                  </label>
                  <input
                    type="text"
                    value={formData.timezone}
                    onChange={(e) => updateField("timezone", e.target.value)}
                    className="w-full border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-base text-[#242424] outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-[#D9D9D9] px-4 py-2 font-hand-heading text-base text-[#777777] cursor-pointer"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  disabled={!formData.contactEmail}
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] px-6 py-2.5 font-hand-heading text-xl font-bold cursor-pointer disabled:opacity-50"
                >
                  <span>Next: Subscription Plan &rarr;</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SUBSCRIPTION PLAN */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-hand-heading text-2xl font-bold text-[#242424]">
                  3. Select Subscription Plan
                </h3>
                <p className="font-hand-body text-base text-[#777777]">
                  All plans include access to the core platform architecture with full tenant isolation.
                </p>
              </div>

              <div className="space-y-3">
                {plans.map((p) => {
                  const isSelected = formData.planCode === p.code;
                  return (
                    <div
                      key={p.code}
                      onClick={() => updateField("planCode", p.code)}
                      className={`border p-4 cursor-pointer transition-all ${
                        isSelected
                          ? "border-[#242424] bg-[#F5F5F5]"
                          : "border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-hand-heading text-xl font-bold text-[#242424]">
                              {p.name}
                            </span>
                            {isSelected && (
                              <span className="font-hand-draft text-[10px] border border-[#242424] px-1 bg-[#FFFFFF]">
                                SELECTED
                              </span>
                            )}
                          </div>
                          <p className="font-hand-body text-base text-[#777777] mt-0.5">
                            {p.users} &bull; {p.workspaces}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-hand-heading text-xl font-bold text-[#242424]">
                            {p.price}
                          </span>
                          <span className="block font-hand-draft text-[10px] text-[#777777]">
                            {p.onboarding}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="border border-[#D9D9D9] px-4 py-2 font-hand-heading text-base text-[#777777] cursor-pointer"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] px-6 py-2.5 font-hand-heading text-xl font-bold cursor-pointer"
                >
                  <span>Next: Review &amp; Launch &rarr;</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & LAUNCH */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-hand-heading text-2xl font-bold text-[#242424]">
                  4. Review Governance &amp; Provision Organisation
                </h3>
                <p className="font-hand-body text-base text-[#777777]">
                  Verify your tenant configuration. Provisioning will generate an isolated database workspace and entitle all 18 BOS modules.
                </p>
              </div>

              <div className="border border-[#242424] bg-[#FCFCFC] p-4 space-y-2">
                <div className="flex justify-between border-b border-[#D9D9D9] pb-2">
                  <span className="font-hand-draft text-xs uppercase text-[#777777]">Organisation Name</span>
                  <span className="font-hand-heading text-base font-bold text-[#242424]">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#D9D9D9] pb-2">
                  <span className="font-hand-draft text-xs uppercase text-[#777777]">Legal Entity</span>
                  <span className="font-hand-heading text-base text-[#242424]">{formData.legalName || formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#D9D9D9] pb-2">
                  <span className="font-hand-draft text-xs uppercase text-[#777777]">Admin Email</span>
                  <span className="font-hand-heading text-base text-[#242424]">{formData.contactEmail}</span>
                </div>
                <div className="flex justify-between border-b border-[#D9D9D9] pb-2">
                  <span className="font-hand-draft text-xs uppercase text-[#777777]">Subscription Tier</span>
                  <span className="font-hand-heading text-base font-bold text-[#242424]">{formData.planCode} PLAN</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-hand-draft text-xs uppercase text-[#777777]">Modules Entitled</span>
                  <span className="font-hand-heading text-base font-bold text-[#242424]">All 18 BOS Modules</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="border border-[#D9D9D9] px-4 py-2 font-hand-heading text-base text-[#777777] cursor-pointer"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleComplete}
                  className="inline-flex items-center gap-2 border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] px-8 py-3 font-hand-heading text-2xl font-bold cursor-pointer hover:bg-[#171717] disabled:opacity-50"
                >
                  <span>{isLoading ? "Provisioning..." : "Complete & Open Workspace &rarr;"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
