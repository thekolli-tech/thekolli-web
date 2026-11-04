"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "./AppContext";
import { OrgSwitcher } from "./OrgSwitcher";
import { CommandPalette } from "./CommandPalette";
import { tkBusinessSuiteCategories } from "@/config/products";
import {
  LayoutDashboard,
  Layers,
  Search,
  Bell,
  Settings,
  Shield,
  CreditCard,
  FileText,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Plus,
  ExternalLink,
} from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, activeOrg, logout } = useApp();
  const pathname = usePathname();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    "Business Operations": true,
    Finance: true,
  });

  const toggleCategory = (catName: string) => {
    setOpenCategories((prev) => ({ ...prev, [catName]: !prev[catName] }));
  };

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length <= 1) return [{ label: "Dashboard", href: "/app/dashboard" }];

    return segments.map((seg, idx) => {
      const href = "/" + segments.slice(0, idx + 1).join("/");
      const label = seg
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return { label, href };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#242424] flex flex-col font-hand-body selection:bg-[#242424] selection:text-[#FFFFFF]">
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* ========================================== */}
        {/* DESKTOP SIDEBAR */}
        {/* ========================================== */}
        <aside
          className={`hidden md:flex flex-col border-r border-[#D9D9D9] bg-[#FFFFFF] transition-all duration-300 z-30 ${
            isSidebarCollapsed ? "w-20" : "w-72"
          }`}
        >
          {/* Brand Header */}
          <div className="p-4 border-b border-[#D9D9D9] flex items-center justify-between">
            <Link href="/app/dashboard" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] font-hand-heading text-xl font-bold">
                K
              </div>
              {!isSidebarCollapsed && (
                <div>
                  <span className="font-hand-heading text-xl font-bold text-[#242424] leading-none block">
                    THEKOLLI
                  </span>
                  <span className="font-hand-draft text-[10px] tracking-widest text-[#777777] uppercase block mt-0.5">
                    TK BUSINESS SUITE &bull; BOS
                  </span>
                </div>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1 hover:bg-[#F5F5F5] border border-[#D9D9D9] text-[#777777] hover:text-[#242424] cursor-pointer"
              title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

          {/* Organisation & Workspace Switcher */}
          {!isSidebarCollapsed && (
            <div className="p-3 border-b border-[#D9D9D9] bg-[#FCFCFC]">
              <OrgSwitcher />
            </div>
          )}

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {/* Core Links */}
            <div className="space-y-1">
              <Link
                href="/app/dashboard"
                className={`flex items-center gap-3 px-3 py-2 border transition-colors ${
                  pathname === "/app/dashboard"
                    ? "border-[#242424] bg-[#242424] text-[#FFFFFF]"
                    : "border-transparent text-[#242424] hover:border-[#D9D9D9] hover:bg-[#F5F5F5]"
                }`}
              >
                <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
                {!isSidebarCollapsed && (
                  <span className="font-hand-heading text-lg font-semibold leading-none">
                    Dashboard
                  </span>
                )}
              </Link>

              {/* Command Palette trigger */}
              <button
                type="button"
                onClick={() => setIsCommandPaletteOpen(true)}
                className="w-full flex items-center justify-between px-3 py-2 border border-[#D9D9D9] text-[#777777] hover:border-[#242424] hover:text-[#242424] transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <Search className="h-4 w-4 flex-shrink-0" />
                  {!isSidebarCollapsed && (
                    <span className="font-hand-draft text-xs">Search (Ctrl+K)</span>
                  )}
                </div>
                {!isSidebarCollapsed && (
                  <kbd className="font-hand-draft text-[10px] border border-[#D9D9D9] px-1 py-0.5 bg-[#FFFFFF]">
                    ⌘K
                  </kbd>
                )}
              </button>
            </div>

            {/* 18 Product Modules Directory */}
            {!isSidebarCollapsed && (
              <div className="pt-2">
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="font-hand-draft text-[11px] uppercase tracking-wider text-[#777777]">
                    PRODUCT MODULES (18)
                  </span>
                  <Link
                    href="/products/tk-business-suite"
                    target="_blank"
                    className="font-hand-draft text-[10px] text-[#777777] hover:underline flex items-center gap-0.5"
                  >
                    <span>Overview</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </Link>
                </div>

                <div className="space-y-2">
                  {tkBusinessSuiteCategories.map((cat) => {
                    const isOpen = openCategories[cat.name] ?? false;
                    return (
                      <div key={cat.name} className="border border-[#D9D9D9]/80">
                        <button
                          type="button"
                          onClick={() => toggleCategory(cat.name)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 bg-[#FCFCFC] hover:bg-[#F5F5F5] text-left cursor-pointer"
                        >
                          <span className="font-hand-heading text-sm font-bold text-[#242424]">
                            {cat.name}
                          </span>
                          <ChevronDown
                            className={`h-3.5 w-3.5 text-[#777777] transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="p-1 space-y-0.5 bg-[#FFFFFF]">
                            {cat.modules.map((mod) => {
                              const isActive = pathname === `/app/modules/${mod.id}`;
                              return (
                                <Link
                                  key={mod.id}
                                  href={`/app/modules/${mod.id}`}
                                  className={`flex items-center justify-between px-2 py-1 text-sm transition-colors ${
                                    isActive
                                      ? "bg-[#242424] text-[#FFFFFF]"
                                      : "text-[#242424] hover:bg-[#F5F5F5]"
                                  }`}
                                >
                                  <span className="font-hand-body text-base truncate">
                                    {mod.name}
                                  </span>
                                  <span
                                    className={`font-hand-draft text-[9px] uppercase ${
                                      isActive ? "text-[#D9D9D9]" : "text-[#777777]"
                                    }`}
                                  >
                                    BOS
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Settings & Admin Menu */}
            {!isSidebarCollapsed && (
              <div className="pt-2 border-t border-[#D9D9D9]">
                <span className="font-hand-draft text-[11px] uppercase tracking-wider text-[#777777] px-2 block mb-2">
                  GOVERNANCE &amp; SETTINGS
                </span>

                <div className="space-y-0.5">
                  <Link
                    href="/app/settings/organisation"
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 text-sm transition-colors ${
                      pathname.startsWith("/app/settings/organisation")
                        ? "bg-[#242424] text-[#FFFFFF]"
                        : "text-[#242424] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    <span className="font-hand-heading text-base">Organisation</span>
                  </Link>
                  <Link
                    href="/app/settings/users"
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 text-sm transition-colors ${
                      pathname.startsWith("/app/settings/users")
                        ? "bg-[#242424] text-[#FFFFFF]"
                        : "text-[#242424] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span className="font-hand-heading text-base">Team &amp; Invitations</span>
                  </Link>
                  <Link
                    href="/app/settings/roles"
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 text-sm transition-colors ${
                      pathname.startsWith("/app/settings/roles")
                        ? "bg-[#242424] text-[#FFFFFF]"
                        : "text-[#242424] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    <span className="font-hand-heading text-base">Roles &amp; RBAC</span>
                  </Link>
                  <Link
                    href="/app/settings/billing"
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 text-sm transition-colors ${
                      pathname.startsWith("/app/settings/billing")
                        ? "bg-[#242424] text-[#FFFFFF]"
                        : "text-[#242424] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span className="font-hand-heading text-base">Subscription &amp; Billing</span>
                  </Link>
                  <Link
                    href="/app/settings/audit-logs"
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 text-sm transition-colors ${
                      pathname.startsWith("/app/settings/audit-logs")
                        ? "bg-[#242424] text-[#FFFFFF]"
                        : "text-[#242424] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    <span className="font-hand-heading text-base">Audit Trail</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Mini Footer */}
          <div className="p-3 border-t border-[#D9D9D9] bg-[#FCFCFC] flex items-center justify-between">
            <Link
              href="/app/profile"
              className="flex items-center gap-2 truncate hover:opacity-80"
            >
              <div className="h-8 w-8 rounded-none border border-[#242424] bg-[#242424] text-[#FFFFFF] flex items-center justify-center font-hand-heading font-bold text-sm">
                {user ? user.firstName.charAt(0) : "U"}
              </div>
              {!isSidebarCollapsed && (
                <div className="truncate">
                  <p className="font-hand-heading text-sm font-bold text-[#242424] truncate leading-tight">
                    {user ? `${user.firstName} ${user.lastName}` : "User"}
                  </p>
                  <p className="font-hand-draft text-[10px] text-[#777777] truncate leading-tight">
                    {user?.email}
                  </p>
                </div>
              )}
            </Link>

            {!isSidebarCollapsed && (
              <button
                type="button"
                onClick={logout}
                className="p-1.5 border border-[#D9D9D9] hover:border-[#242424] hover:bg-[#FFFFFF] text-[#777777] hover:text-[#242424] cursor-pointer"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </aside>

        {/* ========================================== */}
        {/* MAIN APPLICATION CONTAINER */}
        {/* ========================================== */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#FCFCFC] overflow-y-auto">
          {/* Topbar */}
          <header className="h-16 border-b border-[#D9D9D9] bg-[#FFFFFF] px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
            {/* Mobile menu trigger & Breadcrumbs */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 border border-[#D9D9D9] text-[#242424]"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <nav className="flex items-center gap-1.5 font-hand-draft text-xs text-[#777777] overflow-x-auto whitespace-nowrap">
                <Link href="/" className="hover:text-[#242424]">
                  THEKOLLI
                </Link>
                <span>/</span>
                <Link href="/app/dashboard" className="hover:text-[#242424]">
                  BOS
                </Link>
                {breadcrumbs.map((b, idx) => (
                  <React.Fragment key={b.href}>
                    <span>/</span>
                    <span
                      className={
                        idx === breadcrumbs.length - 1
                          ? "font-bold text-[#242424]"
                          : "hover:text-[#242424]"
                      }
                    >
                      {b.label}
                    </span>
                  </React.Fragment>
                ))}
              </nav>
            </div>

            {/* Topbar Actions */}
            <div className="flex items-center gap-3">
              {/* Quick Create Action */}
              <Link
                href="/app/onboarding"
                className="hidden sm:inline-flex items-center gap-1.5 border border-[#242424] bg-[#242424] text-[#FFFFFF] px-3 py-1 font-hand-draft text-xs cursor-pointer hover:bg-[#171717]"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Org</span>
              </Link>

              {/* Notifications Link */}
              <Link
                href="/app/notifications"
                className="relative p-2 border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] text-[#242424]"
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-[#242424] text-[9px] font-hand-draft text-[#FFFFFF]">
                  3
                </span>
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] cursor-pointer"
                >
                  <div className="h-6 w-6 border border-[#242424] bg-[#242424] text-[#FFFFFF] flex items-center justify-center font-hand-heading text-xs font-bold">
                    {user ? user.firstName.charAt(0) : "U"}
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-[#777777]" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-1 w-56 border border-[#242424] bg-[#FFFFFF] shadow-[0_8px_20px_rgba(36,36,36,0.1)] p-1 z-50">
                    <div className="px-3 py-2 border-b border-[#D9D9D9] bg-[#FCFCFC]">
                      <p className="font-hand-heading text-sm font-bold text-[#242424] truncate">
                        {user ? `${user.firstName} ${user.lastName}` : "Authenticated User"}
                      </p>
                      <p className="font-hand-draft text-[10px] text-[#777777] truncate">
                        {user?.email}
                      </p>
                      <span className="inline-block mt-1 font-hand-draft text-[9px] uppercase px-1.5 py-0.5 border border-[#242424] bg-[#FFFFFF]">
                        {activeOrg?.role.name || "Member"}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/app/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 font-hand-body text-base text-[#242424] hover:bg-[#F5F5F5]"
                      >
                        <User className="h-4 w-4" />
                        <span>Profile &amp; Security</span>
                      </Link>
                      <Link
                        href="/app/settings/organisation"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-1.5 font-hand-body text-base text-[#242424] hover:bg-[#F5F5F5]"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Organisation Settings</span>
                      </Link>
                    </div>

                    <div className="border-t border-[#D9D9D9] pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-1.5 font-hand-body text-base text-[#242424] hover:bg-[#F5F5F5] text-left cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Mobile Off-canvas Drawer */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-b border-[#D9D9D9] bg-[#FFFFFF] p-4 space-y-4">
              <OrgSwitcher />
              <div className="space-y-1">
                <Link
                  href="/app/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 font-hand-heading text-lg font-bold"
                >
                  Dashboard
                </Link>
                <Link
                  href="/app/notifications"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 font-hand-heading text-lg"
                >
                  Notifications
                </Link>
                <Link
                  href="/app/settings/organisation"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 font-hand-heading text-lg"
                >
                  Settings
                </Link>
                <Link
                  href="/app/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 font-hand-heading text-lg"
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="block w-full text-left px-3 py-2 font-hand-heading text-lg text-[#242424]"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {/* Main Content Body */}
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
