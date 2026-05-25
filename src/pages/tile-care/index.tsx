import * as React from "react";
import getFilePath from "../../utils/getFilePath";
import Header from "./components/header";
import Footer from "./components/footer";
import * as styles from "./index.module.sass";

export default function Component() {
  return (
    <>
      <Header />
      <section className={`${styles.section} ${styles.mv}`}>
        <div className={styles.mv_image_wrap} />
        <div className={styles.content_wrap}>
          {/* TODO: プロダクトのロゴ画像に差し替え */}
          <img
            width="200px"
            src={getFilePath("contents/buylis/name.png")}
            alt="Logo"
            className=""
          />
          <br />
          {/* TODO: キャッチコピー */}
          キャッチコピー
          <br />
          {/* TODO: App Store / Play Store のURLを設定 */}
          <a href="#" className="">
            <img
              className={styles.store_button}
              src={getFilePath("contents/common/appstore.png")}
            />
          </a>{" "}
          <a href="#">
            <img
              className={styles.store_button}
              src={getFilePath("contents/common/playstore.png")}
            />
          </a>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.image_wrap}>
          {/* TODO: スクリーンショットに差し替え */}
          <img
            width="100%"
            src={getFilePath("contents/buylis/screen1.png")}
            alt=""
            className=""
          />
        </div>
        <div className={styles.content_wrap_right}>
          {/* TODO: 見出し・説明 */}
          <span className={styles.strong}>見出し</span>
          <br />
          説明テキスト
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.content_wrap}>
          {/* TODO: 見出し・説明 */}
          <span className={styles.strong}>見出し</span>
          <br />
          説明テキスト
          <br />
        </div>
        <div className={styles.image_wrap}>
          {/* TODO: スクリーンショットに差し替え */}
          <img
            width="100%"
            src={getFilePath("contents/buylis/screen2.png")}
            alt=""
            className=""
          />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.image_wrap}>
          {/* TODO: スクリーンショットに差し替え */}
          <img
            width="100%"
            src={getFilePath("contents/buylis/screen3.png")}
            alt=""
            className=""
          />
        </div>
        <div className={styles.content_wrap_right}>
          {/* TODO: 見出し・説明 */}
          <span className={styles.strong}>見出し</span>
          <br />
          説明テキスト
          <br />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.content_wrap}>
          {/* TODO: 見出し・説明 */}
          <span className={styles.strong}>見出し</span>
          <br />
          説明テキスト
          <br />
        </div>
        <div className={styles.image_wrap}>
          {/* TODO: スクリーンショットに差し替え */}
          <img
            width="100%"
            src={getFilePath("contents/buylis/screen4.png")}
            alt=""
            className=""
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export const Head = () => {
  return <title>タイルケア - ychof villa</title>;
};
