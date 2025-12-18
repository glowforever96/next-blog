import Link from "next/link";
import HeaderClient from "./header-client";
import ProgressClient from "./progress-client";

export default function Header() {
  return (
    <header className="fixed w-full border-b backdrop-blur-xl bg-background/50 z-10 border-border">
      <ProgressClient />
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between">
        <nav
          className="gap-3 md:gap-5 flex items-center"
          aria-label="메인 네비게이션"
        >
          <Link href="/">
            <span className="text-lg md:text-xl font-extrabold text-foreground">
              soonyong devlog
            </span>
          </Link>
          <Link href="/about">
            <span className="text-base md:text-lg font-bold text-muted-foreground">
              About
            </span>
          </Link>
        </nav>

        <HeaderClient />
      </div>
    </header>
  );
}
