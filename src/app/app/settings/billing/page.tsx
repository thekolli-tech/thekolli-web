"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { CreditCard, Check, ArrowRight, ShieldCheck, Download, AlertCircle } from "lucide-react";

export default function BillingSettingsPage() {
  const [currentPlan, setCurrentPlan] = useState("ENTERPRISE");
  const [isChanging, setIsChanging] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const plans = [
    {
      code: "STARTER",
      name: "Starter BOS Plan",
      price: "₹4,999",
      period: "per month",
      onboarding: "₹9,999 registration",
      users: "Up to 10 users",
      workspaces: "2 workspaces",
      features: ["Core business modules", "Standard support", "Single entity"],
    },
    {
      code: "PROFESSIONAL",
      name: "Professional BOS Plan",
      price: "₹14,999",
      period: "per month",
      onboarding: "₹19,999 registration",
      users: "Up to 50 users",
      workspaces: "10 workspaces",
      features: ["All 18 product modules", "Advanced workflow triggers", "Priority support"],
    },
    {
      code: "ENTERPRISE",
      name: "Enterprise Multi-Entity",
      price: "₹49,999",
      period: "per month (annual)",
      onboarding: "₹49,999 registration",
      users: "Up to 500 users",
      workspaces: "50 workspaces",
      features: ["All 18 product modules", "Dedicated systems engineer", "Custom webhooks & SLA"],
    },
  ];

  const invoices = [
    { id: "inv-001", number: "INV-TK-2026-0089", date: "2026-10-01", amount: "₹49,999.00", status: "PAID" },
    { id: "inv-002", number: "INV-TK-2026-0045", date: "2026-09-01", amount: "₹49,999.00", status: "PAID" },
    { id: "inv-003", number: "INV-TK-2026-0012", date: "2026-08-01", amount: "₹49,999.00", status: "PAID" },
  ];

  const handlePlanChange = async (newPlanCode: string) => {
    setIsChanging(true);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/billing/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planCode: newPlanCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentPlan(newPlanCode);
        setSuccessMsg(`Subscription successfully updated to ${newPlanCode} Plan.`);
      } else {
        alert(data.error || "Failed to update subscription");
      }
    } catch {
      alert("Network error.");
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-5xl space-y-8">
        <div>
          <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
            SUBSCRIPTIONS &amp; COMMERCIAL MODEL
          </span>
          <h1 className="font-hand-heading text-4xl font-bold text-[#242424]">
            Subscription &amp; Module Entitlements
          </h1>
          <p className="font-hand-body text-xl text-[#777777]">
            Subscription-based SaaS commercial structure with transparent recurring licensing.
          </p>
        </div>

        {successMsg && (
          <div className="border border-[#242424] bg-[#F5F5F5] p-3 flex items-center gap-2">
            <Check className="h-5 w-5 text-[#242424]" />
            <p className="font-hand-body text-base text-[#242424]">{successMsg}</p>
          </div>
        )}

        {/* Current Subscription Banner */}
        <div className="border-2 border-[#242424] bg-[#FFFFFF] p-6 shadow-[0_8px_24px_rgba(23,23,23,0.04)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="font-hand-draft text-xs uppercase tracking-wider text-[#777777]">
                CURRENT ACTIVE SUBSCRIPTION
              </span>
              <div className="flex items-center gap-2 mt-1">
                <h3 className="font-hand-heading text-3xl font-bold text-[#242424]">
                  {currentPlan} Plan
                </h3>
                <span className="font-hand-draft text-xs border border-[#242424] px-2 py-0.5 bg-[#F5F5F5]">
                  ACTIVE &bull; GOOD STANDING
                </span>
              </div>
              <p className="font-hand-body text-base text-[#777777] mt-1">
                Billing Cycle: Annual &bull; Next Renewal Date: <strong>2027-11-03</strong> &bull; All 18 Modules Entitled
              </p>
            </div>

            <div className="text-right">
              <span className="font-hand-heading text-2xl font-bold text-[#242424]">
                ₹ 49,999 / mo
              </span>
              <span className="block font-hand-draft text-xs text-[#777777]">
                Billed Annually
              </span>
            </div>
          </div>
        </div>

        {/* Plan Tiers Grid */}
        <div>
          <h3 className="font-hand-heading text-2xl font-bold text-[#242424] mb-3">
            Available Commercial Plans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((p) => {
              const isCurrent = currentPlan === p.code;
              return (
                <div
                  key={p.code}
                  className={`border p-6 flex flex-col justify-between ${
                    isCurrent
                      ? "border-2 border-[#242424] bg-[#FFFFFF] shadow-[0_8px_20px_rgba(23,23,23,0.06)]"
                      : "border-[#D9D9D9] bg-[#FFFFFF]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-hand-heading text-xl font-bold text-[#242424]">
                        {p.name}
                      </span>
                      {isCurrent && (
                        <span className="font-hand-draft text-[10px] border border-[#242424] px-1 bg-[#242424] text-[#FFFFFF]">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <span className="font-hand-heading text-3xl font-bold text-[#242424]">
                        {p.price}
                      </span>
                      <span className="block font-hand-draft text-xs text-[#777777]">
                        {p.period} &bull; {p.onboarding}
                      </span>
                    </div>

                    <div className="space-y-1.5 border-t border-[#D9D9D9] pt-4 mb-6 font-hand-body text-base text-[#777777]">
                      {p.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-[#242424] flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isCurrent || isChanging}
                    onClick={() => handlePlanChange(p.code)}
                    className={`w-full py-2 font-hand-heading text-lg font-bold cursor-pointer transition-all ${
                      isCurrent
                        ? "border border-[#D9D9D9] bg-[#F5F5F5] text-[#777777] cursor-not-allowed"
                        : "border border-[#242424] bg-[#242424] text-[#FFFFFF] hover:bg-[#171717]"
                    }`}
                  >
                    {isCurrent ? "Active Plan" : `Switch to ${p.name}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Invoices History Table */}
        <div className="border border-[#242424] bg-[#FFFFFF] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-3">
            <div>
              <h3 className="font-hand-heading text-2xl font-bold text-[#242424]">
                Billing Invoices &amp; Receipts
              </h3>
              <p className="font-hand-body text-base text-[#777777]">
                Official tax invoices generated for recurring subscription licensing.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D9D9D9] bg-[#FCFCFC]">
                  <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Invoice Number</th>
                  <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Date</th>
                  <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Amount</th>
                  <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Status</th>
                  <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777] text-right">PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D9D9]/70 font-hand-body text-base">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#F5F5F5]">
                    <td className="py-3 px-3 font-hand-draft text-sm font-bold text-[#242424]">{inv.number}</td>
                    <td className="py-3 px-3 font-hand-draft text-sm text-[#777777]">{inv.date}</td>
                    <td className="py-3 px-3 font-hand-heading text-base font-bold text-[#242424]">{inv.amount}</td>
                    <td className="py-3 px-3">
                      <span className="font-hand-draft text-[10px] border border-[#242424] px-1.5 py-0.5 bg-[#FFFFFF]">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Downloading ${inv.number}...`)}
                        className="inline-flex items-center gap-1 font-hand-draft text-xs text-[#242424] hover:underline cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
