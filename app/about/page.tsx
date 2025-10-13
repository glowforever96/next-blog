import AboutBody from "@/components/about-body";
import AboutHeader from "@/components/about-header";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "KWON SOONYONG | About",
    description:
      "사용자 경험에 진심인 주니어 프론트엔드 개발자 권순용입니다. 1px의 차이도 놓치지 않는 꼼꼼함으로 더 나은 사용자 경험을 만들어 가고 있습니다. 프론트엔드를 깊이 탐구하면서도 새로운 기술에 늘 열려 있으며, 앞으로는 더 넓은 시야를 가진 소프트웨어 엔지니어로 성장하고자 합니다.",
    keywords: [
      "권순용",
      "프론트엔드 개발자",
      "Frontend Developer",
      "React",
      "Next.js",
      "TypeScript",
      "소프트웨어 엔지니어",
      "서울",
    ],
    openGraph: {
      title: "KWON SOONYONG | About",
      description:
        "사용자 경험에 진심인 프론트엔드 개발자 권순용입니다. React, Next.js, TypeScript를 주로 사용합니다.",
      url: "https://kwonsoonyong-dev.vercel.app/about",
      siteName: "soonyong devlog",
      locale: "ko_KR",
      type: "profile",
      images: [
        {
          url: "/images/me.webp",
          width: 280,
          height: 280,
          alt: "권순용 프로필 사진",
        },
      ],
    },
    alternates: {
      canonical: "https://kwonsoonyong-dev.vercel.app/about",
    },
  };
}

export default function AboutPage() {
  return (
    <section className="w-full max-w-screen-lg mx-auto px-4 sm:px-6 md:px-8 py-8">
      <AboutHeader />
      <div className="h-px bg-gray-200 my-8" />
      <AboutBody />
    </section>
  );
}
