"use client";

import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { useSidebarStore } from "@/store/sidebar-store";
import { ModeToggle } from "./mode-toggle";

export default function HeaderClient() {
  const pathname = usePathname();
  const isHideMenu = pathname === "/about" || pathname.includes("/posts/");
  const { toggle } = useSidebarStore();

  return (
    <div className="flex items-center gap-2">
      <div className={isHideMenu ? "block" : "hidden md:block"}>
        <ModeToggle />
      </div>

      {!isHideMenu && (
        <button
          onClick={toggle}
          className="md:hidden cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <MenuIcon size={24} />
        </button>
      )}
    </div>
  );
}
