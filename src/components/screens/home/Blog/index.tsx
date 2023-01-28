import React from "react";
import cn from "classnames";
import * as styles from "./Blog.module.sass";
import getFilePath from "../../../../utils/getFilePath";

interface PostCategoryModel {
  title: string;
}

interface PostModel {
  title: string;
  url: string;
  img: string;
  status?: string;
  categories: PostCategoryModel[];
}

interface PostSectionModel {
  title: string;
  posts: PostModel[];
}

const posts: PostModel[] = [];

interface BlogProps {
  postSections: PostSectionModel[];
}

const Blog: React.FC<BlogProps> = (props) => {
  return (
    <div className={cn(styles.container)}>
      {props.postSections.map((postSection) => {
        return (
          <>
            <h2 className={cn(styles.title)}>{postSection.title}</h2>

            <div className={cn(styles.list)}>
              {postSection.posts.map((item, index) => {
                return (
                  <a className={cn(styles.item)} href={item.url} key={index}>
                    <div
                      className={cn(styles.item_preview)}
                      style={{
                        backgroundImage: `url(${getFilePath(item.img)})`,
                      }}
                    ></div>
                    <div className={cn(styles.item_contents)}>
                      <h3 className={cn(styles.info)}>{item.title}</h3>

                      {item.status === "badge1" && (
                        <div className={cn(styles.status, styles.badge1)}>
                          Pick up
                        </div>
                      )}
                      {item.status === "badge2" && (
                        <div className={cn(styles.status, styles.badge2)}>
                          New
                        </div>
                      )}
                      {item.categories.map((category, index) => {
                        return (
                          <div className={cn(styles.category)}>
                            {category.title}
                          </div>
                        );
                      })}
                    </div>
                  </a>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};

export { Blog };
export type { PostSectionModel };
