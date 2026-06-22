import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SeeHueHeader from "@/components/seehue/SeeHueHeader";
import { SEEHUE_APP_NAME, SEEHUE_SHORT_NAME } from "@/lib/seehue";

export const metadata: Metadata = {
  title: SEEHUE_APP_NAME,
  description:
    "色が見分けにくい方のための、色のサポートカメラ。カメラや写真の色を見やすく補正し、色の名前を調べ、自分の見え方をチェックできます。解析はすべて端末内で行われ、映像が保存・送信されることはありません。",
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
    <div className="w-[260px] max-w-[66vw] shrink-0">
      <Image
        src={`/contents/seehue/screen${n}.png`}
        alt={label}
        width={1179}
        height={2556}
        priority={priority}
        className="h-auto w-full rounded-[26px] border border-[#ECE7DE] shadow-[0_20px_48px_rgba(42,46,51,0.16)]"
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
    badge: "CORRECT",
    heading: "見分けにくい色を、くっきりと。",
    desc: "カメラの映像にリアルタイムで補正をかけ、見分けにくい色のコントラストを強調します。写真を読み込んで同じ補正をかけ、保存・共有することもできます。",
    shot: 1,
    alt: "補正カメラの画面",
  },
  {
    badge: "SIMULATE",
    heading: "見え方を、そのまま再現。",
    desc: "「そのまま／補正／シミュレート」をワンタップで切り替え。色覚特性での見え方をシミュレートして、自分や相手にどう映るかを確かめられます。",
    shot: 2,
    alt: "色覚シミュレートの画面",
  },
];

const MORE = [
  {
    k: "色を調べる",
    v: "画面中央の色を、色名（赤・青緑など）と明るさ・鮮やかさで表示。保存した基準色とリアルタイムで照合でき、服や小物の色合わせに。",
  },
  {
    k: "色覚セルフチェック",
    v: "モザイク状の色を見分けるスライダー方式で、赤緑・青黄それぞれの見分けやすさを測定。結果に合わせて補正の強さが自動調整されます。",
  },
  {
    k: "パーソナライズ",
    v: "1型（P型）・2型（D型）・3型（T型）に対応し、軸ごとに強さを調整。人や環境ごとに複数のプロファイルを作って切り替えられます。",
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
            入手する
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
            色を、
            <br />
            見やすく。
          </h1>
          <p className="mb-9 text-[17px] leading-[1.9] text-[#6E7378]">
            色が見分けにくい方のための、色のサポートカメラ。
            <br />
            補正して、色名を調べ、自分の見え方をチェック。
          </p>
          <AppStoreBadge />
        </div>
        <Shot n={1} label="補正カメラの画面" priority />
      </section>

      {/* 端末内で完結 */}
      <section className="border-y border-[#ECE7DE] bg-white">
        <div className="mx-auto max-w-[720px] px-5 py-16 text-center">
          <span className="mb-4 inline-block font-mono text-[12px] font-bold tracking-[0.12em] text-[#337AE6]">
            ON-DEVICE
          </span>
          <p className="text-[19px] leading-[2] font-medium text-[#3C4248]">
            解析は、すべて端末内で。
            <br />
            カメラ映像や写真が、保存・送信されることはありません。
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

      {/* できること（テキストカード） */}
      <section className="border-t border-[#ECE7DE] bg-white">
        <div className="mx-auto max-w-[960px] px-5 py-16">
          <p className="mb-10 text-center text-[15px] tracking-[0.04em] text-[#6E7378]">
            まだまだ、これだけ。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {MORE.map((item) => (
              <div
                key={item.k}
                className="min-w-[240px] flex-[1_1_260px] rounded-[16px] border border-[#ECE7DE] bg-[#FAF7F2] px-6 py-7"
              >
                <p className="mb-2 text-[16px] font-bold text-[#2A2E33]">
                  {item.k}
                </p>
                <p className="text-[14px] leading-[1.85] text-[#6E7378]">
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#ECE7DE] bg-[#FAF7F2] px-5 py-20 text-center">
        <div className="mx-auto mb-6 w-28">
          <Spectrum />
        </div>
        <h2 className="mb-3 text-[26px] font-extrabold tracking-[-0.01em]">
          色を、あなたの味方に。
        </h2>
        <p className="mx-auto mb-8 max-w-[520px] text-[15px] leading-[1.9] text-[#6E7378]">
          アカウント登録は不要。すぐに使い始められます。
        </p>
        <div className="flex justify-center">
          <AppStoreBadge />
        </div>
      </section>

      {/* Contact 導線 */}
      <section className="border-t border-[#ECE7DE] bg-white px-5 py-16 text-center">
        <h2 className="mb-3 text-[22px] font-extrabold tracking-[-0.01em]">
          お困りですか？
        </h2>
        <p className="mx-auto mb-7 max-w-[480px] text-[15px] leading-[1.9] text-[#6E7378]">
          アプリの使い方・ご要望・不具合のご報告など、
          <br className="max-[480px]:hidden" />
          お気軽にお問い合わせください。
        </p>
        <Link
          href="/contact?category=app&app=seehue"
          className="inline-block rounded-[12px] border border-[#ECE7DE] bg-[#FAF7F2] px-8 py-3 text-[15px] font-bold text-[#337AE6] no-underline transition-transform hover:-translate-y-0.5"
        >
          お問い合わせ
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
              お問い合わせ
            </Link>
            <Link
              href="/seehue/privacy-policy"
              className="text-[13px] text-[#6E7378] no-underline transition-colors hover:text-[#337AE6]"
            >
              プライバシーポリシー
            </Link>
          </div>
          <p className="mx-auto max-w-[560px] text-[11px] leading-[1.7] text-[#9AA0A6]">
            本アプリは色の見分けを支援するツールであり、色覚特性の診断・治療を行うものではありません。
            正確な診断は眼科を受診してください。
          </p>
          <p className="text-[13px] text-[#6E7378]">© 2026 ychof</p>
        </div>
      </footer>
    </div>
  );
}
