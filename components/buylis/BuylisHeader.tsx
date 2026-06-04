import Link from "next/link";
import Image from "next/image";

export default function BuylisHeader() {
  return (
    <header>
      <nav className="mx-auto flex w-[800px] max-w-[90%] flex-wrap items-center justify-between">
        <Link
          href="/buylis"
          className="my-2.5 flex h-[60px] w-[60px] items-center justify-center rounded-[10px] bg-[#2a383d]"
        >
          <Image
            src="/contents/buylis/icon.svg"
            alt="Buylis"
            width={313}
            height={309}
            className="h-auto w-[25px]"
          />
        </Link>
      </nav>
    </header>
  );
}
