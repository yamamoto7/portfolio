import React from "react";
import cn from "classnames";
import * as styles from "./Developments.module.sass";
import TechIcons from "../../../molecules/TechIcons";
import Icon from "../../../atoms/Icon";
import getFilePath from '../../../../utils/getFilePath'

const developments = [
  {
    title: "ポートフォリオ",
    img: "inprogress.svg",
    techs: [
      {
        title: "",
        contents: [
          'React'
        ]
      }
    ],
    category: {
      title: "MOBILE APP",
      color: "pink",
    },
    contents: [
      {
        title: "概要",
        contents: "このサイト。作ったものを見れるようにしようと思い作成。作成中だけどとりあえず公開中。"
      }
    ],
    links: [
      {
        title: "GitHub",
        icon: 'GitHub',
        url: "/products/share-buy-list"
      }
    ]
  },
  {
    title: "(作成中)家族で共有するお買い物リストアプリ",
    img: "inprogress.svg",
    techs: [
      {
        title: "アプリ",
        contents: [
          'Flutter', 'GraphQL'
        ]
      },
      {
        title: "LP",
        contents: [
          'React', 'Gatsby'
        ]
      }
    ],
    category: {
      title: "MOBILE APP",
      color: "pink",
    },
    contents: [
      {
        title: "概要",
        contents: "家族、恋人同士でリアルタイムに共有できるお買い物リスト。android, iOSのストアからインストール可能。"
      }
    ],
    links: [
      {
        title: "GitHub",
        icon: 'GitHub',
        url: "/products/share-buy-list"
      }
    ]
  },
]

function Developments() {
  return (
    <>
      <div className={cn("center")}>
        <h2 className={cn("title title_mb-lg")}>Developments</h2>
        {developments.map((x, i) => (
          <DevelopmentsSection key={i} x={x} />
        ))}
      </div>
    </>
  );
}

const DevelopmentsSection = ({x}) => {
  return (
    <div className={cn("section")}>
      <div className={cn("center", styles.center)}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.photo} style={{ backgroundImage: `url(${getFilePath(x.img)})` }}></div>
          </div>
          <div className={styles.col}>
            <h2 className={styles.title}>{x.title}</h2>
            {x.contents.map((content, j) => (
              <DevelopmentsSectionContent content={content} key={content.title} />
            ))}
            <div className={styles.category}>使用技術</div>
            <div className={styles.text}>
              <TechIcons list={x.techs} />
            </div>
            <div className={styles.text}>
              {x.links.map((link, j) => (
                <DevelopmentsSectionLink link={link} key={link.title} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DevelopmentsSectionContent = ({content}) => {
  return (
    <div className={styles.item}>
      <div className={styles.category}>{content.title}</div>
      <div className={styles.text}>{content.contents}</div>
    </div>
  );
}

const DevelopmentsSectionLink = ({link}) => {
  return (
    <a href={link.url}>
      <button className={cn("button button-mini")}>
        <Icon className={cn("icon-common", styles.linkicon)} name={link.icon} />
        {link.title}
      </button>
    </a>
  );
}

export default Developments;

