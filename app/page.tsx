import { getSidebarData } from "@/entities/post/lib/sidebar";
import Sidebar from "@/widgets/sidebar/ui/sidebar";
import PostsList from "@/widgets/posts-list/ui/posts-list";
import { Suspense } from "react";
import { getAllPosts } from "@/entities/post/api/mdx";

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
