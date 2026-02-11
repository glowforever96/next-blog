 import { getAllPosts } from "@/lib/mdx";
import { getSidebarData } from "@/lib/sidebar";
import Sidebar from "@/components/sidebar";
import PostCard from "@/components/post-card";
import { Suspense } from "react";

interface HomeProps {
  searchParams: Promise<{ c?: string; t?: string }>;
}

async function PostsList({
  searchParams,
}: {
  searchParams: Promise<{ c?: string; t?: string }>;
}) {
  const params = await searchParams;
  const category = params.c;
  const tag = params.t;

  const posts = getAllPosts(category, tag);

  let title = "All Posts";

  if (category && tag) {
    title = `${category} > ${tag}`;
  } else if (category) {
    title = category;
  } else if (tag) {
    title = tag;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">
        {title} ({posts.length})
      </h1>
      <ul
        className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:flex lg:flex-col list-none p-0 m-0"
        aria-label="글 목록"
      >
        {posts.map((post) => (
          <li key={post.slug} className="contents">
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default async function Home({ searchParams }: HomeProps) {
  const { sidebarData, categoryCounts } = getSidebarData();

  return (
    <div className="gap-0 md:flex md:gap-8">
      <Sidebar sidebarData={sidebarData} categoryCounts={categoryCounts} />
      <section className="flex-1">
        <Suspense fallback={null}>
          <PostsList searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  );
}
