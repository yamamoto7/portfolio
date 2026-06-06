import type { Metadata } from "next";
import Link from "next/link";
import MugenSudokuHeader from "@/components/mugen-sudoku/MugenSudokuHeader";
import { TERMS_WRAPPER_CLASS } from "@/lib/terms";
import {
  MUGEN_SUDOKU_NAME,
  MUGEN_SUDOKU_ACCENT,
  MUGEN_SUDOKU_EFFECTIVE_DATE,
} from "@/lib/mugen-sudoku";

export const metadata: Metadata = {
  title: `プライバシーポリシー — ${MUGEN_SUDOKU_NAME}`,
};

const APP_NAME = MUGEN_SUDOKU_NAME;

export default function Page() {
  return (
    <div
      className="font-jp flex min-h-screen flex-col bg-white text-app-ink"
      style={{ "--accent": MUGEN_SUDOKU_ACCENT } as React.CSSProperties}
    >
      <MugenSudokuHeader
        right={
          <Link
            href="/mugen-sudoku"
            className="text-[13px] text-muted no-underline transition-colors hover:text-[var(--accent)]"
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
          本アプリのご利用にあたり、ychofがお客様の個人を特定できる情報を収集・閲覧することはありません。
          アカウント登録も必要ありません。
        </p>
        <p>
          ただし本アプリは、お客様を特定しうる情報を収集する可能性のある以下の第三者サービスを利用しています。
        </p>
        <ul>
          <li>
            <a
              href="https://support.google.com/admob/answer/6128543?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
            >
              AdMob（Google）
            </a>
          </li>
        </ul>
        <p>
          これらのサービスが収集する情報やその取り扱いについては、上記リンク先のポリシーをご確認ください。
        </p>

        <h4>ログデータについて</h4>
        <p>
          本アプリでエラーが発生した場合、第三者の製品を通じて、お客様のデバイスのIPアドレス、デバイス名、
          OSのバージョン、本サービスの利用日時、その他の統計情報などのログデータが収集される場合があります。
        </p>

        <h4>クッキー（Cookie）</h4>
        <p>
          クッキーは、一般的に匿名の一意の識別子として使用される少量のデータを含むファイルです。
          本サービス自体がこの「Cookie」を明示的に使用することはありませんが、
          上記の第三者サービスが情報収集や広告配信のために「Cookie」を使用する場合があります。
        </p>

        <h4>セキュリティ</h4>
        <p>
          お客様の情報を保護するよう商業的に利用可能な手段で努めていますが、
          インターネット上の送信方法や電子的な保存方法は100％安全とは限らず、絶対的な安全性を保証するものではありません。
        </p>

        <h4>他のサイトへのリンク</h4>
        <p>
          本サービスには、他のサイトへのリンクが含まれる場合があります。
          これらの外部サイトはychofが運営しているものではないため、各サイトのプライバシーポリシーをご確認いただくことをお勧めします。
          第三者のサイトやサービスの内容・ポリシー・慣行について、ychofは責任を負いません。
        </p>

        <h4>子供のプライバシー</h4>
        <p>
          ychofは、13歳未満のお子様から意図的に個人を特定できる情報を収集することはありません。
          万が一、13歳未満の子供から個人情報が提供されたことが判明した場合は、直ちに削除します。
          保護者の方で、お子様が個人情報を提供したことにお気づきの場合は、ご連絡ください。
        </p>

        <h4>本プライバシーポリシーの変更</h4>
        <p>
          本ポリシーは随時更新されることがあります。変更があった場合は、このページに掲載してお知らせします。
          定期的にこのページをご確認いただくことをお勧めします。
        </p>
        <p>このポリシーは、{MUGEN_SUDOKU_EFFECTIVE_DATE}より有効となります。</p>

        <h4>お問い合わせ</h4>
        <p>
          本プライバシーポリシーについてご質問やご提案がありましたら、
          <Link href="/contact?category=app&app=mugen-sudoku">こちら</Link>
          からお気軽にお問い合わせください。
        </p>
      </div>

      <footer className="border-t border-line bg-white px-5 py-12 text-center">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link
            href="/mugen-sudoku"
            className="text-[13px] text-muted no-underline transition-colors hover:text-[var(--accent)]"
          >
            アプリ紹介
          </Link>
          <Link
            href="/contact?category=app&app=mugen-sudoku"
            className="text-[13px] text-muted no-underline transition-colors hover:text-[var(--accent)]"
          >
            お問い合わせ
          </Link>
          <span className="text-[13px] text-muted">© 2026 ychof</span>
        </div>
      </footer>
    </div>
  );
}
