import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "@/types";
import { getTime } from "date-fns";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // gray-matter로 frontmatter 파싱
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      author: data.author,
      thumbnail: data.thumbnail,
      content,
    };
  });

  return allPostsData.sort((a, b) => getTime(b.date) - getTime(a.date));
}

export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    author: data.author,
    thumbnail: data.thumbnail,
    content,
  };
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => fileName.replace(/\.mdx$/, ""));
}
