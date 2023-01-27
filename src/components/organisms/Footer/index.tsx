import React from "react";
import cn from "classnames";
import * as styles from "./Footer.module.sass";
import getFilePath from "../../../utils/getFilePath";

const Footer: React.FC = () => {
  return (
    <footer className={cn(styles.footer)}>
            <a className={cn(styles.logo)} href="/">
              <img
                src={getFilePath("logo.svg")}
                alt="logo image for this site"
              />
            </a>

            <div className={cn(styles.copyright)}>© 2023 - All rights reserved</div>
    </footer>
  );
};

export default Footer;
