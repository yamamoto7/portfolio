import Link from "next/link";
import Image from "next/image";
import { MUGEN_SUDOKU_NAME } from "@/lib/mugen-sudoku";

/** 無限数独の共通ヘッダー。right に CTA や戻りリンクを差し込む。 */
export default function MugenSudokuHeader({
  right,
}: {
  right?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-white/85 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex max-w-[960px] items-center justify-between gap-3 px-5 py-3">
        <Link
          href="/mugen-sudoku"
          className="flex min-w-0 items-center gap-2.5 no-underline"
        >
          <Image
            src="/contents/mugen-sudoku/icon.png"
            alt={MUGEN_SUDOKU_NAME}
            width={1024}
            height={1024}
            className="h-9 w-9 shrink-0 rounded-[9px] shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
          />
          <Image
            src="/contents/mugen-sudoku/name.png"
            alt={MUGEN_SUDOKU_NAME}
            width={736}
            height={321}
            className="h-5 w-auto"
          />
        </Link>
        <div className="shrink-0">{right}</div>
      </div>
    </header>
  );
}
