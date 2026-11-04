"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { Key, Plus, Copy, Check, ShieldAlert } from "lucide-react";

export default function ApiSettingsPage() {
  const [keys, setKeys] = useState([
    {
      id: "key-1",
      name: "Production Backend Service Key",
      keyMasked: "tk_live_9b4e_••••••••••••••••••••••••",
      scopes: ["records:read", "records:write", "webhooks:listen"],
      created: "2026-10-20",
      lastUsed: "Today, 14:22",
    },
    {
      id: "key-2",
      name: "CI/CD Test Runner Key",
      keyMasked: "tk_test_3a1f_••••••••••••••••••••••••",
      scopes: ["test:execute"],
      created: "2026-10-25",
      lastUsed: "Yesterday, 18:10",
    },
  ]);

  const [newKeyGenerated, setNewKeyGenerated] = useState<string | null>(null);

  const handleGenerateKey = () => {
    const rawKey = `tk_live_${Math.random().toString(36).substring(2, 10)}_${Math.random().toString(36).substring(2, 18)}`;
    setNewKeyGenerated(rawKey);
    setKeys((prev) => [
      ...prev,
      {
        id: `key-${Date.now()}`,
        name: "New Developer API Key",
        keyMasked: `${rawKey.slice(0, 16)}••••••••••••••••`,
        scopes: ["records:read", "records:write"],
        created: "Just now",
        lastUsed: "Never",
      },
    ]);
  };

  return (
    <AppShell>
      <div className="max-w-5xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D9D9D9] pb-4 gap-4">
          <div>
            <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
              DEVELOPER PLATFORM
            </span>
            <h1 className="font-hand-heading text-4xl font-bold text-[#242424]">
              API Keys &amp; Developer Access
            </h1>
            <p className="font-hand-body text-xl text-[#777777]">
              Generate cryptographically scoped tokens for programmatic interactions with BOS modules.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerateKey}
            className="inline-flex items-center gap-1.5 border border-[#242424] bg-[#242424] hover:bg-[#171717] text-[#FFFFFF] px-4 py-2 font-hand-heading text-lg font-bold cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Generate New API Key</span>
          </button>
        </div>

        {newKeyGenerated && (
          <div className="border-2 border-[#242424] bg-[#FCFCFC] p-4 space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-[#242424]" />
              <span className="font-hand-heading text-lg font-bold text-[#242424]">
                API Key Generated — Copy Now
              </span>
            </div>
            <p className="font-hand-body text-sm text-[#777777]">
              For security, this secret key will never be displayed again. Store it securely in your environment vault.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                readOnly
                value={newKeyGenerated}
                className="w-full border border-[#242424] bg-[#FFFFFF] px-3 py-2 font-hand-draft text-xs text-[#242424]"
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(newKeyGenerated);
                  alert("API Key copied to clipboard!");
                }}
                className="border border-[#242424] bg-[#242424] text-[#FFFFFF] px-3 py-2 font-hand-draft text-xs cursor-pointer flex items-center gap-1"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </button>
            </div>
          </div>
        )}

        <div className="border border-[#242424] bg-[#FFFFFF] overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#D9D9D9] bg-[#FCFCFC]">
                <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Key Label</th>
                <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Masked Token</th>
                <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Granted Scopes</th>
                <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Created</th>
                <th className="py-2.5 px-3 font-hand-draft text-xs uppercase text-[#777777]">Last Used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9D9D9]/70 font-hand-body text-base">
              {keys.map((k) => (
                <tr key={k.id} className="hover:bg-[#F5F5F5]">
                  <td className="py-3 px-3 font-hand-heading text-base font-bold text-[#242424]">{k.name}</td>
                  <td className="py-3 px-3 font-hand-draft text-xs text-[#777777]">{k.keyMasked}</td>
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1">
                      {k.scopes.map((s, idx) => (
                        <span key={idx} className="font-hand-draft text-[9px] border border-[#D9D9D9] px-1 bg-[#FFFFFF]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-3 font-hand-draft text-xs text-[#777777]">{k.created}</td>
                  <td className="py-3 px-3 font-hand-draft text-xs text-[#777777]">{k.lastUsed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
