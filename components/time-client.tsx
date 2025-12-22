"use client";

import { useEffect, useState } from "react";
import { formatRelativeDate } from "@/lib/date";

export default function TimeClient({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    setFormattedDate(formatRelativeDate({ date, now }));
  }, [date]);

  return (
    <time dateTime={date} className={className} suppressHydrationWarning>
      {formattedDate}
    </time>
  );
}
