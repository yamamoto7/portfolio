import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Routin — 静かなルーティン",
  description:
    "頑張らなくても、いい。ストリークもスコアも通知もない、静かに続けられるルーティンアプリ。",
};

// TODO: App Store 公開後にURLを設定
const APP_STORE_URL = "#";

/* ------------------------------------------------------------------ *
 * Routin はアプリの世界観（静けさ・余白・sage green）を LP に移植する。
 * カラートークンはアプリの Theme から流用。ダークモードは Tailwind v4 の
 * dark:（既定で prefers-color-scheme）で再現している。
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
        alt="App Store からダウンロード"
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
        className="h-auto w-full rounded-[26px] shadow-[0_20px_48px_rgba(40,40,38,0.16)] dark:shadow-[0_20px_48px_rgba(0,0,0,0.55)]"
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
    heading: "その日に合わせて、入れ替わる。",
    desc: "在宅・出社・お休み。暮らしのモードごとにルーティンが切り替わるから、毎日それらしく整います。気分で今日だけ上書きも。",
    shot: 4,
    alt: "日の種類を切り替える画面",
  },
  {
    badge: "REFLECTION",
    heading: "「できた」だけを、そっと見る。",
    desc: "ストリークも達成率もありません。続けた日がカレンダーに灯るだけ。できなかった日を、責めない記録です。",
    shot: 3,
    alt: "ふりかえりのカレンダー画面",
  },
  {
    badge: "TEMPLATES",
    heading: "50以上の下書きから、はじめる。",
    desc: "朝のひととき、整える夜、在宅の一日。テンプレートを下敷きに、自分のリズムへ少しずつ寄せていけます。",
    shot: 2,
    alt: "テンプレート一覧画面",
  },
  {
    badge: "WIDGET",
    heading: "ホーム画面から、今日をひと目で。",
    desc: "ウィジェットで今日のルーティンが暮らしに溶け込む。アプリを開かなくても、やることがそっと目に入ります。",
    shot: 5,
    alt: "ホーム画面ウィジェット",
  },
];

const NO_PRESSURE = [
  { k: "ストリーク", v: "なし" },
  { k: "スコア・レベル", v: "なし" },
  { k: "通知の催促", v: "なし" },
];

export default function Page() {
  return (
    <div className="font-jp min-h-screen bg-[#F7F5F0] text-[#282826] dark:bg-[#121214] dark:text-[#EBEAE3]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[#E6E4DB]/70 bg-[#F7F5F0]/80 backdrop-blur-md dark:border-[#343439]/70 dark:bg-[#121214]/80">
        <div className="mx-auto flex max-w-[960px] items-center justify-between px-5 py-3">
          <Link href="/routin" className="flex items-center gap-2.5 no-underline">
            <Image
              src="/contents/routin/icon.png"
              alt="Routin"
              width={1024}
              height={1024}
              className="h-9 w-9 rounded-[9px] shadow-[0_2px_8px_rgba(40,40,38,0.14)]"
            />
            <span className="font-dm text-[19px] font-bold tracking-[-0.01em]">
              Routin
            </span>
          </Link>
          <a
            href={APP_STORE_URL}
            className="rounded-full bg-[#6A826D] px-4 py-2 text-[13px] font-bold text-white no-underline transition-opacity hover:opacity-90 dark:bg-[#99B2A1] dark:text-[#121214]"
          >
            入手する
          </a>
        </div>
      </header>

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
            頑張らなくても、
            <br />
            いい。
          </h1>
          <p className="mb-9 text-[17px] leading-[1.9] text-[#85827D] dark:text-[#989792]">
            ストリークも、スコアも、通知もありません。
            <br />
            静かに続けられる、ルーティンアプリ。
          </p>
          <AppStoreBadge />
        </div>
        <Shot n={1} label="今日のルーティン画面" priority />
      </section>

      {/* 引き算の価値 */}
      <section className="border-y border-[#E6E4DB] bg-[#FFFBFA] dark:border-[#343439] dark:bg-[#212223]">
        <div className="mx-auto max-w-[960px] px-5 py-16 text-center">
          <p className="mb-10 text-[15px] tracking-[0.04em] text-[#85827D] dark:text-[#989792]">
            続けるために、削ぎ落としたもの。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {NO_PRESSURE.map((item) => (
              <div
                key={item.k}
                className="min-w-[200px] flex-[1_1_220px] rounded-[16px] border border-[#E6E4DB] bg-[#F7F5F0] px-6 py-7 dark:border-[#343439] dark:bg-[#121214]"
              >
                <p className="mb-1.5 text-[15px] text-[#85827D] dark:text-[#989792]">
                  {item.k}
                </p>
                <p className="text-[26px] font-extrabold text-[#6A826D] dark:text-[#99B2A1]">
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
            className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 border-[#E6E4DB] py-16 [&:not(:first-child)]:border-t dark:border-[#343439] [&:nth-child(even)]:flex-row-reverse max-[720px]:flex-col max-[720px]:gap-8 max-[720px]:py-12 max-[720px]:[&:nth-child(even)]:flex-col"
          >
            <Shot n={f.shot} label={f.alt} />
            <div className="max-w-[400px] flex-[1_1_320px]">
              <span className="mb-3 inline-block text-[12px] font-bold tracking-[0.12em] text-[#6A826D] dark:text-[#99B2A1]">
                {f.badge}
              </span>
              <h2 className="mb-4 text-[26px] leading-[1.45] font-extrabold tracking-[-0.01em] max-[720px]:text-[22px]">
                {f.heading}
              </h2>
              <p className="text-[15px] leading-[1.95] text-[#85827D] dark:text-[#989792]">
                {f.desc}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="border-t border-[#E6E4DB] bg-[#FFFBFA] px-5 py-20 text-center dark:border-[#343439] dark:bg-[#212223]">
        <h2 className="mb-3 text-[26px] font-extrabold tracking-[-0.01em]">
          今日から、静かに。
        </h2>
        <p className="mx-auto mb-8 max-w-[440px] text-[15px] leading-[1.9] text-[#85827D] dark:text-[#989792]">
          アカウントは要りません。データはあなたの端末の中だけに、そっと。
        </p>
        <div className="flex justify-center">
          <AppStoreBadge />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F7F5F0] px-5 py-12 text-center dark:bg-[#121214]">
        <div className="mx-auto flex max-w-[960px] flex-col items-center gap-3">
          <span className="font-dm text-[15px] font-bold text-[#85827D] dark:text-[#989792]">
            Routin
          </span>
          <p className="text-[13px] text-[#85827D] dark:text-[#989792]">
            © {2026} ychof
          </p>
        </div>
      </footer>
    </div>
  );
}
