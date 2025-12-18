"use client";
import { Progress } from "@/components/ui/progress";
import useProgress from "@/hooks/useProgess";

export default function ProgressClient() {
  const progress = useProgress();

  return (
    <div className="absolute top-0 left-0 w-full h-1 z-20">
      <Progress value={progress} className="h-1 rounded-none" />
    </div>
  );
}
