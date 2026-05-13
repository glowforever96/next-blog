"use client";

import { useEffect } from "react";
import { incrementView } from "../api/incrementView";

export function IncrementOnMount({ slug }: { slug: string }) {
  useEffect(() => {
    void incrementView(slug);
  }, [slug]);

  return null;
}
