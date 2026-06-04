import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Sans_JP, Roboto_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const GA_ID = "G-YD35077DZE";

export const metadata: Metadata = {
  metadataBase: new URL("https://ychof.com"),
  title: {
    default: "ychof villa",
    template: "%s - ychof villa",
  },
  description: "kenta.yamamoto's portfolio site",
  icons: { icon: "/favicon-32x32.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSansJP.variable} ${robotoMono.variable} ${dmSans.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `}
        </Script>
      </body>
    </html>
  );
}
