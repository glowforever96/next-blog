"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="flex justify-center mt-12">
      <Button
        onClick={() => router.back()}
        size="lg"
        variant="secondary"
        className="cursor-pointer"
      >
        <ArrowLeftIcon />
        목록으로 돌아가기
      </Button>
    </div>
  );
}
