export interface PostCategory {
  title: string;
}

export interface Post {
  title: string;
  url: string;
  img: string;
  categories: PostCategory[];
}

export interface PostSection {
  title: string;
  posts: Post[];
}

export interface TechGroup {
  title: string;
  contents: string[];
}

export interface DevContent {
  title: string;
  contents: string;
}

export interface DevLink {
  title: string;
  icon: string;
  url: string;
}

export interface Development {
  title: string;
  img: string;
  techs: TechGroup[];
  contents: DevContent[];
  links: DevLink[];
}

export interface DevSection {
  title: string;
  developments: Development[];
}

export interface HomeContent {
  postSections: PostSection[];
  developmentSections: DevSection[];
}

export type Lang = "en" | "ja";

export const homeContent: Record<Lang, HomeContent> = {
  en: {
    postSections: [
      {
        title: "Recent posts",
        posts: [
          {
            title:
              "Create the Data Catalog which automatically generates database documents",
            url: "https://techblog.zozo.com/entry/data-catalog",
            img: "/home/blog/data-catalogue.jpg",
            categories: [{ title: "Company Tech Blog" }, { title: "Japanese" }],
          },
          {
            title:
              "For People Who Have Completed Beginner Books, Intermediate Git for Working Adults",
            url: "https://qiita.com/yamamoto7/items/fe15a1e7e360b4015fae",
            img: "/home/blog/git.png",
            categories: [{ title: "Japanese" }],
          },
        ],
      },
    ],
    developmentSections: [
      {
        title: "Developments",
        developments: [
          {
            title: "Portfolio",
            img: "/home/developments/portfolio_screen.png",
            techs: [
              { title: "Technologies", contents: ["React", "Gatsby", "TypeScript"] },
            ],
            contents: [{ title: "About", contents: "This website." }],
            links: [
              {
                title: "GitHub",
                icon: "GitHub",
                url: "https://github.com/yamamoto7/portfolio",
              },
            ],
          },
          {
            title: "Buylis - Shopping list APP",
            img: "/home/developments/buylis_screen.png",
            techs: [
              { title: "Technologies - APP", contents: ["Flutter"] },
              { title: "Technologies - LP", contents: ["React", "Gatsby", "TypeScript"] },
            ],
            contents: [
              {
                title: "About",
                contents:
                  "A shopping list APP. Available for install from the android and iOS stores.",
              },
            ],
            links: [{ title: "Product LP", icon: "Page", url: "/buylis" }],
          },
        ],
      },
      {
        title: "Developments (not deployed)",
        developments: [
          {
            title:
              "Real-time Reproduction of Colorblind Perspectives and Detection of Hard-to-Distinguish Boundaries",
            img: "/home/developments/color-blindness.png",
            techs: [{ title: "Technologies", contents: ["C++", "OpenCV"] }],
            contents: [
              {
                title: "About",
                contents:
                  "I am interested in solving the problem of color blindness, and as a first step, I reproduced the viewpoint of a color blind person. I also defined areas that are difficult to distinguish and developed a function to visualize these points.",
              },
            ],
            links: [],
          },
          {
            title:
              "Application that reproduces the compression logic to check the behavior of JPEG",
            img: "/home/developments/image-compression.png",
            techs: [{ title: "Technologies", contents: ["Java"] }],
            contents: [
              {
                title: "About",
                contents:
                  "The objective was to reproduce the image compression logic and visualize its behavior to satisfy intellectual curiosity.",
              },
            ],
            links: [],
          },
        ],
      },
    ],
  },
  ja: {
    postSections: [
      {
        title: "技術ブログ",
        posts: [
          {
            title: "データカタログを作成してZOZOTOWNデータベース定義をまとめた話",
            url: "https://techblog.zozo.com/entry/data-catalog",
            img: "/home/blog/data-catalogue.jpg",
            categories: [{ title: "Company Tech Blog" }, { title: "Japanese" }],
          },
          {
            title: "入門書を終えた人に捧げる、社会人のためのGit中級編",
            url: "https://qiita.com/yamamoto7/items/fe15a1e7e360b4015fae",
            img: "/home/blog/git.png",
            categories: [{ title: "Japanese" }],
          },
        ],
      },
    ],
    developmentSections: [
      {
        title: "開発物",
        developments: [
          {
            title: "ポートフォリオ",
            img: "/home/developments/portfolio_screen.png",
            techs: [{ title: "使用技術", contents: ["React", "Gatsby", "TypeScript"] }],
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
                url: "https://github.com/yamamoto7/portfolio",
              },
            ],
          },
          {
            title: "お買い物リストアプリ",
            img: "/home/developments/buylis_screen.png",
            techs: [
              { title: "使用技術 - アプリ", contents: ["Flutter"] },
              { title: "使用技術 - LP", contents: ["React", "Gatsby", "TypeScript"] },
            ],
            contents: [
              {
                title: "概要",
                contents: "お買い物リスト。android, iOSのストアからインストール可能。",
              },
            ],
            links: [{ title: "Product LP", icon: "Page", url: "/buylis" }],
          },
        ],
      },
      {
        title: "開発物(未deploy)",
        developments: [
          {
            title: "Colorblind の視点再現と、区別しにくい境界線の検出",
            img: "/home/developments/color-blindness.png",
            techs: [{ title: "使用技術", contents: ["C++", "OpenCV"] }],
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
            img: "/home/developments/image-compression.png",
            techs: [{ title: "使用技術", contents: ["Java"] }],
            contents: [{ title: "概要", contents: "画像圧縮ロジックを実装して遊んだやつ。" }],
            links: [],
          },
        ],
      },
    ],
  },
};
