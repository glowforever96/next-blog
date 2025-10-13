interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  thumbnail: string;
  parentCategory: string;
  tags: string[];
  content: string;
}

export type { BlogPost };
