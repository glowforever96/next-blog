import Link from "next/link";
import { BlogPost } from "@/shared/types";
import { formatAbsoluteDate } from "@/shared/lib/date";

interface ArchiveListProps {
  posts: BlogPost[];
}

function groupByYear(posts: BlogPost[]): [string, BlogPost[]][] {
  const groups = new Map<string, BlogPost[]>();

  for (const post of posts) {
    const year = post.date.slice(0, 4);
    const group = groups.get(year);

    if (group) {
      group.push(post);
    } else {
      groups.set(year, [post]);
    }
  }

  return [...groups.entries()];
}

export default function ArchiveList({ posts }: ArchiveListProps) {
  const groups = groupByYear(posts);

  return (
    <div className="flex flex-col gap-10">
      {groups.map(([year, yearPosts]) => (
        <section key={year} aria-labelledby={`archive-${year}`}>
          <h2
            id={`archive-${year}`}
            className="text-xl font-bold text-foreground mb-4"
          >
            {year} <span className="text-muted-foreground text-sm font-medium">({yearPosts.length})</span>
          </h2>
          <ul className="flex flex-col gap-1 list-none p-0 m-0 border-t border-border">
            {yearPosts.map((post) => (
              <li key={post.slug} className="border-b border-border">
                <Link
                  href={`/posts/${post.slug}`}
                  className="flex flex-col gap-1 py-3 transition-colors hover:text-blue-600 md:flex-row md:items-baseline md:gap-4"
                >
                  <time
                    dateTime={post.date}
                    className="text-xs text-muted-foreground shrink-0 md:w-32"
                  >
                    {formatAbsoluteDate({ date: post.date })}
                  </time>
                  <span className="text-sm font-medium text-foreground md:text-base">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
