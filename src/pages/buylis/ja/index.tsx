import * as React from "react";
import getFilePath from "../../../utils/getFilePath";
import Header from "./../components/header";
import Footer from "./../components/footer";
import * as styles from "./../index.module.sass";

export default function Component() {
  return (
    <>
      <Header />
      <section className={`${styles.section} ${styles.mv}`}>
        <div className={styles.mv_image_wrap} />
        <div className={styles.content_wrap}>
          <img
            width="200px"
            src={getFilePath("contents/buylis/name.png")}
            alt="Logo"
            className=""
          />
          <br />
          フォルダ管理で貴方好みのお買物リストに
          <br />
          <a href="https://apps.apple.com/app/id1665553308" className="">
            <img
              className={styles.store_button}
              src={getFilePath("contents/common/appstore.png")}
            />
          </a>{" "}
          <a href="https://play.google.com/store/apps/details?id=com.ychof.personal_buy_list">
            <img
              className={styles.store_button}
              src={getFilePath("contents/common/playstore.png")}
            />
          </a>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.image_wrap}>
          <img
            width="100%"
            src={getFilePath("contents/buylis/screen1.png")}
            alt="Logo"
            className=""
          />
        </div>
        <div className={styles.content_wrap_right}>
          <span className={styles.strong}>それ以上でもそれ以下でもない</span>
          <br />
          シンプルでわかりやすいお買い物リスト
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.content_wrap}>
          <span className={styles.strong}>好きなように使える</span>
          <br />
          価格や商品名をメモして
          <br />
          長く使いやすいリストへ
          <br />
        </div>
        <div className={styles.image_wrap}>
          <img
            width="100%"
            src={getFilePath("contents/buylis/screen2.png")}
            alt="Logo"
            className=""
          />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.image_wrap}>
          <img
            width="100%"
            src={getFilePath("contents/buylis/screen3.png")}
            alt="Logo"
            className=""
          />
        </div>
        <div className={styles.content_wrap_right}>
          <span className={styles.strong}>フォルダ管理機能</span>
          <br />
          お店ごと、カテゴリごとに
          <br />
          貴方好みのリスト管理を実現
          <br />
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.content_wrap}>
          <span className={styles.strong}>始めてみましょう</span>
          <br />
          ちょっぴり新しい
          <br />
          お買い物リスト管理
          <br />
        </div>
        <div className={styles.image_wrap}>
          <img
            width="100%"
            src={getFilePath("contents/buylis/screen4.png")}
            alt="Logo"
            className=""
          />
        </div>
      </section>
      <Footer />
    </>
  );
}

export const Head = () => {
  return <title>Buylis - ychof villa</title>;
};
