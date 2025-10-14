import useSidebar from "@/hooks/useSidebar";
import Link from "next/link";

export default function Sidebar() {
  const { sidebarData, categoryCounts } = useSidebar();

  return (
    <div className="flex">
      <aside className="hidden md:block w-52 border-r border-gray-200 pr-8">
        <div className="sticky top-[92px]">
          <div className="space-y-2 text-sm">
            {Object.entries(sidebarData).map(([key, value]) => (
              <div key={key}>
                <Link href={`/?c=${key}`}>
                  <ul className="font-semibold text-foreground mb-2 flex justify-between hover:text-blue-600 transition-colors">
                    <span>{key}</span> <span>{categoryCounts[key]}</span>
                  </ul>
                </Link>
                <div className="flex flex-col gap-1">
                  {value.map((item) => (
                    <Link href={`/?c=${key}&t=${item.tag}`} key={item.tag}>
                      <li className="ml-2 mb-0 text-muted-foreground list-none flex justify-between hover:text-blue-600 transition-colors">
                        <span>{item.tag}</span> <span>{item.count}</span>
                      </li>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
