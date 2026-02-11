interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  metaDescription?: string;
  author: string;
  thumbnail: string;
  parentCategory: string;
  tags: string[];
  content: string;
}

interface Guestbook {
  id: number;
  name: string;
  comment: string;
  password: string;
  isEdited: boolean;
  createdAt: string;
}

export type { BlogPost, Guestbook };
