import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LasttimeHeader from "@/components/lasttime/LasttimeHeader";
import { LASTTIME_APP_NAME } from "@/lib/lasttime";

export const metadata: Metadata = {
  title: LASTTIME_APP_NAME,
  description:
    "最後にやったのは、いつ？両親への電話・歯ブラシの交換・里帰り・映画。大切だけど忘れがちなことの「最後にやった日」を記録して、忘れずにいられる記録帳。",
};

// TODO: App Store 公開後にURLを設定
const APP_STORE_URL = "#";

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
  "両親への電話 ☎️",
  "歯ブラシの交換 🪥",
  "里帰り 🏠",
  "映画 🎬",
  "健康診断 🩺",
  "観葉植物の水やり 🪴",
  "大掃除 🧹",
  "友達と会う ☕️",
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
    heading: "「やった」を押すだけ。",
    desc: "記録が積み重なると、あなたのペース（平均間隔）を自動で計算。「そろそろ」「超過」を、やさしい色でそっとお知らせします。",
    shot: 4,
    alt: "経過日数と目標間隔の詳細画面",
  },
  {
    badge: "MEMORY",
    heading: "写真とひとことで、思い出になる。",
    desc: "記録には写真とメモを添えられます。ただの記録が、あとから見返したくなる小さな思い出に変わります。",
    shot: 2,
    alt: "写真とメモつきのタイムライン",
  },
  {
    badge: "LOOK BACK",
    heading: "「◯年前の今日」に、ふと出会う。",
    desc: "すべての記録は時系列に並び、「◯年前の今日」「はじめて」「ひさしぶり」といった彩りとともに、ふとした瞬間に振り返れます。",
    shot: 3,
    alt: "「◯年前の今日」を振り返るタイムライン",
  },
  {
    badge: "CALENDAR",
    heading: "やった日を、ひと目で。",
    desc: "カレンダーに切り替えれば、いつ何をやったかが月ごとにひと目で。続けてきた足あとが、静かに見えてきます。",
    shot: 5,
    alt: "やった日が並ぶカレンダー画面",
  },
];

const SAFE = [
  { k: "保存先", v: "端末と iCloud だけ" },
  { k: "バックアップ", v: "iCloud 同期 ＋ 書き出し" },
  { k: "プライバシー", v: "Face ID ロック" },
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
            入手する
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
            最後にやったのは、
            <br />
            いつ？
          </h1>
          <p className="mb-9 text-[17px] leading-[1.9] text-[#847F74]">
            両親への電話、歯ブラシの交換、里帰り、映画。
            <br />
            大切なのに、つい間があいてしまうこと。
            <br />
            その「最後にやった日」を、そっと記録。
          </p>
          <AppStoreBadge />
        </div>
        <Shot n={1} label="「最後はいつ？」の一覧画面" h={2293} priority />
      </section>

      {/* 共感の導入：大切だけど忘れがち */}
      <section className="border-y border-[#E8E3D7] bg-[#FCFAF4]">
        <div className="mx-auto max-w-[960px] px-5 py-16 text-center">
          <p className="mb-9 text-[15px] tracking-[0.04em] text-[#847F74]">
            こんな「大切だけど、忘れがち」に。
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
            あなたの記録は、あなたのものだけ。
          </p>
          <p className="mx-auto mb-10 max-w-[460px] text-[14px] leading-[1.9] text-[#847F74]">
            アカウント登録はいりません。データが外部に送られることもありません。
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
          大切なことほど、つい後回しに。
        </h2>
        <p className="mx-auto mb-8 max-w-[460px] text-[15px] leading-[1.9] text-[#847F74]">
          「最後はいつ？」で、忘れずにいよう。
        </p>
        <div className="flex justify-center">
          <AppStoreBadge />
        </div>
      </section>

      {/* Contact 導線 */}
      <section className="border-t border-[#E8E3D7] bg-[#FCFAF4] px-5 py-16 text-center">
        <h2 className="mb-3 text-[22px] font-extrabold tracking-[-0.01em]">
          お困りですか？
        </h2>
        <p className="mx-auto mb-7 max-w-[480px] text-[15px] leading-[1.9] text-[#847F74]">
          アプリの使い方・ご要望・不具合のご報告など、
          <br className="max-[480px]:hidden" />
          お気軽にお問い合わせください。
        </p>
        <Link
          href="/contact?category=app&app=lasttime-list"
          className="inline-block rounded-[12px] border border-[#E8E3D7] bg-[#F6F3EC] px-8 py-3 text-[15px] font-bold text-[#2E6A50] no-underline transition-transform hover:-translate-y-0.5"
        >
          お問い合わせ
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
              お問い合わせ
            </Link>
            <Link
              href="/lasttime-list/privacy-policy"
              className="text-[13px] text-[#847F74] no-underline transition-colors hover:text-[#2E6A50]"
            >
              プライバシーポリシー
            </Link>
          </div>
          <p className="text-[13px] text-[#847F74]">© 2026 ychof</p>
        </div>
      </footer>
    </div>
  );
}
