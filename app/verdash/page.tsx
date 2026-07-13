import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import VerdashHeader from "@/components/verdash/VerdashHeader";
import { VERDASH_APP_NAME, VERDASH_SHORT_NAME } from "@/lib/verdash";

export const metadata: Metadata = {
  title: VERDASH_APP_NAME,
  description:
    "An unofficial Vercel dashboard client for iPhone. From monitoring deployments to rollbacks, Promote, build logs, and environment variables — all one-handed, on the go.",
};

// TODO: App Store 公開後にURLを設定
const APP_STORE_URL = "https://apps.apple.com/app/id6777292026";

/* ------------------------------------------------------------------ *
 * Verdash は Vercel クライアント。LP もアプリの世界観（黒・モノクロ・
 * ブルーのアクセント・デプロイ状態のバッジ）をそのまま移植する。
 * ビジュアルは App Store 提出用スクショ（上部見出しをクロップ済み）を使用。
 * ※ Vercel Inc. の公式アプリではない旨を各所に明記する。
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
  h = 2398,
  priority,
}: {
  n: number;
  label: string;
  /** スクショの実ピクセル高（幅は一律 1320）。アスペクト比保持に使う。 */
  h?: number;
  priority?: boolean;
}) {
  return (
    <div className="w-[270px] max-w-[68vw] shrink-0">
      <Image
        src={`/contents/verdash/screen${n}.png`}
        alt={label}
        width={1320}
        height={h}
        priority={priority}
        className="h-auto w-full rounded-[26px] border border-[#232323] shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
      />
    </div>
  );
}

/** デプロイの状態バッジ（アプリ内のバッジ表現を踏襲）。 */
const STATUSES: { label: string; dot: string }[] = [
  { label: "Ready", dot: "#34D399" },
  { label: "Building", dot: "#FBBF24" },
  { label: "Queued", dot: "#8F8F8F" },
  { label: "Error", dot: "#F87171" },
  { label: "Canceled", dot: "#6B6B6B" },
];

interface Feature {
  badge: string;
  heading: string;
  desc: string;
  shot: number;
  alt: string;
}

const FEATURES: Feature[] = [
  {
    badge: "ACTIVITY",
    heading: "One timeline, across every project.",
    desc: "See your deployments in chronological order, regardless of project. Branch, commit message, and relative time sit side by side, with a Live badge showing what's currently running at a glance.",
    shot: 2,
    alt: "Activity timeline screen",
  },
  {
    badge: "ROLLBACK",
    heading: "Critical actions, right in your hand.",
    desc: "Promote to production, roll back instantly, Redeploy, or Cancel — all with a single tap. A banner clearly indicates when a rollback is active, and clearing it is just as fast.",
    shot: 3,
    alt: "Rollback confirmation and actions screen",
  },
  {
    badge: "BUILD LOGS",
    heading: "Pull out just the error lines.",
    desc: "Scroll through full logs in a monospace font. Filter to show only error lines with red highlighting, and copy with a single tap. Pull down to refetch while a build is in progress.",
    shot: 4,
    alt: "Build log viewer screen",
  },
  {
    badge: "ENV VARS",
    heading: "Manage environment variables on the go.",
    desc: "Sensitive values are masked by default and revealed with the eye icon. Target environment and type are shown as badges, with support for adding, editing, deleting, filtering, and sorting.",
    shot: 5,
    alt: "Environment variables management screen",
  },
];

const MORE = [
  { k: "Domains", v: "Verification status, DNS, and redirects" },
  { k: "Firewall", v: "Managed and custom rules" },
  { k: "Edge Config", v: "Browse the list and key-value pairs" },
  { k: "Teams & Accounts", v: "Switch between personal and team scopes" },
];

