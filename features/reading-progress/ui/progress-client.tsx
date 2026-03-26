"use client";
import { Progress } from "@/shared/ui/progress";
import useProgress from "@/features/reading-progress/model/useProgess";
import { usePathname } from "next/navigation";

export default function ProgressClient() {
  const progress = useProgress();
  const pathname = usePathname();
  const isBaseUrl = pathname === "/";

  if (isBaseUrl) {
    return null;
  }
  return (
    <div className="absolute top-0 left-0 w-full h-1 z-20 hidden md:block">
      <Progress value={progress} className="h-1 rounded-none" />
    </div>
  );
}
