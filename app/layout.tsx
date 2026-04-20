import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL } from "@/shared/lib/site";
import Header from "@/widgets/header/ui/header";
import Footer from "@/widgets/footer/ui/footer";
import { ThemeProvider } from "@/shared/ui/theme-provider";
import { Toaster } from "sonner";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: {
    default: "soonyong.devlog",
    template: "%s | soonyong.devlog",
  },
  description:
    "프론트엔드 개발자 권순용의 개발 블로그입니다. React, Next.js, TypeScript 등 웹 개발 관련 지식과 경험을 공유합니다.",

  metadataBase: new URL(SITE_URL),
  keywords: [
    "프론트엔드",
    "개발 블로그",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "웹 개발",
    "개발자",
    "권순용",
    "soonyong",
  ],

  authors: [{ name: "권순용", url: SITE_URL }],
  creator: "권순용",
  publisher: "권순용",

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "soonyong devlog",
    title: "soonyong devlog",
    description: "프론트엔드 개발자 권순용의 개발 블로그입니다.",
    images: [
      {
        url: "/images/me.webp",
        width: 1200,
        height: 630,
        alt: "soonyong devlog",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "soonyong devlog",
    description: "프론트엔드 개발자 권순용의 개발 블로그입니다.",
    images: ["/images/me.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "jcFfNouIs8upY3-l5s12hGarIC_M47SgvNKwvY7MS5Q",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${pretendard.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="py-[74px] max-w-6xl mx-auto px-4 md:py-[84px]">
            {children}
          </main>
          <Toaster position="top-center" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
