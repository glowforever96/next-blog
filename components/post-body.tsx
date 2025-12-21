import Giscus from "@/lib/giscus";
import BackButton from "./back-button";
import TableOfContents from "./table-of-contents";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypePrettyCode from "rehype-pretty-code";
import { MDXComponents } from "./mdx-components";

export default function PostBody({ content }: { content: string }) {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        <div className="flex-1 w-full min-w-0">
          <div className="prose prose-lg max-w-none w-full">
            <MDXRemote
              source={content}
              components={MDXComponents}
              options={{
                parseFrontmatter: false,
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkBreaks],
                  rehypePlugins: [
                    [
                      rehypePrettyCode,
                      {
                        theme: "one-dark-pro",
                        keepBackground: true,
                      },
                    ],
                  ],
                },
              }}
            />
          </div>
          <BackButton />
          <Giscus />
        </div>
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <TableOfContents />
        </aside>
      </div>
    </>
  );
}
