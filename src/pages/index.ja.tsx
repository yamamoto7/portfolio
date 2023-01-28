import React from "react";
import Page from "../components/screens/page";
import HomeScreen from "../components/screens/home/index.ja";

function IndexPage() {
  return (
    <Page lang="ja">
      <HomeScreen />
    </Page>
  );
}

export default IndexPage;

export const Head = () => {
  return <title>ychof villa</title>;
};
