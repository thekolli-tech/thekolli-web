"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

export interface UserContextData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
  isTwoFactorEnabled: boolean;
}

export interface ActiveOrgData {
  id: string;
  name: string;
  slug: string;
  role: {
    id: string;
    key: string;
    name: string;
  };
}

export interface OrgListItem {
  id: string;
  name: string;
  slug: string;
  role: string;
  roleKey: string;
  isDefault: boolean;
}

interface AppContextValue {
  user: UserContextData | null;
  activeOrg: ActiveOrgData | null;
  organisations: OrgListItem[];
  permissions: string[];
  isLoading: boolean;
  switchOrganisation: (orgId: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshContext: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserContextData | null>(null);
  const [activeOrg, setActiveOrg] = useState<ActiveOrgData | null>(null);
  const [organisations, setOrganisations] = useState<OrgListItem[]>([]);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage =
    pathname.startsWith("/app/login") ||
    pathname.startsWith("/app/forgot-password") ||
    pathname.startsWith("/app/reset-password") ||
    pathname.startsWith("/app/verify-email") ||
    pathname.startsWith("/app/two-factor") ||
    pathname.startsWith("/app/session-expired") ||
    pathname.startsWith("/app/account-locked") ||
    pathname.startsWith("/app/invitation");

  const fetchSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setUser(data.user);
          setActiveOrg(data.activeOrganisation || null);
          setOrganisations(data.organisations || []);
          setPermissions(data.permissions || []);
        } else {
          setUser(null);
          setActiveOrg(null);
        }
      } else {
        setUser(null);
        setActiveOrg(null);
      }
    } catch (e) {
      console.error("Failed to fetch session:", e);
      setUser(null);
      setActiveOrg(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession, pathname]);

  const switchOrganisation = async (orgId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/organisations/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organisationId: orgId }),
      });
      if (res.ok) {
        await fetchSession();
        router.refresh();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to switch organisation");
      }
    } catch {
      alert("Network error while switching organisation.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setActiveOrg(null);
    router.push("/app/login");
  };

  return (
    <AppContext.Provider
      value={{
        user,
        activeOrg,
        organisations,
        permissions,
        isLoading,
        switchOrganisation,
        logout,
        refreshContext: fetchSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return ctx;
}
