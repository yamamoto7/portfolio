import type { Metadata } from "next";
import Link from "next/link";
import LasttimeHeader from "@/components/lasttime/LasttimeHeader";
import { TERMS_WRAPPER_CLASS } from "@/lib/terms";
import { LASTTIME_APP_NAME, LASTTIME_EFFECTIVE_DATE } from "@/lib/lasttime";

export const metadata: Metadata = {
  title: `プライバシーポリシー — ${LASTTIME_APP_NAME}`,
};

const APP_NAME = LASTTIME_APP_NAME;
const EFFECTIVE_DATE = LASTTIME_EFFECTIVE_DATE;

export default function Page() {
  return (
    <div className="font-jp flex min-h-screen flex-col bg-[#F6F3EC] text-[#2A2A28]">
      <LasttimeHeader
        right={
          <Link
            href="/lasttime-list"
            className="text-[13px] text-[#847F74] no-underline transition-colors hover:text-[#2E6A50]"
          >
            アプリ紹介
          </Link>
        }
      />

      <div className={`${TERMS_WRAPPER_CLASS} flex-1`}>
        <h2>Privacy Policy</h2>

        <h4>はじめに</h4>
        <p>こちらは「{APP_NAME}」アプリのプライバシーポリシーです。</p>
        <p>
          ychofは「{APP_NAME}
          」アプリを無料アプリとして構築しました。本サービスは、ychofが無償で提供するものであり、そのまま使用することを前提としています。
        </p>
        <p>
          本ページは、本サービスをご利用いただくにあたり、個人情報の取り扱いに関する方針をお知らせするものです。
          本サービスを利用される場合、このポリシーに記載された情報の取り扱いに同意されたものとします。
        </p>

        <h4>情報の収集と使用</h4>
        <p>
          「{APP_NAME}
          」で作成した記録・写真・メモなどのデータは、お客様のデバイス内、および後述のお客様自身のiCloudにのみ保存されます。
          ychofがこれらの内容を収集・閲覧・外部送信することはありません。アカウント登録も必要ありません。
        </p>
        <p>
          本アプリは広告を表示しません。アクセス解析などの目的でお客様を特定しうる情報を第三者へ送信することもありません。
        </p>

        <h4>iCloud（iCloud同期）について</h4>
        <p>
          お客様がiCloudにサインインしている場合、本アプリの記録・写真は、機種変更やバックアップに備えて
          Appleが提供するiCloud（CloudKit）にお客様自身のアカウントで同期されます。
          このデータはお客様のApple
          IDに紐づくもので、ychofがアクセスすることはできません。
          iCloudに保存された情報の取り扱いについては、
          <a
            href="https://www.apple.com/legal/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Appleのプライバシーポリシー
          </a>
          が適用されます。iCloudへの同期を望まない場合は、端末の設定からオフにできます。
        </p>

        <h4>写真について</h4>
        <p>
          記録に写真を添付する際、本アプリは写真ライブラリやカメラへのアクセスを求めることがあります。
          選択・撮影された写真は記録の一部としてお客様のデバイス（およびお客様のiCloud）に保存され、
          外部に送信されることはありません。
        </p>

        <h4>ログデータについて</h4>
        <p>
          本アプリでエラーが発生した場合、Appleの仕組みを通じて、デバイスの種別、
          OSのバージョン、エラー発生時の状況などの診断情報がAppleに送信される場合があります。
          これはお客様がデバイスの設定で許可している場合に限られ、ychofが個人を特定できる情報を受け取ることはありません。
        </p>

        <h4>セキュリティ</h4>
        <p>
          本アプリは、設定でFace ID / Touch ID
          / パスコードによる起動時ロックを有効にできます。
          お客様の情報を保護するよう努めていますが、電子的な保存方法は100％安全とは限らず、絶対的な安全性を保証するものではありません。
        </p>

        <h4>子供のプライバシー</h4>
        <p>
          ychofは、13歳未満のお子様から意図的に個人を特定できる情報を収集することはありません。
          そもそも本アプリはお客様の情報を外部に収集しませんが、万が一懸念がある場合はご連絡ください。
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
          <Link href="/contact?category=app&app=lasttime-list">こちら</Link>
          からお気軽にお問い合わせください。
        </p>
      </div>

      <footer className="bg-[#F6F3EC] px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link
            href="/lasttime-list"
            className="text-[13px] text-[#847F74] no-underline transition-colors hover:text-[#2E6A50]"
          >
            アプリ紹介
          </Link>
          <Link
            href="/contact?category=app&app=lasttime-list"
            className="text-[13px] text-[#847F74] no-underline transition-colors hover:text-[#2E6A50]"
          >
            お問い合わせ
          </Link>
          <span className="text-[13px] text-[#847F74]">© 2026 ychof</span>
        </div>
      </footer>
    </div>
  );
}
