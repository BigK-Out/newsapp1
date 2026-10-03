import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader, DM_Mono } from "next/font/google";
import Masthead from "./components/Masthead";
import Footer from "./components/Footer";
import BreakingBanner from "./components/BreakingBanner";
import { breakingStory, getPosts } from "@/lib/posts";
import { categoriesOf } from "@/lib/format";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", axes: ["wdth"] });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", style: ["normal", "italic"] });
const mono = DM_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

// The masthead shows today's date, so every page renders per request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ForPeople News",
  description: "Independent local news, read by the people it affects.",
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
};

// Runs before paint so the saved theme never flashes.
const themeScript = `try{var t=localStorage.getItem("fp:theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { posts } = await getPosts();
  const categories = categoriesOf(posts.filter((p) => p.kind !== "opinion")).map((c) => c.name);

  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#content" className="skip">Skip to content</a>
        <Masthead />
        <BreakingBanner post={breakingStory(posts)} />
        <div id="content">{children}</div>
        <Footer categories={categories} />
      </body>
    </html>
  );
}
