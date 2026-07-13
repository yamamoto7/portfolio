import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SeeHueHeader from "@/components/seehue/SeeHueHeader";
import { SEEHUE_APP_NAME, SEEHUE_SHORT_NAME } from "@/lib/seehue";

export const metadata: Metadata = {
  title: SEEHUE_APP_NAME,
  description:
    "A color-assist camera for people who have difficulty distinguishing colors. Adjust the colors of your camera or photos to make them easier to see, look up color names, and check how you perceive colors. All analysis happens entirely on your device—no footage is ever saved or transmitted.",
};

// TODO: App Store 公開後にURLを設定
const APP_STORE_URL = "#";

/* ------------------------------------------------------------------ *
 * SeeHue は「色のサポートカメラ」。アイコンの色相環と、端末内で完結する
 * 安心感を軸にした、落ち着いたライトテーマの LP。
 * 「色覚特性の診断・治療を行うものではない」旨を各所に明記する。
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
        src={`/contents/seehue/screen${n}.png`}
        alt={label}
        width={1320}
        height={2868}
        priority={priority}
        className="h-auto w-full rounded-[26px] shadow-[0_20px_48px_rgba(42,46,51,0.16)]"
      />
    </div>
  );
}

/** カラーバー（色相環アイコンの世界観を、薄く一筋で表現）。 */
function Spectrum({ className }: { className?: string }) {
  return (
    <div
      className={`h-1.5 w-full rounded-full ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(90deg,#e8554d,#e8954d,#e8d24d,#5ab86a,#337ae6,#7048e8)",
      }}
      aria-hidden
    />
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
    badge: "SIMULATE & SHARE",
    heading: "Show others exactly how you see.",
    desc: "Switch between Original, Corrected, and Simulate with a single tap. Capture a photo that reproduces the colors as you see them, and you can show your family and friends how you perceive color.",
    shot: 2,
    alt: "Screen for simulating and sharing how colors appear",
  },
  {
    badge: "INSPECT",
    heading: "What color is this?",
    desc: "Displays the color of whatever is at the center of the screen by its name (red, teal, etc.) along with its brightness and vividness. It even suggests similar colors, making it a reliable companion whenever you're unsure about a color.",
    shot: 3,
    alt: "Color picker screen for looking up color names",
  },
  {
    badge: "COMPARE",
    heading: "Save a color, compare on the spot.",
    desc: "Save a color you're curious about, then match it against the live camera feed in real time. Instantly see whether colors are the Same, Similar, or Different—handy for coordinating clothes and accessories.",
    shot: 4,
    alt: "Screen for comparing against a saved color",
  },
  {
    badge: "SELF-CHECK",
    heading: "Check how easily you tell colors apart.",
    desc: "Measure how well you distinguish red-green and blue-yellow with a self-check, then automatically tune the correction strength to your results. Supports type 1, type 2, and type 3, and lets you create profiles.",
    shot: 5,
    alt: "Color vision self-check screen",
  },
];

export default function Page() {
  return (
    <div className="font-jp min-h-screen bg-[#FAF7F2] text-[#2A2E33]">
      {/* Header */}
      <SeeHueHeader
        right={
          <a
            href={APP_STORE_URL}
            className="rounded-full bg-[#337AE6] px-4 py-2 text-[13px] font-bold text-white no-underline transition-opacity hover:opacity-90"
          >
            Get it
          </a>
        }
      />

      {/* Hero */}
      <section className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-16 gap-y-10 px-5 pt-20 pb-24 max-[720px]:pt-12 max-[720px]:pb-16">
        <div className="max-w-[440px] flex-[1_1_360px]">
          <Image
            src="/contents/seehue/icon.png"
            alt={SEEHUE_SHORT_NAME}
            width={1024}
            height={1024}
            className="mb-6 h-16 w-16 rounded-[16px] border border-[#ECE7DE] shadow-[0_6px_18px_rgba(42,46,51,0.16)]"
          />
          <div className="mb-6 w-24">
            <Spectrum />
          </div>
          <h1 className="mb-5 text-[40px] leading-[1.4] font-extrabold tracking-[-0.01em] max-[720px]:text-[30px]">
            Make colors
            <br />
            easier to see.
          </h1>
          <p className="mb-9 text-[17px] leading-[1.9] text-[#6E7378]">
            A color-assist camera for people who have difficulty distinguishing colors.
            <br />
            Adjust colors, look up color names, and check how you perceive them.
          </p>
          <AppStoreBadge />
        </div>
        <Shot n={1} label="Correction camera screen" priority />
      </section>

      {/* 端末内で完結 */}
      <section className="border-y border-[#ECE7DE] bg-white">
        <div className="mx-auto max-w-[720px] px-5 py-16 text-center">
          <span className="mb-4 inline-block font-mono text-[12px] font-bold tracking-[0.12em] text-[#337AE6]">
            ON-DEVICE
          </span>
          <p className="text-[19px] leading-[2] font-medium text-[#3C4248]">
            All analysis happens entirely on your device.
            <br />
            Camera footage and photos are never saved or transmitted.
          </p>
        </div>
      </section>

      {/* Features（スクショあり） */}
      <div className="mx-auto max-w-[960px] px-5">
        {FEATURES.map((f) => (
          <section
            key={f.badge}
            className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 border-[#ECE7DE] py-16 [&:not(:first-child)]:border-t [&:nth-child(even)]:flex-row-reverse max-[720px]:flex-col max-[720px]:gap-8 max-[720px]:py-12 max-[720px]:[&:nth-child(even)]:flex-col"
          >
            <Shot n={f.shot} label={f.alt} />
            <div className="max-w-[400px] flex-[1_1_320px]">
              <span className="mb-3 inline-block font-mono text-[12px] font-bold tracking-[0.12em] text-[#337AE6]">
                {f.badge}
              </span>
              <h2 className="mb-4 text-[26px] leading-[1.45] font-extrabold tracking-[-0.01em] max-[720px]:text-[22px]">
                {f.heading}
              </h2>
              <p className="text-[15px] leading-[1.95] text-[#6E7378]">
                {f.desc}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="border-t border-[#ECE7DE] bg-[#FAF7F2] px-5 py-20 text-center">
        <div className="mx-auto mb-6 w-28">
          <Spectrum />
        </div>
        <h2 className="mb-3 text-[26px] font-extrabold tracking-[-0.01em]">
          Make color your ally.
        </h2>
        <p className="mx-auto mb-8 max-w-[520px] text-[15px] leading-[1.9] text-[#6E7378]">
          No account required. Start using it right away.
        </p>
        <div className="flex justify-center">
          <AppStoreBadge />
        </div>
      </section>

      {/* Contact 導線 */}
      <section className="border-t border-[#ECE7DE] bg-white px-5 py-16 text-center">
        <h2 className="mb-3 text-[22px] font-extrabold tracking-[-0.01em]">
          Need help?
        </h2>
        <p className="mx-auto mb-7 max-w-[480px] text-[15px] leading-[1.9] text-[#6E7378]">
          Questions about how to use the app, feature requests, bug reports—
          <br className="max-[480px]:hidden" />
          feel free to reach out anytime.
        </p>
        <Link
          href="/contact?category=app&app=seehue"
          className="inline-block rounded-[12px] border border-[#ECE7DE] bg-[#FAF7F2] px-8 py-3 text-[15px] font-bold text-[#337AE6] no-underline transition-transform hover:-translate-y-0.5"
        >
          Contact us
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#FAF7F2] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-col items-center gap-3">
          <span className="text-[15px] font-bold text-[#6E7378]">
            {SEEHUE_SHORT_NAME}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href="/contact?category=app&app=seehue"
              className="text-[13px] text-[#6E7378] no-underline transition-colors hover:text-[#337AE6]"
            >
              Contact
            </Link>
            <Link
              href="/seehue/privacy-policy"
              className="text-[13px] text-[#6E7378] no-underline transition-colors hover:text-[#337AE6]"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="mx-auto max-w-[560px] text-[11px] leading-[1.7] text-[#9AA0A6]">
            This app is a tool to assist with distinguishing colors; it does not diagnose or treat color vision characteristics.
            For an accurate diagnosis, please consult an ophthalmologist.
          </p>
          <p className="text-[13px] text-[#6E7378]">© 2026 ychof</p>
        </div>
      </footer>
    </div>
  );
}
