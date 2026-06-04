import Icon from "./Icon";
import type { TechGroup } from "@/lib/home-content";

export default function TechIcons({ list }: { list: TechGroup[] }) {
  return (
    <div>
      {list.map((group) => (
        <div key={group.title}>
          <div className="mt-2.5 mb-2 font-bold">{group.title}</div>
          <div className="mb-2 flex flex-wrap">
            {group.contents.map((tech) => (
              <div
                key={tech}
                className="mr-4 mb-2.5 flex items-center justify-center"
              >
                <Icon name={tech} className="mr-2.5 h-6 w-6" size={24} />
                <div className="text-base">{tech}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
