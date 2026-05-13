import { EyeIcon } from "lucide-react";
import { getViewCount } from "../api/incrementView";
import { IncrementOnMount } from "./increment-on-mount";

export default async function ViewCounter({ slug }: { slug: string }) {
  const count = await getViewCount(slug);

  return (
    <span className="flex items-center gap-1 text-sm text-muted-foreground">
      <EyeIcon className="size-3.5" />
      {count.toLocaleString()}
      <IncrementOnMount slug={slug} />
    </span>
  );
}
