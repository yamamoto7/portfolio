import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MarkPadHeader from "@/components/markpad/MarkPadHeader";
import { MARKPAD_APP_NAME, MARKPAD_SHORT_NAME } from "@/lib/markpad";

export const metadata: Metadata = {
  title: MARKPAD_APP_NAME,
  description:
    "A Markdown editor for writing quickly and previewing beautifully in an instant. Paste the Markdown your AI returns and code and tables render cleanly without breaking. Render code, math, and Mermaid diagrams offline, with no interruptive ads.",
};

// TODO: App Store 公開後にURLを設定
const APP_STORE_URL = "https://apps.apple.com/app/id6780535165";

/* ------------------------------------------------------------------ *
 * MarkPad は Markdown エディタ。アプリの清潔なエディタ画面の世界観
 * （白基調・ブルーのアクセント・等幅）をそのまま LP に移植する。
 * ビジュアルは App Store 提出用スクショ（端末そのまま）を使用。
 * ------------------------------------------------------------------ */

function AppStoreBadge() {
  return (
    <a
      href={APP_STORE_URL}
      className="inline-block transition-transform hover:-translate-y-0.5"
    >
      <Image
        src="/contents/common/appstore.png"
        alt="Download on the App Store"
        width={342}
        height={108}
        className="h-12 w-auto"
      />
    </a>
  );
}

function Shot({
  n,
  label,
  priority,
}: {
  n: number;
  label: string;
  priority?: boolean;
}) {
  return (
    <div className="w-[270px] max-w-[68vw] shrink-0">
      <Image
        src={`/contents/markpad/screen${n}.png`}
        alt={label}
        width={1320}
        height={2868}
        priority={priority}
        className="h-auto w-full rounded-[26px] shadow-[0_20px_48px_rgba(31,35,40,0.14)]"
      />
    </div>
  );
}

interface Feature {
  badge: string;
  heading: string;
  desc: string;
  shot: number;
  alt: string;
}

const FEATURES: Feature[] = [
  {
    badge: "PREVIEW",
    heading: "Paste it, and it's instantly beautiful.",
    desc: "Paste the Markdown your AI returns and headings, lists, tables, and diagrams all render cleanly. Switch between editing and preview with one tap, and read comfortably even on your phone.",
    shot: 2,
    alt: "MarkPad preview screen",
  },
  {
    badge: "THEME",
    heading: "Make the look your own.",
    desc: "Choose a preview theme from Standard, GitHub, or Document. Check the actual rendering in the preview and fine-tune it into a look that's easy to read.",
    shot: 3,
    alt: "Preview theme selection screen",
  },
  {
    badge: "RICH",
    heading: "Tables, math, and code alike.",
    desc: "Code blocks come with syntax highlighting plus a copy button. Tables, checklists, quotes, callouts, and block math all display cleanly without breaking.",
    shot: 4,
    alt: "Preview screen for tables, math, and code",
  },
  {
    badge: "DIAGRAM",
    heading: "Even Mermaid diagrams, drawn with ease.",
    desc: "Render Mermaid diagrams such as flowcharts and sequence diagrams right inside the app. Tap to zoom and scroll, so you can review diagrams entirely on your phone.",
    shot: 5,
    alt: "Mermaid diagram preview screen",
  },
];

const SUPPORTED = [
  "Syntax highlighting",
  "Tables",
  "Checklists",
  "Block math",
  "Mermaid diagrams",
  "Callouts",
  "Collapsible sections",
  "==Highlight==",
];

