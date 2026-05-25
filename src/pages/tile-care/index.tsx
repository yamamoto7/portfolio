import * as React from "react";
import getFilePath from "../../utils/getFilePath";
import Header from "./components/header";
import Footer from "./components/footer";
import * as styles from "./index.module.sass";

const features = [
  {
    heading: "間取りに合わせてタイルを簡単登録",
    desc: "あなたの部屋のレイアウトそのままに、タイルを並べて登録できます。",
    shot: "contents/tile-care/screen1.png",
  },
  {
    heading: "洗濯周期は私に任せて！",
    desc: "次に洗うべきタイルを、アプリがそっと教えてくれます。",
    shot: "contents/tile-care/screen2.png",
  },
  {
    heading: "綺麗好きでペットに尽くすあなたへ",
    desc: "清潔な空間を、大切な家族のために。洗ったタイルもひと目で分かります。",
    shot: "contents/tile-care/screen3.png",
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
              src={getFilePath("contents/tile-care/mv.png")}
              alt="タイルケア"
            />
          </div>
          <div className={styles.heroBody}>
            <img
              className={styles.heroLogo}
              src={getFilePath("contents/tile-care/name.png")}
              alt="タイルケア"
            />
            <h1 className={styles.heroTitle}>
              タイルカーペットの
              <br />
              洗濯周期を管理
            </h1>
            <p className={styles.heroLead}>
              いつどのタイルを洗ったか、次はどれか。それだけのアプリ。
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
        <p className={styles.ctaTitle}>タイルケア、はじめてみませんか。</p>
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
  return <title>タイルケア - ychof villa</title>;
};
