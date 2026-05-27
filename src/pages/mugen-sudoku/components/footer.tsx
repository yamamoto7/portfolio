import * as React from "react";
import getFilePath from "../../../utils/getFilePath";
import * as styles from "../index.module.sass";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <a className={styles.footerBrand} href="/mugen-sudoku">
          <img
            className={styles.footerIcon}
            src={getFilePath("contents/mugen-sudoku/icon.png")}
            alt="無限数独"
          />
          <span>無限数独</span>
        </a>
        <nav className={styles.footerLinks}>
          <a className={styles.footerLink} href="/mugen-sudoku/">
            アプリ紹介
          </a>
          <a className={styles.footerLink} href="/mugen-sudoku/privacy-policy/">
            プライバシーポリシー
          </a>
          <a
            className={styles.footerLink}
            href="https://docs.google.com/forms/d/e/1FAIpQLSf0hPNDtFBaBPpp_N2UQjwXMye-LJYD72MU8k0Edj3nZKRQog/viewform?entry.1388710164=%E8%B6%85%E9%9B%A3%E5%95%8F%20%E6%95%B0%E7%8B%AC999%E5%95%8F"
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
