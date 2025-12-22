import { getGuestbook } from "@/actions/getGuestbook";
import { cacheLife, cacheTag } from "next/cache";
import GuestbookCard from "./guestbook-card";

export default async function GuestbookList() {
  "use cache";
  cacheTag("guestbook");
  cacheLife("days");

  const { data: guestbook } = await getGuestbook();

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-foreground">
        방명록 ({guestbook.length})
      </h2>
      {guestbook.length === 0 ? (
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
