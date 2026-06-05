"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFluid } from "@/lib/lab/useFluid";
import { cssFontFamily } from "@/lib/lab/glu";

// Portfolio over the fluid engine. Pressing Profile / Works morphs the fluid
// name (KENTA YAMAMOTO → PROFILE / WORKS) and reveals content below — all in
// the same fluid space, no modal, single no-scroll screen.

type View = "home" | "profile" | "works";

const STATES = [
  { line1: "KENTA", line2: "YAMAMOTO" }, // 0 home
  { line1: "PROFILE" }, //                  1
  { line1: "WORKS" }, //                    2
];

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
  const leftBtn = useRef<HTMLButtonElement>(null);
  const rightBtn = useRef<HTMLButtonElement>(null);
  const fontFamily = useMemo(() => cssFontFamily("--font-dm-sans"), []);
  const { supported, api } = useFluid(ref, {
    states: STATES,
    fontFamily,
    namePos: [0.5, 0.62], // sit the name in the top half
    energy: 0.15,
    nameColor: [0.3, 0.95, 0.9],
    nameAmt: 0.12,
  });
  const [view, setView] = useState<View>("home");

  function go(v: View) {
    setView(v);
    api.current.setState(v === "home" ? 0 : v === "profile" ? 1 : 2);
  }

  // keep the two bottom buttons registered as smoke sources (positions shift
  // when their labels change between views)
  useEffect(() => {
    function update() {
      const list: { x: number; y: number; color: number[] }[] = [];
      const l = leftBtn.current?.getBoundingClientRect();
      const r = rightBtn.current?.getBoundingClientRect();
      if (l)
        list.push({
          x: (l.left + l.width / 2) / window.innerWidth,
          y: 1 - (l.top + l.height / 2) / window.innerHeight,
          color: [0.035, 0.22, 0.2],
        });
      if (r)
        list.push({
          x: (r.left + r.width / 2) / window.innerWidth,
          y: 1 - (r.top + r.height / 2) / window.innerHeight,
          color: [0.24, 0.05, 0.2],
        });
      api.current.setEmitters(list);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [api, view]);

  const frame =
    "pointer-events-auto flex flex-col gap-1 rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3.5 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/[0.09] sm:px-6 sm:py-4";

  return (
    <main className="relative h-[100dvh] w-screen overflow-hidden bg-black text-white">
      <canvas ref={ref} className="absolute inset-0 touch-none" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/25" />

      {/* revealed content (below the morphed name) */}
      {view !== "home" && (
        <div className="pointer-events-none absolute inset-x-0 top-[52%] bottom-28 z-10 flex justify-center px-6">
          <Reveal key={view} className="pointer-events-auto w-full max-w-md">
            {view === "profile" ? (
              <div className="text-center">
                <p className="text-sm leading-relaxed text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  バックエンドを中心に、設計から実装まで。データ基盤やモバイルアプリ
                  まで幅広く手を動かします。{/* TODO: 本文は仮 */}
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {SOCIAL.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 text-xs text-white/85 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid gap-2">
                {WORKS.map((w) => (
                  <a
                    key={w.title}
                    href={w.href}
                    target={w.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="block rounded-xl border border-white/10 bg-white/[0.05] p-3.5 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/[0.1]"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium">{w.title}</span>
                      <span className="shrink-0 text-xs text-white/40">→</span>
                    </div>
                    <p
                      className="mt-0.5 text-[10px] uppercase tracking-wide text-white/45"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {w.stack}
                    </p>
                  </a>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      )}

      {/* chrome */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-8">
        {/* top-left — kept as-is */}
        <div style={{ fontFamily: "var(--font-mono)" }}>
          <p className="text-[13px] font-medium text-white/90 sm:text-sm">Software Engineer</p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Tokyo, Japan</p>
        </div>

        {/* bottom row */}
        <div className="flex items-end justify-between">
          {view === "home" ? (
            <>
              <button ref={leftBtn} onClick={() => go("profile")} className={`${frame} items-start`}>
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
              <button ref={rightBtn} onClick={() => go("works")} className={`${frame} items-end`}>
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
            </>
          ) : (
            <>
              <button ref={leftBtn} onClick={() => go("home")} className={`${frame} items-start`}>
                <span className="text-lg font-medium leading-none text-white/90 sm:text-xl">
                  ← Back
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.3em] text-white/45"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  home
                </span>
              </button>
              <button
                ref={rightBtn}
                onClick={() => go(view === "profile" ? "works" : "profile")}
                className={`${frame} items-end`}
              >
                <span className="text-lg font-medium leading-none text-white/90 sm:text-xl">
                  {view === "profile" ? "Works" : "Profile"}
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.3em] text-white/45"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  ↗ switch
                </span>
              </button>
            </>
          )}
        </div>
      </div>

      {!supported && (
        <div className="absolute inset-0 z-30 grid place-items-center bg-black text-white/70">
          WebGL2 not supported on this device.
        </div>
      )}
    </main>
  );
}

// fade + slide up on mount
function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div
      className={className}
      style={{
        transition: "opacity 0.5s ease, transform 0.5s ease",
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(14px)",
      }}
    >
      {children}
    </div>
  );
}
