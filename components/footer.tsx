export default function Footer() {
  return (
    <footer className="w-full px-4 sm:px-6 md:px-6 py-4 border-t border-border">
      <p className="text-muted-foreground text-center text-xs md:text-sm">
        &copy; {new Date().getFullYear()} SOONYONG KWON. All rights reserved.
      </p>
    </footer>
  );
}
