"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { Bell, Check, Clock, Shield, Users, AlertCircle } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "n-1",
      title: "Pending Multi-Step Approval (TK Flow)",
      message: "Q4 Infrastructure procurement PO-2026-081 requires managerial review.",
      type: "APPROVAL",
      date: "10 minutes ago",
      isRead: false,
    },
    {
      id: "n-2",
      title: "Team Invitation Accepted",
      message: "Sarah Chen accepted invitation and joined as Manager.",
      type: "INFO",
      date: "2 hours ago",
      isRead: false,
    },
    {
      id: "n-3",
      title: "Subscription Renewal Notice",
      message: "Enterprise subscription plan is active. Next billing cycle: 2027-11-03.",
      type: "SUBSCRIPTION",
      date: "1 day ago",
      isRead: true,
    },
    {
      id: "n-4",
      title: "Database Backup Completed",
      message: "Automated WAL snapshot archived with cryptographic hash verification.",
      type: "INFO",
      date: "2 days ago",
      isRead: true,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <AppShell>
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-4">
          <div>
            <span className="font-hand-draft text-xs uppercase tracking-widest text-[#777777]">
              OPERATIONAL ALERTS
            </span>
            <h1 className="font-hand-heading text-4xl font-bold text-[#242424]">
              Notifications &amp; Approvals
            </h1>
          </div>
          <button
            type="button"
            onClick={markAllRead}
            className="border border-[#D9D9D9] hover:border-[#242424] bg-[#FFFFFF] px-3 py-1.5 font-hand-draft text-xs text-[#242424] cursor-pointer"
          >
            Mark all as read
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`border p-4 transition-all ${
                n.isRead
                  ? "border-[#D9D9D9] bg-[#FFFFFF]"
                  : "border-[#242424] bg-[#FCFCFC] shadow-[0_2px_8px_rgba(23,23,23,0.03)]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center border border-[#242424] bg-[#F5F5F5] flex-shrink-0 mt-0.5">
                    {n.type === "APPROVAL" ? (
                      <Clock className="h-4 w-4 text-[#242424]" />
                    ) : n.type === "SUBSCRIPTION" ? (
                      <Shield className="h-4 w-4 text-[#242424]" />
                    ) : (
                      <Bell className="h-4 w-4 text-[#242424]" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-hand-heading text-lg font-bold text-[#242424]">
                        {n.title}
                      </h4>
                      {!n.isRead && (
                        <span className="font-hand-draft text-[9px] uppercase px-1 border border-[#242424] bg-[#242424] text-[#FFFFFF]">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="font-hand-body text-base text-[#777777] mt-0.5">
                      {n.message}
                    </p>
                  </div>
                </div>
                <span className="font-hand-draft text-xs text-[#777777] flex-shrink-0">
                  {n.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
