"use client";
import Link from "next/link";
import { SidebarData } from "@/lib/sidebar";
import { useSidebarStore } from "@/store/sidebar-store";
import { XIcon } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

interface SidebarProps {
  sidebarData: SidebarData;
  categoryCounts: { [key: string]: number };
}

export default function Sidebar({ sidebarData, categoryCounts }: SidebarProps) {
  const { isOpen, close } = useSidebarStore();

  const SidebarContent = () => (
    <nav className="space-y-2 text-sm" aria-label="카테고리 네비게이션">
      {Object.entries(sidebarData).map(([key, value]) => (
        <div key={key}>
          <Link
            href={`/?c=${key}`}
            onClick={close}
            className="font-semibold text-foreground mb-2 flex justify-between hover:text-blue-600 transition-colors block"
          >
            <span>{key}</span> <span>{categoryCounts[key]}</span>
          </Link>
          <ul className="flex flex-col gap-1">
            {value.map((item) => (
              <li key={item.tag} className="ml-2 mb-0 text-muted-foreground">
                <Link
                  href={`/?c=${key}&t=${item.tag}`}
                  onClick={close}
                  className="flex justify-between hover:text-blue-600 transition-colors"
                >
                  <span>{item.tag}</span> <span>{item.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      <div className="flex">
        <aside className="hidden md:block w-52 border-r border-border pr-8">
          <div className="sticky top-[92px]">
            <SidebarContent />
          </div>
        </aside>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 md:hidden"
          onClick={close}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-68 bg-background z-50 
          transform transition-transform duration-300 ease-in-out
          md:hidden overflow-y-auto border-r border-border
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-5 relative">
          <div className="flex justify-between items-center mb-2 py-2 px-3 absolute top-0 right-0 w-full border-b border-border">
            <ModeToggle />
            <button
              onClick={close}
              className="cursor-pointer p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <XIcon size={24} className="text-foreground" />
            </button>
          </div>
          <div className="mt-12">
            <SidebarContent />
          </div>
        </div>
      </aside>
    </>
  );
}
