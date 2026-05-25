import * as React from "react";
import getFilePath from "../../../utils/getFilePath";
import * as styles from "../index.module.sass";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <a className={styles.footerBrand} href="/tile-care">
          <img
            className={styles.footerIcon}
            src={getFilePath("contents/tile-care/icon.png")}
            alt="タイルケア"
          />
          <span>タイルケア</span>
        </a>
        <nav className={styles.footerLinks}>
          <a className={styles.footerLink} href="/tile-care/">
            アプリ紹介
          </a>
          <a className={styles.footerLink} href="/tile-care/privacy-policy/">
            プライバシーポリシー
          </a>
          <a className={styles.footerLink} href="/">
            開発者について
          </a>
        </nav>
      </div>
      <div className={styles.copyright}>© 2026 ychof. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
