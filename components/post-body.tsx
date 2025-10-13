import Giscus from "@/lib/giscus";
import BackButton from "./back-button";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypePrettyCode from "rehype-pretty-code";
import { MDXComponents } from "./mdx-components";

export default function PostBody({ content }: { content: string }) {
  return (
    <>
      <div className="prose prose-lg max-w-none">
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
    </>
  );
}
