"use server";

import { db } from "@/db";
import { guestbookTable } from "@/db/schema";
import { updateTag } from "next/cache";

function formatDateTime(date: Date): string {
  const kstDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  const year = kstDate.getFullYear();
  const month = String(kstDate.getMonth() + 1).padStart(2, "0");
  const day = String(kstDate.getDate()).padStart(2, "0");
  const hours = String(kstDate.getHours()).padStart(2, "0");
  const minutes = String(kstDate.getMinutes()).padStart(2, "0");
  const seconds = String(kstDate.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const createGuestbook = async (formData: FormData) => {
  const name = formData.get("name")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const comment = formData.get("comment")?.toString() || "";

  const createdAt = formatDateTime(new Date());

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
