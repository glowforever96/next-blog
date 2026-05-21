import { Button } from "@/shared/ui";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/ui/empty";
import { MessageSquareWarningIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Empty className="h-[calc(100dvh-14rem)]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageSquareWarningIcon />
        </EmptyMedia>
        <EmptyTitle>요청하신 페이지를 찾을 수 없습니다!</EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="lg" asChild>
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
