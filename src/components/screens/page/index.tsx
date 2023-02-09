import React from "react";
import cn from "classnames";
import * as styles from "./Page.module.sass";
import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";
import "../../../styles/app.sass";

type Props = {
  children: React.ReactNode;
  lang?: string;
};

const Page: React.FC<Props> = (props) => {
  return (
    <div className={cn("page", styles.page)}>
      <Header lang={props.lang != null ? props.lang : "en"} />
      <div className={styles.inner}>{props.children}</div>
      <Footer />
    </div>
  );
};

export default Page;
