import Link from "next/link";
import Image from "next/image";
import { MUGEN_SUDOKU_NAME } from "@/lib/mugen-sudoku";

/** 鬼難易度数独の共通ヘッダー（和テイスト）。right に CTA や戻りリンクを差し込む。 */
export default function MugenSudokuHeader({
  right,
}: {
  right?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#D6CBB2] bg-[#ECE3D0]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1040px] items-center justify-between gap-3 px-6 py-3.5 max-[640px]:px-5">
        <Link
          href="/mugen-sudoku"
          className="flex min-w-0 items-center gap-2.5 no-underline"
        >
          <Image
            src="/contents/mugen-sudoku/icon.png"
            alt={MUGEN_SUDOKU_NAME}
            width={1024}
            height={1024}
            className="h-9 w-9 shrink-0 rounded-[9px] shadow-[0_2px_8px_rgba(35,32,25,0.16)]"
          />
          <span className="font-mincho truncate text-[18px] font-bold tracking-[0.02em] text-[#232019]">
            {MUGEN_SUDOKU_NAME}
          </span>
        </Link>
        <div className="shrink-0">{right}</div>
      </div>
    </header>
  );
}
