import React from "react";
import cn from "classnames";
import * as styles from  "./Header.module.sass";
import getFilePath from "../../../utils/getFilePath";

const Header: React.FC = () => {
  return (
    <header className={cn(styles.header)}>
      <div className={cn(styles.container)}>
        <a className={cn(styles.logo)} href="/">
          <img
            src={getFilePath("logo.svg")}
            alt="logo image for this site"
          />
        </a>
      </div>
    </header>
  );
}

export default Header;
