import Link from "next/link";
import Image from "next/image";
import { LASTTIME_APP_NAME } from "@/lib/lasttime";

/** 「最後はいつ？」の共通ヘッダー。right に CTA や戻りリンクを差し込む。 */
export default function LasttimeHeader({ right }: { right?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-10 border-b border-[#E8E3D7]/70 bg-[#F6F3EC]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[960px] items-center justify-between gap-3 px-5 py-3">
        <Link
          href="/lasttime-list"
          className="flex min-w-0 items-center gap-2.5 no-underline"
        >
          <Image
            src="/contents/lasttime/icon.png"
            alt="最後はいつ？"
            width={1024}
            height={1024}
            className="h-9 w-9 shrink-0 rounded-[9px] shadow-[0_2px_8px_rgba(42,42,40,0.14)]"
          />
          <span className="truncate font-dm text-[15px] font-bold tracking-[-0.01em] text-[#2A2A28]">
            {LASTTIME_APP_NAME}
          </span>
        </Link>
        <div className="shrink-0">{right}</div>
      </div>
    </header>
  );
}
