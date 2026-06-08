import type { Metadata } from "next";
import Link from "next/link";
import VerdashHeader from "@/components/verdash/VerdashHeader";
import {
  VERDASH_APP_NAME,
  VERDASH_SHORT_NAME,
  VERDASH_EFFECTIVE_DATE,
} from "@/lib/verdash";

export const metadata: Metadata = {
  title: `プライバシーポリシー — ${VERDASH_APP_NAME}`,
};

const APP_NAME = VERDASH_APP_NAME;
const EFFECTIVE_DATE = VERDASH_EFFECTIVE_DATE;

/* Verdash 用のダークなプライバシーポリシー版面。共有の TERMS_WRAPPER_CLASS は
 * ライト前提（暗い文字色）のため、ここではダーク向けに個別指定する。 */
const WRAP = [
  "font-jp mx-auto w-[640px] max-w-[90%] text-[#EDEDED]",
  "pt-[50px] pb-[35px] min-[768px]:pt-[90px] min-[768px]:pb-[60px] min-[992px]:pt-[100px] min-[992px]:pb-[80px]",
  "[&_h2]:mb-10 [&_h2]:text-center [&_h2]:font-mono [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:tracking-[-0.02em] min-[768px]:[&_h2]:text-5xl",
  "[&_h4]:mt-[34px] [&_h4]:mb-2.5 [&_h4]:text-xl [&_h4]:font-bold [&_h4]:tracking-[-0.01em]",
  "[&_p]:my-3 [&_p]:text-[15px] [&_p]:leading-[1.9] [&_p]:text-[#A1A1A1]",
  "[&_li]:my-1.5 [&_li]:text-[15px] [&_li]:leading-[1.9] [&_li]:text-[#A1A1A1]",
  "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5",
  "[&_a]:text-[#337AE6] [&_a]:underline",
].join(" ");

export default function Page() {
  return (
    <div className="font-jp flex min-h-screen flex-col bg-black text-[#EDEDED]">
      <VerdashHeader
        right={
          <Link
            href="/verdash"
            className="text-[13px] text-[#8F8F8F] no-underline transition-colors hover:text-[#EDEDED]"
          >
            アプリ紹介
          </Link>
        }
      />

      <div className={`${WRAP} flex-1`}>
        <h2>Privacy Policy</h2>

        <h4>はじめに</h4>
        <p>こちらは「{APP_NAME}」（以下「本アプリ」）のプライバシーポリシーです。</p>
        <p>
          本アプリは、ychofが提供する、Vercel をiPhoneから操作するための非公式ダッシュボードクライアントです。
          本アプリは Vercel Inc. が提供する公式アプリではなく、同社とは無関係です。Vercel は Vercel Inc. の商標です。
        </p>
        <p>
          本アプリを利用される場合、このポリシーに記載された情報の取り扱いに同意されたものとします。
        </p>

        <h4>情報の収集について</h4>
        <p>
          本アプリは、ychofが運営するサーバーを持ちません。アカウント登録も不要です。
          ychofが、お客様の個人情報やVercel上のデータを収集・保存・閲覧することはありません。
        </p>

        <h4>アクセストークンの取り扱い</h4>
        <p>
          本アプリのご利用には、Vercel の Personal Access Token (PAT)
          が必要です。入力されたトークンは、お客様のデバイス内の
          iOS キーチェーン（Keychain）にのみ安全に保存され、ychof
          を含む第三者に送信されることはありません。トークンはアプリ内からいつでも削除できます。
        </p>

        <h4>Vercel API との通信</h4>
        <p>
          本アプリは、お客様のトークンを用いて、お客様の端末から直接
          Vercel の API とHTTPSで通信します。表示されるプロジェクト・デプロイ・ログ・環境変数などの情報は、
          この通信によってその都度取得されるもので、お客様のデバイス外（ychof側）に蓄積されることはありません。
        </p>
        <p>
          Vercel
          へ送信・取得される情報や、Vercel側での取り扱いについては、
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel のプライバシーポリシー
          </a>
          が適用されます。
        </p>

        <h4>ログデータについて</h4>
        <p>
          本アプリでエラーが発生した場合、Appleの仕組みを通じて、デバイスの種別、
          OSのバージョン、エラー発生時の状況などの診断情報がAppleに送信される場合があります。
          これはお客様がデバイスの設定で許可している場合に限られ、ychofが個人を特定できる情報を受け取ることはありません。
        </p>

        <h4>セキュリティ</h4>
        <p>
          アクセストークンはiOSのキーチェーンに保存し、Vercel
          API との通信はすべてHTTPSで行います。
          お客様の情報を保護するよう努めていますが、電子的な保存・送信方法は100％安全とは限らず、絶対的な安全性を保証するものではありません。
          トークンの管理（不要になった際の失効など）はお客様ご自身でも行ってください。
        </p>

        <h4>子供のプライバシー</h4>
        <p>
          本アプリは開発者向けのツールであり、13歳未満のお子様を対象としていません。
          ychofが13歳未満のお子様から個人を特定できる情報を収集することはありません。
        </p>

        <h4>本プライバシーポリシーの変更</h4>
        <p>
          本ポリシーは随時更新されることがあります。変更があった場合は、このページに掲載してお知らせします。
          定期的にこのページをご確認いただくことをお勧めします。
        </p>
        <p>このポリシーは、{EFFECTIVE_DATE}より有効となります。</p>

        <h4>お問い合わせ</h4>
        <p>
          本プライバシーポリシーについてご質問やご提案がありましたら、
          <Link href="/contact?category=app&app=verdash">こちら</Link>
          からお気軽にお問い合わせください。
        </p>
      </div>

      <footer className="border-t border-[#232323] bg-black px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link
              href="/verdash"
              className="text-[13px] text-[#8F8F8F] no-underline transition-colors hover:text-[#EDEDED]"
            >
              アプリ紹介
            </Link>
            <Link
              href="/contact?category=app&app=verdash"
              className="text-[13px] text-[#8F8F8F] no-underline transition-colors hover:text-[#EDEDED]"
            >
              お問い合わせ
            </Link>
            <span className="text-[13px] text-[#8F8F8F]">© 2026 ychof</span>
          </div>
          <p className="mx-auto max-w-[520px] font-mono text-[11px] leading-[1.7] text-[#5F5F5F]">
            {VERDASH_SHORT_NAME} は Vercel Inc. の公式アプリではありません。
          </p>
        </div>
      </footer>
    </div>
  );
}
