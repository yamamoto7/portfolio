import Link from "next/link";
import Image from "next/image";
import type { AppConfig } from "@/lib/apps";

export default function AppFooter({ app }: { app: AppConfig }) {
  const linkClass = "text-sm text-muted no-underline hover:text-[var(--accent)]";
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-between gap-4 px-5 pt-9 pb-3">
        <Link
          href={`/${app.slug}`}
          className="flex items-center gap-2.5 text-[15px] font-bold text-app-ink no-underline"
        >
          <Image
            src={`/contents/${app.slug}/icon.png`}
            alt={app.displayName}
            width={1024}
            height={1024}
            className="h-7 w-7 rounded-[7px]"
          />
          <span>{app.displayName}</span>
        </Link>
        <nav className="flex flex-wrap gap-5">
          <Link href={`/${app.slug}`} className={linkClass}>
            アプリ紹介
          </Link>
          <Link href={`/${app.slug}/privacy-policy`} className={linkClass}>
            プライバシーポリシー
          </Link>
          <a
            href={app.contactForm}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            お問い合わせ
          </a>
          <Link href="/" className={linkClass}>
            開発者について
          </Link>
        </nav>
      </div>
      <div className="px-5 pt-2 pb-7 text-center text-xs text-muted">
        © 2026 ychof. All rights reserved.
      </div>
    </footer>
  );
}
