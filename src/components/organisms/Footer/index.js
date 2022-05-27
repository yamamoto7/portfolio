import React from "react";
import cn from "classnames";
import * as styles from "./Footer.module.sass";
import getFilePath from '../../../utils/getFilePath'

const Footer = () => {
  return (
    <footer className={cn("footer", styles.footer)}>
      <div className={cn("center", styles.center)}>
        <div className={cn("row", styles.row)}>
          <div className={styles.col}>
            <a className={styles.logo} href="/">
              <img className={styles.logo_desktop} src={getFilePath("logo.svg")} alt="logo image for this site" />
              <img className={styles.logo_mobile} src={getFilePath("logo.svg")} alt="logo image for this site" />
            </a>

            <div className={styles.copyright}>© 2022 - All rights reserved</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
