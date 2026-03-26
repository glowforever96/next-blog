"use client";

import { useEffect, useState } from "react";
import { formatRelativeDate } from "@/shared/lib/date";

export default function TimeClient({
  date,
  fallbackText,
  className,
}: {
  date: string;
  fallbackText?: string;
  className?: string;
}) {
  const [formattedDate, setFormattedDate] = useState<string>(
    fallbackText ?? date
  );

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
