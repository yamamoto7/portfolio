import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MugenSudokuHeader from "@/components/mugen-sudoku/MugenSudokuHeader";
import { MUGEN_SUDOKU_NAME } from "@/lib/mugen-sudoku";

export const metadata: Metadata = {
  title: MUGEN_SUDOKU_NAME,
  description:
    "鬼難度に、本気で挑む。あてずっぽう不要、論理だけで必ず解ける本格数独。プレイ中の割り込み広告なし。",
};

// TODO: ストア公開後に URL を設定
const APP_STORE_URL = "#";
const PLAY_STORE_URL = "#";

// 和の配色（画像から）。墨・和紙・松葉・朱。
const WA = {
  "--paper": "#ECE3D0",
  "--surface": "#F6F0E1",
  "--ink": "#232019",
  "--sub": "#6F6553",
  "--green": "#3A5A42",
  "--verm": "#B4452E",
  "--line": "#D6CBB2",
} as React.CSSProperties;

function StoreButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={APP_STORE_URL}
        className="inline-block transition-transform hover:-translate-y-0.5"
      >
        <Image
          src="/contents/common/appstore.png"
          alt="App Store"
          width={342}
          height={108}
          className="h-12 w-auto"
        />
      </a>
      <a
        href={PLAY_STORE_URL}
        className="inline-block transition-transform hover:-translate-y-0.5"
      >
        <Image
          src="/contents/common/playstore.png"
          alt="Google Play"
          width={342}
          height={108}
          className="h-12 w-auto"
        />
      </a>
    </div>
  );
}

/** 朱の落款（白抜き漢字）。 */
function Seal({ char, className = "" }: { char: string; className?: string }) {
  return (
    <span
      className={`font-mincho inline-flex shrink-0 items-center justify-center rounded-[8px] bg-[var(--verm)] font-bold text-[#F6F0E1] ${className}`}
    >
      {char}
    </span>
  );
}

// 各スクショの実寸（高さ）。アスペクト比のずれによるレイアウトシフトを防ぐ。
const SHOT_HEIGHT: Record<number, number> = {
  1: 2169,
  2: 2172,
  3: 2211,
  4: 2162,
  5: 2197,
};

function Shot({
  n,
  alt,
  priority,
}: {
  n: number;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="w-[290px] max-w-[74vw] shrink-0">
      <Image
        src={`/contents/mugen-sudoku/screen${n}.png`}
        alt={alt}
        width={1242}
        height={SHOT_HEIGHT[n] ?? 2180}
        priority={priority}
        className="h-auto w-full rounded-[20px] shadow-[0_22px_50px_rgba(35,32,25,0.22)] ring-1 ring-[#00000010]"
      />
    </div>
  );
}

interface Feature {
  seal: string;
  badge: string;
  heading: string;
  desc: string;
  shot: number;
  alt: string;
}

const FEATURES: Feature[] = [
  {
    seal: "一",
    badge: "広告なし",
    heading: "集中を、邪魔しない。",
    desc: "プレイ中の割り込み広告は一切なし。むずかしい・もっと難しい・鬼の三段階、ただ盤面と向き合うだけ。",
    shot: 3,
    alt: "難易度選択の画面",
  },
  {
    seal: "二",
    badge: "論理のみ",
    heading: "あてずっぽうは、要らない。",
    desc: "総当たりも勘も不要。すべての問題が、筋道だった論理だけで必ず解けるように作られています。",
    shot: 5,
    alt: "論理で解ける旨の説明画面",
  },
  {
    seal: "三",
    badge: "解法解説",
    heading: "詰まっても、一手ずつ。",
    desc: "行き詰まったら、次の一手とその根拠を順に確認。使われている解法のテクニックも自然と身につきます。",
    shot: 2,
    alt: "解法ステップの解説画面",
  },
  {
    seal: "四",
    badge: "操作性",
    heading: "思いのままの、操作性。",
    desc: "数独マニアが練り上げた入力体験。候補メモも数字の確定も、思考を止めずになめらかに。",
    shot: 4,
    alt: "操作ガイドの画面",
  },
];

const CLAIMS = [
  { k: "収録", v: "999問" },
  { k: "割り込み広告", v: "なし" },
  { k: "解き方", v: "論理のみ" },
];

