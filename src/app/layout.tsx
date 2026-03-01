import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GNB from "@/components/layout/GNB";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nililia | 전문 번역 & 현지화 서비스",
  description:
    "AI 기술과 전문가의 노하우로 최상의 품질을 보장하는 번역 및 현지화 서비스. 영상 번역, 문서 번역, 웹/앱 현지화, 게임 현지화.",
  keywords: [
    "번역",
    "현지화",
    "로컬라이제이션",
    "영상 번역",
    "게임 현지화",
    "웹사이트 번역",
  ],
  openGraph: {
    title: "Nililia | 전문 번역 & 현지화 서비스",
    description:
      "AI 기술과 전문가의 노하우로 최상의 품질을 보장하는 번역 및 현지화 서비스.",
    type: "website",
    locale: "ko_KR",
    siteName: "Nililia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nililia | 전문 번역 & 현지화 서비스",
    description:
      "AI 기술과 전문가의 노하우로 최상의 품질을 보장하는 번역 및 현지화 서비스.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <GNB />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
