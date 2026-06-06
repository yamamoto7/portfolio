export interface AppFeature {
  heading: string;
  desc: string;
}

export interface AppConfig {
  /** URL slug, also the folder name under /public/contents */
  slug: string;
  /** Short brand name shown in the header / footer */
  displayName: string;
  /** Full name used in the privacy policy body and page title */
  fullName: string;
  /** Accent color (hex) */
  accent: string;
  heroTitle: [string, string];
  heroLead: string;
  ctaTitle: string;
  /** Pre-filled Google Form URL for the contact button */
  contactForm: string;
  features: AppFeature[];
  /** Intrinsic size of name.png */
  nameSize: { w: number; h: number };
  /** Intrinsic size of mv.png */
  mvSize: { w: number; h: number };
  /** Privacy policy effective date */
  effectiveDate: string;
}

export const apps: Record<string, AppConfig> = {
  "mugen-sugaku": {
    slug: "mugen-sugaku",
    displayName: "無限数学",
    fullName: "無限数学",
    accent: "#7048e8",
    heroTitle: ["大人のための", "数学の教養を"],
    heroLead: "教養としての数学を、もう一度。大学入試から小学校入試まで。",
    ctaTitle: "教養としての数学を、はじめよう。",
    contactForm:
      "https://docs.google.com/forms/d/e/1FAIpQLSf0hPNDtFBaBPpp_N2UQjwXMye-LJYD72MU8k0Edj3nZKRQog/viewform?entry.1388710164=%E6%95%99%E9%A4%8A%E3%82%92%E4%BB%98%E3%81%91%E3%82%8B%20%E5%A4%A7%E4%BA%BA%E3%81%AE%E6%95%B0%E5%AD%A6",
    features: [
      {
        heading: "東大・京大の伝説の問題に挑戦",
        desc: "語り継がれる名問の数々。いま、あなたが挑む番です。",
      },
      {
        heading: "大学入試から小学校入試まで",
        desc: "幅広いレベルの良問を、ひとつのアプリで。学び直しにも最適です。",
      },
      {
        heading: "古典から近代の名問も幅広く",
        desc: "時代を越えて愛される問題を多数収録。数学の奥深さに触れられます。",
      },
    ],
    nameSize: { w: 927, h: 322 },
    mvSize: { w: 1172, h: 1502 },
    effectiveDate: "2026-05-25",
  },
  "tile-care": {
    slug: "tile-care",
    displayName: "タイルケア",
    fullName: "タイルカーペット管理",
    accent: "#0ca678",
    heroTitle: ["タイルカーペットの", "洗濯周期を管理"],
    heroLead: "いつどのタイルを洗ったか、次はどれか。それだけのアプリ。",
    ctaTitle: "タイルカーペット管理、はじめてみませんか。",
    contactForm:
      "https://docs.google.com/forms/d/e/1FAIpQLSf0hPNDtFBaBPpp_N2UQjwXMye-LJYD72MU8k0Edj3nZKRQog/viewform?entry.1388710164=%E3%82%BF%E3%82%A4%E3%83%AB%E3%82%AB%E3%83%BC%E3%83%9A%E3%83%83%E3%83%88%E4%BA%A4%E6%8F%9B%E5%91%A8%E6%9C%9F%E7%AE%A1%E7%90%86",
    features: [
      {
        heading: "間取りに合わせてタイルを簡単登録",
        desc: "あなたの部屋のレイアウトそのままに、タイルを並べて登録できます。",
      },
      {
        heading: "洗濯周期は私に任せて！",
        desc: "次に洗うべきタイルを、アプリがそっと教えてくれます。",
      },
      {
        heading: "綺麗好きでペットに尽くすあなたへ",
        desc: "清潔な空間を、大切な家族のために。洗ったタイルもひと目で分かります。",
      },
    ],
    nameSize: { w: 1279, h: 300 },
    mvSize: { w: 1448, h: 1086 },
    effectiveDate: "2026-05-25",
  },
};

/** こちら link target shared by every app privacy policy */
export const PRIVACY_CONTACT_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScIq5olkqW5iIw1PdxWeNKoIx9YBvcsu6YaOOwclsPywcfEbg/viewform";

export const appSlugs = Object.keys(apps);
