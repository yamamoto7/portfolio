import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MugenSudokuHeader from "@/components/mugen-sudoku/MugenSudokuHeader";
import { MUGEN_SUDOKU_NAME, MUGEN_SUDOKU_ACCENT } from "@/lib/mugen-sudoku";

export const metadata: Metadata = {
  title: MUGEN_SUDOKU_NAME,
  description:
    "激ムズを求めるあなたにおすすめ。ナンプレマニア監修、感動の操作体験を広告なしで。",
};

// TODO: ストア公開後に URL を設定
const APP_STORE_URL = "#";
const PLAY_STORE_URL = "#";

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

interface Feature {
  heading: string;
  desc: string;
}

const FEATURES: Feature[] = [
  {
    heading: "マニアを唸らせる難問のみ収録",
    desc: "簡単な問題はもう卒業。歯ごたえのある難問だけを厳選して収録しました。",
  },
  {
    heading: "邪魔な広告は一切なし",
    desc: "思考を妨げるバナーやポップアップはゼロ。ただ問題に集中できます。",
  },
  {
    heading: "爽快な操作感",
    desc: "ナンプレマニア監修。ストレスのない入力で、解く快感だけが残ります。",
  },
];

const CLAIMS = [
  { k: "広告", v: "0" },
  { k: "収録", v: "難問のみ" },
  { k: "監修", v: "ナンプレマニア" },
];

export default function Page() {
  return (
    <div
      className="font-jp text-app-ink"
      style={{ "--accent": MUGEN_SUDOKU_ACCENT } as React.CSSProperties}
    >
      <MugenSudokuHeader
        right={
          <a
            href={APP_STORE_URL}
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-[13px] font-bold text-white no-underline transition-opacity hover:opacity-90"
          >
            入手する
          </a>
        }
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-bg-alt">
        {/* 数独グリッドの淡い装飾 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(#e6eaf0 1px, transparent 1px), linear-gradient(90deg, #e6eaf0 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(circle at 30% 35%, black, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(circle at 30% 35%, black, transparent 72%)",
          }}
        />
        <div className="relative mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-12 px-5 pt-16 pb-[72px] max-[720px]:gap-8 max-[720px]:pt-11 max-[720px]:pb-[52px]">
          <div className="max-w-[460px] flex-[1_1_360px]">
            <Image
              src="/contents/mugen-sudoku/name.png"
              alt={MUGEN_SUDOKU_NAME}
              width={736}
              height={321}
              className="mb-[22px] h-10 w-auto"
            />
            <h1 className="mb-4 text-[34px] leading-[1.35] font-extrabold tracking-[-0.01em] max-[720px]:text-[27px]">
              激ムズを求める
              <br />
              あなたにおすすめ
            </h1>
            <p className="mb-7 text-base leading-[1.9] text-muted">
              ナンプレマニア監修。感動の操作体験を、広告なしで。
            </p>
            <StoreButtons />
          </div>
          <div className="flex w-[300px] max-w-[78vw] shrink-0 justify-center">
            <Image
              src="/contents/mugen-sudoku/mv.png"
              alt={MUGEN_SUDOKU_NAME}
              width={1122}
              height={1402}
              priority
              className="h-auto w-full [filter:drop-shadow(0_24px_48px_rgba(27,35,48,0.18))]"
            />
          </div>
        </div>
      </section>

      {/* 訴求バンド */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-[960px] flex-wrap justify-center gap-4 px-5 py-12">
          {CLAIMS.map((c) => (
            <div
              key={c.k}
              className="min-w-[200px] flex-[1_1_220px] rounded-[16px] border border-line bg-bg-alt px-6 py-7 text-center"
            >
              <p className="mb-1.5 text-[13px] font-bold tracking-[0.06em] text-muted">
                {c.k}
              </p>
              <p className="text-[24px] font-extrabold text-[var(--accent)]">
                {c.v}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <div className="mx-auto max-w-[960px] px-5">
        {FEATURES.map((f, i) => (
          <section
            key={f.heading}
            className="flex flex-wrap items-center justify-center gap-14 border-line py-14 [&:not(:first-child)]:border-t [&:nth-child(even)]:flex-row-reverse max-[720px]:flex-col max-[720px]:gap-7 max-[720px]:py-10 max-[720px]:[&:nth-child(even)]:flex-col"
          >
            <div className="w-[240px] max-w-[70vw] shrink-0 max-[720px]:w-[200px]">
              <Image
                src={`/contents/mugen-sudoku/screen${i + 1}.png`}
                alt=""
                width={1116}
                height={2270}
                className="h-auto w-full rounded-[28px] shadow-[0_18px_40px_rgba(27,35,48,0.16)]"
              />
            </div>
            <div className="max-w-[420px] flex-[1_1_320px]">
              <span className="mb-3 inline-block text-[13px] font-bold tracking-[0.08em] text-[var(--accent)]">
                POINT 0{i + 1}
              </span>
              <h2 className="mb-3 text-2xl leading-[1.4] font-extrabold">
                {f.heading}
              </h2>
              <p className="text-[15px] leading-[1.9] text-muted">{f.desc}</p>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="border-t border-line bg-bg-alt px-5 py-16 text-center">
        <p className="mb-6 text-[22px] font-extrabold">
          激ムズナンプレ、はじめてみませんか。
        </p>
        <div className="flex justify-center">
          <StoreButtons />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-white px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-col items-center gap-3">
          <span className="text-[15px] font-bold text-muted">
            {MUGEN_SUDOKU_NAME}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href="/contact?category=app&app=mugen-sudoku"
              className="text-[13px] text-muted no-underline transition-colors hover:text-[var(--accent)]"
            >
              お問い合わせ
            </Link>
            <Link
              href="/mugen-sudoku/privacy-policy"
              className="text-[13px] text-muted no-underline transition-colors hover:text-[var(--accent)]"
            >
              プライバシーポリシー
            </Link>
          </div>
          <p className="text-[13px] text-muted">© 2026 ychof</p>
        </div>
      </footer>
    </div>
  );
}
