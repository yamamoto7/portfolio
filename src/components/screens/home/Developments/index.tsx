import React from "react";
import cn from "classnames";
import * as styles from "./Developments.module.sass";
import { TechIcons, TechIconModel } from "../../../molecules/TechIcons";
import Icon from "../../../atoms/Icon";
import getFilePath from "../../../../utils/getFilePath";

interface DevelopmentCategoryModel {
  title: string;
  color: string;
}

interface DevelopmentModel {
  title: string;
  img: string;
  techs: TechIconModel[];
  categories: DevelopmentCategoryModel[];
  contents: Array<{
    title: string;
    contents: string;
  }>;
  links: Array<{
    title: string;
    icon: string;
    url: string;
  }>;
}

interface DevelopmentSectionModel {
  title: string;
  developments: DevelopmentModel[];
}

interface DevelopmentsProps {
  developmentSections: DevelopmentSectionModel[];
}

const Developments: React.FC<DevelopmentsProps> = (props) => {
  return (
    <div className={cn(styles.container)}>
      {props.developmentSections.map((developmentSection) => {
        return (
          <>
            <h2 className={cn(styles.title)}>{developmentSection.title}</h2>
            {developmentSection.developments.map((item, index) => {
              return <DevelopmentsSection key={index} item={item} />;
            })}
          </>
        );
      })}
    </div>
  );
};

interface DevelopmentsSectionProps {
  item: DevelopmentModel;
}

const DevelopmentsSection: React.FC<DevelopmentsSectionProps> = (props) => {
  return (
    <div className={cn(styles.section_wrap)}>
      <h2 className={cn(styles.contents_title, styles.contents_title_sp)}>
        {props.item.title}
      </h2>
      <div className={cn(styles.image_wrap)}>
        <div
          className={cn(styles.photo)}
          style={{ backgroundImage: `url(${getFilePath(props.item.img)})` }}
        />
      </div>
      <div className={cn(styles.contents_wrap)}>
        <h2 className={cn(styles.contents_title)}>{props.item.title}</h2>
        {props.item.contents.map((content) => {
          return (
            <DevelopmentsSectionContent content={content} key={content.title} />
          );
        })}
        <div className={cn(styles.contents_text)}>
          <TechIcons list={props.item.techs} />
        </div>
        <div className={cn(styles.contents_text)}>
          {props.item.links.map((link) => {
            return <DevelopmentsSectionLink link={link} key={link.title} />;
          })}
        </div>
      </div>
    </div>
  );
};

interface DevelopmentsSectionContentProps {
  content: { title: string; contents: string };
}

const DevelopmentsSectionContent: React.FC<DevelopmentsSectionContentProps> = (
  props
) => {
  return (
    <div className={cn(styles.item)}>
      <div className={cn(styles.category)}>{props.content.title}</div>
      <div className={cn(styles.contents_text)}>{props.content.contents}</div>
    </div>
  );
};

interface DevelopmentsSectionLinkProps {
  link: { title: string; url: string; icon: string };
}

const DevelopmentsSectionLink: React.FC<DevelopmentsSectionLinkProps> = (
  props
) => {
  return (
    <a href={props.link.url}>
      <button className={cn(styles.link_button)}>
        <Icon className={cn(styles.link_icon)} name={props.link.icon} />
        <span>{props.link.title}</span>
      </button>
    </a>
  );
};

export { Developments };
export type { DevelopmentSectionModel };
