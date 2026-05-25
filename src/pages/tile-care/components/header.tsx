import * as React from "react";
import getFilePath from "../../../utils/getFilePath";
import * as styles from "../index.module.sass";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a className={styles.headerBrand} href="/tile-care">
          <img
            className={styles.headerIcon}
            src={getFilePath("contents/tile-care/icon.png")}
            alt="タイルケア"
          />
          <img
            className={styles.headerName}
            src={getFilePath("contents/tile-care/name.png")}
            alt="タイルケア"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
