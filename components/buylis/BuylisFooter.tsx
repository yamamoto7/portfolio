import Link from "next/link";
import Wordmark from "@/components/Wordmark";

export default function BuylisFooter() {
  return (
    <footer className="mx-auto w-[600px] max-w-[90%] py-20">
      <div className="flex flex-wrap justify-between">
        <Wordmark href="/" />
        <div className="pt-2.5">
          <Link href="/buylis">About the app</Link>
          <br />
          <Link href="/buylis/privacy-policy">Privacy Policy</Link>
        </div>
        <div className="pt-2.5">
          <Link href="/">About the developer</Link>
        </div>
      </div>
      <div className="text-center text-xs">© 2022 All rights reserved</div>
    </footer>
  );
}
