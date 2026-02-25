import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Queenstown New Zealand | Official Tourism Website",
  description:
    "Plan your Queenstown adventure. Discover things to do, places to eat, accommodation and more in New Zealand's adventure capital.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Carlito:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
