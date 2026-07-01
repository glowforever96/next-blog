import { getAllPosts } from "../api/mdx";

export interface SidebarData {
  [category: string]: {
    tag: string;
    count: number;
  }[];
}

const CATEGORY_ORDER = ["Frontend", "Devlog", "DevOps"];

export function getSidebarData() {
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

  const orderedSidebarData: SidebarData = {};
  Object.keys(sidebarData)
    .sort((a, b) => {
      const ia = CATEGORY_ORDER.indexOf(a);
      const ib = CATEGORY_ORDER.indexOf(b);
      return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib);
    })
    .forEach((category) => {
      orderedSidebarData[category] = sidebarData[category];
    });

  return { sidebarData: orderedSidebarData, categoryCounts };
}
