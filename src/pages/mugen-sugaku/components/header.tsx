import * as React from "react";
import getFilePath from "../../../utils/getFilePath";
import * as styles from "../index.module.sass";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a className={styles.headerBrand} href="/mugen-sugaku">
          <img
            className={styles.headerIcon}
            src={getFilePath("contents/mugen-sugaku/icon.png")}
            alt="無限数学"
          />
          <img
            className={styles.headerName}
            src={getFilePath("contents/mugen-sugaku/name.png")}
            alt="無限数学"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
