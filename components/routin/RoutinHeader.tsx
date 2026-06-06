import Link from "next/link";
import Image from "next/image";
import { ROUTIN_APP_NAME } from "@/lib/routin";

/** Routin の共通ヘッダー。right に CTA や戻りリンクを差し込む。 */
export default function RoutinHeader({ right }: { right?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-10 border-b border-[#E6E4DB]/70 bg-[#F7F5F0]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[960px] items-center justify-between gap-3 px-5 py-3">
        <Link
          href="/routin"
          className="flex min-w-0 items-center gap-2.5 no-underline"
        >
          <Image
            src="/contents/routin/icon.png"
            alt="Routin"
            width={1024}
            height={1024}
            className="h-9 w-9 shrink-0 rounded-[9px] shadow-[0_2px_8px_rgba(40,40,38,0.14)]"
          />
          <span className="truncate font-dm text-[15px] font-bold tracking-[-0.01em] text-[#282826]">
            {ROUTIN_APP_NAME}
          </span>
        </Link>
        <div className="shrink-0">{right}</div>
      </div>
    </header>
  );
}
