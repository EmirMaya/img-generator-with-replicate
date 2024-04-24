import type { Metadata } from "next";
import { Oswald, Rubik_Mono_One } from "next/font/google";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const rubik = Rubik_Mono_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rubik-mono-one",
});

export const metadata: Metadata = {
  title: "AI - Image Generator For Free",
  description: "Dream your image and make it real!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={oswald.className}>{children}</body>
    </html>
  );
}
