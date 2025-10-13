import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // 블로그 포스트들의 sitemap 엔트리 생성
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://kwonsoonyong-dev.vercel.app/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 정적 페이지들
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://kwonsoonyong-dev.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://kwonsoonyong-dev.vercel.app/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  return [...staticPages, ...postEntries];
}
