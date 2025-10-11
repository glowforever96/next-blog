import React from "react";

export const MDXComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-4xl font-bold text-gray-900 mb-6 mt-8 border-b-2 border-blue-500 pb-2"
      {...props}
    />
  ),

  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-semibold text-gray-800 mb-4 mt-6" {...props} />
  ),

  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-medium text-gray-700 mb-3 mt-5" {...props} />
  ),

  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-700 leading-relaxed mb-4" {...props} />
  ),

  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-gray-200 text-blue-400 px-1.5 py-1 rounded text-sm font-semibold"
      {...props}
    />
  ),

  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 [&_code]:bg-transparent [&_code]:text-inherit [&_code]:p-0 [&_code]:text-base [&_code]:font-medium"
      {...props}
    />
  ),

  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-blue-400 pl-4 italic text-gray-600 my-4"
      {...props}
    />
  ),

  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-gray-700 mb-2" {...props} />
  ),

  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
  ),

  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
  ),

  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <table
      className="w-full border-collapse border border-gray-300 mb-4"
      {...props}
    />
  ),

  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),

  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-gray-300 px-4 py-2" {...props} />
  ),

  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-gray-900" {...props} />
  ),

  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-gray-800" {...props} />
  ),

  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-blue-600 hover:text-blue-800 underline" {...props} />
  ),

  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="max-w-full md:max-w-2xl mx-auto  my-6"
      alt={props.alt || ""}
      {...props}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-6 border-gray-300" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-xl font-medium text-gray-700 mb-3 mt-5" {...props} />
  ),
};