export default function Page() {
  return (
    <div
      className="font-jp bg-[var(--paper)] text-[var(--ink)]"
      style={WA}
    >
      <MugenSudokuHeader
        right={
          <a
            href={APP_STORE_URL}
            className="font-mincho rounded-[6px] bg-[var(--verm)] px-5 py-2 text-[14px] font-bold text-[#F6F0E1] no-underline transition-opacity hover:opacity-90"
          >
            入手する
          </a>
        }
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* 般若面の透かし */}
        <Image
          src="/contents/mugen-sudoku/Object.png"
          alt=""
          aria-hidden
          width={471}
          height={762}
          className="pointer-events-none absolute right-[-24px] top-1/2 h-[440px] w-auto -translate-y-1/2 select-none opacity-90 max-[900px]:h-[300px] max-[900px]:opacity-50"
        />

        <div className="relative mx-auto flex max-w-[1040px] flex-wrap items-center justify-center gap-x-16 gap-y-12 px-6 pt-20 pb-24 max-[640px]:px-5 max-[640px]:pt-14 max-[640px]:pb-16">
          <div className="max-w-[460px] flex-[1_1_380px]">
            <div className="mb-7 flex items-center gap-3">
              <Image
                src="/contents/mugen-sudoku/icon.png"
                alt={MUGEN_SUDOKU_NAME}
                width={1024}
                height={1024}
                className="h-12 w-12 shrink-0 rounded-[10px] shadow-[0_4px_12px_rgba(35,32,25,0.2)]"
              />
              <span className="font-mincho text-[15px] font-bold tracking-[0.16em] text-[var(--green)]">
                本格 数独
              </span>
            </div>
            <h1 className="font-mincho mb-6 text-[52px] leading-[1.28] font-black tracking-[0.01em] max-[720px]:text-[40px]">
              鬼難度に、
              <br />
              本気で挑む。
            </h1>
            <p className="mb-9 text-[16px] leading-[2] text-[var(--sub)]">
              あてずっぽう不要、論理だけで必ず解ける本格数独。
              <br />
              ナンプレマニア監修の、静かで研ぎ澄まされた一局を。
            </p>
            <StoreButtons />
          </div>
          <Shot n={1} alt="鬼難度の数独に挑む画面" priority />
        </div>
      </section>

      {/* 一文の見せ場（松葉色の帯） */}
      <section className="bg-[var(--green)] px-6 py-20 text-center text-[#F1ECDC]">
        <p className="font-mincho mx-auto max-w-[760px] text-[30px] leading-[1.7] font-bold max-[720px]:text-[23px]">
          解けないのではない。
          <br />
          まだ、解いていないだけ。
        </p>
        <p className="mx-auto mt-6 max-w-[520px] text-[15px] leading-[2] text-[#CBD6C9]">
          すべての問題が、論理だけで必ず解けるように作られています。
        </p>
      </section>

      {/* 機能（写真主役・交互） */}
      <div className="mx-auto max-w-[1040px] px-6 max-[640px]:px-5">
        {FEATURES.map((f) => (
          <section
            key={f.seal}
            className="flex flex-wrap items-center justify-center gap-x-16 gap-y-9 border-[var(--line)] py-16 [&:not(:first-child)]:border-t [&:nth-child(even)]:flex-row-reverse max-[760px]:flex-col max-[760px]:gap-9 max-[760px]:py-12 max-[760px]:[&:nth-child(even)]:flex-col"
          >
            <Shot n={f.shot} alt={f.alt} />
            <div className="max-w-[420px] flex-[1_1_340px]">
              <div className="mb-5 flex items-center gap-3">
                <Seal char={f.seal} className="h-10 w-10 text-[20px]" />
                <span className="text-[13px] font-bold tracking-[0.14em] text-[var(--verm)]">
                  {f.badge}
                </span>
              </div>
              <h2 className="font-mincho mb-4 text-[30px] leading-[1.4] font-bold max-[720px]:text-[25px]">
                {f.heading}
              </h2>
              <p className="text-[15px] leading-[2] text-[var(--sub)]">
                {f.desc}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* 数の見せ場 */}
      <section className="border-y border-[var(--line)] bg-[var(--surface)] px-6 py-16">
        <div className="mx-auto flex max-w-[820px] flex-wrap items-stretch justify-center divide-x divide-[var(--line)] max-[600px]:flex-col max-[600px]:divide-x-0 max-[600px]:divide-y">
          {CLAIMS.map((c) => (
            <div key={c.k} className="flex-1 px-10 py-3 text-center">
              <p className="mb-2 text-[13px] font-bold tracking-[0.1em] text-[var(--sub)]">
                {c.k}
              </p>
              <p className="font-mincho text-[34px] font-black text-[var(--green)]">
                {c.v}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <Seal char="鬼" className="mb-6 h-14 w-14 text-[28px]" />
        <p className="font-mincho mb-8 text-[30px] font-bold leading-[1.5] max-[720px]:text-[24px]">
          鬼難度の数独を、はじめる。
        </p>
        <div className="flex justify-center">
          <StoreButtons />
        </div>
      </section>

      {/* Contact 導線 */}
      <section className="border-t border-[var(--line)] bg-[var(--surface)] px-6 py-20 text-center">
        <h2 className="font-mincho mb-3 text-[24px] font-bold">
          お困りですか？
        </h2>
        <p className="mx-auto mb-8 max-w-[520px] text-[15px] leading-[2] text-[var(--sub)]">
          アプリの使い方・ご要望・不具合のご報告など、
          <br className="max-[520px]:hidden" />
          お気軽にお問い合わせください。
        </p>
        <Link
          href="/contact?category=app&app=mugen-sudoku"
          className="inline-block rounded-[8px] bg-[var(--green)] px-9 py-3.5 text-[15px] font-bold text-[#F6F0E1] no-underline transition-transform hover:-translate-y-0.5"
        >
          お問い合わせ
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--ink)] px-6 py-14 text-center">
        <div className="mx-auto flex max-w-[1040px] flex-col items-center gap-4">
          <span className="font-mincho text-[17px] font-bold tracking-[0.04em] text-[#E7DEC9]">
            {MUGEN_SUDOKU_NAME}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/contact?category=app&app=mugen-sudoku"
              className="text-[13px] text-[#B8AF9C] no-underline transition-colors hover:text-[#E7DEC9]"
            >
              お問い合わせ
            </Link>
            <Link
              href="/mugen-sudoku/privacy-policy"
              className="text-[13px] text-[#B8AF9C] no-underline transition-colors hover:text-[#E7DEC9]"
            >
              プライバシーポリシー
            </Link>
          </div>
          <p className="text-[12px] tracking-[0.06em] text-[#8E866F]">
            © 2026 ychof
          </p>
        </div>
      </footer>
    </div>
  );
}
