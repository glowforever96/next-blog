import { formatRelativeDate } from "@/shared/lib/date";
import { BlogPost } from "@/shared/types";
import Link from "next/link";
import Image from "next/image";

// preload: LCP 후보(첫 카드)만 <head> preload. eager: 첫 화면에 보이는 카드.
// Next 16에서 priority는 deprecated — 여러 LCP 후보에 preload를 남발하지 말라는 권고.
type ImageLoading = "preload" | "eager" | "lazy";

interface PostCardProps {
  post: BlogPost;
  imageLoading?: ImageLoading;
}

// 카드 썸네일 폭: 모바일 전폭, md는 사이드바(208px)·간격을 뺀 2열(실측 31~36vw), lg는 고정 320px.
// calc()를 쓰면 Next가 vw를 파싱하지 못해 srcset 후보가 32w~3840w 전부로 늘어나므로 vw 단위만 사용.
const THUMBNAIL_SIZES =
  "(max-width: 767px) 100vw, (max-width: 1023px) 36vw, 320px";

export default function PostCard({
  post,
  imageLoading = "lazy",
}: PostCardProps) {
  return (
    <Link
      key={post.slug}
      href={`/posts/${post.slug}`}
      className="bg-card rounded-sm overflow-hidden shadow-sm border border-border"
    >
      <article className="flex flex-col lg:flex-row">
        {/* lg에서 카드가 가로 flex라 기본 stretch면 박스가 텍스트 높이까지 늘어나
            aspect-video가 무시되고 좌우가 크게 잘린다(실측 24%). self-center로
            16:9(320x180)를 고정하고, 텍스트가 더 긴 카드는 위아래 여백으로 흡수 */}
        <div className="relative w-full lg:w-80 lg:self-center aspect-video bg-muted">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            preload={imageLoading === "preload"}
            loading={imageLoading === "eager" ? "eager" : undefined}
            sizes={THUMBNAIL_SIZES}
            className="object-cover"
          />
        </div>

        <div className="flex-1 p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <time dateTime={post.date}>
              {formatRelativeDate({ date: post.date, now: new Date() })}
            </time>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-card-foreground">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm">{post.description}</p>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-blue-500 bg-muted px-2 py-1 rounded-md dark:text-blue-400 font-medium w-fit "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
