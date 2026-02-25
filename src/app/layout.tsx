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
      <body>{children}</body>
    </html>
  );
}
