import { getAllPosts } from "@/lib/mdx";
import PostCard from "@/components/post-card";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="gap-0 md:flex md:gap-8">
      <div className="flex">
        <aside className="hidden md:block w-42">
          <div className="sticky top-[92px]">
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-bold mb-4">사이드바</h3>
              <div className="space-y-2 text-sm">
                <div>메뉴 1</div>
                <div>메뉴 2</div>
                <div>메뉴 3</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-8">All Posts ({posts.length})</h2>
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
