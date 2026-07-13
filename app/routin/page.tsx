import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RoutinHeader from "@/components/routin/RoutinHeader";
import { ROUTIN_APP_NAME } from "@/lib/routin";

export const metadata: Metadata = {
  title: ROUTIN_APP_NAME,
  description:
    "You don't have to try hard. A quiet routine app you can keep up with—no streaks, no scores, no notifications.",
};

// TODO: App Store 公開後にURLを設定
const APP_STORE_URL = "https://apps.apple.com/app/id6775340906";

/* ------------------------------------------------------------------ *
 * Routin はアプリの世界観（静けさ・余白・sage green）を LP に移植する。
 * カラートークンはアプリの Theme から流用（ライト単一モード）。
 * ビジュアルは App Store 提出用スクショ（上部見出しをクロップ済み）を使用。
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
  className,
}: {
  n: number;
  label: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`w-[270px] max-w-[68vw] shrink-0 ${className ?? ""}`}>
      <Image
        src={`/contents/routin/screen${n}.png`}
        alt={label}
        width={1242}
        height={2228}
        priority={priority}
        className="h-auto w-full rounded-[26px] shadow-[0_20px_48px_rgba(40,40,38,0.16)]"
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
    badge: "DAY TYPE",
    heading: "Shifts to fit the day.",
    desc: "Working from home, at the office, or a day off—your routine switches with each mode of life, so every day falls into place. You can also override just today on a whim.",
    shot: 4,
    alt: "Day type switching screen",
  },
  {
    badge: "REFLECTION",
    heading: "Gently see only what you did.",
    desc: "No streaks, no completion rates. The days you kept going simply light up on the calendar—a record that never blames you for the days you missed.",
    shot: 3,
    alt: "Reflection calendar screen",
  },
  {
    badge: "TEMPLATES",
    heading: "Start from 50+ ready-made drafts.",
    desc: "A quiet morning, a calming night, a day at home. Use a template as your starting point and ease it toward your own rhythm.",
    shot: 2,
    alt: "Template list screen",
  },
  {
    badge: "WIDGET",
    heading: "Today at a glance, right from your home screen.",
    desc: "With the widget, today's routine blends into daily life. Without even opening the app, what's ahead gently comes into view.",
    shot: 5,
    alt: "Home screen widget",
  },
];

const NO_PRESSURE = [
  { k: "Streaks", v: "None" },
  { k: "Scores & levels", v: "None" },
  { k: "Notification nudges", v: "None" },
];

export default function Page() {
  return (
    <div className="font-jp min-h-screen bg-[#F7F5F0] text-[#282826]">
      {/* Header */}
      <RoutinHeader
        right={
          <a
            href={APP_STORE_URL}
            className="rounded-full bg-[#6A826D] px-4 py-2 text-[13px] font-bold text-white no-underline transition-opacity hover:opacity-90"
          >
            Get the app
          </a>
        }
      />

      {/* Hero */}
      <section className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-16 gap-y-10 px-5 pt-20 pb-24 max-[720px]:pt-12 max-[720px]:pb-16">
        <div className="max-w-[440px] flex-[1_1_360px]">
          <Image
            src="/contents/routin/icon.png"
            alt="Routin"
            width={1024}
            height={1024}
            className="mb-7 h-16 w-16 rounded-[16px] shadow-[0_6px_18px_rgba(40,40,38,0.16)]"
          />
          <h1 className="mb-5 text-[40px] leading-[1.4] font-extrabold tracking-[-0.01em] max-[720px]:text-[30px]">
            You don&apos;t have
            <br />
            to try hard.
          </h1>
          <p className="mb-9 text-[17px] leading-[1.9] text-[#85827D]">
            No streaks, no scores, no notifications.
            <br />
            A routine app you can quietly keep up with.
          </p>
          <AppStoreBadge />
        </div>
        <Shot n={1} label="Today's routine screen" priority />
      </section>

      {/* 引き算の価値 */}
      <section className="border-y border-[#E6E4DB] bg-[#FFFBFA]">
        <div className="mx-auto max-w-[960px] px-5 py-16 text-center">
          <p className="mb-10 text-[15px] tracking-[0.04em] text-[#85827D]">
            What we stripped away so you can keep going.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {NO_PRESSURE.map((item) => (
              <div
                key={item.k}
                className="min-w-[200px] flex-[1_1_220px] rounded-[16px] border border-[#E6E4DB] bg-[#F7F5F0] px-6 py-7"
              >
                <p className="mb-1.5 text-[15px] text-[#85827D]">{item.k}</p>
                <p className="text-[26px] font-extrabold text-[#6A826D]">
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <div className="mx-auto max-w-[960px] px-5">
        {FEATURES.map((f) => (
          <section
            key={f.badge}
            className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 border-[#E6E4DB] py-16 [&:not(:first-child)]:border-t [&:nth-child(even)]:flex-row-reverse max-[720px]:flex-col max-[720px]:gap-8 max-[720px]:py-12 max-[720px]:[&:nth-child(even)]:flex-col"
          >
            <Shot n={f.shot} label={f.alt} />
            <div className="max-w-[400px] flex-[1_1_320px]">
              <span className="mb-3 inline-block text-[12px] font-bold tracking-[0.12em] text-[#6A826D]">
                {f.badge}
              </span>
              <h2 className="mb-4 text-[26px] leading-[1.45] font-extrabold tracking-[-0.01em] max-[720px]:text-[22px]">
                {f.heading}
              </h2>
              <p className="text-[15px] leading-[1.95] text-[#85827D]">
                {f.desc}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="border-t border-[#E6E4DB] bg-[#FFFBFA] px-5 py-20 text-center">
        <h2 className="mb-3 text-[26px] font-extrabold tracking-[-0.01em]">
          Start today, quietly.
        </h2>
        <p className="mx-auto mb-8 max-w-[440px] text-[15px] leading-[1.9] text-[#85827D]">
          No account needed. Your data stays quietly on your device alone.
        </p>
        <div className="flex justify-center">
          <AppStoreBadge />
        </div>
      </section>

      {/* Contact 導線 */}
      <section className="border-t border-[#E6E4DB] bg-[#F7F5F0] px-5 py-16 text-center">
        <h2 className="mb-3 text-[22px] font-extrabold tracking-[-0.01em]">
          Need help?
        </h2>
        <p className="mx-auto mb-7 max-w-[480px] text-[15px] leading-[1.9] text-[#85827D]">
          Questions about how to use the app, requests, or bug reports—
          <br className="max-[480px]:hidden" />
          feel free to reach out anytime.
        </p>
        <Link
          href="/contact?category=app&app=routin"
          className="inline-block rounded-[12px] border border-[#E6E4DB] bg-[#FFFBFA] px-8 py-3 text-[15px] font-bold text-[#6A826D] no-underline transition-transform hover:-translate-y-0.5"
        >
          Contact us
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#F7F5F0] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-col items-center gap-3">
          <span className="font-dm text-[15px] font-bold text-[#85827D]">
            {ROUTIN_APP_NAME}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href="/contact?category=app&app=routin"
              className="text-[13px] text-[#85827D] no-underline transition-colors hover:text-[#6A826D]"
            >
              Contact
            </Link>
            <Link
              href="/routin/privacy-policy"
              className="text-[13px] text-[#85827D] no-underline transition-colors hover:text-[#6A826D]"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="text-[13px] text-[#85827D]">© {2026} ychof</p>
        </div>
      </footer>
    </div>
  );
}
