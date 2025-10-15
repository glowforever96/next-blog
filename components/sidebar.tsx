"use client";
import Link from "next/link";
import { SidebarData } from "@/lib/sidebar";
import { useSidebarStore } from "@/store/sidebar-store";
import { XIcon } from "lucide-react";

interface SidebarProps {
  sidebarData: SidebarData;
  categoryCounts: { [key: string]: number };
}

export default function Sidebar({ sidebarData, categoryCounts }: SidebarProps) {
  const { isOpen, close } = useSidebarStore();

  const SidebarContent = () => (
    <div className="space-y-2 text-sm">
      {Object.entries(sidebarData).map(([key, value]) => (
        <div key={key}>
          <Link href={`/?c=${key}`} onClick={close}>
            <ul className="font-semibold text-foreground mb-2 flex justify-between hover:text-blue-600 transition-colors">
              <span>{key}</span> <span>{categoryCounts[key]}</span>
            </ul>
          </Link>
          <div className="flex flex-col gap-1">
            {value.map((item) => (
              <Link
                href={`/?c=${key}&t=${item.tag}`}
                key={item.tag}
                onClick={close}
              >
                <li className="ml-2 mb-0 text-muted-foreground list-none flex justify-between hover:text-blue-600 transition-colors">
                  <span>{item.tag}</span> <span>{item.count}</span>
                </li>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="flex">
        <aside className="hidden md:block w-52 border-r border-gray-200 pr-8">
          <div className="sticky top-[92px]">
            <SidebarContent />
          </div>
        </aside>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" />}
      <aside
        className={`
          fixed top-0 left-0 h-full w-68 bg-white z-50 
          transform transition-transform duration-300 ease-in-out
          md:hidden overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-5 relative">
          <div className="flex justify-between items-center mb-2 p-1 absolute top-0 right-0 w-full border-b border-gray-200">
            <button>d</button>
            <button onClick={close} className="cursor-pointer p-2">
              <XIcon size={28} />
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
