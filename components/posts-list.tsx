import { getAllPosts } from "@/lib/mdx";
import PostCard from "@/components/post-card";
import PostsPagination from "@/components/posts-pagination";

const POSTS_PER_PAGE = 10;

interface PostsListProps {
  searchParams: Promise<{ c?: string; t?: string; page?: string }>;
}

export default async function PostsList({ searchParams }: PostsListProps) {
  const params = await searchParams;
  const category = params.c;
  const tag = params.t;
  const pageParam = params.page;

  const allPosts = getAllPosts(category, tag);
  const totalPosts = allPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));

  const currentPage = Math.max(
    1,
    Math.min(parseInt(pageParam ?? "1", 10) || 1, totalPages)
  );

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

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
        {title} ({totalPosts})
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

      <PostsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        category={category}
        tag={tag}
      />
    </>
  );
}
