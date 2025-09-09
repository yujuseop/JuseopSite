import "./globals.css";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className="font-pretendard">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
