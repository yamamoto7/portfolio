import Link from "next/link";
import Image from "next/image";
import type { AppConfig } from "@/lib/apps";

export default function AppHeader({ app }: { app: AppConfig }) {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-white/85 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex max-w-[960px] items-center px-5 py-3">
        <Link
          href={`/${app.slug}`}
          className="flex items-center gap-2.5 no-underline"
        >
          <Image
            src={`/contents/${app.slug}/icon.png`}
            alt={app.displayName}
            width={1024}
            height={1024}
            className="h-9 w-9 rounded-[9px] shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
          />
          <Image
            src={`/contents/${app.slug}/name.png`}
            alt={app.displayName}
            width={app.nameSize.w}
            height={app.nameSize.h}
            className="h-5 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}
