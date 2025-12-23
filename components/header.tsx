import Link from "next/link";
import HeaderClient from "./header-client";
import ProgressClient from "./progress-client";

const navItems = [
  {
    label: "soonyong devlog",
    href: "/",
    className: "text-lg md:text-xl font-extrabold text-foreground",
  },
  {
    label: "About",
    href: "/about",
    className: "text-base md:text-lg font-bold text-muted-foreground",
  },
  {
    label: "Guestbook",
    href: "/guestbook",
    className: "text-base md:text-lg font-bold text-muted-foreground",
  },
];

export default function Header() {
  return (
    <header className="fixed w-full border-b backdrop-blur-xl bg-background/50 z-10 border-border">
      <ProgressClient />
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between">
        <nav
          className="gap-3 md:gap-5 flex items-center"
          aria-label="메인 네비게이션"
        >
          {navItems.map(({ label, href, className }) => (
            <Link key={href} href={href}>
              <span className={className}>{label}</span>
            </Link>
          ))}
        </nav>
        <HeaderClient />
      </div>
    </header>
  );
}
