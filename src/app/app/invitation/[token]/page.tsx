"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Users, CheckCircle2, AlertCircle } from "lucide-react";

function AcceptInvitationContent() {
  const params = useParams();
  const router = useRouter();
  const token = typeof params.token === "string" ? params.token : "";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAccept = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/organisations/invite/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          router.push(`/app/login?next=/app/invitation/${token}`);
          return;
        }
        setError(data.error || "Failed to accept invitation");
        setIsLoading(false);
        return;
      }

      router.push("/app/dashboard");
      router.refresh();
    } catch {
      setError("Network error.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-hand-body">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="border-2 border-[#242424] bg-[#FFFFFF] p-8 shadow-[0_12px_32px_rgba(36,36,36,0.08)] text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center border-2 border-[#242424] bg-[#F5F5F5] mb-4">
            <Users className="h-7 w-7 text-[#242424]" />
          </div>

          <h2 className="font-hand-heading text-3xl font-bold text-[#242424] mb-2">
            Organisation Invitation
          </h2>
          <p className="font-hand-body text-base text-[#777777] mb-6">
            You have been invited to join an enterprise organisation on TK Business Suite.
          </p>

          {error && (
            <div className="mb-4 border border-[#242424] bg-[#F5F5F5] p-3 flex items-start gap-2 text-left">
              <AlertCircle className="h-5 w-5 text-[#242424] flex-shrink-0 mt-0.5" />
              <p className="font-hand-body text-base text-[#242424]">{error}</p>
            </div>
          )}

          <button
            type="button"
            disabled={isLoading}
            onClick={handleAccept}
            className="w-full inline-flex items-center justify-center border-2 border-[#242424] bg-[#242424] text-[#FFFFFF] py-2.5 font-hand-heading text-xl font-bold cursor-pointer hover:bg-[#171717] disabled:opacity-50"
          >
            <span>{isLoading ? "Processing..." : "Accept & Join Organisation &rarr;"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AcceptInvitationPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center font-hand-heading text-xl">Loading invitation...</div>}>
      <AcceptInvitationContent />
    </React.Suspense>
  );
}
