import Image from "next/image";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import type { AppConfig } from "@/lib/apps";

function StoreButtons() {
  // TODO: App Store / Google Play のURLを設定
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {(["appstore", "playstore"] as const).map((store) => (
        <a key={store} href="#">
          <Image
            src={`/contents/common/${store}.png`}
            alt={store === "appstore" ? "App Store" : "Google Play"}
            width={342}
            height={108}
            className="h-12 w-auto transition-transform hover:-translate-y-0.5"
          />
        </a>
      ))}
    </div>
  );
}

export default function AppLanding({ app }: { app: AppConfig }) {
  return (
    <div
      className="font-jp text-app-ink"
      style={{ "--accent": app.accent } as React.CSSProperties}
    >
      <AppHeader app={app} />

      <section className="border-b border-line bg-gradient-to-b from-bg-alt to-white">
        <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-center gap-12 px-5 pt-16 pb-[72px] max-[720px]:gap-8 max-[720px]:pt-11 max-[720px]:pb-[52px]">
          <div className="flex w-[320px] max-w-[80vw] shrink-0 justify-center">
            <Image
              src={`/contents/${app.slug}/mv.png`}
              alt={app.displayName}
              width={app.mvSize.w}
              height={app.mvSize.h}
              priority
              className="h-auto w-full [filter:drop-shadow(0_24px_48px_rgba(27,35,48,0.18))]"
            />
          </div>
          <div className="max-w-[460px] flex-[1_1_360px]">
            <Image
              src={`/contents/${app.slug}/name.png`}
              alt={app.displayName}
              width={app.nameSize.w}
              height={app.nameSize.h}
              className="mb-[22px] h-10 w-auto"
            />
            <h1 className="mb-4 text-[32px] leading-[1.35] font-extrabold max-[720px]:text-[26px]">
              {app.heroTitle[0]}
              <br />
              {app.heroTitle[1]}
            </h1>
            <p className="mb-7 text-base text-muted">{app.heroLead}</p>
            <div className="flex flex-wrap gap-3">
              <StoreButtons />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[960px] px-5 pt-4 pb-6">
        {app.features.map((feature, i) => (
          <section
            key={feature.heading}
            className="flex flex-wrap items-center justify-center gap-14 border-line py-14 first:border-t-0 [&:not(:first-child)]:border-t [&:nth-child(even)]:flex-row-reverse max-[720px]:flex-col max-[720px]:gap-7 max-[720px]:py-10 max-[720px]:[&:nth-child(even)]:flex-col"
          >
            <div className="w-[240px] max-w-[70vw] shrink-0 max-[720px]:w-[200px]">
              <Image
                src={`/contents/${app.slug}/screen${i + 1}.png`}
                alt=""
                width={1116}
                height={2270}
                className="h-auto w-full rounded-[28px] shadow-[0_18px_40px_rgba(27,35,48,0.16)]"
              />
            </div>
            <div className="max-w-[420px] flex-[1_1_320px]">
              <span className="mb-3 inline-block text-[13px] font-bold tracking-[0.08em] text-[var(--accent)]">
                POINT 0{i + 1}
              </span>
              <h2 className="mb-3 text-2xl leading-[1.4] font-extrabold">
                {feature.heading}
              </h2>
              <p className="text-[15px] text-muted">{feature.desc}</p>
            </div>
          </section>
        ))}
      </div>

      <section className="border-t border-line bg-bg-alt px-5 py-16 text-center">
        <p className="mb-6 text-[22px] font-extrabold">{app.ctaTitle}</p>
        <StoreButtons />
      </section>

      <section className="border-t border-line bg-white px-5 py-14 text-center">
        <h2 className="mb-2.5 text-xl font-extrabold">お困りですか？</h2>
        <p className="mx-auto mb-6 max-w-[520px] text-[15px] text-muted">
          アプリの使い方・ご要望・不具合のご報告など、お気軽にお問い合わせください。
        </p>
        <a
          href={app.contactForm}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-[10px] bg-[var(--accent)] px-8 py-[13px] text-[15px] font-bold text-white no-underline transition-transform hover:-translate-y-0.5 hover:opacity-90"
        >
          お問い合わせ
        </a>
      </section>

      <AppFooter app={app} />
    </div>
  );
}
