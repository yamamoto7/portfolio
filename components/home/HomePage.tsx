import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Hero from "./Hero";
import Blog from "./Blog";
import Developments from "./Developments";
import { homeContent, type Lang } from "@/lib/home-content";

export default function HomePage({ lang }: { lang: Lang }) {
  const content = homeContent[lang];
  return (
    <div className="page">
      <SiteHeader lang={lang} />
      <div>
        <Hero />
        <Blog postSections={content.postSections} />
        <Developments developmentSections={content.developmentSections} />
      </div>
      <SiteFooter />
    </div>
  );
}
