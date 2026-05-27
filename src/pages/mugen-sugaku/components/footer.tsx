import * as React from "react";
import getFilePath from "../../../utils/getFilePath";
import * as styles from "../index.module.sass";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <a className={styles.footerBrand} href="/mugen-sugaku">
          <img
            className={styles.footerIcon}
            src={getFilePath("contents/mugen-sugaku/icon.png")}
            alt="無限数学"
          />
          <span>無限数学</span>
        </a>
        <nav className={styles.footerLinks}>
          <a className={styles.footerLink} href="/mugen-sugaku/">
            アプリ紹介
          </a>
          <a className={styles.footerLink} href="/mugen-sugaku/privacy-policy/">
            プライバシーポリシー
          </a>
          <a
            className={styles.footerLink}
            href="https://docs.google.com/forms/d/e/1FAIpQLSf0hPNDtFBaBPpp_N2UQjwXMye-LJYD72MU8k0Edj3nZKRQog/viewform?entry.1388710164=%E6%95%99%E9%A4%8A%E3%82%92%E4%BB%98%E3%81%91%E3%82%8B%20%E5%A4%A7%E4%BA%BA%E3%81%AE%E6%95%B0%E5%AD%A6"
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
