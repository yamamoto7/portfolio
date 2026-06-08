import Link from "next/link";
import Image from "next/image";
import { VERDASH_SHORT_NAME } from "@/lib/verdash";

/** Verdash の共通ヘッダー（ダークテーマ）。right に CTA や戻りリンクを差し込む。 */
export default function VerdashHeader({ right }: { right?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-10 border-b border-[#232323] bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[960px] items-center justify-between gap-3 px-5 py-3">
        <Link
          href="/verdash"
          className="flex min-w-0 items-center gap-2.5 no-underline"
        >
          <Image
            src="/contents/verdash/icon.png"
            alt="Verdash"
            width={1024}
            height={1024}
            className="h-9 w-9 shrink-0 rounded-[9px] border border-[#2A2A2A]"
          />
          <span className="truncate font-mono text-[15px] font-bold tracking-[-0.01em] text-[#EDEDED]">
            {VERDASH_SHORT_NAME}
          </span>
        </Link>
        <div className="shrink-0">{right}</div>
      </div>
    </header>
  );
}
