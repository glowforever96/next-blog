import { Guestbook } from "@/shared/types";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Bubble, BubbleContent } from "@/shared/ui/bubble";
import {
  Message,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from "@/shared/ui/message";
import { formatRelativeDate } from "@/shared/lib/date";
import { Pencil } from "lucide-react";

interface GuestbookCardViewProps {
  data: Guestbook;
  onEdit: () => void;
  isEditing?: boolean;
}

export default function GuestbookCardView({
  data,
  onEdit,
  isEditing = false,
}: GuestbookCardViewProps) {
  const { name, comment, createdAt, isEdited } = data;

  return (
    <Message align="start">
      <MessageContent>
        <MessageHeader>
          <span className="font-semibold text-blue-500 dark:text-blue-400">
            {name}
          </span>
        </MessageHeader>
        <Bubble variant="secondary">
          <BubbleContent
            className={cn(
              "whitespace-pre-wrap",
              isEditing && "ring-2 ring-inset ring-blue-500/60"
            )}
          >
            {comment}
          </BubbleContent>
        </Bubble>
        <MessageFooter className="gap-1.5">
          <time dateTime={createdAt} className="font-mono tabular-nums">
            {formatRelativeDate({ date: createdAt, now: new Date() })}
          </time>
          {isEdited && <span>· 수정됨</span>}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onEdit}
            aria-label="수정"
            className="ml-0.5 size-6 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover/message:opacity-100 focus-visible:opacity-100"
          >
            <Pencil className="size-3" />
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
  );
}
