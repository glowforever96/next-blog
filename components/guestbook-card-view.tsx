import { Card, CardHeader } from "./ui/card";
import { Guestbook } from "@/types";
import { Button } from "./ui/button";
import TimeClient from "./time-client";

interface GuestbookCardViewProps {
  data: Guestbook;
  onEdit: () => void;
}

export default function GuestbookCardView({
  data,
  onEdit,
}: GuestbookCardViewProps) {
  const { name, comment, createdAt, isEdited } = data;

  return (
    <Card className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={onEdit}
        className="absolute top-2 right-2 text-xs h-7 px-2 z-10 text-muted-foreground hover:text-foreground cursor-pointer"
      >
        수정
      </Button>
      <CardHeader>
        <div className="flex-1 pr-12">
          <div className="text-sm">{name}</div>
          <div className="mt-2 text-foreground text-sm font-medium">
            {comment}
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
            <TimeClient date={createdAt} />
            {isEdited && (
              <span className="text-muted-foreground">(수정됨)</span>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
