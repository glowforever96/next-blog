import Link from "next/link";
import HamburgerButton from "./hamburger-button";

export default function Header() {
  return (
    <header className="fixed w-full border-b backdrop-blur-xl bg-background/50 z-10 border-gray-200">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between">
        <nav className="gap-3 md:gap-5 flex items-center">
          <Link href="/">
            <h1 className="text-lg md:text-xl font-extrabold text-foreground">
              soonyong devlog
            </h1>
          </Link>
          <Link href="/about">
            <h2 className="text-base md:text-lg font-bold text-muted-foreground">
              About
            </h2>
          </Link>
        </nav>
        <button className="hidden md:block">dfdf</button>
        <HamburgerButton />
      </div>
    </header>
  );
}