export default function Page() {
  return (
    <div className="font-jp min-h-screen bg-[#FBFBFC] text-[#1F2328]">
      {/* Header */}
      <MarkPadHeader
        right={
          <a
            href={APP_STORE_URL}
            className="rounded-full bg-[#337AE5] px-4 py-2 font-mono text-[13px] font-bold text-white no-underline transition-opacity hover:opacity-90"
          >
            Get the app
          </a>
        }
      />

      {/* Hero */}
      <section className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-16 gap-y-10 px-5 pt-20 pb-24 max-[720px]:pt-12 max-[720px]:pb-16">
        <div className="max-w-[460px] flex-[1_1_360px]">
          <Image
            src="/contents/markpad/icon.png"
            alt={MARKPAD_SHORT_NAME}
            width={1024}
            height={1024}
            className="mb-7 h-16 w-16 rounded-[16px] border border-[#E6E8EB] shadow-[0_6px_18px_rgba(31,35,40,0.14)]"
          />
          <span className="mb-4 inline-block font-mono text-[12px] font-bold tracking-[0.14em] text-[#656D76]">
            MARKDOWN EDITOR
          </span>
          <h1 className="mb-5 text-[40px] leading-[1.4] font-extrabold tracking-[-0.02em] max-[720px]:text-[30px]">
            Write, paste,
            <br />
            instantly beautiful.
          </h1>
          <p className="mb-9 text-[17px] leading-[1.9] text-[#656D76]">
            Write quickly in Markdown and preview beautifully in an instant.
            <br />
            Even the Markdown your AI returns reads cleanly, without breaking.
          </p>
          <AppStoreBadge />
        </div>
        <Shot n={1} label="MarkPad editing screen" priority />
      </section>

      {/* オフライン・広告なし */}
      <section className="border-y border-[#E6E8EB] bg-white">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-12 text-center font-mono text-[13px] text-[#656D76]">
          <span>Great offline</span>
          <span className="text-[#D0D7DE] max-[520px]:hidden">·</span>
          <span>No interruptive ads</span>
          <span className="text-[#D0D7DE] max-[520px]:hidden">·</span>
          <span>Data stored on device</span>
          <span className="text-[#D0D7DE] max-[520px]:hidden">·</span>
          <span>19 languages supported</span>
        </div>
      </section>

      {/* Features */}
      <div className="mx-auto max-w-[960px] px-5">
        {FEATURES.map((f) => (
          <section
            key={f.badge}
            className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 border-[#E6E8EB] py-16 [&:not(:first-child)]:border-t [&:nth-child(even)]:flex-row-reverse max-[720px]:flex-col max-[720px]:gap-8 max-[720px]:py-12 max-[720px]:[&:nth-child(even)]:flex-col"
          >
            <Shot n={f.shot} label={f.alt} />
            <div className="max-w-[400px] flex-[1_1_320px]">
              <span className="mb-3 inline-block font-mono text-[12px] font-bold tracking-[0.12em] text-[#337AE5]">
                {f.badge}
              </span>
              <h2 className="mb-4 text-[26px] leading-[1.45] font-extrabold tracking-[-0.01em] max-[720px]:text-[22px]">
                {f.heading}
              </h2>
              <p className="text-[15px] leading-[1.95] text-[#656D76]">
                {f.desc}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* 対応記法 */}
      <section className="border-t border-[#E6E8EB] bg-white">
        <div className="mx-auto max-w-[960px] px-5 py-16 text-center">
          <p className="mb-9 font-mono text-[13px] tracking-[0.06em] text-[#656D76]">
            Supported syntax.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {SUPPORTED.map((s) => (
              <span
                key={s}
                className="inline-flex items-center rounded-md border border-[#E6E8EB] bg-[#FBFBFC] px-4 py-2 font-mono text-[13px] text-[#1F2328]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#E6E8EB] bg-[#FBFBFC] px-5 py-20 text-center">
        <h2 className="mb-3 text-[26px] font-extrabold tracking-[-0.01em]">
          Make writing feel even better.
        </h2>
        <p className="mx-auto mb-8 max-w-[460px] text-[15px] leading-[1.9] text-[#656D76]">
          No account required. Sharing as text or .md files is supported too.
        </p>
        <div className="flex justify-center">
          <AppStoreBadge />
        </div>
      </section>

      {/* Contact 導線 */}
      <section className="border-t border-[#E6E8EB] bg-white px-5 py-16 text-center">
        <h2 className="mb-3 text-[22px] font-extrabold tracking-[-0.01em]">
          Need help?
        </h2>
        <p className="mx-auto mb-7 max-w-[480px] text-[15px] leading-[1.9] text-[#656D76]">
          For questions about using the app, feature requests, or bug reports,
          <br className="max-[480px]:hidden" />
          feel free to get in touch.
        </p>
        <Link
          href="/contact?category=app&app=markpad"
          className="inline-block rounded-[12px] border border-[#E6E8EB] bg-[#FBFBFC] px-8 py-3 text-[15px] font-bold text-[#337AE5] no-underline transition-transform hover:-translate-y-0.5"
        >
          Contact
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#FBFBFC] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-col items-center gap-3">
          <span className="font-mono text-[15px] font-bold text-[#656D76]">
            {MARKPAD_SHORT_NAME}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href="/contact?category=app&app=markpad"
              className="text-[13px] text-[#656D76] no-underline transition-colors hover:text-[#337AE5]"
            >
              Contact
            </Link>
            <Link
              href="/markpad/privacy-policy"
              className="text-[13px] text-[#656D76] no-underline transition-colors hover:text-[#337AE5]"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="text-[13px] text-[#656D76]">© 2026 ychof</p>
        </div>
      </footer>
    </div>
  );
}
