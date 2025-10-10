import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed w-full border-b backdrop-blur-xl bg-background/50 z-10 border-gray-300">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 h-14 flex items-center justify-between">
        <nav className="flex items-end gap-5">
          <Link href="/">
            <h1 className="text-xl font-bold text-black">soonyong devlog</h1>
          </Link>
          <Link href="/about">
            <h2 className="text-base font-bold text-gray-700">About</h2>
          </Link>
        </nav>
        <button>dfdf</button>
      </div>
    </header>
  );
}
