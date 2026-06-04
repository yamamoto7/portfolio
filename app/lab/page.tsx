import Link from "next/link";

export const metadata = {
  title: "Lab — Experiments",
  description: "WebGL / shader experiments. Pick a vibe.",
};

const demos = [
  {
    href: "/lab/particles",
    no: "01",
    name: "GPGPU Particles",
    jp: "パーティクル覚醒",
    desc: "数十万の粒子が名前を形づくり、技術タグへ崩れて再集合。",
    gradient: "from-emerald-400/30 via-cyan-500/20 to-fuchsia-500/30",
  },
  {
    href: "/lab/fluid",
    no: "02",
    name: "Fluid Simulation",
    jp: "流体シミュレーション",
    desc: "本物のNavier–Stokes。かき混ぜると名前が流れに踊る。",
    gradient: "from-sky-400/30 via-indigo-500/20 to-rose-500/30",
  },
  {
    href: "/lab/sdf",
    no: "03",
    name: "Raymarch SDF",
    jp: "ガラスの塊",
    desc: "ポリゴン無し。シェーダー内の3Dが背景の名前を屈折。",
    gradient: "from-blue-300/30 via-violet-500/20 to-cyan-400/30",
  },
  {
    href: "/lab/reaction",
    no: "04",
    name: "Reaction–Diffusion",
    jp: "生命的な増殖",
    desc: "名前から蒔かれた種が、チューリング模様として成長。",
    gradient: "from-teal-300/30 via-emerald-500/20 to-blue-500/30",
  },
  {
    href: "/lab/feedback",
    no: "05",
    name: "Feedback Tunnel",
    jp: "無限ズーム",
    desc: "前フレームを描き戻し続けて生まれる残像の宇宙。",
    gradient: "from-fuchsia-400/30 via-purple-500/20 to-sky-400/30",
  },
];

export default function LabIndex() {
  return (
    <main className="min-h-[100dvh] w-full bg-[#07070b] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12">
          <p
            className="mb-3 text-[11px] uppercase tracking-[0.35em] text-white/40"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ychof villa / lab
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            すごいページ<span className="text-white/40">、実験中。</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
            スクロール不要・1画面で完結する、GPU駆動のアニメーション実験。
            どれもタッチ／マウスで反応します。気に入った方向を選んで、ポートフォリオに育てましょう。
          </p>
        </header>

        <Link
          href="/lab/portfolio"
          className="group relative mb-6 block overflow-hidden rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.04] p-6 transition-colors hover:border-emerald-300/60"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-400/40 to-sky-500/30 blur-2xl transition-transform duration-500 group-hover:scale-150" />
          <div className="relative flex items-center justify-between">
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.3em] text-emerald-300/80"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                draft · 本命
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Portfolio on Fluid →</h2>
              <p className="mt-1 text-[13px] text-white/60">
                #02 の流体を主役に、リンク・技術・制作物を1画面に。
              </p>
            </div>
            <span className="text-2xl text-white/30 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </Link>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {demos.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/30"
            >
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${d.gradient} blur-2xl transition-transform duration-500 group-hover:scale-150`}
              />
              <div className="relative">
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-xs tracking-[0.3em] text-white/40"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {d.no}
                  </span>
                  <span className="text-xs text-white/30 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold">{d.name}</h2>
                <p className="text-sm text-white/50">{d.jp}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-white/60">
                  {d.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-12 flex items-center justify-between text-xs text-white/40">
          <Link href="/" className="hover:text-white/70">
            ← back to site
          </Link>
          <span style={{ fontFamily: "var(--font-mono)" }}>WebGL2 · no scroll</span>
        </footer>
      </div>
    </main>
  );
}
