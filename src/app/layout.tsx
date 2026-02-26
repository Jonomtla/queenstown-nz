import type { Metadata } from "next";
import { Carlito } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const carlito = Carlito({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Queenstown New Zealand | Official Tourism Website",
  description:
    "Plan your Queenstown adventure. Discover things to do, places to eat, accommodation and more in New Zealand's adventure capital.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={carlito.className}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
