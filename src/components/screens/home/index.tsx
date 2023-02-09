import React from "react";
import Main from "./Main";
import { Blog, PostSectionModel } from "./Blog";
import { Developments, DevelopmentSectionModel } from "./Developments";

const postSections: PostSectionModel[] = [
  {
    title: "Recent posts",
    posts: [
      {
        title:
          "Create the Data Catalog which automatically generates database documents",
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
        title:
          "For People Who Have Completed Beginner Books, Intermediate Git for Working Adults",
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
    title: "Developments",
    developments: [
      {
        title: "Portfolio",
        img: "home/developments/portfolio_screen.png",
        techs: [
          {
            title: "Technologies",
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
            title: "About",
            contents: "This website.",
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
        title: "Buylis - Shopping list APP",
        img: "home/developments/buylis_screen.png",
        techs: [
          {
            title: "Technologies - APP",
            contents: ["Flutter"],
          },
          {
            title: "Technologies - LP",
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
            title: "About",
            contents:
              "A shopping list APP. Available for install from the android and iOS stores.",
          },
        ],
        links: [
          {
            title: "Product LP",
            icon: "Page",
            url: "/buylis",
          },
        ],
      },
    ],
  },
  {
    title: "Developments (not deployed)",
    developments: [
      {
        title:
          "Real-time Reproduction of Colorblind Perspectives and Detection of Hard-to-Distinguish Boundaries",
        img: "home/developments/color-blindness.png",
        techs: [
          {
            title: "Technologies",
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
        img: "home/developments/image-compression.png",
        techs: [
          {
            title: "Technologies",
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
            title: "About",
            contents:
              "The objective was to reproduce the image compression logic and visualize its behavior to satisfy intellectual curiosity.",
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
