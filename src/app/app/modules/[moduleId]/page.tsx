"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import { useApp } from "@/components/app/AppContext";
import { tkBusinessSuiteModules } from "@/config/products";
import {
  Layers,
  CheckCircle2,
  Lock,
  FileText,
  Settings,
  ArrowRight,
  ExternalLink,
  Shield,
  Clock,
} from "lucide-react";

function ModuleWorkspaceContent() {
  const params = useParams();
  const { activeOrg } = useApp();
  const rawId = typeof params?.moduleId === "string" ? params.moduleId.toLowerCase() : "";

  const moduleData = tkBusinessSuiteModules.find((m) => m.id === rawId);
  const [activeTab, setActiveTab] = useState<"overview" | "records" | "permissions">("overview");

  if (!moduleData) {
    return (
      <AppShell>
        <div className="py-12 text-center">
          <h2 className="font-hand-heading text-3xl font-bold text-[#242424]">
            Module Not Found
          </h2>
          <p className="font-hand-body text-base text-[#777777] mt-1">
            Module identifier is not registered in the BOS catalog.
          </p>
          <Link
            href="/app/dashboard"
            className="inline-block mt-4 border border-[#242424] bg-[#242424] text-[#FFFFFF] px-4 py-2 font-hand-heading text-lg font-bold"
          >
            &larr; Return to Dashboard
          </Link>
        </div>
      </AppShell>
    );
  }

  const tableName = "tk_" + moduleData.id.replace(/-/g, "_");

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D9D9D9] pb-6 gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] font-hand-heading text-2xl font-bold flex-shrink-0">
              {moduleData.name.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-hand-draft text-xs uppercase tracking-wider text-[#777777]">
                  {moduleData.category} &bull; MODULE CODE: {moduleData.id.toUpperCase()}
                </span>
                <span className="font-hand-draft text-[9px] border border-[#242424] px-1.5 py-0.5 bg-[#FFFFFF]">
                  BOS CONNECTED
                </span>
              </div>
              <h1 className="font-hand-heading text-4xl md:text-5xl font-bold text-[#242424]">
                {moduleData.name}
              </h1>
              <p className="font-hand-body text-xl text-[#777777] mt-1">
                {moduleData.shortDescription}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/products/tk-business-suite"
              target="_blank"
              className="inline-flex items-center gap-1 border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-1.5 font-hand-draft text-xs text-[#242424]"
            >
              <span>Product Specs</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#D9D9D9] gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`pb-2 font-hand-heading text-xl font-bold transition-all cursor-pointer ${
              activeTab === "overview"
                ? "border-b-2 border-[#242424] text-[#242424]"
                : "text-[#777777] hover:text-[#242424]"
            }`}
          >
            Overview &amp; Architecture
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("records")}
            className={`pb-2 font-hand-heading text-xl font-bold transition-all cursor-pointer ${
              activeTab === "records"
                ? "border-b-2 border-[#242424] text-[#242424]"
                : "text-[#777777] hover:text-[#242424]"
            }`}
          >
            Operational Records
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("permissions")}
            className={`pb-2 font-hand-heading text-xl font-bold transition-all cursor-pointer ${
              activeTab === "permissions"
                ? "border-b-2 border-[#242424] text-[#242424]"
                : "text-[#777777] hover:text-[#242424]"
            }`}
          >
            Entitlements &amp; Access
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 border border-[#242424] bg-[#FFFFFF] p-6 space-y-4">
                <span className="font-hand-draft text-xs uppercase tracking-wider text-[#777777] block">
                  CAPABILITY SPECIFICATION
                </span>
                <p className="font-hand-body text-2xl text-[#242424] leading-relaxed">
                  {moduleData.keyCapability}
                </p>
                <div className="border-t border-[#D9D9D9] pt-4 space-y-2 font-hand-body text-base text-[#777777]">
                  <p>
                    <strong className="text-[#242424]">Tenant Scoping:</strong> Operates strictly isolated within the boundaries of <strong>{activeOrg?.name || "Active Organisation"}</strong> with foreign key references guaranteed in PostgreSQL.
                  </p>
                  <p>
                    <strong className="text-[#242424]">Cross-Module Sync:</strong> State transitions are emitted directly through the unified THEKOLLI BOS event pipeline.
                  </p>
                </div>
              </div>

              <div className="border border-[#D9D9D9] bg-[#FCFCFC] p-6 space-y-4">
                <span className="font-hand-draft text-xs uppercase tracking-wider text-[#777777] block">
                  MODULE HEALTH
                </span>
                <div className="space-y-3 font-hand-body text-base">
                  <div className="flex justify-between border-b border-[#D9D9D9] pb-2">
                    <span className="text-[#777777]">Entitlement:</span>
                    <span className="font-bold text-[#242424]">Active</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D9D9D9] pb-2">
                    <span className="text-[#777777]">Database Table:</span>
                    <span className="font-hand-draft text-xs text-[#242424]">{tableName}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#D9D9D9] pb-2">
                    <span className="text-[#777777]">RBAC Enforcement:</span>
                    <span className="font-bold text-[#242424]">Level 4 (Strict)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777777]">Audit Trail:</span>
                    <span className="font-bold text-[#242424]">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OPERATIONAL RECORDS (EMPTY STATE / DEMO) */}
        {activeTab === "records" && (
          <div className="border-2 border-dashed border-[#D9D9D9] bg-[#FFFFFF] p-12 text-center space-y-3">
            <Layers className="mx-auto h-12 w-12 text-[#777777]" />
            <h3 className="font-hand-heading text-2xl font-bold text-[#242424]">
              {moduleData.name} Operational Ledger
            </h3>
            <p className="max-w-md mx-auto font-hand-body text-lg text-[#777777]">
              This module is provisioned for tenant <strong>{activeOrg?.name || "Active Organisation"}</strong>. Foundation database models and event hooks are active. Specific record actions will be expanded in upcoming operational milestones.
            </p>
          </div>
        )}

        {/* TAB 3: PERMISSIONS & ENTITLEMENTS */}
        {activeTab === "permissions" && (
          <div className="border border-[#242424] bg-[#FFFFFF] p-6 space-y-4">
            <h3 className="font-hand-heading text-2xl font-bold text-[#242424]">
              Permission Matrix for {moduleData.name}
            </h3>
            <div className="border border-[#D9D9D9] divide-y divide-[#D9D9D9] font-hand-body text-base">
              <div className="p-3 flex items-center justify-between">
                <span>{moduleData.id.toUpperCase()}:CREATE</span>
                <span className="font-hand-draft text-xs border border-[#242424] px-1.5 py-0.5">Owner, Admin, Manager</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span>{moduleData.id.toUpperCase()}:READ</span>
                <span className="font-hand-draft text-xs border border-[#242424] px-1.5 py-0.5">All Organisation Members</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span>{moduleData.id.toUpperCase()}:UPDATE</span>
                <span className="font-hand-draft text-xs border border-[#242424] px-1.5 py-0.5">Owner, Admin, Manager</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span>{moduleData.id.toUpperCase()}:APPROVE</span>
                <span className="font-hand-draft text-xs border border-[#242424] px-1.5 py-0.5">Owner, Admin, Manager</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

export default function ModuleWorkspacePage() {
  return (
    <React.Suspense fallback={<div className="p-8 font-hand-heading text-xl">Loading module...</div>}>
      <ModuleWorkspaceContent />
    </React.Suspense>
  );
}
