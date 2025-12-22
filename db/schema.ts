import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";

export const guestbookTable = pgTable("guestbook", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  comment: text().notNull(),
  password: text().notNull(),
  isEdited: boolean("is_edited").notNull().default(false),
  createdAt: text("created_at").notNull(),
});
