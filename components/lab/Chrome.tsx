import Link from "next/link";

// Shared overlay chrome for a lab demo: back link + a caption strip.
// The "wow" visuals are drawn by each demo's shader; this is just navigation.
export default function Chrome({
  title,
  hint,
  light = false,
}: {
  title: string;
  hint?: string;
  light?: boolean;
}) {
  const fg = light ? "text-black/70" : "text-white/80";
  const linkClass = light
    ? "pointer-events-auto inline-flex items-center gap-2 rounded-full border border-black/20 px-4 py-2 text-sm font-medium text-black/70 backdrop-blur-sm transition-colors hover:text-black hover:border-black/50"
    : "pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition-colors hover:text-white hover:border-white/60";
  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-between p-5 sm:p-7">
      <div className="flex items-center justify-between">
        <Link href="/lab" className={linkClass}>
          ← lab
        </Link>
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.2em] ${fg}`}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {title}
        </span>
      </div>
      {hint ? (
        <p
          className={`max-w-md text-[13px] leading-relaxed ${fg}`}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {hint}
        </p>
      ) : (
        <span />
      )}
    </div>
  );
}
