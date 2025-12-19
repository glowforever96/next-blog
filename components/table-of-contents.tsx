"use client";

import useTOC from "@/hooks/useTOC";

export default function TableOfContents() {
  const { headingInfo, activeId, handleClickHeading } = useTOC();

  return (
    <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="border-l-2 border-border pl-4">
        <ul className="space-y-2 text-sm">
          {headingInfo.map(({ id, text, level }) => (
            <li key={id} style={{ paddingLeft: `${(level - 1) * 12}px` }}>
              <button
                onClick={() => handleClickHeading(id)}
                className={`text-left w-full cursor-pointer transition-colors hover:text-foreground ${
                  activeId === id
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
