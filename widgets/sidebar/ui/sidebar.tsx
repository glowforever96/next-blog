"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SidebarData } from "@/entities/post/lib/sidebar";
import { useSidebarStore } from "@/widgets/sidebar/model/sidebar-store";
import { ChevronsUpDown, XIcon } from "lucide-react";
import { ModeToggle } from "@/features/theme-toggle/ui/mode-toggle";
import Search from "@/features/search/ui/search";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/collapsible";
import { BlogPost } from "@/shared/types";

interface SidebarProps {
  sidebarData: SidebarData;
  categoryCounts: { [key: string]: number };
  posts: BlogPost[];
}

interface SidebarContentProps {
  sidebarData: SidebarData;
  categoryCounts: { [key: string]: number };
  close: () => void;
  isFiltering: boolean;
}

function SidebarContent({
  sidebarData,
  categoryCounts,
  close,
  isFiltering,
}: SidebarContentProps) {
  return (
    <nav className="space-y-2 text-sm" aria-label="카테고리 네비게이션">
      {Object.entries(sidebarData).map(([key, value], index) => (
        <Collapsible key={key} defaultOpen={index === 0}>
          <div className="flex items-center gap-1 mb-2">
            <Link
              href={`/?c=${key}`}
              onClick={close}
              replace={isFiltering}
              className="font-semibold text-foreground flex-1 flex justify-between hover:text-blue-600 transition-colors mr-1"
            >
              <span>{key}</span> <span>{categoryCounts[key]}</span>
            </Link>
            <CollapsibleTrigger
              aria-label={`${key} 카테고리 토글`}
              className="cursor-pointer p-1 -mr-1 rounded hover:bg-muted text-muted-foreground transition-colors group"
            >
              <ChevronsUpDown size={16} />
              <span className="sr-only">Toggle details</span>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <ul className="flex flex-col gap-1">
              {value.map((item) => (
                <li key={item.tag} className="ml-2 mb-0 text-muted-foreground">
                  <Link
                    href={`/?c=${key}&t=${item.tag}`}
                    onClick={close}
                    replace={isFiltering}
                    className="flex justify-between hover:text-blue-600 transition-colors"
                  >
                    <span>{item.tag}</span> <span>{item.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </nav>
  );
}

export default function Sidebar({
  sidebarData,
  categoryCounts,
  posts,
}: SidebarProps) {
  const { isOpen, close } = useSidebarStore();
  const searchParams = useSearchParams();
  const isFiltering = searchParams.has("c") || searchParams.has("t");

  const contentProps = { sidebarData, categoryCounts, close, isFiltering };

  return (
    <>
      <div className="flex">
        <aside className="hidden md:block w-52 border-r border-border">
          <div className="sticky top-[92px] max-h-[calc(100vh-92px)] overflow-y-auto pr-8 pb-4">
            <SidebarContent {...contentProps} />
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
            <div className="flex items-center gap-1">
              <Search posts={posts} isMobileView />
              <button
                onClick={close}
                className="cursor-pointer p-2 hover:bg-muted rounded-lg transition-colors"
                aria-label="Close sidebar"
              >
                <XIcon size={24} className="text-foreground" />
              </button>
            </div>
          </div>
          <div className="mt-12">
            <SidebarContent {...contentProps} />
          </div>
        </div>
      </aside>
    </>
  );
}
