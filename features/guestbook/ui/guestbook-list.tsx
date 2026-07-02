import { headers } from "next/headers";
import { Guestbook } from "@/shared/types";
import { Badge } from "@/shared/ui/badge";
import GuestbookChat from "./guestbook-chat";

async function getBaseUrl() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "https";
  return `${protocol}://${host}`;
}

export default async function GuestbookList() {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/guestbook`, {
    next: { tags: ["guestbook"], revalidate: 60 * 60 * 24 },
    cache: "force-cache",
  });

  const { data: guestbook }: { data: Guestbook[] } = await res.json();
  const entries = guestbook ?? [];

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-foreground">방명록</h2>
        <Badge
          variant="secondary"
          className="border-blue-500/30 text-blue-500 tabular-nums dark:text-blue-400"
        >
          {entries.length}
        </Badge>
      </div>
      <GuestbookChat entries={entries} />
    </section>
  );
}
