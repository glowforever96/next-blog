"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { createGuestbook } from "@/actions/createGuestbook";

const formSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  password: z.string().min(4, { message: "비밀번호는 4자 이상 입력해주세요." }),
  comment: z.string().min(1, { message: "내용을 입력해주세요." }),
});

export default function GuestBookForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, password, comment } = values;
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
        <fieldset className="grid grid-cols-2 gap-y-5 gap-x-2 items-start">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="이름을 입력해주세요." />
                </FormControl>
                <FormMessage className="min-h-[20px]" />
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
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                  />
                </FormControl>
                <FormMessage className="min-h-[20px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>내용</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="내용을 입력해주세요." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2 flex justify-end">
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="cursor-pointer"
            >
              {form.formState.isSubmitting ? "등록중..." : "등록"}
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
