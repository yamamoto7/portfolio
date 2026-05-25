import * as React from "react";
import getFilePath from "../../utils/getFilePath";
import Header from "./components/header";
import Footer from "./components/footer";
import * as styles from "./index.module.sass";

const features = [
  {
    heading: "東大・京大の伝説の問題に挑戦",
    desc: "語り継がれる名問の数々。いま、あなたが挑む番です。",
    shot: "contents/mugen-sugaku/screen1.png",
  },
  {
    heading: "大学入試から小学校入試まで",
    desc: "幅広いレベルの良問を、ひとつのアプリで。学び直しにも最適です。",
    shot: "contents/mugen-sugaku/screen2.png",
  },
  {
    heading: "古典から近代の名問も幅広く",
    desc: "時代を越えて愛される問題を多数収録。数学の奥深さに触れられます。",
    shot: "contents/mugen-sugaku/screen3.png",
  },
];

export default function Component() {
  return (
    <>
      <Header />
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroVisual}>
            <img
              className={styles.heroVisualImg}
              src={getFilePath("contents/mugen-sugaku/mv.png")}
              alt="無限数学"
            />
          </div>
          <div className={styles.heroBody}>
            <img
              className={styles.heroLogo}
              src={getFilePath("contents/mugen-sugaku/name.png")}
              alt="無限数学"
            />
            <h1 className={styles.heroTitle}>
              大人のための
              <br />
              数学の教養を
            </h1>
            <p className={styles.heroLead}>
              教養としての数学を、もう一度。大学入試から小学校入試まで。
            </p>
            {/* TODO: App Store / Google Play のURLを設定 */}
            <div className={styles.storeButtons}>
              <a href="#">
                <img
                  className={styles.storeButton}
                  src={getFilePath("contents/common/appstore.png")}
                  alt="App Store"
                />
              </a>
              <a href="#">
                <img
                  className={styles.storeButton}
                  src={getFilePath("contents/common/playstore.png")}
                  alt="Google Play"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.features}>
        {features.map((f, i) => (
          <section className={styles.feature} key={f.shot}>
            <div className={styles.featureShot}>
              <img
                className={styles.featureShotImg}
                src={getFilePath(f.shot)}
                alt=""
              />
            </div>
            <div className={styles.featureText}>
              <span className={styles.featureLabel}>POINT 0{i + 1}</span>
              <h2 className={styles.featureHeading}>{f.heading}</h2>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          </section>
        ))}
      </div>

      <section className={styles.cta}>
        <p className={styles.ctaTitle}>教養としての数学を、はじめよう。</p>
        {/* TODO: App Store / Google Play のURLを設定 */}
        <div className={styles.storeButtons}>
          <a href="#">
            <img
              className={styles.storeButton}
              src={getFilePath("contents/common/appstore.png")}
              alt="App Store"
            />
          </a>
          <a href="#">
            <img
              className={styles.storeButton}
              src={getFilePath("contents/common/playstore.png")}
              alt="Google Play"
            />
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export const Head = () => {
  return <title>無限数学 - ychof villa</title>;
};
