import React from "react";
import Main from "./Main";
import Blog from "./Blog";
import Developments from "./Developments";

const HomeScreen: React.FC = () => {
  return (
    <>
      <Main />
      <Blog />
      <Developments />
    </>
  );
};

export default HomeScreen;
