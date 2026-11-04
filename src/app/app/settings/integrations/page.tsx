"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { Layers, Plus, Check, ExternalLink } from "lucide-react";

export default function IntegrationsSettingsPage() {
  const [integrations] = useState([
    {
      id: "int-slack",
      name: "Slack Operational Alerts",
      description: "Send realtime approval requests and fiscal milestone alerts to Slack channels.",
      category: "Communications",
      connected: true,
      lastSync: "Today, 14:30",
    },
    {
      id: "int-github",
      name: "GitHub Repository Synchronization",
      description: "Link delivery issues and engineering PR commits to TK Project milestones.",
      category: "Engineering",
      connected: true,
      lastSync: "Today, 12:15",
    },
    {
      id: "int-aws",
      name: "AWS S3 Vault Storage",
      description: "Dedicated object storage backup target for TK Docs immutable compliance archives.",
      category: "Infrastructure",
      connected: false,
      lastSync: "Not configured",
    },
    {
      id: "int-zoho",
      name: "Zoho Books Bridge",
      description: "Bi-directional journal synchronization for legacy fiscal ledger migration.",
      category: "Finance",
      connected: false,
      lastSync: "Not configured",
    },
  ]);

  return (
    <AppShell>
      <div className="max-w-5xl space-y-6">
        <div>
          <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
            ECOSYSTEM &amp; CONNECTORS
          </span>
          <h1 className="font-hand-heading text-4xl font-bold text-[#242424]">
            Third-Party Integrations &amp; Bridges
          </h1>
          <p className="font-hand-body text-xl text-[#777777]">
            Connect operational tools and external services to your THEKOLLI BOS pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {integrations.map((item) => (
            <div
              key={item.id}
              className="border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] p-6 transition-all shadow-[0_2px_8px_rgba(23,23,23,0.02)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-hand-heading text-2xl font-bold text-[#242424]">
                      {item.name}
                    </h3>
                    <span className="font-hand-draft text-[10px] text-[#777777] uppercase">
                      {item.category}
                    </span>
                  </div>
                  <span
                    className={`font-hand-draft text-[10px] uppercase px-1.5 py-0.5 ${
                      item.connected
                        ? "bg-[#242424] text-[#FFFFFF]"
                        : "border border-[#D9D9D9] text-[#777777]"
                    }`}
                  >
                    {item.connected ? "CONNECTED" : "AVAILABLE"}
                  </span>
                </div>
                <p className="font-hand-body text-base text-[#777777] mb-4">
                  {item.description}
                </p>
              </div>

              <div className="border-t border-[#D9D9D9] pt-3 flex items-center justify-between">
                <span className="font-hand-draft text-xs text-[#777777]">
                  {item.connected ? `Synced: ${item.lastSync}` : "Ready to configure"}
                </span>
                <button
                  type="button"
                  onClick={() => alert(`Configuring ${item.name}...`)}
                  className="font-hand-heading text-base font-bold text-[#242424] hover:underline cursor-pointer"
                >
                  {item.connected ? "Configure &rarr;" : "Connect &rarr;"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
