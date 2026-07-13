import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import Wordmark from "@/components/Wordmark";
import {
  CONTACT_CATEGORIES,
  CONTACT_APPS,
  APP_CATEGORY_ID,
} from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about how to use an app, feature requests, bug reports, work inquiries, and more. Feel free to get in touch.",
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
          <Wordmark href="/" />
        </div>
      </header>

      <main className="mx-auto w-[800px] max-w-[90%] flex-1 pt-16 pb-20">
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-[28px] font-extrabold tracking-[-0.01em]">
            Contact
          </h1>
          <p className="mx-auto max-w-[560px] text-[15px] leading-[1.9] text-muted">
            Questions about how to use an app, feature requests, bug reports, work inquiries, and more.
            <br className="max-[560px]:hidden" />
            Feel free to get in touch.
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
            ← Back to top
          </Link>
          <p className="mt-2">© 2026 ychof</p>
        </div>
      </footer>
    </div>
  );
}
