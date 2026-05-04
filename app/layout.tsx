import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const ibmMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-ibm-mono" });

export const metadata: Metadata = {
  title: "Archyr Take-Home — Intelligence Architecture",
  description:
    "A living architecture design doc for Archyr’s AI diligence intelligence layer.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${ibmMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-[family-name:var(--font-manrope)] antialiased">
        {children}
      </body>
    </html>
  );
}
