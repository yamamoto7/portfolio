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
          フォルダ管理で貴方好みのお買物リストに
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
          <span className="font-bold">それ以上でもそれ以下でもない</span>
          <br />
          シンプルでわかりやすいお買い物リスト
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTENT_LEFT}>
          <span className="font-bold">好きなように使える</span>
          <br />
          価格や商品名をメモして
          <br />
          長く使いやすいリストへ
          <br />
        </div>
        <Screenshot n={2} />
      </section>

      <section className={SECTION}>
        <Screenshot n={3} />
        <div className={CONTENT_RIGHT}>
          <span className="font-bold">フォルダ管理機能</span>
          <br />
          お店ごと、カテゴリごとに
          <br />
          貴方好みのリスト管理を実現
          <br />
        </div>
      </section>

      <section className={SECTION}>
        <div className={CONTENT_LEFT}>
          <span className="font-bold">始めてみましょう</span>
          <br />
          ちょっぴり新しい
          <br />
          お買い物リスト管理
          <br />
        </div>
        <Screenshot n={4} />
      </section>

      <BuylisFooter />
    </>
  );
}
