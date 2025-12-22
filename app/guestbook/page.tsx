import GuestBookForm from "@/components/guestbook-form";
import GuestbookList from "@/components/guestbook-list";

export default function GuestbookPage() {
  return (
    <section className="w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-8 min-h-screen">
      <GuestBookForm />
      <div className="h-px bg-border my-8" />
      <GuestbookList />
    </section>
  );
}
