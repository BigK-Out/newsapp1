import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "aos/dist/aos.css";
import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";  // Import Google Fonts
import Header from "./components/Header";
import "./variables.css";
import "./globals.css";

// Using Inter as a sans-serif font
const ebGaramond = EB_Garamond({
  subsets: ['latin'],         // Specify subsets
});

export const metadata: Metadata = {
  title: "ForPeople News",
  description: "Created by Alpakin OLGUN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ebGaramond.className}>
        <Header/> 
        {children}
      </body>
    </html>
  );
}

