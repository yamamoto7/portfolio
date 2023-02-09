import * as React from "react";
// import './index.css';
import getFilePath from "../../../utils/getFilePath";
import * as styles from "../index.module.sass";

const Header: React.FC = () => {
  return (
    <header>
      <nav className={styles.header_container}>
        <a className={styles.header_logo} href="/buylis">
          <img
            width="25px"
            src={getFilePath("contents/buylis/icon.svg")}
            alt="Logo"
            className=""
          />
        </a>
      </nav>
    </header>
  );
};

export default Header;
