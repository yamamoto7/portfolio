import React from "react";
import cn from "classnames";
import * as styles from "./Developments.module.sass";
import { TechIcons, TechIconModel } from "../../../molecules/TechIcons";
import Icon from "../../../atoms/Icon";
import getFilePath from "../../../../utils/getFilePath";

interface DevelopmentModel {
  title: string;
  img: string;
  techs: TechIconModel[];
  category: {
    title: string;
    color: string;
  };
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

const developments: DevelopmentModel[] = [
  {
    title: "ポートフォリオ",
    img: "home/developments/portfolio_screen.png",
    techs: [
      {
        title: "",
        contents: ["React", "Gatsby", "TypeScript"],
      },
    ],
    category: {
      title: "MOBILE APP",
      color: "pink",
    },
    contents: [
      {
        title: "概要",
        contents:
          "このサイト。作ったものを見れるようにしようと思い作成。作成中だけどとりあえず公開中。",
      },
    ],
    links: [
      {
        title: "GitHub",
        icon: "GitHub",
        url: "/products/share-buy-list",
      },
    ],
  },
  {
    title: "お買い物リストアプリ",
    img: "home/developments/buylis_screen.png",
    techs: [
      {
        title: "アプリ",
        contents: ["Flutter"],
      },
      {
        title: "LP",
        contents: ["React", "Gatsby", "TypeScript"],
      },
    ],
    category: {
      title: "MOBILE APP",
      color: "pink",
    },
    contents: [
      {
        title: "概要",
        contents: "お買い物リスト。android, iOSのストアからインストール可能。",
      },
    ],
    links: [
      {
        title: "Product LP",
        icon: "Page",
        url: "/buy-list",
      },
    ],
  },
];

const developmentsNotDeployed: DevelopmentModel[] = [
  {
    title: "Colorblind の視点再現と、区別しにくい境界線の検出",
    img: "home/developments/color-blindness.png",
    techs: [
      {
        title: "",
        contents: ["C++", "OpenCV"],
      },
    ],
    category: {
      title: "SOFTWARE",
      color: "pink",
    },
    contents: [
      {
        title: "概要",
        contents:
          "カメラの入力をリアルタイムに処理して、Colorblindの視点を再現と見えにくい部分の抽出を行うやつ。何かに役立てたいと思って開発した。",
      },
    ],
    links: [],
  },
  {
    title: "JPEGの画像圧縮ロジックを実装して挙動を確認する",
    img: "home/developments/image-compression.png",
    techs: [
      {
        title: "",
        contents: ["Java"],
      },
    ],
    category: {
      title: "SOFTWARE",
      color: "pink",
    },
    contents: [
      {
        title: "概要",
        contents: "画像圧縮ロジックを実装して遊んだやつ。",
      },
    ],
    links: [],
  },
];

const Developments: React.FC = () => {
  return (
    <div className={cn(styles.container)}>
      <h2 className={cn(styles.title)}>Developments</h2>
      {developments.map((item, index) => {
        return <DevelopmentsSection key={index} item={item} />;
      })}
      <h2 className={cn(styles.title)}>Developments (Not deployed)</h2>
      {developmentsNotDeployed.map((item, index) => {
        return <DevelopmentsSection key={index} item={item} />;
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
        <div className={cn(styles.category)}>使用技術</div>
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

export default Developments;
