import { headers } from "next/headers";
import GuestbookCard from "./guestbook-card";
import { Guestbook } from "@/types";

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

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-foreground">
        방명록 ({guestbook?.length || 0})
      </h2>
      {!guestbook || guestbook.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">
          아직 방명록이 없습니다. 첫 방명록을 남겨주세요!😅
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {guestbook.map((item) => (
            <GuestbookCard key={item.id} data={item} />
          ))}
        </div>
      )}
    </section>
  );
}
