"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { useApp } from "@/components/app/AppContext";
import { Building2, CheckCircle2, Save } from "lucide-react";

export default function OrganisationSettingsPage() {
  const { activeOrg } = useApp();
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: activeOrg?.name || "THEKOLLI Technologies",
    legalName: "THEKOLLI Advanced Engineering Private Limited",
    orgType: "PRIVATE_LIMITED",
    contactEmail: "contact@thekolli.com",
    contactPhone: "+91 98765 43210",
    country: "India",
    timezone: "Asia/Kolkata",
    currency: "INR",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <AppShell>
      <div className="max-w-4xl space-y-6">
        <div>
          <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
            TENANT GOVERNANCE
          </span>
          <h1 className="font-hand-heading text-4xl font-bold text-[#242424]">
            Organisation Profile
          </h1>
          <p className="font-hand-body text-xl text-[#777777]">
            Configure legal entity details, primary contact points, and locale defaults.
          </p>
        </div>

        {isSaved && (
          <div className="border border-[#242424] bg-[#F5F5F5] p-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[#242424]" />
            <p className="font-hand-body text-base text-[#242424]">
              Organisation settings saved successfully.
            </p>
          </div>
        )}

        <div className="border-2 border-[#242424] bg-[#FFFFFF] p-8 shadow-[0_12px_32px_rgba(36,36,36,0.08)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-lg text-[#242424] outline-none"
                />
              </div>

              <div>
                <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                  Tenant Unique Slug
                </label>
                <input
                  type="text"
                  disabled
                  value={activeOrg?.slug || "thekolli-tech"}
                  className="w-full border border-[#D9D9D9] bg-[#F5F5F5] px-3 py-2 font-hand-heading text-lg text-[#777777] outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                  Registered Legal Entity
                </label>
                <input
                  type="text"
                  value={formData.legalName}
                  onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                  className="w-full border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-lg text-[#242424] outline-none"
                />
              </div>

              <div>
                <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                  Legal Structure
                </label>
                <select
                  value={formData.orgType}
                  onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                  className="w-full border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-base text-[#242424] outline-none cursor-pointer"
                >
                  <option value="PRIVATE_LIMITED">Private Limited Company</option>
                  <option value="PUBLIC_LIMITED">Public Limited Company</option>
                  <option value="LLC">Limited Liability Company</option>
                  <option value="ENTERPRISE">Enterprise Group</option>
                </select>
              </div>

              <div>
                <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                  Primary Contact Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-lg text-[#242424] outline-none"
                />
              </div>

              <div>
                <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-lg text-[#242424] outline-none"
                />
              </div>

              <div>
                <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                  Fiscal Currency
                </label>
                <input
                  type="text"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-lg text-[#242424] outline-none"
                />
              </div>

              <div>
                <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                  Timezone
                </label>
                <input
                  type="text"
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-lg text-[#242424] outline-none"
                />
              </div>
            </div>

            <div className="border-t border-[#D9D9D9] pt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 border-2 border-[#242424] bg-[#242424] hover:bg-[#171717] text-[#FFFFFF] px-6 py-2.5 font-hand-heading text-xl font-bold cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes &rarr;</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
