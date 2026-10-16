import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const description = `Licensed lath, plaster & stucco contractor serving Chico, Oroville, Paradise and the Mid Valley since ${site.established}. New stucco, repairs, re-stucco and color coats. Call ${site.phone} for a free estimate.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Stucco Contractor in Chico, CA`,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    "stucco contractor Chico",
    "stucco repair Oroville",
    "Paradise stucco",
    "lath and plaster",
    "plastering Butte County",
    "re-stucco",
    "color coat",
  ],
  openGraph: {
    title: site.name,
    description,
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#d7261e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
