import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GrainBackground from "@/components/GrainBackground";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal developer portfolio",
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
