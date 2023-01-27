import React, { FunctionComponent } from "react";
import cn from "classnames";
import * as styles from "./TechIcons.module.sass";
import Icon from "../../atoms/Icon";

interface TechIconModel {
  title: string;
  contents: string[];
}

interface TechIconsProps {
  list: TechIconModel[];
}

const TechIcons: FunctionComponent<TechIconsProps> = ({ list }) => {
  return (
    <div>
      {list.map((x, i) => {
        return <TechIcon x={x} key={i} />;
      })}
    </div>
  );
};

interface TechIconProps {
  x: {
    title: string;
    contents: string[];
  };
}

const TechIcon: FunctionComponent<TechIconProps> = ({ x }) => {
  return (
    <>
      <div className={cn(styles.title)}>{x.title}</div>
      <div className={cn(styles.contents)}>
        {x.contents.map((content, j) => {
          return <TechIconContent content={content} key={j} />;
        })}
      </div>
    </>
  );
};

interface TechIconContentProps {
  content: string;
}

const TechIconContent: FunctionComponent<TechIconContentProps> = ({
  content,
}) => {
  return (
    <div className={cn(styles.item)}>
      <Icon className={cn(styles.iconCommon, styles.icon)} name={content} />
      <div className={cn(styles.name)}>{content}</div>
    </div>
  );
};

export { TechIcons };
export type { TechIconModel };
