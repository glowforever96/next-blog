import { BlogPost } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const useSearchPost = (posts: BlogPost[]) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const isSearching = inputValue.trim().length > 0;

  const displayPosts = isSearching ? posts : posts.slice(0, 3);

  const handleOpenChange = useCallback((value: boolean) => {
    setOpen(value);
    if (!value) setInputValue("");
  }, []);

  const handleSelect = (slug: string) => {
    router.push(`/posts/${slug}`);
    handleOpenChange(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handleOpenChange(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleOpenChange]);

  return {
    open,
    setOpen,
    handleOpenChange,
    handleSelect,
    setInputValue,
    displayPosts,
    isSearching,
  };
};

export default useSearchPost;
