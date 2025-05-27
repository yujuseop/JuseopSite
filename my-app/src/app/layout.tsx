import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <main className="flex-grow container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
