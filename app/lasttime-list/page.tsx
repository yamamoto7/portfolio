import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LasttimeHeader from "@/components/lasttime/LasttimeHeader";
import { LASTTIME_APP_NAME } from "@/lib/lasttime";

export const metadata: Metadata = {
  title: LASTTIME_APP_NAME,
  description:
    "When did you last do it? Calling your parents, changing your toothbrush, visiting home, seeing a movie. A gentle log for recording the last time you did the things that matter but are easy to forget, so you never lose track.",
};

// TODO: App Store 公開後にURLを設定
const APP_STORE_URL = "https://apps.apple.com/app/id6777447199";

/* ------------------------------------------------------------------ *
 * 「最後はいつ？」はアプリの世界観（あたたかいクリーム・森の緑・思い出）を
 * LP に移植する。カラートークンはアプリのテーマとマーケ見出しから流用。
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
        src={`/contents/lasttime/screen${n}.png`}
        alt={label}
        width={1320}
        height={h}
        priority={priority}
        className="h-auto w-full rounded-[26px] shadow-[0_20px_48px_rgba(42,42,40,0.16)]"
      />
    </div>
  );
}

/** 「大切だけど忘れがち」の具体例チップ。 */
const EXAMPLES = [
  "Calling your parents ☎️",
  "Changing your toothbrush 🪥",
  "Visiting home 🏠",
  "Watching a movie 🎬",
  "Health checkup 🩺",
  "Watering the plants 🪴",
  "Deep cleaning 🧹",
  "Meeting a friend ☕️",
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
    badge: "RHYTHM",
    heading: "Just tap “Done.”",
    desc: "As your records add up, the app automatically works out your rhythm (your average interval) and gently signals “time soon” or “overdue” with soft, calming colors.",
    shot: 4,
    alt: "Detail screen showing days elapsed and target interval",
  },
  {
    badge: "MEMORY",
    heading: "A photo and a few words turn it into a memory.",
    desc: "Add a photo and a note to any record. What was just a log becomes a small memory you'll want to look back on later.",
    shot: 2,
    alt: "Timeline with photos and notes",
  },
  {
    badge: "LOOK BACK",
    heading: "Stumble upon “on this day, years ago.”",
    desc: "Every record is arranged in chronological order, brought to life with touches like “on this day, years ago,” “first time,” and “long time no see” for those unexpected moments of looking back.",
    shot: 3,
    alt: "Timeline revisiting “on this day, years ago”",
  },
  {
    badge: "CALENDAR",
    heading: "See your days at a glance.",
    desc: "Switch to the calendar view and see what you did and when, month by month, at a glance. The footprints of everything you've kept up quietly come into view.",
    shot: 5,
    alt: "Calendar screen laying out the days you did things",
  },
];

const SAFE = [
  { k: "Storage", v: "Your device and iCloud only" },
  { k: "Backup", v: "iCloud sync + export" },
  { k: "Privacy", v: "Face ID lock" },
];

