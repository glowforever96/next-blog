import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full px-4 sm:px-6 md:px-6 py-4 border-t border-border">
      <nav
        className="flex items-center justify-center gap-4 text-xs md:text-sm mb-2"
        aria-label="사이트 링크"
      >
        <Link
          href="/archive"
          className="text-muted-foreground hover:text-blue-600 transition-colors"
        >
          전체 글
        </Link>
        <Link
          href="/about"
          className="text-muted-foreground hover:text-blue-600 transition-colors"
        >
          About
        </Link>
        <Link
          href="/guestbook"
          className="text-muted-foreground hover:text-blue-600 transition-colors"
        >
          방명록
        </Link>
      </nav>
      <p className="text-muted-foreground text-center text-xs md:text-sm">
        &copy; 2025 SOONYONG KWON. All rights reserved.
      </p>
    </footer>
  );
}
