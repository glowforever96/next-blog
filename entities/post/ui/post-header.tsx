import { Suspense } from "react";
import TimeClient from "@/shared/ui/time-client";
import { formatAbsoluteDate } from "@/shared/lib/date";
import ViewCounter from "./view-counter";
import { Spinner } from "@/shared/ui/spinner";
import { ClockIcon } from "lucide-react";

export default function PostHeader({
  title,
  date,
  tags,
  slug,
  readingTime,
}: {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  readingTime: number;
}) {
  const fallbackText = formatAbsoluteDate({ date });

  return (
    <header className="mb-8 border-b border-border pb-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">{title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <TimeClient date={date} fallbackText={fallbackText} />

          <Suspense fallback={<Spinner />}>
            <ViewCounter slug={slug} />
          </Suspense>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <ClockIcon className="size-3.5" />
            {readingTime}분
          </span>
        </div>
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-sm text-blue-500 bg-muted px-2 py-1 rounded-md dark:text-blue-400 font-medium w-fit"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
