import React from "react";
import cn from "classnames";
import * as styles from "./Blog.module.sass";
import getFilePath from "../../../../utils/getFilePath";

interface PostCategoryModel {
  title: string;
  color: string;
}

interface Post {
  title: string;
  url: string;
  img: string;
  status?: string;
  categories: PostCategoryModel[];
}

const posts: Post[] = [
  {
    title: "データカタログを作成してZOZOTOWNデータベース定義をまとめた話",
    url: "https://techblog.zozo.com/entry/data-catalog",
    img: "home/blog/data-catalogue.jpg",
    // status: "badge2",
    categories: [
      {
        title: "Company Tech Blog",
        color: styles.pink,
      },
      {
        title: "Japanese",
        color: styles.blue,
      },
    ],
  },
  {
    title: "入門書を終えた人に捧げる、社会人のためのGit中級編",
    url: "https://qiita.com/yamamoto7/items/fe15a1e7e360b4015fae",
    img: "home/blog/git.png",
    // status: "badge1",
    categories: [
      {
        title: "Japanese",
        color: styles.blue,
      },
    ],
  },
];

const Blog: React.FC = () => {
  return (
    <div className={cn(styles.container)}>
      <h2 className={cn(styles.title)}>Recent posts</h2>

      <div className={cn(styles.list)}>
        {posts.map((item, index) => {
          return (
            <a className={cn(styles.item)} href={item.url} key={index}>
              <div
                className={cn(styles.item_preview)}
                style={{ backgroundImage: `url(${getFilePath(item.img)})` }}
              ></div>
              <div className={cn(styles.item_contents)}>
                <h3 className={cn(styles.info)}>{item.title}</h3>

                {item.status === "badge1" && (
                  <div className={cn(styles.status, styles.badge1)}>
                    Pick up
                  </div>
                )}
                {item.status === "badge2" && (
                  <div className={cn(styles.status, styles.badge2)}>New</div>
                )}
                {item.categories.map((category, index) => {
                  return (
                    <div className={cn(category.color, styles.category)}>
                      {category.title}
                    </div>
                  );
                })}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
