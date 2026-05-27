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
          <a
            className={styles.footerLink}
            href="https://docs.google.com/forms/d/e/1FAIpQLSf0hPNDtFBaBPpp_N2UQjwXMye-LJYD72MU8k0Edj3nZKRQog/viewform?entry.1388710164=%E3%82%BF%E3%82%A4%E3%83%AB%E3%82%AB%E3%83%BC%E3%83%9A%E3%83%83%E3%83%88%E4%BA%A4%E6%8F%9B%E5%91%A8%E6%9C%9F%E7%AE%A1%E7%90%86"
            target="_blank"
            rel="noopener noreferrer"
          >
            お問い合わせ
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
