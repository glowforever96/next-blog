import { getAllPosts } from "@/lib/mdx";
import PostCard from "@/components/post-card";
import Sidebar from "@/components/sidebar";

interface HomeProps {
  searchParams: Promise<{ c?: string; t?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
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
    <div className="gap-0 md:flex md:gap-8">
      <Sidebar />
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-8">
          {title} ({posts.length})
        </h2>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:flex lg:flex-col">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
