import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeaderModifyHeader from "@/components/header-modify/HeaderModifyHeader";
import PopupMockup from "@/components/header-modify/PopupMockup";
import {
  HEADER_MODIFY_APP_NAME,
  HEADER_MODIFY_SHORT_NAME,
  HEADER_MODIFY_STORE_URL,
} from "@/lib/header-modify";

export const metadata: Metadata = {
  title: HEADER_MODIFY_APP_NAME,
  description:
    "A lightweight, ModHeader-style Chrome extension that adds custom HTTP request headers to any site. Profiles, URL filters, and presets. Everything runs locally — no data is collected.",
};

/* ------------------------------------------------------------------ *
 * Header Modify is a developer-focused Chrome extension. The LP carries
 * the extension's own look (dark, monospace, blue accent). Hero and
 * feature visuals reuse PopupMockup, a faithful recreation of the real
 * popup UI, instead of screenshots.
 * ------------------------------------------------------------------ */

function StoreButton({ full }: { full?: boolean }) {
  return (
    <a
      href={HEADER_MODIFY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#4F8CFF] px-6 py-3 font-mono text-[14px] font-bold text-white no-underline transition-transform hover:-translate-y-0.5 ${
        full ? "w-full max-w-[320px]" : ""
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="4" fill="#fff" />
        <path
          d="M12 2a10 10 0 0 1 8.66 5H12a5 5 0 0 0-4.9 6.02L3.34 6.6A10 10 0 0 1 12 2Z"
          fill="#fff"
          opacity="0.9"
        />
        <path
          d="M21 8.5a10 10 0 0 1-8.16 13.4l3.9-6.75A5 5 0 0 0 16.5 8.5H21Z"
          fill="#fff"
          opacity="0.75"
        />
        <path
          d="M11.5 22A10 10 0 0 1 2.6 8.2l3.9 6.76A5 5 0 0 0 11.16 22H11.5Z"
          fill="#fff"
          opacity="0.6"
        />
      </svg>
      Add to Chrome
    </a>
  );
}

interface Feature {
  badge: string;
  heading: string;
  desc: string;
}

const FEATURES: Feature[] = [
  {
    badge: "PROFILES",
    heading: "A profile for every job.",
    desc: "Group your header sets into multiple profiles. Only the selected profile is active — or pin one with “Always on (📌)” to apply it everywhere, no matter what’s selected.",
  },
  {
    badge: "URL FILTER",
    heading: "Only where you want it.",
    desc: "Scope rules with a URL filter. Substring matching just works, and wildcards like `https://*.example.com/*` or leading-anchor `|` follow the declarativeNetRequest syntax exactly.",
  },
  {
    badge: "TOGGLE",
    heading: "Flip a single header on or off.",
    desc: "Every header has its own toggle. Compare on vs. off right where you are, without deleting the value you’re testing.",
  },
  {
    badge: "PRESETS",
    heading: "Common headers, one click away.",
    desc: "Insert presets like Authorization, User-Agent, Referer, and Cache-Control with a single click — no retyping header names every time.",
  },
];

const MORE = [
  { k: "Export / Import", v: "Save and load your settings as JSON" },
  { k: "Auto-save & apply", v: "Instant updates, active count on the badge" },
  { k: "52 languages", v: "Follows your browser’s display language" },
  { k: "Manifest V3", v: "Built on declarativeNetRequest dynamic rules" },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[#12151b] text-[#E6EAF2]">
      {/* Header */}
      <HeaderModifyHeader
        right={
          <a
            href={HEADER_MODIFY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#4F8CFF] px-4 py-2 font-mono text-[13px] font-bold text-white no-underline transition-opacity hover:opacity-90"
          >
            Get it
          </a>
        }
      />

      {/* Hero */}
      <section className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-16 gap-y-12 px-5 pt-20 pb-24 max-[720px]:pt-12 max-[720px]:pb-16">
        <div className="max-w-[460px] flex-[1_1_360px]">
          <Image
            src="/contents/header-modify/icon.png"
            alt="Header Modify"
            width={128}
            height={128}
            className="mb-7 h-16 w-16 rounded-[16px] border border-[#2A3240]"
          />
          <span className="mb-4 inline-block font-mono text-[12px] font-bold tracking-[0.14em] text-[#7C89A0]">
            CHROME EXTENSION
          </span>
          <h1 className="mb-5 text-[40px] leading-[1.35] font-extrabold tracking-[-0.02em] max-[720px]:text-[30px]">
            Request headers,
            <br />
            exactly your way.
          </h1>
          <p className="mb-9 text-[17px] leading-[1.8] text-[#9AA4B6]">
            Add custom HTTP request headers to any site.
            <br />
            ModHeader-style — but lightweight.
          </p>
          <StoreButton />
          <p className="mt-6 font-mono text-[11px] leading-[1.7] text-[#5F6B7E]">
            Manifest V3 · Works on Chrome 88 and later.
          </p>
        </div>
        <PopupMockup />
      </section>

      {/* Request header before → after */}
      <section className="border-y border-[#232833] bg-[#0E1116]">
        <div className="mx-auto max-w-[960px] px-5 py-16">
          <p className="mb-9 text-center font-mono text-[13px] tracking-[0.06em] text-[#9AA4B6]">
            Your headers ride along with every outgoing request.
          </p>
          <div className="mx-auto max-w-[620px] overflow-x-auto rounded-[12px] border border-[#232833] bg-[#12151b] p-5 font-mono text-[13px] leading-[2] text-[#9AA4B6]">
            <div>
              <span className="text-[#5F6B7E]">GET</span> /api/v1/me{" "}
              <span className="text-[#5F6B7E]">HTTP/2</span>
            </div>
            <div>Host: api.example.com</div>
            <div>Accept: application/json</div>
            <div className="rounded bg-[#16233b] px-2 text-[#7FB0FF]">
              + Authorization: Bearer eyJhbG…
            </div>
            <div className="rounded bg-[#16233b] px-2 text-[#7FB0FF]">
              + X-Debug: 1
            </div>
          </div>
          <p className="mt-6 text-center text-[13px] text-[#7C89A0]">
            It all happens on your device. The browser’s built-in{" "}
            <span className="font-mono text-[#7FB0FF]">declarativeNetRequest</span>{" "}
            engine does the work.
          </p>
        </div>
      </section>

      {/* Features */}
      <div className="mx-auto max-w-[960px] px-5">
        {FEATURES.map((f) => (
          <section
            key={f.badge}
            className="border-[#232833] py-14 [&:not(:first-child)]:border-t max-[720px]:py-12"
          >
            <span className="mb-3 inline-block font-mono text-[12px] font-bold tracking-[0.12em] text-[#4F8CFF]">
              {f.badge}
            </span>
            <h2 className="mb-4 max-w-[560px] text-[26px] leading-[1.35] font-extrabold tracking-[-0.01em] max-[720px]:text-[22px]">
              {f.heading}
            </h2>
            <p className="max-w-[620px] text-[15px] leading-[1.8] text-[#9AA4B6]">
              {f.desc}
            </p>
          </section>
        ))}
      </div>

      {/* And more */}
      <section className="border-y border-[#232833] bg-[#0E1116]">
        <div className="mx-auto max-w-[960px] px-5 py-16 text-center">
          <p className="mb-10 font-mono text-[13px] tracking-[0.06em] text-[#9AA4B6]">
            And a little more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {MORE.map((item) => (
              <div
                key={item.k}
                className="min-w-[220px] flex-[1_1_240px] rounded-[12px] border border-[#232833] bg-[#12151b] px-6 py-7 text-left"
              >
                <p className="mb-1.5 text-[16px] font-bold text-[#E6EAF2]">
                  {item.k}
                </p>
                <p className="text-[13px] leading-[1.7] text-[#9AA4B6]">
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy (runs locally) */}
      <section className="border-b border-[#232833] bg-[#12151b] px-5 py-10">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center font-mono text-[13px] text-[#9AA4B6]">
          <span>Settings stored locally</span>
          <span className="text-[#3A4252] max-[520px]:hidden">·</span>
          <span>No data collected or sent</span>
          <span className="text-[#3A4252] max-[520px]:hidden">·</span>
          <span>No tracking</span>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#232833] bg-[#0E1116] px-5 py-20 text-center">
        <h2 className="mb-3 text-[26px] font-extrabold tracking-[-0.01em]">
          Header editing, made effortless.
        </h2>
        <p className="mx-auto mb-8 max-w-[460px] text-[15px] leading-[1.8] text-[#9AA4B6]">
          Install it, click the toolbar icon, and you’re ready to go.
        </p>
        <div className="flex justify-center">
          <StoreButton />
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-[#232833] bg-[#12151b] px-5 py-16 text-center">
        <h2 className="mb-3 text-[22px] font-extrabold tracking-[-0.01em]">
          Need a hand?
        </h2>
        <p className="mx-auto mb-7 max-w-[480px] text-[15px] leading-[1.8] text-[#9AA4B6]">
          Questions, feature requests, bug reports — feel free to reach out.
        </p>
        <Link
          href="/contact?category=app&app=header-modify"
          className="inline-block rounded-[12px] border border-[#232833] bg-[#0E1116] px-8 py-3 text-[15px] font-bold text-[#4F8CFF] no-underline transition-transform hover:-translate-y-0.5"
        >
          Contact
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#12151b] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-col items-center gap-3">
          <span className="font-mono text-[15px] font-bold text-[#9AA4B6]">
            {HEADER_MODIFY_SHORT_NAME}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href="/contact?category=app&app=header-modify"
              className="text-[13px] text-[#9AA4B6] no-underline transition-colors hover:text-[#E6EAF2]"
            >
              Contact
            </Link>
            <Link
              href="/header-modify/privacy-policy"
              className="text-[13px] text-[#9AA4B6] no-underline transition-colors hover:text-[#E6EAF2]"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="text-[13px] text-[#9AA4B6]">© 2026 ychof</p>
        </div>
      </footer>
    </div>
  );
}
