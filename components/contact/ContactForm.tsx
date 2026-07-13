"use client";

import { useState } from "react";
import {
  CONTACT_CATEGORIES,
  CONTACT_APPS,
  APP_CATEGORY_ID,
} from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-[10px] border border-line bg-white px-4 py-3 text-[15px] text-app-ink outline-none transition-colors focus:border-app-ink placeholder:text-[#9aa3b0]";

export default function ContactForm({
  initialCategory = "",
  initialApp = "",
}: {
  initialCategory?: string;
  initialApp?: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [app, setApp] = useState(initialApp);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // ハニーポット
  const [status, setStatus] = useState<Status>("idle");

  const showAppSelect = category === APP_CATEGORY_ID;
  const canSubmit = category !== "" && message.trim() !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending" || !canSubmit) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          app: showAppSelect ? app : "",
          email,
          message,
          company,
          source: "web",
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mx-auto max-w-[560px] rounded-[12px] border border-line bg-bg-alt px-6 py-12 text-center">
        <p className="mb-2 text-[17px] font-bold text-app-ink">
          Thank you for reaching out.
        </p>
        <p className="text-[14px] leading-[1.9] text-muted">
          I&apos;ll review your message and get back to you if needed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-[560px] text-left">
      {/* ハニーポット（人間には見せない） */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company name
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
      </div>

      <label className="mb-2 block text-[13px] font-bold text-muted">
        Type of inquiry <span className="text-[#c05a5a]">*</span>
      </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className={`${field} mb-5 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22><path d=%22M2 4l4 4 4-4%22 fill=%22none%22 stroke=%22%235f6b7a%22 stroke-width=%221.5%22/></svg>')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
      >
        <option value="" disabled>
          Please select
        </option>
        {CONTACT_CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>

      {showAppSelect && (
        <>
          <label className="mb-2 block text-[13px] font-bold text-muted">
            Related app
          </label>
          <select
            value={app}
            onChange={(e) => setApp(e.target.value)}
            className={`${field} mb-5 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22><path d=%22M2 4l4 4 4-4%22 fill=%22none%22 stroke=%22%235f6b7a%22 stroke-width=%221.5%22/></svg>')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <option value="">Please select (optional)</option>
            {CONTACT_APPS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        </>
      )}

      <label className="mb-2 block text-[13px] font-bold text-muted">
        Reply-to email (optional)
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email if you'd like a reply"
        className={`${field} mb-5`}
      />

      <label className="mb-2 block text-[13px] font-bold text-muted">
        Your message <span className="text-[#c05a5a]">*</span>
      </label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={6}
        placeholder="Questions about usage, feature requests, bug reports, and more"
        className={`${field} mb-6 resize-y`}
      />

      <div className="text-center">
        <button
          type="submit"
          disabled={status === "sending" || !canSubmit}
          className="rounded-[10px] bg-app-ink px-10 py-3 text-[15px] font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>
        {status === "error" && (
          <p className="mt-4 text-[13px] text-[#c05a5a]">
            Something went wrong. Please wait a moment and try again.
          </p>
        )}
      </div>
    </form>
  );
}
