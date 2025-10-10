import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "soonyong.devlog",
  description: "프론트엔드 개발자 권순용의 개발 블로그",
  icons: {
    icon: "/public/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-[120px]">{children}</main>
      </body>
    </html>
  );
}
