import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Lang } from "@/lib/home-content";

function LangButton({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "mr-2.5 rounded-[20px] border px-5 py-2.5 text-center transition-colors",
        active
          ? "border-[#333] bg-[#333] text-white"
          : "border-[#ccc] bg-white text-[#888] hover:border-[#333] hover:text-[#333]",
      )}
    >
      {children}
    </Link>
  );
}

export default function SiteHeader({ lang = "en" }: { lang?: Lang }) {
  return (
    <header className="mt-10 mb-[46px] py-[49px]">
      <div className="mx-auto flex w-[800px] max-w-[90%] flex-wrap items-center justify-between max-[800px]:justify-center">
        <Link href="/" className="flex w-[300px] items-center justify-center">
          <Image
            src="/logo.svg"
            alt="logo image for this site"
            width={247}
            height={82}
            className="object-contain"
            priority
          />
        </Link>
        <div className="flex justify-between">
          <LangButton href="/ja" active={lang === "ja"}>
            JP
          </LangButton>
          <LangButton href="/" active={lang === "en"}>
            EN
          </LangButton>
        </div>
      </div>
    </header>
  );
}
