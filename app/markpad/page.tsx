import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MarkPadHeader from "@/components/markpad/MarkPadHeader";
import { MARKPAD_APP_NAME, MARKPAD_SHORT_NAME } from "@/lib/markpad";

export const metadata: Metadata = {
  title: MARKPAD_APP_NAME,
  description:
    "Markdown でサッと書いて、すぐ美しくプレビューできるエディター。AIが返す Markdown を貼り付ければ、コードも表も崩れずきれいに。コード・数式・Mermaid 図もオフラインで描けて、割り込み広告はありません。",
};

// TODO: App Store 公開後にURLを設定
const APP_STORE_URL = "#";

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
    heading: "貼り付けて、すぐ美しく。",
    desc: "AIが返す Markdown を貼り付ければ、見出し・リスト・表・図まで崩れずきれいに。編集とプレビューはワンタップで切り替えられ、スマホでもサッと読めます。",
    shot: 2,
    alt: "MarkPad のプレビュー画面",
  },
  {
    badge: "THEME",
    heading: "見た目は、自分好みに。",
    desc: "プレビューテーマを「標準／GitHub／ドキュメント」から選択。実際の表示をプレビューで確かめながら、読みやすい見た目に整えられます。",
    shot: 3,
    alt: "プレビューテーマの選択画面",
  },
  {
    badge: "RICH",
    heading: "表も、数式も、コードも。",
    desc: "コードブロックはシンタックスハイライト＋コピーボタン。表・チェックリスト・引用・コールアウト・ブロック数式まで、崩れずきれいに表示します。",
    shot: 4,
    alt: "表・数式・コードのプレビュー画面",
  },
  {
    badge: "DIAGRAM",
    heading: "Mermaid 図だって、描ける。",
    desc: "フローチャートやシーケンス図などの Mermaid 図をアプリ内で描画。タップで拡大・スクロールでき、図の確認もスマホで完結します。",
    shot: 5,
    alt: "Mermaid 図のプレビュー画面",
  },
];

const SUPPORTED = [
  "シンタックスハイライト",
  "表",
  "チェックリスト",
  "ブロック数式",
  "Mermaid 図",
  "コールアウト",
  "折りたたみ",
  "==ハイライト==",
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
            入手する
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
            書いて、貼って、
            <br />
            すぐ美しく。
          </h1>
          <p className="mb-9 text-[17px] leading-[1.9] text-[#656D76]">
            Markdown でサッと書いて、すぐ美しくプレビュー。
            <br />
            AIが返す Markdown も、崩れずきれいに読めます。
          </p>
          <AppStoreBadge />
        </div>
        <Shot n={1} label="MarkPad の編集画面" priority />
      </section>

      {/* オフライン・広告なし */}
      <section className="border-y border-[#E6E8EB] bg-white">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-12 text-center font-mono text-[13px] text-[#656D76]">
          <span>オフラインでも快適</span>
          <span className="text-[#D0D7DE] max-[520px]:hidden">·</span>
          <span>割り込み広告なし</span>
          <span className="text-[#D0D7DE] max-[520px]:hidden">·</span>
          <span>データは端末内に保存</span>
          <span className="text-[#D0D7DE] max-[520px]:hidden">·</span>
          <span>19言語に対応</span>
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
            対応している記法。
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
          書くことに、もっと気持ちよく。
        </h2>
        <p className="mx-auto mb-8 max-w-[460px] text-[15px] leading-[1.9] text-[#656D76]">
          アカウントは不要。テキストや .md ファイルでの共有にも対応しています。
        </p>
        <div className="flex justify-center">
          <AppStoreBadge />
        </div>
      </section>

      {/* Contact 導線 */}
      <section className="border-t border-[#E6E8EB] bg-white px-5 py-16 text-center">
        <h2 className="mb-3 text-[22px] font-extrabold tracking-[-0.01em]">
          お困りですか？
        </h2>
        <p className="mx-auto mb-7 max-w-[480px] text-[15px] leading-[1.9] text-[#656D76]">
          アプリの使い方・ご要望・不具合のご報告など、
          <br className="max-[480px]:hidden" />
          お気軽にお問い合わせください。
        </p>
        <Link
          href="/contact?category=app&app=markpad"
          className="inline-block rounded-[12px] border border-[#E6E8EB] bg-[#FBFBFC] px-8 py-3 text-[15px] font-bold text-[#337AE5] no-underline transition-transform hover:-translate-y-0.5"
        >
          お問い合わせ
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
              お問い合わせ
            </Link>
            <Link
              href="/markpad/privacy-policy"
              className="text-[13px] text-[#656D76] no-underline transition-colors hover:text-[#337AE5]"
            >
              プライバシーポリシー
            </Link>
          </div>
          <p className="text-[13px] text-[#656D76]">© 2026 ychof</p>
        </div>
      </footer>
    </div>
  );
}
