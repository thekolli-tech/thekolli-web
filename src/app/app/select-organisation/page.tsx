"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/app/AppContext";
import { Building2, ArrowRight, Plus, Check } from "lucide-react";

export default function SelectOrganisationPage() {
  const { user, activeOrg, organisations, switchOrganisation, isLoading } = useApp();
  const router = useRouter();

  const handleSelect = async (orgId: string) => {
    await switchOrganisation(orgId);
    router.push("/app/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-hand-body">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl px-4">
        <div className="border-2 border-[#242424] bg-[#FFFFFF] p-8 shadow-[0_12px_32px_rgba(36,36,36,0.08)]">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-6 w-6 text-[#242424]" />
            <h2 className="font-hand-heading text-3xl font-bold text-[#242424]">
              Select Active Organisation
            </h2>
          </div>
          <p className="font-hand-body text-base text-[#777777] mb-6">
            Welcome back, {user?.firstName}. Choose which tenant organization to operate in:
          </p>

          <div className="space-y-3">
            {organisations.map((org) => {
              const isActive = org.id === activeOrg?.id;
              return (
                <div
                  key={org.id}
                  className={`border p-4 flex items-center justify-between transition-all ${
                    isActive
                      ? "border-[#242424] bg-[#F5F5F5]"
                      : "border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF]"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-hand-heading text-xl font-bold text-[#242424]">
                        {org.name}
                      </h4>
                      {isActive && (
                        <span className="font-hand-draft text-[10px] border border-[#242424] px-1.5 py-0.5 bg-[#FFFFFF]">
                          CURRENT ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="font-hand-draft text-xs text-[#777777] mt-0.5">
                      Role: {org.role} &bull; Slug: {org.slug}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelect(org.id)}
                    className="inline-flex items-center gap-1 border border-[#242424] bg-[#242424] hover:bg-[#171717] text-[#FFFFFF] px-3 py-1.5 font-hand-heading text-base font-bold cursor-pointer"
                  >
                    <span>Launch &rarr;</span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t border-[#D9D9D9] pt-4 flex items-center justify-between">
            <Link
              href="/app/onboarding"
              className="inline-flex items-center gap-1.5 font-hand-heading text-lg font-bold text-[#242424] hover:underline"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Organisation</span>
            </Link>

            <Link
              href="/app/dashboard"
              className="font-hand-draft text-xs text-[#777777] hover:underline"
            >
              Go to current dashboard &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
