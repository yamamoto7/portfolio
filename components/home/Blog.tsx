import SectionTitle from "./SectionTitle";
import type { PostSection } from "@/lib/home-content";

export default function Blog({ postSections }: { postSections: PostSection[] }) {
  return (
    <div className="my-[30px]">
      {postSections.map((section) => (
        <div key={section.title}>
          <SectionTitle>{section.title}</SectionTitle>
          <div className="mx-auto w-[800px] max-[800px]:w-[600px] max-[660px]:max-w-[90%]">
            {section.posts.map((post) => (
              <a
                key={post.url}
                href={post.url}
                className="group flex w-[800px] max-w-full justify-between text-ink transition-opacity duration-200 hover:opacity-70 max-[660px]:flex-col max-[660px]:items-center max-[660px]:mb-10 [&:not(:last-of-type)]:my-4"
              >
                <div
                  className="mb-4 h-[180px] w-[300px] rounded-[20px] bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${post.img})` }}
                />
                <div className="w-[450px] pt-5 max-[800px]:w-[260px] max-[660px]:max-w-[80%]">
                  <h3 className="mb-4 text-base leading-[1.2] font-semibold">
                    {post.title}
                  </h3>
                  {post.categories.map((category) => (
                    <span
                      key={category.title}
                      className="mr-5 inline-block rounded-2xl bg-dark/10 px-[14px] text-sm leading-[32px] font-bold text-dark"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
