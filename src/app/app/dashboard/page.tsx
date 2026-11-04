"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/app/AppShell";
import { useApp } from "@/components/app/AppContext";
import { tkBusinessSuiteModules } from "@/config/products";
import {
  Building2,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Clock,
  Users,
  Layers,
  ArrowRight,
  Shield,
  FileText,
  AlertCircle,
  Bell,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function DashboardPage() {
  const { user, activeOrg } = useApp();
  const [showDemoMetrics, setShowDemoMetrics] = useState(true);

  return (
    <AppShell>
      <div className="space-y-8">
        {/* ========================================== */}
        {/* HERO & HEADER SECTION */}
        {/* ========================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D9D9D9] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
                ORGANISATION DASHBOARD &bull; {activeOrg?.slug.toUpperCase() || "TENANT"}
              </span>
              <span className="border border-[#242424] bg-[#F5F5F5] px-1.5 py-0.2 font-hand-draft text-[10px] uppercase">
                {activeOrg?.role.name || "Owner"}
              </span>
            </div>
            <h1 className="font-hand-heading text-4xl md:text-5xl font-bold text-[#242424] tracking-tight">
              Your business, in one place.
            </h1>
            <p className="mt-1 font-hand-body text-xl text-[#777777]">
              An overview of your organisation&apos;s operations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowDemoMetrics(!showDemoMetrics)}
              className="border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-1.5 font-hand-draft text-xs text-[#242424] cursor-pointer"
            >
              Toggle Demo Data: {showDemoMetrics ? "Active (Sample)" : "Empty State (Clean)"}
            </button>
            <Link
              href="/app/settings/organisation"
              className="inline-flex items-center gap-1.5 border border-[#242424] bg-[#242424] text-[#FFFFFF] px-4 py-2 font-hand-heading text-lg font-bold cursor-pointer hover:bg-[#171717]"
            >
              <span>Org Settings &rarr;</span>
            </Link>
          </div>
        </div>

        {/* ========================================== */}
        {/* 1. ORGANISATION OVERVIEW METRICS */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Organisation Name */}
          <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-5 shadow-[0_2px_8px_rgba(23,23,23,0.02)]">
            <span className="font-hand-draft text-[11px] uppercase tracking-wider text-[#777777]">
              TENANT ORGANISATION
            </span>
            <h3 className="mt-2 font-hand-heading text-2xl font-bold text-[#242424] truncate">
              {activeOrg?.name || "Loading..."}
            </h3>
            <p className="font-hand-draft text-xs text-[#777777] mt-1">
              Active Workspace: HQ Operations
            </p>
          </div>

          {/* Card 2: Subscription Status */}
          <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-5 shadow-[0_2px_8px_rgba(23,23,23,0.02)]">
            <span className="font-hand-draft text-[11px] uppercase tracking-wider text-[#777777]">
              SUBSCRIPTION STATUS
            </span>
            <div className="mt-2 flex items-center gap-2">
              <span className="font-hand-heading text-2xl font-bold text-[#242424]">
                ACTIVE
              </span>
              <span className="border border-[#242424] px-1.5 py-0.5 font-hand-draft text-[10px] bg-[#F5F5F5]">
                ENTERPRISE
              </span>
            </div>
            <p className="font-hand-draft text-xs text-[#777777] mt-1">
              Renewal: 2027-11-03 &bull; Auto-renewal
            </p>
          </div>

          {/* Card 3: Entitled Modules */}
          <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-5 shadow-[0_2px_8px_rgba(23,23,23,0.02)]">
            <span className="font-hand-draft text-[11px] uppercase tracking-wider text-[#777777]">
              ENTITLED MODULES
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-hand-heading text-3xl font-bold text-[#242424]">
                18 / 18
              </span>
              <span className="font-hand-draft text-xs text-[#777777]">All Connected</span>
            </div>
            <p className="font-hand-draft text-xs text-[#777777] mt-1">
              BOS Unified Architecture
            </p>
          </div>

          {/* Card 4: Security & RBAC */}
          <div className="border border-[#D9D9D9] bg-[#FFFFFF] p-5 shadow-[0_2px_8px_rgba(23,23,23,0.02)]">
            <span className="font-hand-draft text-[11px] uppercase tracking-wider text-[#777777]">
              SECURITY AUDIT STATUS
            </span>
            <div className="mt-2 flex items-center gap-2">
              <span className="font-hand-heading text-2xl font-bold text-[#242424]">
                PROTECTED
              </span>
              <Shield className="h-4 w-4 text-[#242424]" />
            </div>
            <p className="font-hand-draft text-xs text-[#777777] mt-1">
              Tenant Isolation Enforced
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* 2. BUSINESS OVERVIEW (FINANCE & OPERATIONS) */}
        {/* ========================================== */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="font-hand-heading text-2xl font-bold text-[#242424]">
                Operational &amp; Fiscal Overview
              </h2>
              {showDemoMetrics && (
                <span className="font-hand-draft text-[10px] border border-[#242424] px-1.5 bg-[#FFFFFF]">
                  DEMO DATA ILLUSTRATION
                </span>
              )}
            </div>
            <span className="font-hand-draft text-xs text-[#777777]">
              Current Fiscal Period: 2026 Q4
            </span>
          </div>

          {showDemoMetrics ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Financial Snapshot */}
              <div className="border border-[#242424] bg-[#FFFFFF] p-6 space-y-4">
                <span className="font-hand-draft text-xs uppercase tracking-wider text-[#777777] block">
                  FISCAL POSITION &bull; TKFIN
                </span>
                <div className="space-y-3">
                  <div>
                    <span className="font-hand-draft text-xs text-[#777777]">Current Period Revenue</span>
                    <p className="font-hand-heading text-3xl font-bold text-[#242424]">
                      ₹ 2,48,50,000
                    </p>
                  </div>
                  <div className="flex justify-between border-t border-[#D9D9D9] pt-2">
                    <span className="font-hand-body text-base text-[#777777]">Operating Expenses</span>
                    <span className="font-hand-heading text-lg font-bold text-[#242424]">
                      ₹ 1,12,30,000
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-[#D9D9D9] pt-2">
                    <span className="font-hand-body text-base text-[#777777]">Net Operating Margin</span>
                    <span className="font-hand-heading text-lg font-bold text-[#242424]">
                      + 54.8%
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery & Project Snapshot */}
              <div className="border border-[#242424] bg-[#FFFFFF] p-6 space-y-4">
                <span className="font-hand-draft text-xs uppercase tracking-wider text-[#777777] block">
                  PROJECTS &amp; DELIVERY &bull; TK PROJECT
                </span>
                <div className="space-y-3">
                  <div>
                    <span className="font-hand-draft text-xs text-[#777777]">Active Project Deliveries</span>
                    <p className="font-hand-heading text-3xl font-bold text-[#242424]">
                      14 Active
                    </p>
                  </div>
                  <div className="flex justify-between border-t border-[#D9D9D9] pt-2">
                    <span className="font-hand-body text-base text-[#777777]">Milestones On Track</span>
                    <span className="font-hand-heading text-lg font-bold text-[#242424]">
                      92% (23/25)
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-[#D9D9D9] pt-2">
                    <span className="font-hand-body text-base text-[#777777]">Pending Approval Requests</span>
                    <span className="font-hand-heading text-lg font-bold text-[#242424]">
                      3 Actionable
                    </span>
                  </div>
                </div>
              </div>

              {/* People & Team Snapshot */}
              <div className="border border-[#242424] bg-[#FFFFFF] p-6 space-y-4">
                <span className="font-hand-draft text-xs uppercase tracking-wider text-[#777777] block">
                  WORKFORCE &bull; TKHR
                </span>
                <div className="space-y-3">
                  <div>
                    <span className="font-hand-draft text-xs text-[#777777]">Total Team Size</span>
                    <p className="font-hand-heading text-3xl font-bold text-[#242424]">
                      48 Members
                    </p>
                  </div>
                  <div className="flex justify-between border-t border-[#D9D9D9] pt-2">
                    <span className="font-hand-body text-base text-[#777777]">Active Departments</span>
                    <span className="font-hand-heading text-lg font-bold text-[#242424]">
                      5 Divisions
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-[#D9D9D9] pt-2">
                    <span className="font-hand-body text-base text-[#777777]">Open Recruitment Funnels</span>
                    <span className="font-hand-heading text-lg font-bold text-[#242424]">
                      6 Positions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Honest Empty State */
            <div className="border-2 border-dashed border-[#D9D9D9] bg-[#FFFFFF] p-12 text-center">
              <Building2 className="mx-auto h-12 w-12 text-[#777777] mb-3" />
              <h3 className="font-hand-heading text-2xl font-bold text-[#242424]">
                No live business records yet
              </h3>
              <p className="max-w-md mx-auto font-hand-body text-lg text-[#777777] mt-1 mb-6">
                Connect your operational modules or create your first invoice in TKFIN, customer in TKCRM, or milestone in TK Project.
              </p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/app/modules/tkfin"
                  className="border border-[#242424] bg-[#242424] text-[#FFFFFF] px-4 py-2 font-hand-heading text-lg font-bold"
                >
                  Open TKFIN &rarr;
                </Link>
                <Link
                  href="/app/modules/tkerp"
                  className="border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-4 py-2 font-hand-heading text-lg text-[#242424]"
                >
                  Configure TKERP Ledger
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ========================================== */}
        {/* 3. QUICK ACCESS: THE 18 PRODUCT MODULES */}
        {/* ========================================== */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-hand-heading text-2xl font-bold text-[#242424]">
                The 18 Product Modules Directory
              </h2>
              <p className="font-hand-body text-base text-[#777777]">
                Natively integrated modules sharing the centralized THEKOLLI BOS spine.
              </p>
            </div>
            <Link
              href="/products/tk-business-suite"
              target="_blank"
              className="font-hand-draft text-xs text-[#777777] hover:text-[#242424] underline flex items-center gap-1"
            >
              <span>Specification Reference</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {tkBusinessSuiteModules.map((mod) => (
              <Link
                key={mod.id}
                href={`/app/modules/${mod.id}`}
                className="group border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] p-4 transition-all hover:shadow-[0_4px_16px_rgba(23,23,23,0.06)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center border border-[#242424] bg-[#F5F5F5] group-hover:bg-[#242424] transition-colors">
                      <span className="font-hand-draft text-xs font-bold text-[#242424] group-hover:text-[#FFFFFF]">
                        {mod.name.slice(0, 3)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-hand-heading text-xl font-bold text-[#242424] leading-tight">
                        {mod.name}
                      </h4>
                      <span className="font-hand-draft text-[10px] text-[#777777] uppercase">
                        {mod.category}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#777777] group-hover:translate-x-1 group-hover:text-[#242424] transition-all" />
                </div>
                <p className="mt-3 font-hand-body text-base text-[#777777] line-clamp-2">
                  {mod.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* 4. RECENT ACTIVITY & NOTIFICATIONS GRID */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Organisation Activity */}
          <div className="border border-[#242424] bg-[#FFFFFF] p-6">
            <div className="flex items-center justify-between mb-4 border-b border-[#D9D9D9] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#242424]" />
                <h3 className="font-hand-heading text-xl font-bold text-[#242424]">
                  Recent Activity Trail
                </h3>
              </div>
              <Link
                href="/app/settings/audit-logs"
                className="font-hand-draft text-xs text-[#777777] hover:underline"
              >
                View Full Audit Logs &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              <div className="border-b border-[#D9D9D9]/60 pb-2">
                <span className="font-hand-draft text-[10px] text-[#777777] uppercase">
                  TODAY &bull; 14:22
                </span>
                <p className="font-hand-body text-base text-[#242424]">
                  <strong>Kalyan Kolli</strong> updated organization profile settings.
                </p>
              </div>
              <div className="border-b border-[#D9D9D9]/60 pb-2">
                <span className="font-hand-draft text-[10px] text-[#777777] uppercase">
                  TODAY &bull; 11:05
                </span>
                <p className="font-hand-body text-base text-[#242424]">
                  <strong>Sarah Chen</strong> approved purchase requisition PO-2026-081.
                </p>
              </div>
              <div>
                <span className="font-hand-draft text-[10px] text-[#777777] uppercase">
                  YESTERDAY &bull; 18:30
                </span>
                <p className="font-hand-body text-base text-[#242424]">
                  <strong>System Engine</strong> verified multi-tenant database backup snapshot.
                </p>
              </div>
            </div>
          </div>

          {/* Pending Alerts & Notifications */}
          <div className="border border-[#242424] bg-[#FFFFFF] p-6">
            <div className="flex items-center justify-between mb-4 border-b border-[#D9D9D9] pb-3">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#242424]" />
                <h3 className="font-hand-heading text-xl font-bold text-[#242424]">
                  System &amp; Approval Alerts
                </h3>
              </div>
              <Link
                href="/app/notifications"
                className="font-hand-draft text-xs text-[#777777] hover:underline"
              >
                All Notifications (3) &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              <div className="border border-[#D9D9D9] p-3 bg-[#FCFCFC] flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-[#242424] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-hand-heading text-base font-bold text-[#242424] block">
                    Pending Multi-Step Approval (TK Flow)
                  </span>
                  <p className="font-hand-body text-sm text-[#777777]">
                    Q4 Infrastructure procurement requires managerial sign-off.
                  </p>
                </div>
              </div>

              <div className="border border-[#D9D9D9] p-3 bg-[#FCFCFC] flex items-start gap-2.5">
                <Users className="h-4 w-4 text-[#242424] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-hand-heading text-base font-bold text-[#242424] block">
                    Team Invitation Accepted
                  </span>
                  <p className="font-hand-body text-sm text-[#777777]">
                    Sarah Chen joined workspace Headquarters &amp; Engineering.
                  </p>
                </div>
              </div>

              <div className="border border-[#D9D9D9] p-3 bg-[#FCFCFC] flex items-start gap-2.5">
                <Shield className="h-4 w-4 text-[#242424] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-hand-heading text-base font-bold text-[#242424] block">
                    Security Baseline Verified
                  </span>
                  <p className="font-hand-body text-sm text-[#777777]">
                    All 18 module entitlements are synced with active Enterprise plan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
