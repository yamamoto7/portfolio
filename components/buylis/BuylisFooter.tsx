import Link from "next/link";
import Image from "next/image";

export default function BuylisFooter() {
  return (
    <footer className="mx-auto w-[600px] max-w-[90%] py-20">
      <div className="flex flex-wrap justify-between">
        <Link href="/" className="inline-block">
          <Image
            src="/logo.svg"
            alt="ychof villa"
            width={247}
            height={82}
            className="w-[140px]"
          />
        </Link>
        <div className="pt-2.5">
          <Link href="/buylis">アプリ紹介ページ</Link>
          <br />
          <Link href="/buylis/privacy-policy">プライバシーポリシー</Link>
        </div>
        <div className="pt-2.5">
          <Link href="/">開発者について</Link>
        </div>
      </div>
      <div className="text-center text-xs">© 2022 All rights reserved</div>
    </footer>
  );
}
