"use client";
import { useTheme } from "next-themes";

import { Button } from "@/shared/ui/button";
import { Kbd } from "@/shared/ui/kbd";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1">
      <p className="text-xs text-muted-foreground hidden md:block">
        <Kbd>D</Kbd>를 눌러 테마를 변경할 수 있습니다.
      </p>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <ThemeIcon />
      </Button>
    </div>
  );
}

function ThemeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4.5"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
      <path d="M12 3l0 18"></path>
      <path d="M12 9l4.65 -4.65"></path>
      <path d="M12 14.3l7.37 -7.37"></path>
      <path d="M12 19.6l8.85 -8.85"></path>
    </svg>
  );
}
