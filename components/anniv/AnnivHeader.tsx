import Link from "next/link";
import Image from "next/image";
import { ANNIV_SHORT_NAME } from "@/lib/anniv";

/** Anniv の共通ヘッダー（暖色ライトテーマ）。right に CTA や戻りリンクを差し込む。 */
export default function AnnivHeader({ right }: { right?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-10 border-b border-[#F2E0DA]/70 bg-[#FFF8F5]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[960px] items-center justify-between gap-3 px-5 py-3">
        <Link
          href="/anniv"
          className="flex min-w-0 items-center gap-2.5 no-underline"
        >
          <Image
            src="/contents/anniv/icon.png"
            alt={ANNIV_SHORT_NAME}
            width={1024}
            height={1024}
            className="h-9 w-9 shrink-0 rounded-[9px] shadow-[0_2px_8px_rgba(61,43,40,0.14)]"
          />
          <span className="truncate text-[15px] font-bold tracking-[-0.01em] text-[#3D2B28]">
            {ANNIV_SHORT_NAME}
          </span>
        </Link>
        <div className="shrink-0">{right}</div>
      </div>
    </header>
  );
}
