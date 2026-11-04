"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { useApp } from "@/components/app/AppContext";
import { Users, Plus, Mail, CheckCircle2, AlertCircle } from "lucide-react";

export default function UsersSettingsPage() {
  const { user } = useApp();
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("EMPLOYEE");
  const [inviteResult, setInviteResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [members, setMembers] = useState([
    {
      id: "m-1",
      name: "Kalyan Kolli",
      email: "admin@thekolli.com",
      role: "Organisation Owner",
      status: "ACTIVE",
      joined: "2026-10-01",
    },
    {
      id: "m-2",
      name: "Sarah Chen",
      email: "sarah.chen@thekolli.com",
      role: "Manager",
      status: "ACTIVE",
      joined: "2026-10-15",
    },
    {
      id: "m-3",
      name: "Alex Thorne",
      email: "alex.t@thekolli.com",
      role: "Employee",
      status: "ACTIVE",
      joined: "2026-10-28",
    },
  ]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/organisations/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, roleKey: inviteRole }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to send invitation");
        setIsLoading(false);
        return;
      }

      setMembers((prev) => [
        ...prev,
        {
          id: `m-${Date.now()}`,
          name: inviteEmail.split("@")[0],
          email: inviteEmail,
          role: inviteRole,
          status: "INVITED",
          joined: "Pending",
        },
      ]);

      setInviteResult(
        `Invitation created for ${inviteEmail}. Token: ${data.invitation.token.slice(0, 16)}...`
      );
      setInviteEmail("");
      setIsInviting(false);
    } catch {
      alert("Error inviting member.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="max-w-5xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D9D9D9] pb-4 gap-4">
          <div>
            <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
              ACCESS &amp; WORKFORCE
            </span>
            <h1 className="font-hand-heading text-4xl font-bold text-[#242424]">
              Team Members &amp; Invitations
            </h1>
            <p className="font-hand-body text-xl text-[#777777]">
              Manage authorized tenant personnel, role assignments, and pending invitations.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsInviting(!isInviting)}
            className="inline-flex items-center gap-1.5 border border-[#242424] bg-[#242424] hover:bg-[#171717] text-[#FFFFFF] px-4 py-2 font-hand-heading text-lg font-bold cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Invite Member &rarr;</span>
          </button>
        </div>

        {inviteResult && (
          <div className="border border-[#242424] bg-[#F5F5F5] p-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-[#242424]" />
            <p className="font-hand-body text-base text-[#242424]">{inviteResult}</p>
          </div>
        )}

        {isInviting && (
          <div className="border-2 border-[#242424] bg-[#FFFFFF] p-6 shadow-[0_8px_24px_rgba(23,23,23,0.06)] animate-in fade-in duration-150">
            <h3 className="font-hand-heading text-2xl font-bold text-[#242424] mb-2">
              Invite Team Member
            </h3>
            <form onSubmit={handleInvite} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@thekolli.com"
                  className="w-full border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-base text-[#242424] outline-none"
                />
              </div>

              <div>
                <label className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424] mb-1">
                  Platform Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-heading text-base text-[#242424] outline-none"
                >
                  <option value="ADMIN">Organisation Admin</option>
                  <option value="MANAGER">Manager</option>
                  <option value="EMPLOYEE">Employee</option>
                </select>
              </div>

              <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInviting(false)}
                  className="border border-[#D9D9D9] px-4 py-1.5 font-hand-heading text-base text-[#777777] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="border border-[#242424] bg-[#242424] text-[#FFFFFF] px-5 py-1.5 font-hand-heading text-base font-bold cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? "Generating..." : "Send Invitation"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Members Table */}
        <div className="border border-[#242424] bg-[#FFFFFF] overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#D9D9D9] bg-[#FCFCFC]">
                <th className="py-3 px-4 font-hand-draft text-xs uppercase tracking-wider text-[#777777]">
                  Member
                </th>
                <th className="py-3 px-4 font-hand-draft text-xs uppercase tracking-wider text-[#777777]">
                  Work Email
                </th>
                <th className="py-3 px-4 font-hand-draft text-xs uppercase tracking-wider text-[#777777]">
                  Assigned Role
                </th>
                <th className="py-3 px-4 font-hand-draft text-xs uppercase tracking-wider text-[#777777]">
                  Status
                </th>
                <th className="py-3 px-4 font-hand-draft text-xs uppercase tracking-wider text-[#777777]">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9D9D9]/70">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-[#F5F5F5] transition-colors">
                  <td className="py-3 px-4 font-hand-heading text-base font-bold text-[#242424]">
                    {m.name}
                  </td>
                  <td className="py-3 px-4 font-hand-draft text-sm text-[#777777]">
                    {m.email}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-hand-draft text-xs border border-[#242424] px-1.5 py-0.5 bg-[#FFFFFF]">
                      {m.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-hand-draft text-[10px] uppercase px-1.5 py-0.5 ${
                        m.status === "ACTIVE"
                          ? "bg-[#242424] text-[#FFFFFF]"
                          : "border border-[#D9D9D9] text-[#777777]"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-hand-draft text-xs text-[#777777]">
                    {m.joined}
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
