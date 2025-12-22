"use server";

import { db } from "@/db";
import { guestbookTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

export const updateGuestbook = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  const name = formData.get("name")?.toString() || "";
  const comment = formData.get("comment")?.toString() || "";
  const inputPassword = formData.get("inputPassword")?.toString() || "";

  const existingGuestbook = await db
    .select()
    .from(guestbookTable)
    .where(eq(guestbookTable.id, id))
    .limit(1);

  if (existingGuestbook.length === 0) {
    return {
      code: 404,
      success: false,
    };
  }

  if (existingGuestbook[0].password !== inputPassword) {
    return {
      code: 401,
      success: false,
      error: "비밀번호가 일치하지 않습니다!",
    };
  }

  await db
    .update(guestbookTable)
    .set({
      name,
      comment,
      isEdited: true,
    })
    .where(eq(guestbookTable.id, id));

  updateTag("guestbook");

  return {
    code: 200,
    success: true,
  };
};
