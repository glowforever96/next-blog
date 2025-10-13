import { formatRelativeDate } from "@/lib/date";
import { BlogPost } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      key={post.slug}
      href={`/posts/${post.slug}`}
      className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <article className="flex flex-col lg:flex-row">
        <div className="relative w-full lg:w-64 aspect-video bg-gray-100">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 256px"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <time dateTime={post.date} className="text-xs text-gray-500">
              {formatRelativeDate(post.date)}
            </time>
          </div>
          <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
          <p className="text-gray-600 text-sm">{post.description}</p>
        </div>
      </article>
    </Link>
  );
}
