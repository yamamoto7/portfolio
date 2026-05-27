import * as React from "react";
import getFilePath from "../../utils/getFilePath";
import Header from "./components/header";
import Footer from "./components/footer";
import * as styles from "./index.module.sass";

const features = [
  {
    heading: "マニアを唸らせる難問のみ収録",
    desc: "簡単な問題はもう卒業。歯ごたえのある難問だけを厳選して収録しました。",
    shot: "contents/mugen-sudoku/screen1.png",
  },
  {
    heading: "邪魔な広告は一切なし",
    desc: "思考を妨げるバナーやポップアップはゼロ。ただ問題に集中できます。",
    shot: "contents/mugen-sudoku/screen2.png",
  },
  {
    heading: "爽快な操作感",
    desc: "ナンプレマニア監修。ストレスのない入力で、解く快感だけが残ります。",
    shot: "contents/mugen-sudoku/screen3.png",
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
              src={getFilePath("contents/mugen-sudoku/mv.png")}
              alt="無限数独"
            />
          </div>
          <div className={styles.heroBody}>
            <img
              className={styles.heroLogo}
              src={getFilePath("contents/mugen-sudoku/name.png")}
              alt="無限数独"
            />
            <h1 className={styles.heroTitle}>
              激ムズを求める
              <br />
              あなたにおすすめ
            </h1>
            <p className={styles.heroLead}>
              ナンプレマニア監修。感動の操作体験を、広告なしで。
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
        <p className={styles.ctaTitle}>激ムズナンプレ、はじめてみませんか。</p>
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

      <section className={styles.contact}>
        <h2 className={styles.contactTitle}>お困りですか？</h2>
        <p className={styles.contactLead}>
          アプリの使い方・ご要望・不具合のご報告など、お気軽にお問い合わせください。
        </p>
        <a
          className={styles.contactButton}
          href="https://docs.google.com/forms/d/e/1FAIpQLSf0hPNDtFBaBPpp_N2UQjwXMye-LJYD72MU8k0Edj3nZKRQog/viewform?entry.1388710164=%E8%B6%85%E9%9B%A3%E5%95%8F%20%E6%95%B0%E7%8B%AC999%E5%95%8F"
          target="_blank"
          rel="noopener noreferrer"
        >
          お問い合わせ
        </a>
      </section>

      <Footer />
    </>
  );
}

export const Head = () => {
  return <title>無限数独 - ychof villa</title>;
};
