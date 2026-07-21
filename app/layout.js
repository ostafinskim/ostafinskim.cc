import { Fascinate_Inline, Roboto } from "next/font/google";
import "../public/assets/css/styles.css";
import "jarallax/dist/jarallax.min.css";
import "highlight.js/styles/github-dark.css";
import ClientInit from "@/components/common/client-init";

// Self-hosted via next/font — no render-blocking Google Fonts stylesheets.
// custom.css maps --font-global onto this variable for the bold theme.
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-roboto",
});

// Logo "M" mark (custom.css .logo-mark).
const fascinateInline = Fascinate_Inline({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-fascinate",
});

export const metadata = {
  metadataBase: new URL("https://ostafinski.cc"),
  title: {
    default: "Miro Ostafinski — Full Stack Developer",
    template: "%s — Miro Ostafinski",
  },
  description:
    "Full-stack TypeScript developer specialising in React, Next.js, Node.js and PostgreSQL. Building accessible, production-grade web applications.",
  openGraph: {
    type: "website",
    siteName: "Miro Ostafinski",
    locale: "en_GB",
    url: "https://ostafinski.cc",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`no-mobile no-touch ${roboto.variable} ${fascinateInline.variable}`}
    >
      <head>
        <link
          rel="preload"
          href="/assets/webfonts/clash-display/ClashDisplay-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/webfonts/clash-display/ClashDisplay-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="appear-animate body">
        <ClientInit />
        {children}
      </body>
    </html>
  );
}
