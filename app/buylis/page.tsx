import type { Metadata } from "next";
import Image from "next/image";
import BuylisHeader from "@/components/buylis/BuylisHeader";
import BuylisFooter from "@/components/buylis/BuylisFooter";

export const metadata: Metadata = { title: "Buylis" };

const SECTION = "mx-auto flex w-[800px] max-w-[90%] flex-wrap justify-center";
const CONTENT_LEFT =
  "w-[300px] pt-[100px] text-right max-[666px]:pt-10 max-[666px]:pb-10 max-[666px]:text-center";
const CONTENT_RIGHT =
  "w-[300px] pt-[100px] text-left max-[666px]:pt-10 max-[666px]:pb-10 max-[666px]:text-center";
const IMAGE_WRAP = "w-[300px]";

function Screenshot({ n }: { n: number }) {
  return (
    <div className={IMAGE_WRAP}>
      <Image
        src={`/contents/buylis/screen${n}.png`}
        alt="Buylis screenshot"
        width={601}
        height={901}
        className="h-auto w-full"
      />
    </div>
  );
}

export default function Page() {
  return (
    <>
      <BuylisHeader />

      <section className={`${SECTION} items-center`}>
        <div className="h-[500px] w-[400px] bg-[url(/contents/buylis/mv.png)] bg-contain bg-center bg-no-repeat" />
        <div className="w-[400px] pt-0 text-center leading-[2.8]">
          <Image
            src="/contents/buylis/name.png"
            alt="Buylis"
            width={317}
            height={151}
            className="mx-auto h-auto w-[200px]"
          />
          <br />
          Shape a shopping list your way with folder organization
          <br />
          <a href="https://apps.apple.com/app/id1665553308">
            <Image
              src="/contents/common/appstore.png"
              alt="App Store"
              width={342}
              height={108}
              className="inline h-auto w-[120px]"
            />
          </a>{" "}
          <a href="https://play.google.com/store/apps/details?id=com.ychof.personal_buy_list">
            <Image
              src="/contents/common/playstore.png"
              alt="Google Play"
              width={342}
              height={108}
              className="inline h-auto w-[120px]"
            />
          </a>
        </div>
      </section>

      <section className={SECTION}>
        <Screenshot n={1} />
        <div className={CONTENT_RIGHT}>
          <span className="font-bold">Nothing more, nothing less</span>
          <br />
          A simple, easy-to-understand shopping list
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTENT_LEFT}>
          <span className="font-bold">Use it however you like</span>
          <br />
          Jot down prices and item names
          <br />
          for a list that stays easy to use
          <br />
        </div>
        <Screenshot n={2} />
      </section>

      <section className={SECTION}>
        <Screenshot n={3} />
        <div className={CONTENT_RIGHT}>
          <span className="font-bold">Folder organization</span>
          <br />
          Organize by store or by category
          <br />
          to manage lists exactly your way
          <br />
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTENT_LEFT}>
          <span className="font-bold">Let&apos;s get started</span>
          <br />
          A slightly new way
          <br />
          to manage your shopping list
          <br />
        </div>
        <Screenshot n={4} />
      </section>

      <BuylisFooter />
    </>
  );
}
