import { NextResponse } from "next/server";
import { db } from "@/db";
import { guestbookTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const guestbook = await db
    .select()
    .from(guestbookTable)
    .orderBy(desc(guestbookTable.createdAt));

  return NextResponse.json({
    code: 200,
    success: true,
    data: guestbook,
  });
}
