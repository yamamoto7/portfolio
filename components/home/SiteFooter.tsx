import Wordmark from "@/components/Wordmark";

export default function SiteFooter() {
  return (
    <footer className="mx-auto w-[800px] max-w-[90%] py-[72px]">
      <Wordmark href="/" className="mb-[25px]" />
      <div className="mb-8 text-center leading-[1.5]">
        © 2023 - All rights reserved
      </div>
    </footer>
  );
}
