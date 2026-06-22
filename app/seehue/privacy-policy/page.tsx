import type { Metadata } from "next";
import Link from "next/link";
import SeeHueHeader from "@/components/seehue/SeeHueHeader";
import { TERMS_WRAPPER_CLASS } from "@/lib/terms";
import { SEEHUE_APP_NAME, SEEHUE_EFFECTIVE_DATE } from "@/lib/seehue";

export const metadata: Metadata = {
  title: `プライバシーポリシー — ${SEEHUE_APP_NAME}`,
};

const APP_NAME = SEEHUE_APP_NAME;
const EFFECTIVE_DATE = SEEHUE_EFFECTIVE_DATE;

export default function Page() {
  return (
    <div className="font-jp flex min-h-screen flex-col bg-[#FAF7F2] text-[#2A2E33]">
      <SeeHueHeader
        right={
          <Link
            href="/seehue"
            className="text-[13px] text-[#6E7378] no-underline transition-colors hover:text-[#337AE6]"
          >
            アプリ紹介
          </Link>
        }
      />

      <div className={`${TERMS_WRAPPER_CLASS} flex-1`}>
        <h2>Privacy Policy</h2>

        <h4>はじめに</h4>
        <p>こちらは「{APP_NAME}」（以下「本アプリ」）のプライバシーポリシーです。</p>
        <p>
          本アプリは、ychofが提供する、色が見分けにくい方のための色のサポートカメラです。
          本アプリを利用される場合、このポリシーに記載された情報の取り扱いに同意されたものとします。
        </p>

        <h4>情報の収集について</h4>
        <p>
          本アプリは、ychofが運営するサーバーを持ちません。アカウント登録も不要です。
          作成したプロファイルや保存した色などの設定は、すべてお客様のデバイス内にのみ保存され、
          ychofが収集・保存・閲覧することはありません。
        </p>

        <h4>カメラの利用について</h4>
        <p>
          本アプリは、色の補正・シミュレーションや色名の確認のためにカメラを使用します。
          カメラの映像は、お客様のデバイス内でリアルタイムに処理されるだけで、保存も外部への送信も行いません。
        </p>

        <h4>写真へのアクセス</h4>
        <p>
          写真を読み込んで補正・シミュレーションする場合、お客様が選択した画像をデバイス内でのみ処理します。
          補正した画像を保存する操作を行った場合に限り、お客様の写真ライブラリに保存されます。
          画像が ychof を含む第三者へ送信されることはありません。
        </p>

        <h4>お問い合わせフォームについて</h4>
        <p>
          アプリ内のお問い合わせ機能をご利用いただいた場合に限り、入力いただいた本文と、
          不具合の調査に必要な技術情報（OSのバージョン・アプリのバージョン・ビルド番号）が開発者へ送信されます。
          これはお客様が送信操作を行った場合のみで、自動的に収集されることはありません。
        </p>

        <h4>広告・解析について</h4>
        <p>
          本アプリは、広告SDKや、お客様の行動を追跡する解析ツールを使用していません。
        </p>

        <h4>ログデータについて</h4>
        <p>
          本アプリでエラーが発生した場合、Appleの仕組みを通じて、デバイスの種別・OSのバージョン・
          エラー発生時の状況などの診断情報がAppleに送信される場合があります。
          これはお客様がデバイスの設定で許可している場合に限られ、ychofが個人を特定できる情報を受け取ることはありません。
        </p>

        <h4>免責事項</h4>
        <p>
          本アプリは色の見分けを支援するツールであり、色覚特性の診断・治療を行うものではありません。
          セルフチェックの結果は画面の明るさや照明、端末の色表現によって変わります。
          正確な診断については眼科を受診してください。
        </p>

        <h4>セキュリティ</h4>
        <p>
          お客様の情報を保護するよう努めていますが、電子的な保存・送信方法は100％安全とは限らず、
          絶対的な安全性を保証するものではありません。
        </p>

        <h4>子供のプライバシー</h4>
        <p>
          ychofは、13歳未満のお子様から意図的に個人を特定できる情報を収集することはありません。
          万が一、13歳未満の子供から個人情報が提供されたことが判明した場合は、直ちに削除します。
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
          <Link href="/contact?category=app&app=seehue">こちら</Link>
          からお気軽にお問い合わせください。
        </p>
      </div>

      <footer className="bg-[#FAF7F2] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link
            href="/seehue"
            className="text-[13px] text-[#6E7378] no-underline transition-colors hover:text-[#337AE6]"
          >
            アプリ紹介
          </Link>
          <Link
            href="/contact?category=app&app=seehue"
            className="text-[13px] text-[#6E7378] no-underline transition-colors hover:text-[#337AE6]"
          >
            お問い合わせ
          </Link>
          <span className="text-[13px] text-[#6E7378]">© 2026 ychof</span>
        </div>
      </footer>
    </div>
  );
}
