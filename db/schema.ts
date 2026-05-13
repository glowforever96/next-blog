import { boolean, index, integer, pgTable, text } from "drizzle-orm/pg-core";

export const guestbookTable = pgTable("guestbook", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  comment: text().notNull(),
  password: text().notNull(),
  isEdited: boolean("is_edited").notNull().default(false),
  createdAt: text("created_at").notNull(),
});

export const postViewsTable = pgTable(
  "post_views",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    slug: text().notNull(),
    ip: text().notNull(),
    viewedAt: text("viewed_at").notNull(),
  },
  (table) => [
    index("post_views_slug_idx").on(table.slug),
    index("post_views_dedup_idx").on(table.slug, table.ip, table.viewedAt),
  ]
);
