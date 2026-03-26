import { getSidebarData } from "@/lib/sidebar";
import Sidebar from "@/components/sidebar";
import PostsList from "@/components/posts-list";
import { Suspense } from "react";
import { getAllPosts } from "@/lib/mdx";

interface HomeProps {
  searchParams: Promise<{ c?: string; t?: string; page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { sidebarData, categoryCounts } = getSidebarData();
  const posts = getAllPosts();

  return (
    <div className="gap-0 md:flex md:gap-8">
      <Sidebar
        sidebarData={sidebarData}
        categoryCounts={categoryCounts}
        posts={posts}
      />
      <section className="flex-1">
        <Suspense fallback={null}>
          <PostsList searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  );
}
