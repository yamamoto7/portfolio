import Link from "next/link";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main className="p-24 font-sans text-[#232129]">
      <h1 className="mt-0 mb-16 max-w-[320px] text-3xl font-semibold">
        Page not found
      </h1>
      <p className="mb-12">
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
        <br />
        <Link href="/" className="underline">
          Go home
        </Link>
        .
      </p>
    </main>
  );
}
