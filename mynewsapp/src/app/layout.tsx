import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader, DM_Mono } from "next/font/google";
import Link from "next/link";
import Masthead from "./components/Masthead";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", axes: ["wdth"] });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", style: ["normal", "italic"] });
const mono = DM_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

// The masthead shows today's date, so every page renders per request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ForPeople News",
  description: "Independent local news, read by the people it affects.",
};

// Runs before paint so the saved theme never flashes.
const themeScript = `try{var t=localStorage.getItem("fp:theme");if(!t)t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#content" className="skip">Skip to content</a>
        <Masthead />
        <div id="content">{children}</div>
        <footer className="footer">
          <div className="wrap footer-inner">
            <p className="wordmark small">For<span>People</span></p>
            <nav aria-label="Footer">
              <Link href="/postitems">Latest</Link>
              <Link href="/saved">Saved</Link>
              <Link href="/createpostitems">Write a story</Link>
            </nav>
            <p className="fine">Independent. Reader-first. Saved stories never leave your device.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
