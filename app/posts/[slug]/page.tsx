import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostBySlug } from "@/lib/mdx";
import { MDXComponents } from "@/components/mdx-components";
import { formatRelativeDate } from "@/lib/date";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypePrettyCode from "rehype-pretty-code";
import BackButton from "@/components/back-button";

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

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다",
    };
  }

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

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <time dateTime={post.date}>{formatRelativeDate(post.date)}</time>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <MDXRemote
          source={post.content}
          components={MDXComponents}
          options={{
            parseFrontmatter: false,
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkBreaks],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: "one-dark-pro",
                    keepBackground: true,
                  },
                ],
              ],
            },
          }}
        />
      </div>
      <BackButton />
    </article>
  );
}
