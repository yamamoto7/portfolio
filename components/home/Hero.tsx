import Image from "next/image";

const resumeButtonClass =
  "inline-flex h-[50px] min-w-[165px] items-center justify-center rounded-[32px] border-2 border-[#aaa] px-[38px] text-base font-bold text-[#999] transition-all duration-200 hover:border-black hover:text-ink max-[767px]:h-12 max-[767px]:min-w-[91px] max-[767px]:rounded-3xl max-[767px]:px-[22px]";

const socials = [
  {
    href: "https://github.com/yamamoto7",
    src: "https://img.shields.io/badge/github-%2324292f.svg?&style=for-the-badge&logo=github&logoColor=white",
    alt: "github",
  },
  {
    href: "https://www.facebook.com/kenta.yamamoto.94064176",
    src: "https://img.shields.io/badge/facebook-%231877F2.svg?&style=for-the-badge&logo=facebook&logoColor=white",
    alt: "facebook",
  },
  {
    href: "https://www.linkedin.com/in/kentayamamoto7/",
    src: "https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white",
    alt: "linkedin",
  },
];

export default function Hero() {
  return (
    <div className="mx-auto flex w-[800px] max-w-[90%] flex-wrap rounded-[64px] bg-gray-bg max-[800px]:w-[500px] max-[800px]:bg-transparent">
      <div className="w-[500px] max-w-full px-16 pt-16 max-[800px]:w-full max-[800px]:px-8 max-[800px]:pt-0 max-[800px]:text-center">
        <div className="mb-10 font-bold">
          Kenta Yamamoto
          <br />
          Backend, software engineer / Tokyo Japan
        </div>
        <div className="mb-10 font-bold">Contact me via Linkedin or Facebook.</div>
        <div className="mb-10 font-bold">
          {socials.map((s) => (
            <a key={s.alt} href={s.href}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="mr-2.5 inline" src={s.src} alt={s.alt} />
            </a>
          ))}
        </div>
        <div className="mb-10 font-bold">
          <a
            href="https://github.com/yamamoto7/yamamoto7/blob/master/RESUME.md"
            className={resumeButtonClass}
          >
            履歴書 - 日本語
          </a>
          <br />
          <br />
          <a
            href="https://github.com/yamamoto7/yamamoto7/blob/master/RESUME-en.md"
            className={resumeButtonClass}
          >
            Resume - English
          </a>
        </div>
      </div>
      <div className="flex w-[300px] justify-center overflow-hidden pt-[100px] max-[800px]:w-full max-[800px]:pt-5 max-[800px]:pb-[50px]">
        <Image
          src="/home/profile.png"
          alt=""
          width={643}
          height={654}
          className="h-[140px] w-[140px] max-h-full max-w-full"
        />
      </div>
    </div>
  );
}
