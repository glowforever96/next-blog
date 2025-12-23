import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/mdx";
import PostHeader from "@/components/post-header";
import PostBody from "@/components/post-body";

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
  const post = getPostBySlug(slug);

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.title.split(" ").concat(["개발", "프론트엔드", "블로그"]),
    openGraph: {
      type: "article",
      locale: "ko_KR",
      url: `https://kwonsoonyong-dev.vercel.app/posts/${slug}`,
      siteName: "soonyong devlog",
      title: post.title,
      description: post.description,
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
      description: post.description,
      images: [post.thumbnail],
    },
    alternates: {
      canonical: `https://kwonsoonyong-dev.vercel.app/posts/${slug}`,
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
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
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
      url: "https://kwonsoonyong-dev.vercel.app",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://kwonsoonyong-dev.vercel.app/posts/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <PostHeader title={post.title} date={post.date} tags={post.tags} />
        <PostBody content={post.content} />
      </article>
    </>
  );
}
