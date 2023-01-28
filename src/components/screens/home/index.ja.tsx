import React from "react";
import Main from "./Main";
import { Blog, PostSectionModel } from "./Blog";
import { Developments, DevelopmentSectionModel } from "./Developments";

const postSections: PostSectionModel[] = [
  {
    title: "技術ブログ",
    posts: [
      {
        title: "データカタログを作成してZOZOTOWNデータベース定義をまとめた話",
        url: "https://techblog.zozo.com/entry/data-catalog",
        img: "home/blog/data-catalogue.jpg",
        // status: "badge2",
        categories: [
          {
            title: "Company Tech Blog",
          },
          {
            title: "Japanese",
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
          },
        ],
      },
    ],
  },
];
const developmentSections: DevelopmentSectionModel[] = [
  {
    title: "開発物",
    developments: [
      {
        title: "ポートフォリオ",
        img: "home/developments/portfolio_screen.png",
        techs: [
          {
            title: "使用技術",
            contents: ["React", "Gatsby", "TypeScript"],
          },
        ],
        categories: [
          {
            title: "MOBILE APP",
            color: "pink",
          },
        ],
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
            title: "使用技術 - アプリ",
            contents: ["Flutter"],
          },
          {
            title: "使用技術 - LP",
            contents: ["React", "Gatsby", "TypeScript"],
          },
        ],
        categories: [
          {
            title: "MOBILE APP",
            color: "pink",
          },
        ],
        contents: [
          {
            title: "概要",
            contents:
              "お買い物リスト。android, iOSのストアからインストール可能。",
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
    ],
  },
  {
    title: "開発物(未deploy)",
    developments: [
      {
        title: "Colorblind の視点再現と、区別しにくい境界線の検出",
        img: "home/developments/color-blindness.png",
        techs: [
          {
            title: "使用技術",
            contents: ["C++", "OpenCV"],
          },
        ],
        categories: [
          {
            title: "SOFTWARE",
            color: "pink",
          },
        ],
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
            title: "使用技術",
            contents: ["Java"],
          },
        ],
        categories: [
          {
            title: "SOFTWARE",
            color: "pink",
          },
        ],
        contents: [
          {
            title: "概要",
            contents: "画像圧縮ロジックを実装して遊んだやつ。",
          },
        ],
        links: [],
      },
    ],
  },
];

const HomeScreen: React.FC = () => {
  return (
    <>
      <Main />
      <Blog postSections={postSections} />
      <Developments developmentSections={developmentSections} />
    </>
  );
};

export default HomeScreen;
