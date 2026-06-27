import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GrainBackground from "@/components/GrainBackground";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lalit Negi | Portfolio",
  description:
    "Full Stack & AI Engineer — GSoC '25 @ OWASP, open-source contributor, $20k+ in bounties.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} relative antialiased`}>
        <GrainBackground />
        {children}
      </body>
    </html>
  );
}
