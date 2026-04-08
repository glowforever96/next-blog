// entities/post public API
// 외부 레이어(features, widgets, app)는 이 파일을 통해서만 접근

// api
export {
  getAllPosts,
  getPostBySlug,
  getAllPostSlugs,
  getAdjacentPosts,
} from "./api/mdx";

// lib
export { getSidebarData } from "./lib/sidebar";
export type { SidebarData } from "./lib/sidebar";

// ui
export { default as PostCard } from "./ui/post-card";
export { default as PostHeader } from "./ui/post-header";
export { default as PostBody } from "./ui/post-body";
export { default as PostNavigation } from "./ui/post-navigation";
