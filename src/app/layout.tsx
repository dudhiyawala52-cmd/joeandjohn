import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joe & Jone | Touch-free washroom technology",
  description:
    "Sensor taps, automatic soap dispensers, hand dryers and touch-free flush controls from Joe & Jone UK Limited. We deal in water conservation.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
