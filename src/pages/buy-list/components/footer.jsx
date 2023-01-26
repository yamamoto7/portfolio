import * as React from "react";
// import './index.css';
import getFilePath from "../../../utils/getFilePath";
import * as styles from "../index.module.sass";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content_wrap}>
        <div className={styles.content}>
          <a href="/" className={styles.logo}>
            <img src={getFilePath("logo.svg")} alt="" />
          </a>
          <ul className={styles.content}>
            <li>
              <button className={styles.btn_rounded}>
                <i className={styles.facebook} />
              </button>
            </li>
            <li>
              <button className={styles.btn_rounded}>
                <i className={styles.twitter} />
              </button>
            </li>
            <li>
              <button className={styles.btn_rounded}>
                <i className={styles.linkedin} />
              </button>
            </li>
          </ul>
        </div>
        <div className={styles.content_text}>
          <a href="/buy-list/">アプリ紹介ページ</a>
          <br />
          <a href="/buy-list/privacy-policy/ja/">プライバシーポリシー</a>
        </div>
        <div className={styles.content_text}>
          <a href="/">開発者について</a>
        </div>
      </div>
      <div className={styles.copyright}>© 2022 All rights reserved</div>
    </footer>
  );
}
