"use server";

import { db } from "@/db";
import { guestbookTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export const getGuestbook = async () => {
  const guestbook = await db
    .select()
    .from(guestbookTable)
    .orderBy(desc(guestbookTable.createdAt));

  return {
    code: 200,
    success: true,
    data: guestbook,
  };
};
