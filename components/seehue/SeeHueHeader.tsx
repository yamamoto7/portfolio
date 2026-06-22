import Link from "next/link";
import Image from "next/image";
import { SEEHUE_SHORT_NAME } from "@/lib/seehue";

/** SeeHue の共通ヘッダー（ライトテーマ）。right に CTA や戻りリンクを差し込む。 */
export default function SeeHueHeader({ right }: { right?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-10 border-b border-[#ECE7DE]/70 bg-[#FAF7F2]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[960px] items-center justify-between gap-3 px-5 py-3">
        <Link
          href="/seehue"
          className="flex min-w-0 items-center gap-2.5 no-underline"
        >
          <Image
            src="/contents/seehue/icon.png"
            alt={SEEHUE_SHORT_NAME}
            width={1024}
            height={1024}
            className="h-9 w-9 shrink-0 rounded-[9px] border border-[#ECE7DE] shadow-[0_2px_8px_rgba(42,46,51,0.1)]"
          />
          <span className="truncate text-[15px] font-bold tracking-[-0.01em] text-[#2A2E33]">
            {SEEHUE_SHORT_NAME}
          </span>
        </Link>
        <div className="shrink-0">{right}</div>
      </div>
    </header>
  );
}
