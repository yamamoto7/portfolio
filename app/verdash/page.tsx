import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import VerdashHeader from "@/components/verdash/VerdashHeader";
import { VERDASH_APP_NAME, VERDASH_SHORT_NAME } from "@/lib/verdash";

export const metadata: Metadata = {
  title: VERDASH_APP_NAME,
  description:
    "Vercel をiPhoneから管理する非公式ダッシュボードクライアント。デプロイの監視からロールバック・Promote・ビルドログ・環境変数まで、外出先でも片手で。",
};

// TODO: App Store 公開後にURLを設定
const APP_STORE_URL = "#";

/* ------------------------------------------------------------------ *
 * Verdash は Vercel クライアント。LP もアプリの世界観（黒・モノクロ・
 * ブルーのアクセント・デプロイ状態のバッジ）をそのまま移植する。
 * ビジュアルは App Store 提出用スクショ（上部見出しをクロップ済み）を使用。
 * ※ Vercel Inc. の公式アプリではない旨を各所に明記する。
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
        src={`/contents/verdash/screen${n}.png`}
        alt={label}
        width={1320}
        height={h}
        priority={priority}
        className="h-auto w-full rounded-[26px] border border-[#232323] shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
      />
    </div>
  );
}

/** デプロイの状態バッジ（アプリ内のバッジ表現を踏襲）。 */
const STATUSES: { label: string; dot: string }[] = [
  { label: "Ready", dot: "#34D399" },
  { label: "Building", dot: "#FBBF24" },
  { label: "Queued", dot: "#8F8F8F" },
  { label: "Error", dot: "#F87171" },
  { label: "Canceled", dot: "#6B6B6B" },
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
    badge: "ACTIVITY",
    heading: "全プロジェクト横断の、タイムライン。",
    desc: "デプロイをプロジェクトの垣根なく時系列で。ブランチ・コミットメッセージ・相対時刻が並び、Live バッジで稼働中をひと目で把握できます。",
    shot: 2,
    alt: "アクティビティ・タイムライン画面",
  },
  {
    badge: "ROLLBACK",
    heading: "いざという時の操作も、手元で。",
    desc: "Promote（本番昇格）・Rollback（即時ロールバック）・Redeploy・Cancel をワンタップ。ロールバック中はバナーで明示し、解除もすぐに。",
    shot: 3,
    alt: "ロールバック確認とアクション画面",
  },
  {
    badge: "BUILD LOGS",
    heading: "エラー行だけ、抜き出せる。",
    desc: "等幅フォントで全ログをスクロール。エラー行のみ抽出するフィルタと赤色ハイライト、ワンタップのコピー。進行中はプルダウンで再取得できます。",
    shot: 4,
    alt: "ビルドログビューア画面",
  },
  {
    badge: "ENV VARS",
    heading: "環境変数も、外出先から。",
    desc: "機密値はデフォルトでマスク、目アイコンで表示切替。対象環境と種別をバッジ表示し、追加・編集・削除やフィルタ／ソートにも対応します。",
    shot: 5,
    alt: "環境変数の管理画面",
  },
];

const MORE = [
  { k: "ドメイン", v: "検証状態・DNS・リダイレクト" },
  { k: "ファイアウォール", v: "マネージド／カスタムルール" },
  { k: "Edge Config", v: "一覧とキー・バリュー閲覧" },
  { k: "チーム & アカウント", v: "個人／チームのスコープ切替" },
];

