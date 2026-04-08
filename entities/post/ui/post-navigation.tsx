import { BlogPost } from "@/shared/types";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface PostNavigationProps {
  previousPost: BlogPost | null;
  nextPost: BlogPost | null;
}

function NavCard({
  post,
  label,
  isNext,
}: {
  post: BlogPost;
  label: string;
  isNext: boolean;
}) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block w-full max-w-none rounded-sm border border-border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-accent/50 hover:border-accent md:max-w-sm"
    >
      <span className="mb-1 block text-xs text-muted-foreground">{label}</span>
      <span className="line-clamp-2 text-sm font-medium text-card-foreground md:text-base mb-1">
        {post.title}
      </span>
      {isNext ? (
        <ArrowLeftIcon className="size-5" />
      ) : (
        <ArrowRightIcon className="size-5 ml-auto" />
      )}
    </Link>
  );
}

export default function PostNavigation({
  previousPost,
  nextPost,
}: PostNavigationProps) {
  const hasPrevious = previousPost != null;
  const hasNext = nextPost != null;

  if (!hasPrevious && !hasNext) {
    return null;
  }

  let rowJustify = "md:justify-start";
  if (hasPrevious && hasNext) {
    rowJustify = "md:justify-between";
  } else if (hasPrevious) {
    rowJustify = "md:justify-end";
  }

  return (
    <nav
      className={`mt-10 flex w-full flex-col gap-3 md:flex-row ${rowJustify}`}
      aria-label="이전·다음 글"
    >
      {hasNext && <NavCard post={nextPost} label="다음 글" isNext />}
      {hasPrevious && (
        <NavCard post={previousPost} label="이전 글" isNext={false} />
      )}
    </nav>
  );
}
