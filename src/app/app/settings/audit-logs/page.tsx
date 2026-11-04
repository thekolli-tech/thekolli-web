"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { FileText, Shield, Search, Filter } from "lucide-react";

export default function AuditLogsPage() {
  const [filterAction, setFilterAction] = useState("ALL");

  const logs = [
    {
      id: "log-1",
      action: "AUTH_LOGIN",
      entityType: "USER_SESSION",
      actor: "Kalyan Kolli (admin@thekolli.com)",
      ip: "192.168.1.3",
      timestamp: "2026-11-03 16:45:10",
      status: "SUCCESS",
    },
    {
      id: "log-2",
      action: "ORG_SETTINGS_UPDATED",
      entityType: "ORGANISATION",
      actor: "Kalyan Kolli (admin@thekolli.com)",
      ip: "192.168.1.3",
      timestamp: "2026-11-03 14:22:45",
      status: "SUCCESS",
    },
    {
      id: "log-3",
      action: "MEMBER_INVITED",
      entityType: "ORGANISATION_INVITATION",
      actor: "Kalyan Kolli (admin@thekolli.com)",
      ip: "192.168.1.3",
      timestamp: "2026-11-03 11:15:30",
      status: "SUCCESS",
    },
    {
      id: "log-4",
      action: "PLAN_VERIFIED",
      entityType: "ORGANISATION_SUBSCRIPTION",
      actor: "SYSTEM_SCHEDULER",
      ip: "127.0.0.1",
      timestamp: "2026-11-03 06:00:00",
      status: "SUCCESS",
    },
    {
      id: "log-5",
      action: "CROSS_TENANT_ACCESS_BLOCKED",
      entityType: "SECURITY_GUARD",
      actor: "UNKNOWN_ORIGIN",
      ip: "45.132.88.19",
      timestamp: "2026-11-02 23:18:04",
      status: "BLOCKED",
    },
  ];

  const filteredLogs =
    filterAction === "ALL" ? logs : logs.filter((l) => l.action.includes(filterAction));

  return (
    <AppShell>
      <div className="max-w-5xl space-y-6">
        <div>
          <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
            COMPLIANCE &amp; SECURITY TRACEABILITY
          </span>
          <h1 className="font-hand-heading text-4xl font-bold text-[#242424]">
            Security Audit Trail
          </h1>
          <p className="font-hand-body text-xl text-[#777777]">
            Immutable records of operational events, user sessions, and permission checks scoped to your tenant.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center justify-between border border-[#D9D9D9] bg-[#FFFFFF] p-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-[#777777]" />
            <span className="font-hand-draft text-xs uppercase text-[#777777]">Filter Action:</span>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="border border-[#D9D9D9] px-2 py-1 font-hand-heading text-sm text-[#242424] outline-none cursor-pointer"
            >
              <option value="ALL">All Recorded Actions</option>
              <option value="AUTH">Authentication Events</option>
              <option value="ORG">Organisation Events</option>
              <option value="BLOCKED">Security Interceptions</option>
            </select>
          </div>

          <span className="font-hand-draft text-xs text-[#777777]">
            Showing {filteredLogs.length} of {logs.length} events
          </span>
        </div>

        {/* Audit Log Table */}
        <div className="border border-[#242424] bg-[#FFFFFF] overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#D9D9D9] bg-[#FCFCFC]">
                <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Timestamp</th>
                <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Action Event</th>
                <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Actor</th>
                <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">IP Address</th>
                <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9D9D9]/70 font-hand-body text-base">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F5F5F5]">
                  <td className="py-2.5 px-3 font-hand-draft text-xs text-[#777777]">{log.timestamp}</td>
                  <td className="py-2.5 px-3 font-hand-draft text-xs font-bold text-[#242424]">
                    {log.action}
                  </td>
                  <td className="py-2.5 px-3 font-hand-body text-base text-[#242424]">{log.actor}</td>
                  <td className="py-2.5 px-3 font-hand-draft text-xs text-[#777777]">{log.ip}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`font-hand-draft text-[10px] px-1.5 py-0.5 ${
                        log.status === "SUCCESS"
                          ? "border border-[#242424] bg-[#FFFFFF] text-[#242424]"
                          : "bg-[#242424] text-[#FFFFFF]"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
