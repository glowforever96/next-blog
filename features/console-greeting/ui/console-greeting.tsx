"use client";

import { useEffect } from "react";

const BANNER = `
  ███████╗ ██████╗  ██████╗ ███╗   ██╗██╗   ██╗ ██████╗ ███╗   ██╗ ██████╗
  ██╔════╝██╔═══██╗██╔═══██╗████╗  ██║╚██╗ ██╔╝██╔═══██╗████╗  ██║██╔════╝
  ███████╗██║   ██║██║   ██║██╔██╗ ██║ ╚████╔╝ ██║   ██║██╔██╗ ██║██║  ███╗
  ╚════██║██║   ██║██║   ██║██║╚██╗██║  ╚██╔╝  ██║   ██║██║╚██╗██║██║   ██║
  ███████║╚██████╔╝╚██████╔╝██║ ╚████║   ██║   ╚██████╔╝██║ ╚████║╚██████╔╝
  ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝
                                                            d e v l o g
`;

export default function ConsoleGreeting() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const w = window as Window & { __greeted__?: boolean };
    if (w.__greeted__) return;
    w.__greeted__ = true;

    console.log(
      `%c${BANNER}`,
      [
        "color: #6366f1",
        "font-family: monospace",
        "font-weight: bold",
        "line-height: 1.1",
        "font-size: 11px",
      ].join(";"),
    );

    console.log(
      "%c👋 안녕하세요",
      "font-size: 16px; font-weight: 700; color: #6366f1; padding: 6px 0;",
    );

    console.log(
      "%c🛠  Tech Stack",
      "font-size: 13px; font-weight: 700; color: #0ea5e9; padding-top: 4px;",
    );
    console.log(
      "%c   Next.js · React · TypeScript · Tailwind",
      "font-size: 12px; color: #94a3b8;",
    );

    console.log(
      "%c\n📬  Get in touch",
      "font-size: 13px; font-weight: 700; color: #0ea5e9;",
    );
    console.log(
      "%c   GitHub  %chttps://github.com/glowforever96",
      "color: #94a3b8;",
      "color: #38bdf8;",
    );
    console.log(
      "%c   Email   %ctnsdyd10@naver.com",
      "color: #94a3b8;",
      "color: #38bdf8;",
    );

    console.log(
      "%c\n💼 좋은 기회는 언제든 환영합니다!\n",
      "font-size: 12px; font-weight: 700; color: #f59e0b; padding-bottom: 4px;",
    );
  }, []);

  return null;
}