export default function Page() {
  return (
    <div className="font-jp min-h-screen bg-black text-[#EDEDED]">
      {/* Header */}
      <VerdashHeader
        right={
          <a
            href={APP_STORE_URL}
            className="rounded-full bg-[#337AE6] px-4 py-2 font-mono text-[13px] font-bold text-white no-underline transition-opacity hover:opacity-90"
          >
            入手する
          </a>
        }
      />

      {/* Hero */}
      <section className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-16 gap-y-10 px-5 pt-20 pb-24 max-[720px]:pt-12 max-[720px]:pb-16">
        <div className="max-w-[460px] flex-[1_1_360px]">
          <Image
            src="/contents/verdash/icon.png"
            alt="Verdash"
            width={1024}
            height={1024}
            className="mb-7 h-16 w-16 rounded-[16px] border border-[#2A2A2A]"
          />
          <span className="mb-4 inline-block font-mono text-[12px] font-bold tracking-[0.14em] text-[#8F8F8F]">
            UNOFFICIAL VERCEL CLIENT
          </span>
          <h1 className="mb-5 text-[40px] leading-[1.4] font-extrabold tracking-[-0.02em] max-[720px]:text-[30px]">
            デプロイ管理を、
            <br />
            iPhoneから。
          </h1>
          <p className="mb-9 text-[17px] leading-[1.9] text-[#8F8F8F]">
            ビルドの監視からロールバック・Promote まで。
            <br />
            外出先でも、本番デプロイを片手で操作。
          </p>
          <AppStoreBadge />
          <p className="mt-6 font-mono text-[11px] leading-[1.7] text-[#5F5F5F]">
            ※ Vercel Inc. の公式アプリではありません。
          </p>
        </div>
        <Shot n={1} label="プロジェクト一覧画面" h={2293} priority />
      </section>

      {/* デプロイ状態バッジ */}
      <section className="border-y border-[#232323] bg-[#0A0A0A]">
        <div className="mx-auto max-w-[960px] px-5 py-16 text-center">
          <p className="mb-9 font-mono text-[13px] tracking-[0.06em] text-[#8F8F8F]">
            デプロイの状態が、ひと目で。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {STATUSES.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-2 rounded-md border border-[#232323] bg-black px-4 py-2 font-mono text-[13px] text-[#EDEDED]"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: s.dot }}
                />
                {s.label}
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
            className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 border-[#232323] py-16 [&:not(:first-child)]:border-t [&:nth-child(even)]:flex-row-reverse max-[720px]:flex-col max-[720px]:gap-8 max-[720px]:py-12 max-[720px]:[&:nth-child(even)]:flex-col"
          >
            <Shot n={f.shot} label={f.alt} />
            <div className="max-w-[400px] flex-[1_1_320px]">
              <span className="mb-3 inline-block font-mono text-[12px] font-bold tracking-[0.12em] text-[#337AE6]">
                {f.badge}
              </span>
              <h2 className="mb-4 text-[26px] leading-[1.45] font-extrabold tracking-[-0.01em] max-[720px]:text-[22px]">
                {f.heading}
              </h2>
              <p className="text-[15px] leading-[1.95] text-[#8F8F8F]">
                {f.desc}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* さらに手元に */}
      <section className="border-y border-[#232323] bg-[#0A0A0A]">
        <div className="mx-auto max-w-[960px] px-5 py-16 text-center">
          <p className="mb-10 font-mono text-[13px] tracking-[0.06em] text-[#8F8F8F]">
            さらに、これだけ手元に。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {MORE.map((item) => (
              <div
                key={item.k}
                className="min-w-[220px] flex-[1_1_240px] rounded-[12px] border border-[#232323] bg-black px-6 py-7 text-left"
              >
                <p className="mb-1.5 text-[16px] font-bold text-[#EDEDED]">
                  {item.k}
                </p>
                <p className="text-[13px] leading-[1.7] text-[#8F8F8F]">
                  {item.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* セキュリティ（PAT / Keychain / HTTPS） */}
      <section className="border-b border-[#232323] bg-black px-5 py-10">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center font-mono text-[13px] text-[#8F8F8F]">
          <span>Personal Access Token でログイン</span>
          <span className="text-[#3A3A3A] max-[520px]:hidden">·</span>
          <span>トークンは iOS Keychain に保存</span>
          <span className="text-[#3A3A3A] max-[520px]:hidden">·</span>
          <span>通信はすべて HTTPS</span>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#232323] bg-[#0A0A0A] px-5 py-20 text-center">
        <h2 className="mb-3 text-[26px] font-extrabold tracking-[-0.01em]">
          本番は、いつも手の中に。
        </h2>
        <p className="mx-auto mb-8 max-w-[460px] text-[15px] leading-[1.9] text-[#8F8F8F]">
          ご利用には Vercel アカウントと Personal Access Token が必要です。
        </p>
        <div className="flex justify-center">
          <AppStoreBadge />
        </div>
      </section>

      {/* Contact 導線 */}
      <section className="border-t border-[#232323] bg-black px-5 py-16 text-center">
        <h2 className="mb-3 text-[22px] font-extrabold tracking-[-0.01em]">
          お困りですか？
        </h2>
        <p className="mx-auto mb-7 max-w-[480px] text-[15px] leading-[1.9] text-[#8F8F8F]">
          アプリの使い方・ご要望・不具合のご報告など、
          <br className="max-[480px]:hidden" />
          お気軽にお問い合わせください。
        </p>
        <Link
          href="/contact?category=app&app=verdash"
          className="inline-block rounded-[12px] border border-[#232323] bg-[#0A0A0A] px-8 py-3 text-[15px] font-bold text-[#337AE6] no-underline transition-transform hover:-translate-y-0.5"
        >
          お問い合わせ
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-black px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-col items-center gap-3">
          <span className="font-mono text-[15px] font-bold text-[#8F8F8F]">
            {VERDASH_SHORT_NAME}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href="/contact?category=app&app=verdash"
              className="text-[13px] text-[#8F8F8F] no-underline transition-colors hover:text-[#EDEDED]"
            >
              お問い合わせ
            </Link>
            <Link
              href="/verdash/privacy-policy"
              className="text-[13px] text-[#8F8F8F] no-underline transition-colors hover:text-[#EDEDED]"
            >
              プライバシーポリシー
            </Link>
          </div>
          <p className="mx-auto max-w-[520px] font-mono text-[11px] leading-[1.7] text-[#5F5F5F]">
            本アプリは Vercel Inc. が提供する公式アプリではありません。Vercel
            は Vercel Inc. の商標です。
          </p>
          <p className="text-[13px] text-[#8F8F8F]">© 2026 ychof</p>
        </div>
      </footer>
    </div>
  );
}