export default function Page() {
  return (
    <div className="font-jp min-h-screen bg-[#F6F3EC] text-[#2A2A28]">
      {/* Header */}
      <LasttimeHeader
        right={
          <a
            href={APP_STORE_URL}
            className="rounded-full bg-[#2E6A50] px-4 py-2 text-[13px] font-bold text-white no-underline transition-opacity hover:opacity-90"
          >
            Get
          </a>
        }
      />

      {/* Hero */}
      <section className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-16 gap-y-10 px-5 pt-20 pb-24 max-[720px]:pt-12 max-[720px]:pb-16">
        <div className="max-w-[460px] flex-[1_1_360px]">
          <Image
            src="/contents/lasttime/icon.png"
            alt="最後はいつ？"
            width={1024}
            height={1024}
            className="mb-7 h-16 w-16 rounded-[16px] shadow-[0_6px_18px_rgba(42,42,40,0.16)]"
          />
          <h1 className="mb-5 text-[40px] leading-[1.4] font-extrabold tracking-[-0.01em] max-[720px]:text-[30px]">
            When did you
            <br />
            last do it?
          </h1>
          <p className="mb-9 text-[17px] leading-[1.9] text-[#847F74]">
            Calling your parents, changing your toothbrush, visiting home, a movie.
            <br />
            The things that matter, yet somehow slip through the cracks.
            <br />
            Gently record the last time you did them.
          </p>
          <AppStoreBadge />
        </div>
        <Shot n={1} label="List screen of 最後はいつ？" h={2293} priority />
      </section>

      {/* 共感の導入：大切だけど忘れがち */}
      <section className="border-y border-[#E8E3D7] bg-[#FCFAF4]">
        <div className="mx-auto max-w-[960px] px-5 py-16 text-center">
          <p className="mb-9 text-[15px] tracking-[0.04em] text-[#847F74]">
            For the things that matter but are easy to forget.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {EXAMPLES.map((ex) => (
              <span
                key={ex}
                className="rounded-full border border-[#E8E3D7] bg-[#F6F3EC] px-4 py-2 text-[14px] text-[#5B5750]"
              >
                {ex}
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
            className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 border-[#E8E3D7] py-16 [&:not(:first-child)]:border-t [&:nth-child(even)]:flex-row-reverse max-[720px]:flex-col max-[720px]:gap-8 max-[720px]:py-12 max-[720px]:[&:nth-child(even)]:flex-col"
          >
            <Shot n={f.shot} label={f.alt} />
            <div className="max-w-[400px] flex-[1_1_320px]">
              <span className="mb-3 inline-block text-[12px] font-bold tracking-[0.12em] text-[#2E6A50]">
                {f.badge}
              </span>
              <h2 className="mb-4 text-[26px] leading-[1.45] font-extrabold tracking-[-0.01em] max-[720px]:text-[22px]">
                {f.heading}
              </h2>
              <p className="text-[15px] leading-[1.95] text-[#847F74]">
                {f.desc}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* 安心 */}
      <section className="border-y border-[#E8E3D7] bg-[#FCFAF4]">
        <div className="mx-auto max-w-[960px] px-5 py-16 text-center">
          <p className="mb-3 text-[15px] tracking-[0.04em] text-[#847F74]">
            Your records are yours alone.
          </p>
          <p className="mx-auto mb-10 max-w-[460px] text-[14px] leading-[1.9] text-[#847F74]">
            No account required. Your data is never sent anywhere.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {SAFE.map((item) => (
              <div
                key={item.k}
                className="min-w-[200px] flex-[1_1_220px] rounded-[16px] border border-[#E8E3D7] bg-[#F6F3EC] px-6 py-7"
              >
                <p className="mb-1.5 text-[15px] text-[#847F74]">{item.k}</p>
                <p className="text-[18px] font-extrabold text-[#2E6A50]">
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#E8E3D7] bg-[#F6F3EC] px-5 py-20 text-center">
        <h2 className="mb-3 text-[26px] font-extrabold tracking-[-0.01em]">
          The most important things are the easiest to put off.
        </h2>
        <p className="mx-auto mb-8 max-w-[460px] text-[15px] leading-[1.9] text-[#847F74]">
          Let 最後はいつ？ help you never forget them.
        </p>
        <div className="flex justify-center">
          <AppStoreBadge />
        </div>
      </section>

      {/* Contact 導線 */}
      <section className="border-t border-[#E8E3D7] bg-[#FCFAF4] px-5 py-16 text-center">
        <h2 className="mb-3 text-[22px] font-extrabold tracking-[-0.01em]">
          Need help?
        </h2>
        <p className="mx-auto mb-7 max-w-[480px] text-[15px] leading-[1.9] text-[#847F74]">
          Questions about how to use the app, feature requests, bug reports —
          <br className="max-[480px]:hidden" />
          feel free to reach out anytime.
        </p>
        <Link
          href="/contact?category=app&app=lasttime-list"
          className="inline-block rounded-[12px] border border-[#E8E3D7] bg-[#F6F3EC] px-8 py-3 text-[15px] font-bold text-[#2E6A50] no-underline transition-transform hover:-translate-y-0.5"
        >
          Contact us
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#F6F3EC] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-col items-center gap-3">
          <span className="font-dm text-[15px] font-bold text-[#847F74]">
            {LASTTIME_APP_NAME}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href="/contact?category=app&app=lasttime-list"
              className="text-[13px] text-[#847F74] no-underline transition-colors hover:text-[#2E6A50]"
            >
              Contact
            </Link>
            <Link
              href="/lasttime-list/privacy-policy"
              className="text-[13px] text-[#847F74] no-underline transition-colors hover:text-[#2E6A50]"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="text-[13px] text-[#847F74]">© 2026 ychof</p>
        </div>
      </footer>
    </div>
  );
}
