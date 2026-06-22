import Link from "next/link";
import Image from "next/image";
import { MARKPAD_SHORT_NAME } from "@/lib/markpad";

/** MarkPad の共通ヘッダー（クリーンなライトテーマ）。right に CTA や戻りリンクを差し込む。 */
export default function MarkPadHeader({ right }: { right?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-10 border-b border-[#E6E8EB]/80 bg-[#FBFBFC]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[960px] items-center justify-between gap-3 px-5 py-3">
        <Link
          href="/markpad"
          className="flex min-w-0 items-center gap-2.5 no-underline"
        >
          <Image
            src="/contents/markpad/icon.png"
            alt={MARKPAD_SHORT_NAME}
            width={1024}
            height={1024}
            className="h-9 w-9 shrink-0 rounded-[9px] border border-[#E6E8EB] shadow-[0_2px_8px_rgba(31,35,40,0.1)]"
          />
          <span className="truncate font-mono text-[15px] font-bold tracking-[-0.01em] text-[#1F2328]">
            {MARKPAD_SHORT_NAME}
          </span>
        </Link>
        <div className="shrink-0">{right}</div>
      </div>
    </header>
  );
}
