import type { Metadata } from "next";
import { getAllPosts } from "@/entities/post";
import { ArchiveList } from "@/widgets/archive";
import { SITE_URL } from "@/shared/lib/site";

export function generateMetadata(): Metadata {
  return {
    title: "전체 글",
    description:
      "soonyong.devlog에 작성된 모든 글의 목록입니다. React, Next.js, TypeScript 등 프론트엔드 개발 관련 글을 연도별로 모아두었습니다.",
    keywords: [
      "전체 글",
      "글 목록",
      "아카이브",
      "프론트엔드",
      "개발 블로그",
      "React",
      "Next.js",
      "TypeScript",
    ],
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: `${SITE_URL}/archive`,
      siteName: "soonyong devlog",
      title: "전체 글 | soonyong.devlog",
      description: "soonyong.devlog에 작성된 모든 글의 목록입니다.",
    },
    alternates: {
      canonical: `${SITE_URL}/archive`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ArchivePage() {
  const posts = getAllPosts();

  return (
    <section className="w-full max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">전체 글 ({posts.length})</h1>
      <ArchiveList posts={posts} />
    </section>
  );
}
