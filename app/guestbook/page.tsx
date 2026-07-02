import type { Metadata } from "next";
import GuestbookList from "@/features/guestbook/ui/guestbook-list";
import { SITE_URL } from "@/shared/lib/site";

export const metadata: Metadata = {
  title: "방명록",
  description: "soonyong devlog 방명록",
  alternates: {
    canonical: `${SITE_URL}/guestbook`,
  },
  openGraph: {
    title: "방명록 | soonyong devlog",
    description: "soonyong devlog 방명록",
    url: `${SITE_URL}/guestbook`,
    type: "website",
  },
};

export default function GuestbookPage() {
  return (
    <section className="w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-4">
      <GuestbookList />
    </section>
  );
}
