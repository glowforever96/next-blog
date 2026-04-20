import { notFound } from "next/navigation";
import { cache } from "react";
import {
  getAdjacentPosts,
  getAllPostSlugs,
  getPostBySlug,
  PostBody,
  PostHeader,
  PostNavigation,
} from "@/entities/post";
import { Giscus } from "@/features/comments";
import { SITE_URL } from "@/shared/lib/site";

const getPostCached = cache((slug: string) => getPostBySlug(slug));
const getAdjacentPostsCached = cache((slug: string) => getAdjacentPosts(slug));

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostCached(slug);

  return {
    title: post.title,
    description: post.metaDescription,
    authors: [{ name: post.author }],
    keywords: post.title.split(" ").concat(["개발", "프론트엔드", "블로그"]),
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: `${SITE_URL}/posts/${slug}`,
      siteName: "soonyong devlog",
      title: post.title,
      description: post.metaDescription,
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.thumbnail,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.thumbnail],
    },
    alternates: {
      canonical: `${SITE_URL}/posts/${slug}`,
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
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostCached(slug);
  const [previousPost, nextPost] = getAdjacentPostsCached(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: post.thumbnail,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "soonyong devlog",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/posts/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <PostHeader
          title={post.title}
          date={post.date}
          tags={post.tags}
          slug={slug}
        />
        <PostBody content={post.content} />
      </article>
      <Giscus />
      <PostNavigation previousPost={previousPost} nextPost={nextPost} />
    </>
  );
}
