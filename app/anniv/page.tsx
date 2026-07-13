import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnnivHeader from "@/components/anniv/AnnivHeader";
import { ANNIV_APP_NAME, ANNIV_SHORT_NAME } from "@/lib/anniv";

export const metadata: Metadata = {
  title: ANNIV_APP_NAME,
  description:
    "A simple birthday and gift keeper that lets you manage the birthdays and anniversaries of the people who matter, along with a record of your gifts. Get notified as dates approach. No account required — your data is stored on your device.",
};

// TODO: App Store 公開後にURLを設定
const APP_STORE_URL = "https://apps.apple.com/app/id6780535630";

/* ------------------------------------------------------------------ *
 * Anniv は「大切な人の記録帳」。アイコンと App Store スクショの暖色
 * （コーラルピンク）の世界観をそのまま LP に移植する。
 * ビジュアルは App Store 提出用スクショ（見出し付き）をそのまま使用。
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
        src={`/contents/anniv/screen${n}.png`}
        alt={label}
        width={1320}
        height={2868}
        priority={priority}
        className="h-auto w-full rounded-[26px] shadow-[0_20px_48px_rgba(61,43,40,0.16)]"
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
    badge: "ANNIVERSARY",
    heading: "Birthdays and anniversaries alike.",
    desc: "Register meaningful anniversaries — like your wedding day or the day you started dating — right alongside birthdays. The app automatically counts down the days and lets you know as they approach.",
    shot: 2,
    alt: "Person details and anniversary management screen",
  },
  {
    badge: "REMINDER",
    heading: "Never miss the day — or the days before.",
    desc: "Get a gentle local notification on the day itself or a few days ahead. You can adjust the timing per tag, so you can prepare to celebrate in a way that suits each relationship.",
    shot: 3,
    alt: "Notification settings screen",
  },
  {
    badge: "GIFTS",
    heading: "Track what you've given and what they want.",
    desc: "Record who you gave a gift to, when, and for what occasion. You can also save things they said they wanted, complete with reference links, so you'll never give duplicate gifts or forget to return a favor.",
    shot: 4,
    alt: "Gifts and wishlist screen",
  },
  {
    badge: "MEMO",
    heading: "Note their tastes for next year's move.",
    desc: "Keep the things they like and snippets of conversation as notes about each person, in chronological order. Hints for choosing your next gift build up naturally over time.",
    shot: 5,
    alt: "Notes and records screen",
  },
  {
    badge: "CALENDAR & BACKUP",
    heading: "See it all — and rest easy.",
    desc: "View the year's important dates at a glance on the calendar. Your data can be backed up and carried over seamlessly when you switch devices.",
    shot: 6,
    alt: "Calendar view and backup",
  },
];

export default function Page() {
  return (
    <div className="font-jp min-h-screen bg-[#FFF8F5] text-[#3D2B28]">
      {/* Header */}
      <AnnivHeader
        right={
          <a
            href={APP_STORE_URL}
            className="rounded-full bg-[#E8736B] px-4 py-2 text-[13px] font-bold text-white no-underline transition-opacity hover:opacity-90"
          >
            Get
          </a>
        }
      />

      {/* Hero */}
      <section className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-16 gap-y-10 px-5 pt-20 pb-24 max-[720px]:pt-12 max-[720px]:pb-16">
        <div className="max-w-[440px] flex-[1_1_360px]">
          <Image
            src="/contents/anniv/icon.png"
            alt={ANNIV_SHORT_NAME}
            width={1024}
            height={1024}
            className="mb-7 h-16 w-16 rounded-[16px] shadow-[0_6px_18px_rgba(61,43,40,0.16)]"
          />
          <h1 className="mb-5 text-[40px] leading-[1.4] font-extrabold tracking-[-0.01em] max-[720px]:text-[30px]">
            Never forget the birthdays
            <br />
            of those who matter.
          </h1>
          <p className="mb-9 text-[17px] leading-[1.9] text-[#9C857F]">
            Birthdays, anniversaries, and gift records — all in one place.
            <br />
            A birthday and gift keeper that notifies you as the day draws near.
          </p>
          <AppStoreBadge />
        </div>
        <Shot n={1} label="Birthday list screen" priority />
      </section>

      {/* コンセプト */}
      <section className="border-y border-[#F2E0DA] bg-white">
        <div className="mx-auto max-w-[760px] px-5 py-16 text-center">
          <p className="text-[19px] leading-[2] font-medium text-[#5C4642]">
            &quot;I completely forgot,&quot; &quot;I can&apos;t remember what I gave them last time,&quot;
            <br className="max-[560px]:hidden" />
            &quot;They said they wanted that, but I forgot to note it down.&quot;
            <br />
            Solve it all, in one place. No account required.
          </p>
        </div>
      </section>

      {/* Features */}
      <div className="mx-auto max-w-[960px] px-5">
        {FEATURES.map((f) => (
          <section
            key={f.badge}
            className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 border-[#F2E0DA] py-16 [&:not(:first-child)]:border-t [&:nth-child(even)]:flex-row-reverse max-[720px]:flex-col max-[720px]:gap-8 max-[720px]:py-12 max-[720px]:[&:nth-child(even)]:flex-col"
          >
            <Shot n={f.shot} label={f.alt} />
            <div className="max-w-[400px] flex-[1_1_320px]">
              <span className="mb-3 inline-block font-mono text-[12px] font-bold tracking-[0.12em] text-[#E8736B]">
                {f.badge}
              </span>
              <h2 className="mb-4 text-[26px] leading-[1.45] font-extrabold tracking-[-0.01em] max-[720px]:text-[22px]">
                {f.heading}
              </h2>
              <p className="text-[15px] leading-[1.95] text-[#9C857F]">
                {f.desc}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="border-t border-[#F2E0DA] bg-white px-5 py-20 text-center">
        <h2 className="mb-3 text-[26px] font-extrabold tracking-[-0.01em]">
          Make the joy of giving even greater.
        </h2>
        <p className="mx-auto mb-8 max-w-[460px] text-[15px] leading-[1.9] text-[#9C857F]">
          No account needed. Your data is stored only on your own device.
        </p>
        <div className="flex justify-center">
          <AppStoreBadge />
        </div>
      </section>

      {/* Contact 導線 */}
      <section className="border-t border-[#F2E0DA] bg-[#FFF8F5] px-5 py-16 text-center">
        <h2 className="mb-3 text-[22px] font-extrabold tracking-[-0.01em]">
          Need help?
        </h2>
        <p className="mx-auto mb-7 max-w-[480px] text-[15px] leading-[1.9] text-[#9C857F]">
          Questions about how to use the app, feature requests, bug reports —
          <br className="max-[480px]:hidden" />
          feel free to get in touch.
        </p>
        <Link
          href="/contact?category=app&app=anniv"
          className="inline-block rounded-[12px] border border-[#F2E0DA] bg-white px-8 py-3 text-[15px] font-bold text-[#E8736B] no-underline transition-transform hover:-translate-y-0.5"
        >
          Contact us
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFF8F5] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-col items-center gap-3">
          <span className="text-[15px] font-bold text-[#9C857F]">
            {ANNIV_SHORT_NAME}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href="/contact?category=app&app=anniv"
              className="text-[13px] text-[#9C857F] no-underline transition-colors hover:text-[#E8736B]"
            >
              Contact
            </Link>
            <Link
              href="/anniv/privacy-policy"
              className="text-[13px] text-[#9C857F] no-underline transition-colors hover:text-[#E8736B]"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="text-[13px] text-[#9C857F]">© 2026 ychof</p>
        </div>
      </footer>
    </div>
  );
}
