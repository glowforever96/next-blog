import { formatRelativeDate } from "@/lib/date";

export default function PostHeader({
  title,
  date,
  tags,
}: {
  title: string;
  date: string;
  tags: string[];
}) {
  return (
    <header className="mb-8 border-b border-border pb-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">{title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <time dateTime={date}>{formatRelativeDate(date)}</time>
        </div>
        <div className="flex items-center gap-2 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-sm text-blue-500 bg-muted px-2 py-1 rounded-md dark:text-blue-400 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
