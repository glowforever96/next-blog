import { getAllPosts } from "@/lib/mdx";

interface SidebarData {
  [category: string]: {
    tag: string;
    count: number;
  }[];
}

function useSidebar() {
  const posts = getAllPosts();

  const sidebarData: SidebarData = {};
  const categoryCounts: { [key: string]: number } = {};

  posts.forEach((post) => {
    const category = post.parentCategory;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;

    if (!sidebarData[category]) {
      sidebarData[category] = [];
    }

    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => {
        const isExistTag = sidebarData[category].find((t) => t.tag === tag);
        if (isExistTag) {
          isExistTag.count += 1;
        } else {
          sidebarData[category].push({ tag, count: 1 });
        }
      });
    }
  });

  return { sidebarData, categoryCounts };
}

export default useSidebar;
