"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    topic: "technical-collaboration",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
    }, 700);
  };

  if (status === "success") {
    return (
      <div className="border border-[#242424] bg-[#FFFFFF] p-8 text-center shadow-xs">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#242424]" />
        <h3 className="editorial-card-title mt-4 text-[#242424]">
          Message Transmitted
        </h3>
        <p className="mt-2 font-hand-body text-base text-[#777777]">
          Thank you, <span className="font-semibold text-[#242424]">{formData.name}</span>. Your inquiry has been routed to our technical queue. Our engineering team will respond directly to <span className="font-semibold text-[#242424]">{formData.email}</span>.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setFormData({
              name: "",
              email: "",
              organization: "",
              topic: "technical-collaboration",
              message: "",
            });
          }}
          className="mt-6 inline-flex font-hand-draft text-xs uppercase tracking-wider text-[#242424] underline hover:text-[#171717]"
        >
          Send another transmission
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[#D9D9D9] bg-[#FFFFFF] p-8 shadow-xs sm:p-10"
    >
      <div className="flex items-center justify-between border-b border-[#D9D9D9] pb-4 mb-6">
        <span className="font-hand-draft text-xs tracking-widest text-[#777777] uppercase">
          TRANSMISSION FORM &bull; INQUIRY GATEWAY
        </span>
        <span className="font-hand-draft text-[11px] text-[#242424]">SECURE CHANNEL</span>
      </div>

      {status === "error" && (
        <div className="mb-6 flex items-center gap-2 border border-[#242424] bg-[#F5F5F5] p-3 text-sm text-[#242424] font-hand-body">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424]"
          >
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Dr. Jane Smith"
            className="mt-1.5 w-full border border-[#D9D9D9] bg-[#FFFFFF] px-4 py-2 font-hand-body text-base text-[#242424] placeholder:text-[#777777]/60 focus:border-[#242424] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424]"
          >
            Corporate or Institutional Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane@organization.com"
            className="mt-1.5 w-full border border-[#D9D9D9] bg-[#FFFFFF] px-4 py-2 font-hand-body text-base text-[#242424] placeholder:text-[#777777]/60 focus:border-[#242424] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="organization"
            className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424]"
          >
            Organization or Entity
          </label>
          <input
            id="organization"
            type="text"
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            placeholder="Company or Academic Affiliation"
            className="mt-1.5 w-full border border-[#D9D9D9] bg-[#FFFFFF] px-4 py-2 font-hand-body text-base text-[#242424] placeholder:text-[#777777]/60 focus:border-[#242424] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="topic"
            className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424]"
          >
            Subject Category
          </label>
          <select
            id="topic"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            className="mt-1.5 w-full border border-[#D9D9D9] bg-[#FFFFFF] px-4 py-2 font-hand-body text-base text-[#242424] focus:border-[#242424] focus:outline-none transition-colors"
          >
            <option value="technical-collaboration">Technical Collaboration / Systems Architecture</option>
            <option value="custom-software">Custom Software Engineering Inquiries</option>
            <option value="enterprise-platforms">Enterprise Platforms &amp; Software Systems</option>
            <option value="research-discussion">Applied AI / Research Inquiry</option>
            <option value="general-inquiry">General Corporate Communications</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block font-hand-draft text-xs uppercase tracking-wider text-[#242424]"
          >
            Message or Project Overview *
          </label>
          <textarea
            id="message"
            rows={5}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please detail your architecture requirements, computational problem statement, or collaboration proposal..."
            className="mt-1.5 w-full border border-[#D9D9D9] bg-[#FFFFFF] px-4 py-2 font-hand-body text-base text-[#242424] placeholder:text-[#777777]/60 focus:border-[#242424] focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span className="font-hand-annotation text-base text-[#777777]">
          Directly handled by engineering leadership
        </span>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 border border-[#242424] bg-[#242424] px-6 py-2.5 font-hand-heading text-lg font-semibold text-[#FFFFFF] shadow-xs hover:bg-[#171717] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#242424] disabled:opacity-50 transition-all cursor-pointer"
        >
          <span>{status === "submitting" ? "Transmitting..." : "Send Transmission"}</span>
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
