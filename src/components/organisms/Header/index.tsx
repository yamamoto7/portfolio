import React from "react";
import cn from "classnames";
import * as styles from "./Header.module.sass";
import getFilePath from "../../../utils/getFilePath";

interface HeaderProps {
  lang: string;
}
const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className={cn(styles.header)}>
      <div className={cn(styles.container)}>
        <a className={cn(styles.logo)} href="/">
          <img src={getFilePath("logo.svg")} alt="logo image for this site" />
        </a>
        <div className={styles.button_wrap}>
          <a href="/ja">
            <button
              className={cn(
                styles.button,
                props.lang == "ja" ? styles.active : null
              )}
            >
              JP
            </button>
          </a>
          <a href="/">
            <button
              className={cn(
                styles.button,
                props.lang == "en" ? styles.active : null
              )}
            >
              EN
            </button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
