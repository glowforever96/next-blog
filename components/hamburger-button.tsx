"use client";

import { useSidebarStore } from "@/store/sidebar-store";
import { MenuIcon } from "lucide-react";

export default function HamburgerButton() {
  const { toggle } = useSidebarStore();
  return (
    <button
      onClick={toggle}
      className="md:hidden cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label="toggle menu"
    >
      <MenuIcon size={24} />
    </button>
  );
}
