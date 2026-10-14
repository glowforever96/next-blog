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

// 검색(⌘K)에 필요한 필드만 — 본문(content)을 클라이언트로 보내지 않기 위함
type SearchPost = Pick<BlogPost, "slug" | "title" | "description">;

interface Guestbook {
  id: number;
  name: string;
  comment: string;
  password: string;
  isEdited: boolean;
  createdAt: string;
}

export type { BlogPost, SearchPost, Guestbook };
