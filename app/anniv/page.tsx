import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnnivHeader from "@/components/anniv/AnnivHeader";
import { ANNIV_APP_NAME, ANNIV_SHORT_NAME } from "@/lib/anniv";

export const metadata: Metadata = {
  title: ANNIV_APP_NAME,
  description:
    "大切な人の誕生日や記念日と「贈り物の記録」をまとめて管理できる、シンプルな誕生日＆ギフト手帳。近づくと通知でお知らせ。アカウント登録は不要で、データは端末内に保存されます。",
};

// TODO: App Store 公開後にURLを設定
const APP_STORE_URL = "#";

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
    heading: "誕生日も、記念日も。",
    desc: "結婚記念日や付き合った日などの大切な記念日も、誕生日と一緒に登録。あと何日かを自動で数えて、近づいたらお知らせします。",
    shot: 2,
    alt: "人物の詳細と記念日の管理画面",
  },
  {
    badge: "REMINDER",
    heading: "当日も、数日前も。逃さない。",
    desc: "当日や数日前に、ローカル通知でそっとお知らせ。タグごとに通知のタイミングを変えられるので、間柄に合わせてお祝いの準備ができます。",
    shot: 3,
    alt: "通知設定の画面",
  },
  {
    badge: "GIFTS",
    heading: "あげた物・欲しい物を、記録。",
    desc: "誰に・いつ・どんな機会で贈ったかを記録。「欲しい」と言っていたものも参考リンクごと残せて、プレゼントのかぶりやお返しの抜け漏れがなくなります。",
    shot: 4,
    alt: "贈り物・欲しいものリストの画面",
  },
  {
    badge: "MEMO",
    heading: "好みをメモして、来年の一手に。",
    desc: "好きなものや会話の記録を、その人にまつわるメモとして時系列で残せます。次の贈り物選びのヒントが、自然とたまっていきます。",
    shot: 5,
    alt: "メモ・記録の画面",
  },
  {
    badge: "CALENDAR & BACKUP",
    heading: "見渡せる。だから、安心。",
    desc: "カレンダーで一年の大切な日をひと目に。データはバックアップでき、機種変更してもそのまま引き継げます。",
    shot: 6,
    alt: "カレンダー表示とバックアップ",
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
            入手する
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
            大切な人の誕生日、
            <br />
            もう忘れない。
          </h1>
          <p className="mb-9 text-[17px] leading-[1.9] text-[#9C857F]">
            誕生日・記念日と、贈り物の記録をまとめて。
            <br />
            近づいたら通知でお知らせする、誕生日＆ギフト手帳。
          </p>
          <AppStoreBadge />
        </div>
        <Shot n={1} label="誕生日の一覧画面" priority />
      </section>

      {/* コンセプト */}
      <section className="border-y border-[#F2E0DA] bg-white">
        <div className="mx-auto max-w-[760px] px-5 py-16 text-center">
          <p className="text-[19px] leading-[2] font-medium text-[#5C4642]">
            「うっかり忘れてしまう」「前回なにをあげたか思い出せない」
            <br className="max-[560px]:hidden" />
            「“あれ欲しい”と言っていたのにメモし忘れた」。
            <br />
            その悩みを、まるごと。アカウント登録は不要です。
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
          贈る気持ちを、もっと楽しく。
        </h2>
        <p className="mx-auto mb-8 max-w-[460px] text-[15px] leading-[1.9] text-[#9C857F]">
          アカウントは要りません。データはあなたの端末の中だけに保存されます。
        </p>
        <div className="flex justify-center">
          <AppStoreBadge />
        </div>
      </section>

      {/* Contact 導線 */}
      <section className="border-t border-[#F2E0DA] bg-[#FFF8F5] px-5 py-16 text-center">
        <h2 className="mb-3 text-[22px] font-extrabold tracking-[-0.01em]">
          お困りですか？
        </h2>
        <p className="mx-auto mb-7 max-w-[480px] text-[15px] leading-[1.9] text-[#9C857F]">
          アプリの使い方・ご要望・不具合のご報告など、
          <br className="max-[480px]:hidden" />
          お気軽にお問い合わせください。
        </p>
        <Link
          href="/contact?category=app&app=anniv"
          className="inline-block rounded-[12px] border border-[#F2E0DA] bg-white px-8 py-3 text-[15px] font-bold text-[#E8736B] no-underline transition-transform hover:-translate-y-0.5"
        >
          お問い合わせ
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
              お問い合わせ
            </Link>
            <Link
              href="/anniv/privacy-policy"
              className="text-[13px] text-[#9C857F] no-underline transition-colors hover:text-[#E8736B]"
            >
              プライバシーポリシー
            </Link>
          </div>
          <p className="text-[13px] text-[#9C857F]">© 2026 ychof</p>
        </div>
      </footer>
    </div>
  );
}
