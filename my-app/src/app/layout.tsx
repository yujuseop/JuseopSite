import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "유주섭의 개발자 포트폴리오",
  description:
    "Java, Spring Boot, PostgreSQL을 다루는 개발자 유주섭의 포트폴리오입니다.",
  openGraph: {
    title: "유주섭의 개발자 포트폴리오",
    description:
      "Java, Spring Boot, PostgreSQL을 다루는 개발자 유주섭의 포트폴리오입니다.",
    url: "https://juseopsite.vercel.app/",
    siteName: "JuseopSite",
    images: [
      {
        url: "/assets/유주섭 메인화면.png", // public 폴더의 이미지 경로
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className="font-pretendard">
      <body className="flex flex-col">
        <Header />
        <main className="flex-grow max-w-screen-lg mx-auto p-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
