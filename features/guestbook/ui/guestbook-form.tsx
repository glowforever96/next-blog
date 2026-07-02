"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/shared/lib/utils";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { toast } from "sonner";
import { ArrowUp, Check, Loader2 } from "lucide-react";
import { Guestbook } from "@/shared/types";
import { createGuestbook } from "@/entities/guestbook/api/createGuestbook";
import { updateGuestbook } from "@/entities/guestbook/api/updateGuestbook";

const formSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  password: z.string().min(4, { message: "비밀번호는 4자 이상 입력해주세요." }),
  comment: z.string().min(1, { message: "내용을 입력해주세요." }),
});

interface GuestBookFormProps {
  editing?: Guestbook | null;
  onCancelEdit?: () => void;
  onDone?: () => void;
}

export default function GuestBookForm({
  editing = null,
  onCancelEdit,
  onDone,
}: GuestBookFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      comment: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  const isEditing = Boolean(editing);

  // 수정 대상이 바뀌면 컴포저에 값 채우기(비밀번호는 재확인 위해 비움)
  useEffect(() => {
    form.reset(
      editing
        ? { name: editing.name, comment: editing.comment, password: "" }
        : { name: "", comment: "", password: "" }
    );
  }, [editing, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, password, comment } = values;

    if (editing) {
      const formData = new FormData();
      formData.append("id", String(editing.id));
      formData.append("name", name);
      formData.append("comment", comment);
      formData.append("inputPassword", password);

      const res = await updateGuestbook(formData);

      if (res.success) {
        toast.success("방명록이 수정되었습니다😃");
        onDone?.();
      } else {
        toast.error(`${res.error} 😢`);
      }
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("comment", comment);
    formData.append("password", password);

    const res = await createGuestbook(formData);

    if (res.success) {
      toast.success("방명록이 등록되었습니다! 감사합니다😊");
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={cn(
            "rounded-2xl border bg-background p-2 shadow-sm transition-colors focus-within:border-blue-500/40 focus-within:ring-1 focus-within:ring-blue-500/20",
            isEditing && "border-blue-500/40 ring-1 ring-blue-500/20"
          )}
        >
          {/* 이름 + 비밀번호 (컴팩트) */}
          <div className="flex gap-2 px-1 pb-1.5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-32">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="이름"
                      className="h-8 border-input bg-muted/40 text-sm focus-visible:border-blue-500/50 focus-visible:ring-2 focus-visible:ring-blue-500/20 dark:bg-muted/30"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-32">
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={isEditing ? "비밀번호 확인" : "비밀번호"}
                      className="h-8 border-input bg-muted/40 text-sm focus-visible:border-blue-500/50 focus-visible:ring-2 focus-visible:ring-blue-500/20 dark:bg-muted/30"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* 내용 + 전송 버튼 */}
          <div className="flex items-end gap-2">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={
                        isEditing
                          ? "메시지를 수정하세요…"
                          : "메시지를 입력하세요…"
                      }
                      rows={1}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          !e.shiftKey &&
                          !e.nativeEvent.isComposing
                        ) {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
                        }
                        if (e.key === "Escape" && isEditing) {
                          e.preventDefault();
                          onCancelEdit?.();
                        }
                      }}
                      className="max-h-40 min-h-9 resize-none border-transparent bg-transparent px-2 py-1.5 text-sm shadow-none focus-visible:ring-0 dark:bg-transparent"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isSubmitting}
              aria-label={isEditing ? "수정 완료" : "등록"}
              className="size-9 shrink-0 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : isEditing ? (
                <Check className="size-4" />
              ) : (
                <ArrowUp className="size-4" />
              )}
            </Button>
          </div>
        </div>

        {/* 유효성 메시지 */}
        {(() => {
          const errors = form.formState.errors;
          const message =
            errors.comment?.message ??
            errors.name?.message ??
            errors.password?.message;
          return message ? (
            <p className="mt-1.5 px-2 text-sm text-destructive">{message}</p>
          ) : null;
        })()}
      </form>
    </Form>
  );
}
