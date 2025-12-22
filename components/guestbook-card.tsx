"use client";

import { useState } from "react";
import { Guestbook } from "@/types";
import GuestbookCardView from "./guestbook-card-view";
import GuestbookCardEdit from "./guestbook-card-edit";

export default function GuestbookCard({ data }: { data: Guestbook }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <GuestbookCardEdit
        data={data}
        onCancel={() => setIsEditing(false)}
        onSuccess={() => setIsEditing(false)}
      />
    );
  }

  return <GuestbookCardView data={data} onEdit={() => setIsEditing(true)} />;
}
