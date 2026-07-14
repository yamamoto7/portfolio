"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { FaGithub, FaXTwitter, FaLinkedin, FaFacebook } from "react-icons/fa6";
import { useFluid } from "@/lib/portfolio/useFluid";
import { cssFontFamily } from "@/lib/portfolio/glu";

// Portfolio over the fluid engine. Pressing About / Outputs morphs the fluid
// name (KENTA YAMAMOTO → ABOUT / OUTPUTS) and reveals content below — all in
// the same fluid space, single no-scroll screen.

type View = "home" | "about" | "outputs";

type Output = {
  title: string;
  category: string;
  tags: string[];
  /** Square thumbnail for the grid card (app icon). Falls back to `image`. */
  icon?: string;
  /** Larger visual shown in the detail modal (usually a screenshot). */
  image?: string;
  description: string;
  links: { label: string; href: string }[];
};

// Grid groups, in display order. Each label heads a section of the Outputs list.
const GROUPS: { category: string; label: string }[] = [
  { category: "Mobile App", label: "Mobile Apps" },
  { category: "Chrome Extension", label: "Chrome Extension" },
  { category: "Experiment", label: "Lab" },
];

const STATES = [
  { line1: "KENTA", line2: "YAMAMOTO" }, // 0 home
  { line1: "ABOUT" }, //                  1
  { line1: "OUTPUTS" }, //                  2
];

const MONO = { fontFamily: "var(--font-mono)" };

const SOCIAL = [
  { label: "GitHub", href: "https://github.com/yamamoto7", Icon: FaGithub },
  { label: "X", href: "https://x.com/ymkn_ymmtym", Icon: FaXTwitter },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kentayamamoto7/", Icon: FaLinkedin },
  { label: "Facebook", href: "https://www.facebook.com/kenta.yamamoto.94064176", Icon: FaFacebook },
];

// TODO: placeholder intro — replace later.
const INTRO = [
  "Hi, I'm Kenta Yamamoto.",
  "CTO at FAcraft Inc.",
  "I enjoy developing software and turning ideas into real products.",
];

