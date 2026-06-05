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
  image?: string;
  description: string;
  links: { label: string; href: string }[];
};

const STATES = [
  { line1: "KENTA", line2: "YAMAMOTO" }, // 0 home
  { line1: "ABOUT" }, //                  1
  { line1: "OUTPUTS" }, //                  2
];

const MONO = { fontFamily: "var(--font-mono)" };
const PER_PAGE = 3;

const SOCIAL = [
  { label: "GitHub", href: "https://github.com/yamamoto7", Icon: FaGithub },
  { label: "X", href: "https://x.com/yamamoto7", Icon: FaXTwitter }, // TODO: confirm X handle
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kentayamamoto7/", Icon: FaLinkedin },
  { label: "Facebook", href: "https://www.facebook.com/kenta.yamamoto.94064176", Icon: FaFacebook },
];

// TODO: placeholder intro — replace later.
const INTRO = [
  "Hi, I'm Kenta Yamamoto.",
  "CTO at FAcraft Inc.",
  "I enjoy developing software and turning ideas into real products.",
];

// TODO: descriptions / store links are placeholders — replace later.
const OUTPUTS: Output[] = [
  {
    title: "Buylis",
    category: "Mobile App",
    tags: ["Flutter"],
    image: "/home/developments/buylis_screen.png",
    description:
      "A mobile app to share shopping lists with family in real time. I designed and built both the app and its landing page.",
    links: [
      { label: "Landing page", href: "/buylis" },
    ],
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
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Output | null>(null);

  function go(v: View) {
    setSelected(null);
    if (v === "outputs") setPage(0);
    setView(v);
    api.current.setState(v === "home" ? 0 : v === "about" ? 1 : 2);
  }

  const pageCount = Math.ceil(OUTPUTS.length / PER_PAGE);
  const pageItems = OUTPUTS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

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
        <div className="pointer-events-none absolute inset-x-0 top-[50%] bottom-28 z-10 flex justify-center px-6">
          <Reveal key={view} className="pointer-events-auto w-full max-w-md">
            {view === "about" ? (
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/home/profile.png"
                  alt="Kenta Yamamoto"
                  width={160}
                  height={160}
                  className="h-20 w-20 rounded-full object-cover ring-1 ring-white/25 sm:h-24 sm:w-24"
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
              <div className="w-full">
                <div className="grid gap-2">
                  {pageItems.map((o) => (
                    <button
                      key={o.title}
                      onClick={() => {
                        api.current.burst(); // scatter the fluid on tap
                        setSelected(o);
                      }}
                      className="w-full rounded-xl bg-white/[0.05] p-3.5 text-left backdrop-blur-md transition-colors hover:bg-white/[0.1]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium">{o.title}</span>
                        <span className="shrink-0 text-xs text-white/40">↗</span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <Badge>{o.category}</Badge>
                        {o.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>

                {pageCount > 1 && (
                  <div className="mt-3 flex items-center justify-center gap-5 text-white/60">
                    <button
                      disabled={page === 0}
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      className="text-base transition-colors hover:text-white disabled:opacity-25"
                      aria-label="previous"
                    >
                      ←
                    </button>
                    <span className="text-[11px] tracking-[0.2em]" style={MONO}>
                      {page + 1} / {pageCount}
                    </span>
                    <button
                      disabled={page === pageCount - 1}
                      onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                      className="text-base transition-colors hover:text-white disabled:opacity-25"
                      aria-label="next"
                    >
                      →
                    </button>
                  </div>
                )}
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
