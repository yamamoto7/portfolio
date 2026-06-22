import type { Metadata } from "next";
import Link from "next/link";
import MarkPadHeader from "@/components/markpad/MarkPadHeader";
import { TERMS_WRAPPER_CLASS } from "@/lib/terms";
import { MARKPAD_APP_NAME, MARKPAD_EFFECTIVE_DATE } from "@/lib/markpad";

export const metadata: Metadata = {
  title: `プライバシーポリシー — ${MARKPAD_APP_NAME}`,
};

const APP_NAME = MARKPAD_APP_NAME;
const EFFECTIVE_DATE = MARKPAD_EFFECTIVE_DATE;

export default function Page() {
  return (
    <div className="font-jp flex min-h-screen flex-col bg-[#FBFBFC] text-[#1F2328]">
      <MarkPadHeader
        right={
          <Link
            href="/markpad"
            className="text-[13px] text-[#656D76] no-underline transition-colors hover:text-[#337AE5]"
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
          本アプリは、ychofが提供する Markdown エディター／プレビューアです。
          本アプリを利用される場合、このポリシーに記載された情報の取り扱いに同意されたものとします。
        </p>

        <h4>情報の収集について</h4>
        <p>
          本アプリは、ychofが運営するサーバーを持ちません。アカウント登録も不要です。
          作成したノートやタグ・設定などのデータは、すべてお客様のデバイス内にのみ保存されます。
          クラウド同期は行わず、ychofがこれらの内容を収集・保存・閲覧することはありません。
        </p>

        <h4>共有・書き出しについて</h4>
        <p>
          本アプリでは、ノートをテキストや .md ファイルとして共有・書き出しできます。
          共有先（AirDrop・メール・各種アプリなど）や保存先はお客様ご自身が選択するもので、
          ychofのサーバーへ送信・保存されることはありません。
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
          コードのハイライトや図の描画も、すべてアプリ内（オフライン）で完結します。
        </p>

        <h4>ログデータについて</h4>
        <p>
          本アプリでエラーが発生した場合、Appleの仕組みを通じて、デバイスの種別・OSのバージョン・
          エラー発生時の状況などの診断情報がAppleに送信される場合があります。
          これはお客様がデバイスの設定で許可している場合に限られ、ychofが個人を特定できる情報を受け取ることはありません。
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
          <Link href="/contact?category=app&app=markpad">こちら</Link>
          からお気軽にお問い合わせください。
        </p>
      </div>

      <footer className="bg-[#FBFBFC] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link
            href="/markpad"
            className="text-[13px] text-[#656D76] no-underline transition-colors hover:text-[#337AE5]"
          >
            アプリ紹介
          </Link>
          <Link
            href="/contact?category=app&app=markpad"
            className="text-[13px] text-[#656D76] no-underline transition-colors hover:text-[#337AE5]"
          >
            お問い合わせ
          </Link>
          <span className="text-[13px] text-[#656D76]">© 2026 ychof</span>
        </div>
      </footer>
    </div>
  );
}
