import Link from "next/link";
import Image from "next/image";
import { HEADER_MODIFY_SHORT_NAME } from "@/lib/header-modify";

/** Header Modify の共通ヘッダー（ダークテーマ）。right に CTA や戻りリンクを差し込む。 */
export default function HeaderModifyHeader({
  right,
}: {
  right?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-[#232833] bg-[#12151b]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[960px] items-center justify-between gap-3 px-5 py-3">
        <Link
          href="/header-modify"
          className="flex min-w-0 items-center gap-2.5 no-underline"
        >
          <Image
            src="/contents/header-modify/icon.png"
            alt="Header Modify"
            width={128}
            height={128}
            className="h-9 w-9 shrink-0 rounded-[9px] border border-[#2A3240]"
          />
          <span className="truncate font-mono text-[15px] font-bold tracking-[-0.01em] text-[#E6EAF2]">
            {HEADER_MODIFY_SHORT_NAME}
          </span>
        </Link>
        <div className="shrink-0">{right}</div>
      </div>
    </header>
  );
}
