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
    displayName: "Infinite Math: Brain Puzzles",
    fullName: "Infinite Math: Brain Puzzles",
    accent: "#7048e8",
    heroTitle: ["Mathematical literacy", "for grown-ups"],
    heroLead: "Mathematics as a liberal art, once more. From university entrance exams to elementary school entrance exams.",
    ctaTitle: "Start exploring mathematics as a liberal art.",
    contactForm:
      "https://docs.google.com/forms/d/e/1FAIpQLSf0hPNDtFBaBPpp_N2UQjwXMye-LJYD72MU8k0Edj3nZKRQog/viewform?entry.1388710164=%E6%95%99%E9%A4%8A%E3%82%92%E4%BB%98%E3%81%91%E3%82%8B%20%E5%A4%A7%E4%BA%BA%E3%81%AE%E6%95%B0%E5%AD%A6",
    features: [
      {
        heading: "Take on the legendary problems of Japan's top universities",
        desc: "A collection of celebrated problems passed down through the years. Now it's your turn to take them on.",
      },
      {
        heading: "From university entrance exams to elementary school entrance exams",
        desc: "A wide range of quality problems across every level, in a single app. Perfect for brushing up, too.",
      },
      {
        heading: "A broad selection, from classic to modern masterpieces",
        desc: "Featuring many problems beloved across the ages. Discover the depth of mathematics.",
      },
    ],
    nameSize: { w: 927, h: 322 },
    mvSize: { w: 1172, h: 1502 },
    effectiveDate: "2026-05-25",
  },
  "tile-care": {
    slug: "tile-care",
    displayName: "Tile Carpet Cycle",
    fullName: "Tile Carpet Cycle",
    accent: "#0ca678",
    heroTitle: ["Track your carpet tile", "replacement cycle"],
    heroLead: "Which tile you replaced and when, and which one is next. An app that does just that.",
    ctaTitle: "Ready to start managing your carpet tile replacements?",
    contactForm:
      "https://docs.google.com/forms/d/e/1FAIpQLSf0hPNDtFBaBPpp_N2UQjwXMye-LJYD72MU8k0Edj3nZKRQog/viewform?entry.1388710164=%E3%82%BF%E3%82%A4%E3%83%AB%E3%82%AB%E3%83%BC%E3%83%9A%E3%83%83%E3%83%88%E4%BA%A4%E6%8F%9B%E5%91%A8%E6%9C%9F%E7%AE%A1%E7%90%86",
    features: [
      {
        heading: "Easily register tiles to match your floor plan",
        desc: "Lay out and register your tiles exactly as they are arranged in your room.",
      },
      {
        heading: "Leave the replacement cycle to me!",
        desc: "The app gently reminds you which tile to replace next.",
      },
      {
        heading: "For the tidy pet lover who cares",
        desc: "A clean space for your beloved family. See which tiles have already been replaced at a glance.",
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