// Published apps first (iOS + the Chrome extension), then the two early
// experiments. Each iOS app links to its bespoke landing page under the site.
const OUTPUTS: Output[] = [
  {
    title: "Routin",
    category: "Mobile App",
    tags: ["SwiftUI"],
    icon: "/contents/routin/icon.png",
    image: "/contents/routin/screen1.png",
    description:
      "A calm, unhurried habit tracker — built to help you keep going without pressure or streak guilt.",
    links: [{ label: "Landing page", href: "/routin" }],
  },
  {
    title: "Since",
    category: "Mobile App",
    tags: ["SwiftUI"],
    icon: "/contents/lasttime/icon.png",
    image: "/contents/lasttime/screen1.png",
    description:
      "A logbook for the “last time you did it.” Record when you last did the things that matter, so you never lose track.",
    links: [{ label: "Landing page", href: "/lasttime-list" }],
  },
  {
    title: "Verdash",
    category: "Mobile App",
    tags: ["SwiftUI"],
    icon: "/contents/verdash/icon.png",
    image: "/contents/verdash/screen1.png",
    description:
      "Manage your Vercel deployments one-handed from your iPhone — status, logs, and redeploys on the go.",
    links: [{ label: "Landing page", href: "/verdash" }],
  },
  {
    title: "Diabolical Sudoku",
    category: "Mobile App",
    tags: ["SwiftUI"],
    icon: "/contents/mugen-sudoku/icon.png",
    image: "/contents/mugen-sudoku/screen1.png",
    description:
      "Hardcore Sudoku that is always solvable by pure logic — no guessing required.",
    links: [{ label: "Landing page", href: "/mugen-sudoku" }],
  },
  {
    title: "Buylis",
    category: "Mobile App",
    tags: ["Flutter"],
    icon: "/contents/buylis/icon.png",
    image: "/home/developments/buylis_screen.png",
    description:
      "A mobile app to share shopping lists with family in real time. I designed and built both the app and its landing page.",
    links: [{ label: "Landing page", href: "/buylis" }],
  },
  {
    title: "Infinite Math",
    category: "Mobile App",
    tags: ["SwiftUI"],
    icon: "/contents/mugen-sugaku/icon.png",
    image: "/contents/mugen-sugaku/screen1.png",
    description:
      "Rediscover math as a liberal art — practice problems spanning grade-school through university entrance exams.",
    links: [{ label: "Landing page", href: "/mugen-sugaku" }],
  },
  {
    title: "Tile Carpet Cycle",
    category: "Mobile App",
    tags: ["SwiftUI"],
    icon: "/contents/tile-care/icon.png",
    image: "/contents/tile-care/screen1.png",
    description:
      "Tracks which tile you last replaced and which one is next. It does that one thing, and nothing else.",
    links: [{ label: "Landing page", href: "/tile-care" }],
  },
  {
    title: "Anniv",
    category: "Mobile App",
    tags: ["SwiftUI"],
    icon: "/contents/anniv/icon.png",
    image: "/contents/anniv/screen1.png",
    description:
      "Birthdays, anniversaries, and gift history for the people who matter — all in one reminder app.",
    links: [{ label: "Landing page", href: "/anniv" }],
  },
  {
    title: "SeeHue",
    category: "Mobile App",
    tags: ["SwiftUI"],
    icon: "/contents/seehue/icon.png",
    image: "/contents/seehue/screen1.png",
    description:
      "A color-support camera: correct colors, look up color names, and check how a scene looks to different types of color vision.",
    links: [{ label: "Landing page", href: "/seehue" }],
  },
  {
    title: "MarkPad",
    category: "Mobile App",
    tags: ["SwiftUI"],
    icon: "/contents/markpad/icon.png",
    image: "/contents/markpad/screen1.png",
    description:
      "Jot down or paste text and see it rendered beautifully at once — a fast, focused Markdown editor.",
    links: [{ label: "Landing page", href: "/markpad" }],
  },
  {
    title: "Header Modify",
    category: "Chrome Extension",
    tags: ["JavaScript"],
    icon: "/contents/header-modify/icon.png",
    image: "/contents/header-modify/icon.png",
    description:
      "A lightweight, ModHeader-style Chrome extension that adds custom HTTP request headers to any site — with profiles, URL filters, and presets. Everything runs locally.",
    links: [{ label: "Landing page", href: "/header-modify" }],
  },
  {
    title: "Color-blindness simulator",
    category: "Experiment",
    tags: ["C++", "OpenCV"],
    image: "/home/developments/color-blindness.png",
    description:
      "Reproduces how scenes look with color-vision deficiency and visualizes regions that are hard to tell apart.",
    links: [{ label: "GitHub", href: "https://github.com/yamamoto7" }],
  },
  {
    title: "Image compression",
    category: "Experiment",
    tags: ["Java"],
    image: "/home/developments/image-compression.png",
    description: "An image-compression experiment.",
    links: [{ label: "GitHub", href: "https://github.com/yamamoto7" }],
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
  const [selected, setSelected] = useState<Output | null>(null);

  function go(v: View) {
    setSelected(null);
    setView(v);
    api.current.setState(v === "home" ? 0 : v === "about" ? 1 : 2);
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
    "pointer-events-auto flex flex-col gap-1 rounded-2xl bg-white/[0.04] px-5 py-3.5 backdrop-blur-md transition-colors hover:bg-white/[0.09] sm:px-6 sm:py-4";

  return (
    <main className="relative h-[100dvh] w-screen overflow-hidden bg-black text-white">
      <canvas ref={ref} className="absolute inset-0 touch-none" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/25" />

      {/* revealed content (below the morphed name) */}
      {view !== "home" && (
        <div
          className={`pointer-events-none absolute inset-x-0 z-10 flex items-center justify-center px-8 sm:px-12 ${
            view === "outputs"
              ? "top-[42%] bottom-24 sm:top-[36%] sm:bottom-16"
              : "top-[45%] bottom-36 sm:top-[50%] sm:bottom-28"
          }`}
        >
          <Reveal
            key={view}
            className={`scrollbar-subtle pointer-events-auto max-h-full w-full overflow-y-auto ${
              view === "outputs" ? "max-w-4xl" : "max-w-md"
            }`}
          >
            {view === "about" ? (
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/home/profile.png"
                  alt="Kenta Yamamoto"
                  width={160}
                  height={160}
                  className="h-16 w-16 rounded-full object-cover ring-1 ring-white/25 sm:h-24 sm:w-24"
                />
                <div className="mt-4 max-w-sm space-y-1 text-sm leading-relaxed text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {INTRO.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-center gap-3">
                  {SOCIAL.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.06] text-white/80 backdrop-blur-md transition-colors hover:bg-white/[0.14] hover:text-white"
                    >
                      <s.Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full space-y-5 sm:space-y-6">
                {GROUPS.map((g) => {
                  const items = OUTPUTS.filter((o) => o.category === g.category);
                  if (!items.length) return null;
                  return (
                    <div key={g.category}>
                      <h3
                        className="mb-2.5 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/45"
                        style={MONO}
                      >
                        {g.label}
                        <span className="h-px flex-1 bg-white/10" />
                      </h3>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                        {items.map((o) => (
                          <button
                            key={o.title}
                            onClick={() => {
                              api.current.burst(); // scatter the fluid on tap
                              setSelected(o);
                            }}
                            className="flex items-center gap-2.5 rounded-xl bg-white/[0.05] p-2.5 text-left backdrop-blur-md transition-colors hover:bg-white/[0.1]"
                          >
                            <Image
                              src={o.icon ?? o.image ?? "/home/profile.png"}
                              alt=""
                              width={80}
                              height={80}
                              className="h-9 w-9 shrink-0 rounded-lg object-cover ring-1 ring-white/10"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="line-clamp-2 text-[13px] font-medium leading-tight">
                                {o.title}
                              </span>
                              <span
                                className="mt-0.5 block truncate text-[10px] text-white/45"
                                style={MONO}
                              >
                                {o.tags.join(" · ")}
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Reveal>
        </div>
      )}

      {/* chrome */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-8">
        {/* top-left — HOME link */}
        <button
          onClick={() => view !== "home" && go("home")}
          className="pointer-events-auto text-left transition-opacity hover:opacity-70"
          style={MONO}
        >
          <p className="text-[13px] font-medium lowercase text-white/90 sm:text-sm">
            kenta yamamoto
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
            Software Engineer / Japan
          </p>
        </button>

        {/* bottom row — About (left) / Outputs (right) fixed; active one hides */}
        <div className="flex items-end justify-between">
          {view !== "about" && (
            <button ref={leftBtn} onClick={() => go("about")} className={`${frame} items-start`}>
              <span className="text-xl font-medium leading-none text-white/90 sm:text-2xl">
                About
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/45" style={MONO}>
                about me ↗
              </span>
            </button>
          )}
          {view !== "outputs" && (
            <button
              ref={rightBtn}
              onClick={() => go("outputs")}
              className={`${frame} ml-auto items-end`}
            >
              <span className="text-xl font-medium leading-none text-white/90 sm:text-2xl">
                Outputs
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/45" style={MONO}>
                ↗ what i built
              </span>
            </button>
          )}
        </div>
      </div>

      {/* output detail modal */}
      {selected && (
        <div
          className="absolute inset-0 z-40 flex items-center justify-center bg-black/55 p-5 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white/[0.07] p-5 shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">{selected.title}</h3>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <Badge>{selected.category}</Badge>
                  {selected.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="shrink-0 rounded-full border border-white/20 px-2.5 py-1 text-xs text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            {selected.image && (
              <div className="relative mb-3 h-52 w-full overflow-hidden rounded-lg bg-white/5">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 400px"
                  className="object-contain"
                />
              </div>
            )}

            <p className="text-[13px] leading-relaxed text-white/75">{selected.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {selected.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="rounded-full bg-white/[0.08] px-3.5 py-1.5 text-xs text-white/85 transition-colors hover:bg-white/[0.16] hover:text-white"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {!supported && (
        <div className="absolute inset-0 z-50 grid place-items-center bg-black text-white/70">
          WebGL2 not supported on this device.
        </div>
      )}
    </main>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full bg-white/[0.16] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/85"
      style={MONO}
    >
      {children}
    </span>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/55"
      style={MONO}
    >
      {children}
    </span>
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
