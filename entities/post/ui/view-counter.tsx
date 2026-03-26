"use client";

import { useEffect, useState } from "react";
import { incrementView } from "../api/incrementView";
import { EyeIcon } from "lucide-react";
import { Spinner } from "@/shared/ui/spinner";

export default function ViewCounter({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    incrementView(slug).then(setCount);
  }, [slug]);

  if (count === null) return <Spinner />;

  return (
    <span className="flex items-center gap-1 text-sm text-muted-foreground">
      <EyeIcon className="size-3.5" />
      {count.toLocaleString()}
    </span>
  );
}
