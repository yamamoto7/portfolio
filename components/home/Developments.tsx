import Icon from "./Icon";
import TechIcons from "./TechIcons";
import SectionTitle from "./SectionTitle";
import type { Development, DevSection } from "@/lib/home-content";

function DevelopmentCard({ item }: { item: Development }) {
  return (
    <div className="mx-auto my-[16px_auto_40px] flex w-[800px] flex-wrap justify-between max-[800px]:mx-auto max-[800px]:mb-10 max-[800px]:w-[660px] max-[660px]:max-w-[80%] max-[660px]:flex-col max-[660px]:items-center">
      {/* Mobile-only title */}
      <h2 className="my-[15px] hidden text-base leading-6 font-semibold max-[660px]:block">
        {item.title}
      </h2>

      <div className="w-[300px] max-[660px]:w-full">
        <div
          className="h-[500px] w-[300px] rounded-2xl border-[3px] border-gray-bg bg-cover bg-[position:50%_100%] bg-no-repeat max-[660px]:mx-auto"
          style={{ backgroundImage: `url(${item.img})` }}
        />
      </div>

      <div className="w-[450px] max-[800px]:w-[300px]">
        <h2 className="mt-[15px] mb-[30px] text-base leading-6 font-semibold max-[800px]:text-center max-[660px]:hidden">
          {item.title}
        </h2>

        {item.contents.map((content) => (
          <div key={content.title}>
            <div className="my-2.5 text-sm leading-[14px] font-semibold">
              {content.title}
            </div>
            <div className="mb-[30px] text-sm">{content.contents}</div>
          </div>
        ))}

        <div className="mb-[30px] text-sm">
          <TechIcons list={item.techs} />
        </div>

        <div className="mb-[30px] text-sm">
          {item.links.map((link) => (
            <a key={link.title} href={link.url}>
              <button className="flex h-10 w-full items-center justify-center rounded-lg border border-[#333] bg-white text-[#333] hover:border-[#cdcdcd] hover:bg-[#eaeaea]">
                <Icon name={link.icon} className="mr-[18px] block" />
                <span className="block">{link.title}</span>
              </button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Developments({
  developmentSections,
}: {
  developmentSections: DevSection[];
}) {
  return (
    <div>
      {developmentSections.map((section) => (
        <div key={section.title}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.developments.map((item) => (
            <DevelopmentCard key={item.title} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}
