import React from "react";
import CustomPre from "./custom-pre";

export const MDXComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-4xl font-bold text-foreground mb-6 mt-8 border-b-2 border-blue-500 pb-2"
      {...props}
    />
  ),

  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-3xl font-semibold text-foreground mb-4 mt-6 border-b border-border pb-2"
      {...props}
    />
  ),

  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-2xl font-semibold text-foreground mb-3 mt-5"
      {...props}
    />
  ),

  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-foreground leading-relaxed mb-4" {...props} />
  ),

  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-muted text-blue-500 dark:text-blue-400 px-1.5 py-1 rounded text-sm font-semibold"
      {...props}
    />
  ),

  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <CustomPre {...props} />
  ),

  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-blue-500 px-5 py-3 my-6 text-muted-foreground italic [&_p]:mb-0 bg-muted/50"
      {...props}
    />
  ),

  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-foreground mb-2 ml-6" {...props} />
  ),

  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc mb-4 space-y-2 pl-5" {...props} />
  ),

  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal mb-4 space-y-2 pl-5" {...props} />
  ),

  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <table
      className="w-full border-collapse border border-border mb-4"
      {...props}
    />
  ),

  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-border bg-muted px-4 py-2 text-left font-semibold text-foreground"
      {...props}
    />
  ),

  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-border px-4 py-2 text-foreground" {...props} />
  ),

  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-foreground" {...props} />
  ),

  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-foreground" {...props} />
  ),

  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
      {...props}
    />
  ),

  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="max-w-full md:max-w-3xl lg:max-w-4xl mx-auto my-6"
      alt={props.alt || ""}
      {...props}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-10 border-border" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-xl font-medium text-foreground mb-3 mt-5" {...props} />
  ),
};
