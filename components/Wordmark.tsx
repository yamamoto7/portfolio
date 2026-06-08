import Link from "next/link";

const MONO = { fontFamily: "var(--font-mono)" };

type Tone = "dark" | "light";

/**
 * ルート `/`（FluidPortfolio）と同じ氏名ロックアップ。
 * 共通のサイトロゴとして問い合わせ・ヘッダー・フッターで使う。
 */
export default function Wordmark({
  href = "/",
  tone = "dark",
  className,
}: {
  /** 包むリンク先。null でリンクなし（ただのテキスト）。 */
  href?: string | null;
  /** dark = 明るい背景向け（濃い文字）／light = 暗い背景向け（白文字）。 */
  tone?: Tone;
  className?: string;
}) {
  const nameColor = tone === "light" ? "text-white/90" : "text-[#1b2330]";
  const subColor = tone === "light" ? "text-white/55" : "text-[#5f6b7a]";

  const inner = (
    <span className="block text-left" style={MONO}>
      <span
        className={`block text-[13px] font-medium lowercase sm:text-sm ${nameColor}`}
      >
        kenta yamamoto
      </span>
      <span className={`block text-[11px] uppercase tracking-[0.2em] ${subColor}`}>
        Software Engineer / Japan
      </span>
    </span>
  );

  if (href == null) {
    return <div className={className}>{inner}</div>;
  }
  return (
    <Link
      href={href}
      className={`inline-block no-underline transition-opacity hover:opacity-70 ${className ?? ""}`}
    >
      {inner}
    </Link>
  );
}
