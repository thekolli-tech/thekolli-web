"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { Shield, Check, Lock, Info } from "lucide-react";

export default function RolesSettingsPage() {
  const [selectedRole, setSelectedRole] = useState("OWNER");

  const roles = [
    {
      key: "SUPER_ADMIN",
      name: "Platform Super Admin",
      description: "Platform-wide operational authority and multi-tenant systems governance.",
      scope: "Global",
    },
    {
      key: "OWNER",
      name: "Organisation Owner",
      description: "Complete authority over organisation settings, billing, subscriptions, and memberships.",
      scope: "Organisation Wide",
    },
    {
      key: "ADMIN",
      name: "Organisation Admin",
      description: "Administrative authority over operational workflows, users, and module entitlements.",
      scope: "Organisation Wide",
    },
    {
      key: "MANAGER",
      name: "Manager",
      description: "Team and operational project governance with departmental approval rights.",
      scope: "Assigned Workspaces",
    },
    {
      key: "EMPLOYEE",
      name: "Employee",
      description: "Standard operational read/write access scoped to assigned workspaces.",
      scope: "Assigned Workspaces",
    },
  ];

  const permissionMatrix = [
    { module: "PLATFORM", resource: "Organisation Settings", action: "MANAGE", owner: true, admin: true, manager: false, employee: false },
    { module: "PLATFORM", resource: "Billing & Subscriptions", action: "MANAGE", owner: true, admin: false, manager: false, employee: false },
    { module: "PLATFORM", resource: "Team Invitations & Roles", action: "MANAGE", owner: true, admin: true, manager: false, employee: false },
    { module: "PLATFORM", resource: "Security Audit Logs", action: "READ", owner: true, admin: true, manager: false, employee: false },
    { module: "TKERP", resource: "Core Resource Planning", action: "MANAGE", owner: true, admin: true, manager: true, employee: false },
    { module: "TKFIN", resource: "General Ledger & Journals", action: "MANAGE", owner: true, admin: true, manager: false, employee: false },
    { module: "TKFIN", resource: "Expense Submissions", action: "CREATE", owner: true, admin: true, manager: true, employee: true },
    { module: "TK Project", resource: "Project Delivery Boards", action: "MANAGE", owner: true, admin: true, manager: true, employee: false },
    { module: "TK Flow", resource: "Multi-Step Approval Logic", action: "APPROVE", owner: true, admin: true, manager: true, employee: false },
    { module: "TK Docs", resource: "Document Vaults", action: "READ", owner: true, admin: true, manager: true, employee: true },
  ];

  return (
    <AppShell>
      <div className="max-w-5xl space-y-6">
        <div>
          <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
            ROLE-BASED ACCESS CONTROL (RBAC)
          </span>
          <h1 className="font-hand-heading text-4xl font-bold text-[#242424]">
            Roles &amp; Granular Permissions
          </h1>
          <p className="font-hand-body text-xl text-[#777777]">
            Permissions are enforced strictly server-side across tenant boundaries and module actions.
          </p>
        </div>

        {/* Roles Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {roles.map((r) => {
            const isSelected = selectedRole === r.key;
            return (
              <div
                key={r.key}
                onClick={() => setSelectedRole(r.key)}
                className={`border p-4 cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#242424] bg-[#F5F5F5] shadow-[0_2px_8px_rgba(23,23,23,0.04)]"
                    : "border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-hand-heading text-lg font-bold text-[#242424]">
                    {r.name}
                  </span>
                  <span className="font-hand-draft text-[9px] border border-[#242424] px-1 bg-[#FFFFFF]">
                    {r.scope}
                  </span>
                </div>
                <p className="mt-2 font-hand-body text-sm text-[#777777]">
                  {r.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Permission Matrix Table */}
        <div className="border border-[#242424] bg-[#FFFFFF] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-3">
            <div>
              <h3 className="font-hand-heading text-2xl font-bold text-[#242424]">
                Granular Permission Matrix
              </h3>
              <p className="font-hand-body text-base text-[#777777]">
                Action capabilities mapped to platform roles.
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-hand-draft text-xs text-[#777777]">
              <Lock className="h-3.5 w-3.5" />
              <span>Backend Enforced</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#D9D9D9] bg-[#FCFCFC]">
                  <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Module</th>
                  <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Resource</th>
                  <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Action</th>
                  <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777] text-center">Owner</th>
                  <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777] text-center">Admin</th>
                  <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777] text-center">Manager</th>
                  <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777] text-center">Employee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9D9D9]/70 font-hand-body text-base">
                {permissionMatrix.map((pm, idx) => (
                  <tr key={idx} className="hover:bg-[#F5F5F5]">
                    <td className="py-2 px-3 font-hand-draft text-xs text-[#242424] font-bold">{pm.module}</td>
                    <td className="py-2 px-3 text-[#242424]">{pm.resource}</td>
                    <td className="py-2 px-3 font-hand-draft text-xs text-[#777777]">{pm.action}</td>
                    <td className="py-2 px-3 text-center">{pm.owner ? "✓" : "—"}</td>
                    <td className="py-2 px-3 text-center">{pm.admin ? "✓" : "—"}</td>
                    <td className="py-2 px-3 text-center">{pm.manager ? "✓" : "—"}</td>
                    <td className="py-2 px-3 text-center">{pm.employee ? "✓" : "—"}</td>
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
