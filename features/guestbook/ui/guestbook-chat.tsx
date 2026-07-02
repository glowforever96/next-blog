"use client";

import { useState } from "react";
import { Guestbook } from "@/shared/types";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/shared/ui/message-scroller";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/shared/ui/empty";
import GuestbookCardView from "./guestbook-card-view";
import GuestBookForm from "./guestbook-form";

export default function GuestbookChat({ entries }: { entries: Guestbook[] }) {
  const [editing, setEditing] = useState<Guestbook | null>(null);

  // API는 최신순(desc) → 채팅은 오래된 글이 위, 최신이 아래로 오도록 역순 정렬
  const ordered = [...entries].reverse();
  const isEmpty = ordered.length === 0;

  return (
    <div className="flex h-[70vh] min-h-105 flex-col overflow-hidden rounded-2xl border bg-card/40">
      <MessageScrollerProvider autoScroll defaultScrollPosition="end">
        <MessageScroller className="flex-1">
          <MessageScrollerViewport className="px-4 py-6 sm:px-6">
            {isEmpty ? (
              <Empty className="h-full border-none">
                <EmptyHeader>
                  <EmptyTitle>아직 방명록이 없어요</EmptyTitle>
                  <EmptyDescription>
                    첫 번째 메시지를 남겨주세요! 😊
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            ) : (
              <MessageScrollerContent>
                {ordered.map((item) => (
                  <MessageScrollerItem
                    key={item.id}
                    messageId={String(item.id)}
                    scrollAnchor
                  >
                    <GuestbookCardView
                      data={item}
                      onEdit={() =>
                        setEditing((prev) =>
                          prev?.id === item.id ? null : item
                        )
                      }
                      isEditing={editing?.id === item.id}
                    />
                  </MessageScrollerItem>
                ))}
              </MessageScrollerContent>
            )}
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>

      <div className="border-t bg-background/60 p-3">
        <GuestBookForm
          editing={editing}
          onCancelEdit={() => setEditing(null)}
          onDone={() => setEditing(null)}
        />
      </div>
    </div>
  );
}
