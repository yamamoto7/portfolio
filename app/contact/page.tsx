import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";
import {
  CONTACT_CATEGORIES,
  CONTACT_APPS,
  APP_CATEGORY_ID,
} from "@/lib/contact";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "アプリの使い方・ご要望・不具合のご報告、お仕事のご相談など、お気軽にお問い合わせください。",
};

function first(v: string | string[] | undefined): string {
  return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[]; app?: string | string[] }>;
}) {
  const sp = await searchParams;
  const rawCategory = first(sp.category);
  const rawApp = first(sp.app);

  // URL からの事前選択は既知の値だけ許可
  const initialCategory = CONTACT_CATEGORIES.some((c) => c.id === rawCategory)
    ? rawCategory
    : "";
  const initialApp =
    initialCategory === APP_CATEGORY_ID &&
    CONTACT_APPS.some((a) => a.id === rawApp)
      ? rawApp
      : "";

  return (
    <div className="flex min-h-full flex-col bg-white text-app-ink">
      <header className="border-b border-line">
        <div className="mx-auto flex w-[800px] max-w-[90%] items-center py-5">
          <Link href="/" className="inline-block leading-[0]">
            <Image
              src="/logo.svg"
              alt="ychof villa"
              width={247}
              height={82}
              className="h-7 w-auto"
              priority
            />
          </Link>
        </div>
      </header>

      <main className="mx-auto w-[800px] max-w-[90%] flex-1 pt-16 pb-20">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-[28px] font-extrabold tracking-[-0.01em]">
            お問い合わせ
          </h1>
          <p className="mx-auto max-w-[560px] text-[15px] leading-[1.9] text-muted">
            アプリの使い方・ご要望・不具合のご報告、お仕事のご相談など、
            <br className="max-[560px]:hidden" />
            お気軽にお問い合わせください。
          </p>
        </div>

        <ContactForm initialCategory={initialCategory} initialApp={initialApp} />
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
