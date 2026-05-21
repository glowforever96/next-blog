import type { Metadata } from "next";
import { getSidebarData } from "@/entities/post/lib/sidebar";
import Sidebar from "@/widgets/sidebar/ui/sidebar";
import PostsList from "@/widgets/posts-list/ui/posts-list";
import { getAllPosts } from "@/entities/post/api/mdx";
import { SITE_URL } from "@/shared/lib/site";

interface HomeProps {
  searchParams: Promise<{ c?: string; t?: string; page?: string }>;
}

export async function generateMetadata({
  searchParams,
}: HomeProps): Promise<Metadata> {
  const { c, t, page } = await searchParams;
  const hasFilter = Boolean(c || t || page);

  if (!hasFilter) {
    return { alternates: { canonical: SITE_URL } };
  }

  return {
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
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
        <PostsList searchParams={params} />
      </section>
    </div>
  );
}
