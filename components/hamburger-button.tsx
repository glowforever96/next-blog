"use client";

import { MenuIcon } from "lucide-react";

export default function HamburgerButton() {
  return (
    <button className="md:hidden cursor-pointer">
      <MenuIcon />
    </button>
  );
}
