"use server";

import { db } from "@/db";
import { postViewsTable } from "@/db/schema";
import { count, eq, sql } from "drizzle-orm";
import { headers } from "next/headers";

export async function incrementView(slug: string) {
  const headersList = await headers();

  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const nowIso = new Date().toISOString();
  const oneDayAgoIso = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  await db.execute(sql`
    INSERT INTO "post_views" ("slug", "ip", "viewed_at")
    SELECT ${slug}, ${ip}, ${nowIso}
    WHERE NOT EXISTS (
      SELECT 1 FROM "post_views"
      WHERE "slug" = ${slug}
        AND "ip" = ${ip}
        AND "viewed_at" > ${oneDayAgoIso}
    )
  `);
}

export async function getViewCount(slug: string) {
  const result = await db
    .select({ total: count() })
    .from(postViewsTable)
    .where(eq(postViewsTable.slug, slug));

  return result[0]?.total ?? 0;
}
