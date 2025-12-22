"use server";

import { db } from "@/db";
import { guestbookTable } from "@/db/schema";
import { updateTag } from "next/cache";
import { format } from "date-fns";

export const createGuestbook = async (formData: FormData) => {
  const name = formData.get("name")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const comment = formData.get("comment")?.toString() || "";

  const createdAt = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  await db.insert(guestbookTable).values({
    name,
    password,
    comment,
    isEdited: false,
    createdAt,
  });

  updateTag("guestbook");

  return {
    code: 200,
    success: true,
  };
};
