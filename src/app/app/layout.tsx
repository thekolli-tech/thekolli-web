import React, { Suspense } from "react";
import { AppProvider } from "@/components/app/AppContext";

export const metadata = {
  title: "TK Business Suite — THEKOLLI",
  description: "One workspace. Every operation. Connected intelligence.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFFFF]" />}>
      <AppProvider>{children}</AppProvider>
    </Suspense>
  );
}
