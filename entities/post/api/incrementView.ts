"use server";

import { db } from "@/db";
import { postViewsTable } from "@/db/schema";
import { and, count, eq, gt } from "drizzle-orm";
import { headers } from "next/headers";

export async function incrementView(slug: string) {
  const headersList = await headers();

  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const existing = await db
    .select()
    .from(postViewsTable)
    .where(
      and(
        eq(postViewsTable.slug, slug),
        eq(postViewsTable.ip, ip),
        gt(postViewsTable.viewedAt, oneDayAgo)
      )
    )
    .limit(1);

  if (existing.length === 0) {
    await db.insert(postViewsTable).values({
      slug,
      ip,
      viewedAt: new Date().toISOString(),
    });
  }

  const result = await db
    .select({ total: count() })
    .from(postViewsTable)
    .where(eq(postViewsTable.slug, slug));

  return result[0].total;
}
