import React from "react";
import cn from "classnames";
import * as styles from "./Blog.module.sass";
import getFilePath from '../../../../utils/getFilePath'

const posts = [
  {
    title: "データカタログを作成してZOZOTOWNデータベース定義をまとめた話",
    url: "https://techblog.zozo.com/entry/data-catalog",
    img: "home/blog/data-catalogue.jpg",
    // status: "badge2",
    category: {
      title: "Company Tech Blog",
      color: "pink",
    },
    width: "w50",
  },
  {
    title: "入門書を終えた人に捧げる、社会人のためのGit中級編",
    url: "https://qiita.com/yamamoto7/items/fe15a1e7e360b4015fae",
    img: "home/blog/git.png",
    // status: "badge1",
    category: {
      title: "",
      color: "blue",
    },
    width: "w50",
  },
];

function Blog() {
  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("center", styles.center)}>
        <h2 className={cn("title title_mb-lg")}>Recent posts</h2>

        <div className={cn(styles.list)}>
          {posts.map((x, i) => (
            <a className={cn(styles.item, styles[x.width])} href={x.url} key={i}>
              {x.status === "badge1" && <div className={cn(styles.status, styles.badge1)}>Pick up</div>}
              {x.status === "badge2" && <div className={cn(styles.status, styles.badge2)}>New</div>}

              <div className={styles.preview} style={{backgroundImage: `url(${getFilePath(x.img)})`}}></div>
              <h3 className={styles.info}>{x.title}</h3>

              <div className={cn(x.category.color, styles.category)}>{x.category.title}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;

