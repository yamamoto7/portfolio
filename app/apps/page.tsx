import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Wordmark from "@/components/Wordmark";
import { appDirectory } from "@/lib/app-directory";

export const metadata: Metadata = {
  title: "アプリ一覧",
  description:
    "ychof（Kenta Yamamoto）が個人で開発・公開している iOS アプリの一覧。",
};

export default function Page() {
  return (
    <div className="flex min-h-full flex-col bg-white text-app-ink">
      <header className="border-b border-line">
        <div className="mx-auto flex w-[800px] max-w-[90%] items-center justify-between py-5">
          <Wordmark href="/" />
          <Link
            href="/contact"
            className="text-[13px] text-muted no-underline transition-colors hover:text-app-ink"
          >
            お問い合わせ
          </Link>
        </div>
      </header>

      <main className="mx-auto w-[800px] max-w-[90%] flex-1 pt-16 pb-20">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-[28px] font-extrabold tracking-[-0.01em]">
            アプリ一覧
          </h1>
          <p className="mx-auto max-w-[560px] text-[15px] leading-[1.9] text-muted">
            個人で開発・公開している iOS アプリです。
            <br className="max-[560px]:hidden" />
            気になるものがあれば、各ページをのぞいてみてください。
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
          {appDirectory.map((app) => (
            <li key={app.href}>
              <Link
                href={app.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d4dae3] hover:shadow-[0_14px_32px_rgba(27,35,48,0.08)]"
              >
                <div className="mb-4 flex items-start gap-4">
                  <Image
                    src={app.icon}
                    alt={app.name}
                    width={1024}
                    height={1024}
                    className="h-14 w-14 shrink-0 rounded-[14px] border border-line"
                  />
                  <div className="min-w-0 flex-1">
                    <span
                      className="mb-1 block font-mono text-[10px] font-bold tracking-[0.16em]"
                      style={{ color: app.accent }}
                    >
                      {app.genre}
                    </span>
                    <h2 className="truncate text-[17px] font-bold tracking-[-0.01em] text-app-ink">
                      {app.name}
                    </h2>
                  </div>
                  <span
                    className="shrink-0 translate-x-1 text-[18px] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    style={{ color: app.accent }}
                    aria-hidden
                  >
                    ↗
                  </span>
                </div>
                <p className="text-[14px] leading-[1.85] text-muted">
                  {app.tagline}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto w-[800px] max-w-[90%] py-8 text-center text-[13px] text-muted">
          <Link
            href="/"
            className="text-muted no-underline transition-colors hover:text-app-ink"
          >
            ← トップへ戻る
          </Link>
          <p className="mt-2">© 2026 ychof</p>
        </div>
      </footer>
    </div>
  );
}
