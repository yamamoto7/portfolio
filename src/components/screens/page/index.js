import React from "react";
import cn from "classnames";
import * as styles from "./Page.module.sass";
import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";
import "../../../styles/app.sass";

const Page = ({ children }) => {
  return (
    <div className={cn("page", styles.page)}>
      <Header />
      <div className={styles.inner}>{children}</div>
      <Footer />
    </div>
  );
};

export default Page;