export default function Page() {
  return (
    <div className="font-jp min-h-screen bg-black text-[#EDEDED]">
      {/* Header */}
      <VerdashHeader
        right={
          <a
            href={APP_STORE_URL}
            className="rounded-full bg-[#337AE6] px-4 py-2 font-mono text-[13px] font-bold text-white no-underline transition-opacity hover:opacity-90"
          >
            Get
          </a>
        }
      />

      {/* Hero */}
      <section className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-16 gap-y-10 px-5 pt-20 pb-24 max-[720px]:pt-12 max-[720px]:pb-16">
        <div className="max-w-[460px] flex-[1_1_360px]">
          <Image
            src="/contents/verdash/icon.png"
            alt="Verdash"
            width={1024}
            height={1024}
            className="mb-7 h-16 w-16 rounded-[16px] border border-[#2A2A2A]"
          />
          <span className="mb-4 inline-block font-mono text-[12px] font-bold tracking-[0.14em] text-[#8F8F8F]">
            UNOFFICIAL VERCEL CLIENT
          </span>
          <h1 className="mb-5 text-[40px] leading-[1.4] font-extrabold tracking-[-0.02em] max-[720px]:text-[30px]">
            Manage deployments,
            <br />
            from your iPhone.
          </h1>
          <p className="mb-9 text-[17px] leading-[1.9] text-[#8F8F8F]">
            From monitoring builds to rollbacks and Promote.
            <br />
            Control production deployments one-handed, wherever you are.
          </p>
          <AppStoreBadge />
          <p className="mt-6 font-mono text-[11px] leading-[1.7] text-[#5F5F5F]">
            * Not an official app of Vercel Inc.
          </p>
        </div>
        <Shot n={1} label="Project list screen" h={2293} priority />
      </section>

      {/* デプロイ状態バッジ */}
      <section className="border-y border-[#232323] bg-[#0A0A0A]">
        <div className="mx-auto max-w-[960px] px-5 py-16 text-center">
          <p className="mb-9 font-mono text-[13px] tracking-[0.06em] text-[#8F8F8F]">
            Deployment status, at a glance.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {STATUSES.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-2 rounded-md border border-[#232323] bg-black px-4 py-2 font-mono text-[13px] text-[#EDEDED]"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: s.dot }}
                />
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <div className="mx-auto max-w-[960px] px-5">
        {FEATURES.map((f) => (
          <section
            key={f.badge}
            className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 border-[#232323] py-16 [&:not(:first-child)]:border-t [&:nth-child(even)]:flex-row-reverse max-[720px]:flex-col max-[720px]:gap-8 max-[720px]:py-12 max-[720px]:[&:nth-child(even)]:flex-col"
          >
            <Shot n={f.shot} label={f.alt} />
            <div className="max-w-[400px] flex-[1_1_320px]">
              <span className="mb-3 inline-block font-mono text-[12px] font-bold tracking-[0.12em] text-[#337AE6]">
                {f.badge}
              </span>
              <h2 className="mb-4 text-[26px] leading-[1.45] font-extrabold tracking-[-0.01em] max-[720px]:text-[22px]">
                {f.heading}
              </h2>
              <p className="text-[15px] leading-[1.95] text-[#8F8F8F]">
                {f.desc}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* さらに手元に */}
      <section className="border-y border-[#232323] bg-[#0A0A0A]">
        <div className="mx-auto max-w-[960px] px-5 py-16 text-center">
          <p className="mb-10 font-mono text-[13px] tracking-[0.06em] text-[#8F8F8F]">
            And there&apos;s even more at your fingertips.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {MORE.map((item) => (
              <div
                key={item.k}
                className="min-w-[220px] flex-[1_1_240px] rounded-[12px] border border-[#232323] bg-black px-6 py-7 text-left"
              >
                <p className="mb-1.5 text-[16px] font-bold text-[#EDEDED]">
                  {item.k}
                </p>
                <p className="text-[13px] leading-[1.7] text-[#8F8F8F]">
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* セキュリティ（PAT / Keychain / HTTPS） */}
      <section className="border-b border-[#232323] bg-black px-5 py-10">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center font-mono text-[13px] text-[#8F8F8F]">
          <span>Sign in with a Personal Access Token</span>
          <span className="text-[#3A3A3A] max-[520px]:hidden">·</span>
          <span>Tokens stored in the iOS Keychain</span>
          <span className="text-[#3A3A3A] max-[520px]:hidden">·</span>
          <span>All traffic over HTTPS</span>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#232323] bg-[#0A0A0A] px-5 py-20 text-center">
        <h2 className="mb-3 text-[26px] font-extrabold tracking-[-0.01em]">
          Production, always in your hand.
        </h2>
        <p className="mx-auto mb-8 max-w-[460px] text-[15px] leading-[1.9] text-[#8F8F8F]">
          A Vercel account and a Personal Access Token are required to use the app.
        </p>
        <div className="flex justify-center">
          <AppStoreBadge />
        </div>
      </section>

      {/* Contact 導線 */}
      <section className="border-t border-[#232323] bg-black px-5 py-16 text-center">
        <h2 className="mb-3 text-[22px] font-extrabold tracking-[-0.01em]">
          Need help?
        </h2>
        <p className="mx-auto mb-7 max-w-[480px] text-[15px] leading-[1.9] text-[#8F8F8F]">
          Questions about how to use the app, feature requests, bug reports —
          <br className="max-[480px]:hidden" />
          feel free to get in touch.
        </p>
        <Link
          href="/contact?category=app&app=verdash"
          className="inline-block rounded-[12px] border border-[#232323] bg-[#0A0A0A] px-8 py-3 text-[15px] font-bold text-[#337AE6] no-underline transition-transform hover:-translate-y-0.5"
        >
          Contact us
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-black px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-col items-center gap-3">
          <span className="font-mono text-[15px] font-bold text-[#8F8F8F]">
            {VERDASH_SHORT_NAME}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href="/contact?category=app&app=verdash"
              className="text-[13px] text-[#8F8F8F] no-underline transition-colors hover:text-[#EDEDED]"
            >
              Contact
            </Link>
            <Link
              href="/verdash/privacy-policy"
              className="text-[13px] text-[#8F8F8F] no-underline transition-colors hover:text-[#EDEDED]"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="mx-auto max-w-[520px] font-mono text-[11px] leading-[1.7] text-[#5F5F5F]">
            This app is not an official app provided by Vercel Inc. Vercel is a
            trademark of Vercel Inc.
          </p>
          <p className="text-[13px] text-[#8F8F8F]">© 2026 ychof</p>
        </div>
      </footer>
    </div>
  );
}
