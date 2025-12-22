import { Card, CardHeader } from "./ui/card";
import { Guestbook } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { updateGuestbook } from "@/actions/updateGuestbook";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const editFormSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  comment: z.string().min(1, { message: "내용을 입력해주세요." }),
  password: z.string().min(4, { message: "비밀번호를 입력해주세요." }),
});

interface GuestbookCardEditProps {
  data: Guestbook;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function GuestbookCardEdit({
  data,
  onCancel,
  onSuccess,
}: GuestbookCardEditProps) {
  const { id, name, comment } = data;

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      name,
      comment,
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof editFormSchema>) {
    const { name, comment, password } = values;
    const formData = new FormData();

    formData.append("id", id.toString());
    formData.append("name", name);
    formData.append("comment", comment);
    formData.append("inputPassword", password);

    const res = await updateGuestbook(formData);

    if (res.success) {
      toast.success("방명록이 수정되었습니다😃");
      form.reset();
      onSuccess();
    } else {
      toast.error(`${res.error} 😢`);
    }
  }

  return (
    <Card>
      <CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="이름을 입력해주세요." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>내용</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="내용을 입력해주세요." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="비밀번호를 입력해주세요."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                  onCancel();
                  form.reset();
                }}
                disabled={form.formState.isSubmitting}
              >
                취소
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="cursor-pointer"
              >
                {form.formState.isSubmitting ? "수정 중..." : "수정"}
              </Button>
            </div>
          </form>
        </Form>
      </CardHeader>
    </Card>
  );
}
