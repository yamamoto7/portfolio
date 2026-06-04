import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="mx-auto w-[800px] max-w-[90%] py-[72px]">
      <Link href="/" className="mb-[25px] inline-block text-[0]">
        <Image
          src="/logo.svg"
          alt="logo image for this site"
          width={117}
          height={39}
          className="w-[117px]"
        />
      </Link>
      <div className="mb-8 text-center leading-[1.5]">
        © 2023 - All rights reserved
      </div>
    </footer>
  );
}
