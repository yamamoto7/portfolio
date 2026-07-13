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
        title: "Tech blog",
        posts: [
          {
            title: "Building a Data Catalog to Consolidate ZOZOTOWN's Database Definitions",
            url: "https://techblog.zozo.com/entry/data-catalog",
            img: "/home/blog/data-catalogue.jpg",
            categories: [{ title: "Company Tech Blog" }, { title: "Japanese" }],
          },
          {
            title: "For People Who Have Finished the Beginner Books: Intermediate Git for Working Professionals",
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
            techs: [{ title: "Technologies", contents: ["React", "Gatsby", "TypeScript"] }],
            contents: [
              {
                title: "About",
                contents:
                  "This website. I built it to have a place to show the things I make. Still a work in progress, but published for now.",
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
            title: "Shopping list APP",
            img: "/home/developments/buylis_screen.png",
            techs: [
              { title: "Technologies - APP", contents: ["Flutter"] },
              { title: "Technologies - LP", contents: ["React", "Gatsby", "TypeScript"] },
            ],
            contents: [
              {
                title: "About",
                contents: "A shopping list app. Available for install from the Android and iOS stores.",
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
            title: "Reproducing a Colorblind Perspective and Detecting Hard-to-Distinguish Boundaries",
            img: "/home/developments/color-blindness.png",
            techs: [{ title: "Technologies", contents: ["C++", "OpenCV"] }],
            contents: [
              {
                title: "About",
                contents:
                  "Processes camera input in real time to reproduce a colorblind perspective and extract the areas that are hard to see. I built it hoping it could be useful for something.",
              },
            ],
            links: [],
          },
          {
            title: "Implementing JPEG Image Compression Logic to Observe Its Behavior",
            img: "/home/developments/image-compression.png",
            techs: [{ title: "Technologies", contents: ["Java"] }],
            contents: [{ title: "About", contents: "A little project where I implemented image compression logic for fun." }],
            links: [],
          },
        ],
      },
    ],
  },
};
