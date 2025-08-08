import type { Metadata } from "next";
import { Cinzel, Noto_Sans_TC, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: 'swap',
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "星語集 - 神秘占卜與幸運物電商",
  description: "結合占卜體驗與購物的神秘電商平台，提供星座、塔羅、水晶等靈性商品，讓您在占卜過程中發現專屬的幸運物",
  keywords: "占卜, 星座, 塔羅, 水晶, 靈性商品, 幸運物, 開運, 心靈療癒",
  openGraph: {
    title: "星語集 - 神秘占卜與幸運物電商",
    description: "結合占卜體驗與購物的神秘電商平台",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${cinzel.variable} ${notoSansTC.variable} ${playfairDisplay.variable} font-noto-sans-tc antialiased`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
