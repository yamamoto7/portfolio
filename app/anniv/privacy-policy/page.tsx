import type { Metadata } from "next";
import Link from "next/link";
import AnnivHeader from "@/components/anniv/AnnivHeader";
import { TERMS_WRAPPER_CLASS } from "@/lib/terms";
import { ANNIV_APP_NAME, ANNIV_EFFECTIVE_DATE } from "@/lib/anniv";

export const metadata: Metadata = {
  title: `プライバシーポリシー — ${ANNIV_APP_NAME}`,
};

const APP_NAME = ANNIV_APP_NAME;
const EFFECTIVE_DATE = ANNIV_EFFECTIVE_DATE;

export default function Page() {
  return (
    <div className="font-jp flex min-h-screen flex-col bg-[#FFF8F5] text-[#3D2B28]">
      <AnnivHeader
        right={
          <Link
            href="/anniv"
            className="text-[13px] text-[#9C857F] no-underline transition-colors hover:text-[#E8736B]"
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
          本アプリは、ychofが無料で提供する、誕生日・記念日と贈り物の記録を管理するためのアプリです。
          本アプリを利用される場合、このポリシーに記載された情報の取り扱いに同意されたものとします。
        </p>

        <h4>情報の収集について</h4>
        <p>
          本アプリは、ychofが運営するサーバーを持ちません。アカウント登録も不要です。
          登録した人物・誕生日・記念日・贈り物の記録・メモ・写真などのデータは、すべてお客様のデバイス内にのみ保存されます。
          ychofがこれらの内容を収集・保存・閲覧することはありません。
        </p>

        <h4>写真へのアクセス</h4>
        <p>
          人物のアイコンに写真を設定する場合に限り、お客様が選択した写真を本アプリが読み込みます。
          選択した写真はデバイス内のデータとして保存され、ychofを含む第三者に送信されることはありません。
        </p>

        <h4>通知について</h4>
        <p>
          誕生日や記念日のリマインダーは、お客様のデバイス内で動作するローカル通知として送信されます。
          通知の利用は任意で、デバイスの設定からいつでもオフにできます。通知のために情報が外部へ送信されることはありません。
        </p>

        <h4>データのバックアップ</h4>
        <p>
          本アプリのバックアップ機能は、お客様の操作によってデータをファイルとして書き出し・読み込みするものです。
          書き出したファイルの保存先や共有はお客様ご自身の管理下にあり、ychofのサーバーへ送信・保存されることはありません。
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
          <Link href="/contact?category=app&app=anniv">こちら</Link>
          からお気軽にお問い合わせください。
        </p>
      </div>

      <footer className="bg-[#FFF8F5] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link
            href="/anniv"
            className="text-[13px] text-[#9C857F] no-underline transition-colors hover:text-[#E8736B]"
          >
            アプリ紹介
          </Link>
          <Link
            href="/contact?category=app&app=anniv"
            className="text-[13px] text-[#9C857F] no-underline transition-colors hover:text-[#E8736B]"
          >
            お問い合わせ
          </Link>
          <span className="text-[13px] text-[#9C857F]">© 2026 ychof</span>
        </div>
      </footer>
    </div>
  );
}
