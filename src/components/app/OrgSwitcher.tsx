"use client";

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "./AppContext";
import { Building2, ChevronDown, Check, Plus } from "lucide-react";
import Link from "next/navigation";

export function OrgSwitcher() {
  const { activeOrg, organisations, switchOrganisation } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-2 transition-all cursor-pointer text-left"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center border border-[#242424] bg-[#F5F5F5]">
            <Building2 className="h-4 w-4 text-[#242424]" />
          </div>
          <div className="overflow-hidden">
            <p className="font-hand-heading text-base font-bold text-[#242424] truncate leading-tight">
              {activeOrg?.name || "Select Organisation"}
            </p>
            <p className="font-hand-draft text-[10px] uppercase text-[#777777] leading-tight">
              {activeOrg?.role.name || "No Active Org"}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-[#777777] transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 border border-[#242424] bg-[#FFFFFF] shadow-[0_8px_20px_rgba(36,36,36,0.1)] p-1">
          <div className="px-2 py-1.5 border-b border-[#D9D9D9] mb-1">
            <span className="font-hand-draft text-[10px] uppercase tracking-wider text-[#777777]">
              SWITCH ORGANISATION
            </span>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-0.5">
            {organisations.map((org) => {
              const isActive = org.id === activeOrg?.id;
              return (
                <button
                  key={org.id}
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    if (!isActive) switchOrganisation(org.id);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-left transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#242424] text-[#FFFFFF]"
                      : "text-[#242424] hover:bg-[#F5F5F5]"
                  }`}
                >
                  <div className="truncate">
                    <p className="font-hand-heading text-sm font-semibold truncate leading-tight">
                      {org.name}
                    </p>
                    <p
                      className={`font-hand-draft text-[10px] ${
                        isActive ? "text-[#D9D9D9]" : "text-[#777777]"
                      }`}
                    >
                      {org.role}
                    </p>
                  </div>
                  {isActive && <Check className="h-4 w-4 text-[#FFFFFF] flex-shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          <div className="border-t border-[#D9D9D9] mt-1 pt-1">
            <a
              href="/app/onboarding"
              className="w-full flex items-center gap-1.5 px-2.5 py-1.5 font-hand-draft text-xs text-[#242424] hover:bg-[#F5F5F5] transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Create New Organisation</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
