"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";

interface Shot {
  src: string;
  alt: string;
}

export default function ScreenshotGallery({ shots }: { shots: Shot[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const current = index === null ? null : shots[index];

  const step = (dir: number) =>
    setIndex((i) => (i === null ? i : (i + dir + shots.length) % shots.length));

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {shots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`${shot.alt} 크게 보기`}
            className="group relative aspect-video cursor-zoom-in overflow-hidden rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <Dialog
        open={current !== null}
        onOpenChange={(open) => !open && setIndex(null)}
      >
        <DialogContent
          className="max-w-[calc(100%-2rem)] gap-3 border-none bg-transparent p-0 shadow-none sm:max-w-6xl [&>button]:text-white"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") step(-1);
            if (e.key === "ArrowRight") step(1);
          }}
        >
          {current && (
            <>
              <DialogTitle className="sr-only">{current.alt}</DialogTitle>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(min-width: 1200px) 1152px, 100vw"
                  quality={90}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-between gap-3 rounded-full bg-black/70 px-2 py-1 text-sm text-white">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="이전 사진"
                  className="rounded-full p-1.5 transition-colors hover:bg-white/15"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-center">
                  {current.alt}
                  <span className="ml-2 font-mono text-xs tabular-nums text-white/60">
                    {index! + 1} / {shots.length}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="다음 사진"
                  className="rounded-full p-1.5 transition-colors hover:bg-white/15"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
