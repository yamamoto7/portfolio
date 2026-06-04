import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Buylis feedback forms (previously client-side redirects)
      {
        source: "/buylis/form",
        destination:
          "https://docs.google.com/forms/d/e/1FAIpQLSd348HvOthOtcODUkDo_HYG8QR9S_JdkdsmKPVJCHB2xBaQTA/viewform?usp=sf_link",
        permanent: false,
      },
      {
        source: "/buylis/form/ja",
        destination:
          "https://docs.google.com/forms/d/e/1FAIpQLScIq5olkqW5iIw1PdxWeNKoIx9YBvcsu6YaOOwclsPywcfEbg/viewform?usp=sf_link",
        permanent: false,
      },
      // Legacy URLs from the previous (Gatsby) site
      { source: "/buylis/ja", destination: "/buylis", permanent: true },
      {
        source: "/buylis/privacy-policy/ja",
        destination: "/buylis/privacy-policy",
        permanent: true,
      },
      {
        source: "/privacyPolicy/simpleYosan",
        destination: "/simple-yosan-privacy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
