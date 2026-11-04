"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/app/AppContext";

export default function AppPage() {
  const { user, isLoading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace("/app/dashboard");
      } else {
        router.replace("/app/login");
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center font-hand-heading text-xl text-[#777777]">
      Connecting to workspace...
    </div>
  );
}
