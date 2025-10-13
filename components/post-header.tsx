import { formatRelativeDate } from "@/lib/date";

export default function PostHeader({
  title,
  date,
}: {
  title: string;
  date: string;
}) {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <div className="flex items-center gap-4 text-gray-600">
        <time dateTime={date}>{formatRelativeDate(date)}</time>
      </div>
    </header>
  );
}
