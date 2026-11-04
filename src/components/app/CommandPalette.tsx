"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { tkBusinessSuiteModules } from "@/config/products";
import { Search, X, ArrowRight, Settings, Users, Shield, CreditCard, FileText } from "lucide-react";

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredModules = tkBusinessSuiteModules.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.category.toLowerCase().includes(query.toLowerCase()) ||
      m.shortDescription.toLowerCase().includes(query.toLowerCase())
  );

  const quickSettings = [
    { name: "Organisation Profile", path: "/app/settings/organisation", icon: Settings },
    { name: "Team Members & Invitations", path: "/app/settings/users", icon: Users },
    { name: "Roles & Access Control", path: "/app/settings/roles", icon: Shield },
    { name: "Subscription & Billing", path: "/app/settings/billing", icon: CreditCard },
    { name: "Security Audit Logs", path: "/app/settings/audit-logs", icon: FileText },
  ].filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));

  const handleNavigate = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#171717]/40 backdrop-blur-xs">
      <div className="w-full max-w-xl border-2 border-[#242424] bg-[#FFFFFF] shadow-[0_16px_40px_rgba(23,23,23,0.15)] animate-in fade-in zoom-in-95 duration-150">
        {/* Input Bar */}
        <div className="flex items-center gap-3 border-b border-[#D9D9D9] px-4 py-3">
          <Search className="h-5 w-5 text-[#777777]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search modules, settings, actions... (ESC to exit)"
            className="w-full bg-transparent font-hand-heading text-lg text-[#242424] outline-none placeholder:text-[#777777]"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 hover:bg-[#F5F5F5] border border-[#D9D9D9] text-[#777777] cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Modules Group */}
          {filteredModules.length > 0 && (
            <div>
              <span className="font-hand-draft text-[11px] uppercase tracking-wider text-[#777777] px-2">
                MODULES ({filteredModules.length})
              </span>
              <div className="mt-1 space-y-1">
                {filteredModules.map((mod) => (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => handleNavigate(`/app/modules/${mod.id}`)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#F5F5F5] border border-transparent hover:border-[#D9D9D9] transition-colors cursor-pointer group"
                  >
                    <div>
                      <span className="font-hand-heading text-base font-bold text-[#242424]">
                        {mod.name}
                      </span>
                      <span className="ml-2 font-hand-draft text-xs text-[#777777]">
                        &bull; {mod.category}
                      </span>
                      <p className="font-hand-body text-sm text-[#777777] truncate">
                        {mod.shortDescription}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#777777] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Settings Group */}
          {quickSettings.length > 0 && (
            <div>
              <span className="font-hand-draft text-[11px] uppercase tracking-wider text-[#777777] px-2">
                SETTINGS &amp; GOVERNANCE
              </span>
              <div className="mt-1 space-y-1">
                {quickSettings.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.path}
                      type="button"
                      onClick={() => handleNavigate(s.path)}
                      className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#F5F5F5] border border-transparent hover:border-[#D9D9D9] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 text-[#777777]" />
                        <span className="font-hand-heading text-base font-semibold text-[#242424]">
                          {s.name}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#777777] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {filteredModules.length === 0 && quickSettings.length === 0 && (
            <div className="py-8 text-center">
              <p className="font-hand-body text-lg text-[#777777]">
                No matching modules or actions found for &ldquo;{query}&rdquo;.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-[#D9D9D9] px-4 py-2 bg-[#FCFCFC] flex items-center justify-between">
          <span className="font-hand-draft text-[11px] text-[#777777]">
            Press <kbd className="border border-[#D9D9D9] px-1 py-0.5 bg-[#FFFFFF]">ESC</kbd> to exit
          </span>
          <span className="font-hand-draft text-[11px] text-[#777777]">
            TK Business Suite &bull; BOS Platform
          </span>
        </div>
      </div>
    </div>
  );
}
