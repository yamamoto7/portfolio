"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFluid } from "@/lib/lab/useFluid";
import { cssFontFamily } from "@/lib/lab/glu";

// Minimal portfolio over the fluid engine. Only three things on the home view:
// the name (top half), a Profile link (bottom-left) and a Works link
// (bottom-right). Each link emits "smoke" into the same fluid space behind it.

const SOCIAL = [
  { label: "GitHub", href: "https://github.com/yamamoto7" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kentayamamoto7/" },
  { label: "Facebook", href: "https://www.facebook.com/kenta.yamamoto.94064176" },
  { label: "履歴書 JP", href: "https://github.com/yamamoto7/yamamoto7/blob/master/RESUME.md" },
  { label: "Resume EN", href: "https://github.com/yamamoto7/yamamoto7/blob/master/RESUME-en.md" },
];

const WORKS = [
  {
    title: "Buylis — Shopping list app",
    stack: "Flutter · React · Gatsby",
    href: "/buylis",
    about: "買い物リストを家族と共有できるモバイルアプリ。LP も自作。",
  },
  {
    title: "Portfolio",
    stack: "React · Gatsby · TypeScript",
    href: "https://github.com/yamamoto7/portfolio",
    about: "このサイトの前身。",
  },
  {
    title: "Color-blindness simulator",
    stack: "C++ · OpenCV",
    href: "https://github.com/yamamoto7",
    about: "色覚多様性の見え方を再現し、識別困難領域を可視化。",
  },
];

export default function FluidPortfolio() {
  const ref = useRef<HTMLCanvasElement>(null);
  const profileBtn = useRef<HTMLButtonElement>(null);
  const worksBtn = useRef<HTMLButtonElement>(null);
  const fontFamily = useMemo(() => cssFontFamily("--font-dm-sans"), []);
  const { supported, api } = useFluid(ref, {
    nameLine1: "KENTA",
    nameLine2: "YAMAMOTO",
    fontFamily,
    namePos: [0.5, 0.6], // sit the name in the top half
    energy: 0.12, // calm when idle; pointer still stirs lively
    nameColor: [0.3, 0.95, 0.9],
  });
  const [profileOpen, setProfileOpen] = useState(false);
  const [worksOpen, setWorksOpen] = useState(false);

  // register the two buttons as continuous smoke sources in fluid space
  useEffect(() => {
    function update() {
      const list: { x: number; y: number; color: number[] }[] = [];
      const pr = profileBtn.current?.getBoundingClientRect();
      const wr = worksBtn.current?.getBoundingClientRect();
      if (pr)
        list.push({
          x: (pr.left + pr.width / 2) / window.innerWidth,
          y: 1 - (pr.top + pr.height / 2) / window.innerHeight,
          color: [0.05, 0.34, 0.32],
        });
      if (wr)
        list.push({
          x: (wr.left + wr.width / 2) / window.innerWidth,
          y: 1 - (wr.top + wr.height / 2) / window.innerHeight,
          color: [0.36, 0.08, 0.3],
        });
      api.current.setEmitters(list);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [api]);

  return (
    <main className="relative h-[100dvh] w-screen overflow-hidden bg-black text-white">
      <canvas ref={ref} className="absolute inset-0 touch-none" />

      {/* light contrast helper, mostly for the top-left label */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-8">
        {/* top-left — kept as-is */}
        <div style={{ fontFamily: "var(--font-mono)" }}>
          <p className="text-[13px] font-medium text-white/90 sm:text-sm">
            Software Engineer
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
            Tokyo, Japan
          </p>
        </div>

        {/* bottom row — frosted frames that blend with the fluid behind them */}
        <div className="flex items-end justify-between">
          <button
            ref={profileBtn}
            onClick={() => setProfileOpen(true)}
            className="pointer-events-auto flex flex-col items-start gap-1 rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3.5 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/[0.09] sm:px-6 sm:py-4"
          >
            <span className="text-xl font-medium leading-none text-white/90 sm:text-2xl">
              Profile
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.3em] text-white/45"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              about me ↗
            </span>
          </button>

          <button
            ref={worksBtn}
            onClick={() => setWorksOpen(true)}
            className="pointer-events-auto flex flex-col items-end gap-1 rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3.5 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/[0.09] sm:px-6 sm:py-4"
          >
            <span className="text-xl font-medium leading-none text-white/90 sm:text-2xl">
              Works
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.3em] text-white/45"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ↗ what i built
            </span>
          </button>
        </div>
      </div>

      {/* Profile modal */}
      {profileOpen && (
        <Modal onClose={() => setProfileOpen(false)} title="Profile">
          <p className="text-2xl font-semibold">Kenta Yamamoto</p>
          <p
            className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Software Engineer · Tokyo, Japan
          </p>
          <p className="mt-4 text-[13px] leading-relaxed text-white/70">
            バックエンドを中心に、設計から実装まで。データ基盤やモバイルアプリまで
            幅広く手を動かします。{/* TODO: 本文は仮。差し替えてください */}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/85 transition-colors hover:border-white/50 hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Modal>
      )}

      {/* Works modal */}
      {worksOpen && (
        <Modal onClose={() => setWorksOpen(false)} title="Selected works">
          <ul className="space-y-3">
            {WORKS.map((w) => (
              <li key={w.title}>
                <a
                  href={w.href}
                  target={w.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="block rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/30 hover:bg-white/[0.06]"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-medium">{w.title}</span>
                    <span className="shrink-0 text-xs text-white/40">→</span>
                  </div>
                  <p
                    className="mt-1 text-[11px] uppercase tracking-wide text-white/45"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {w.stack}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">{w.about}</p>
                </a>
              </li>
            ))}
          </ul>
        </Modal>
      )}

      {!supported && (
        <div className="absolute inset-0 z-30 grid place-items-center bg-black text-white/70">
          WebGL2 not supported on this device.
        </div>
      )}
    </main>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-white/15 bg-[#0c0d12]/90 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70 hover:text-white"
          >
            close ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
