"use client";

import { FileTextIcon } from "lucide-react";
import useSearchPost from "@/hooks/useSearchPost";
import { BlogPost } from "@/types";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Kbd } from "./ui/kbd";

interface SearchProps {
  posts: BlogPost[];
  isMobileView?: boolean;
}

export default function Search({ posts, isMobileView = false }: SearchProps) {
  const {
    open,
    handleOpenChange,
    handleSelect,
    setInputValue,
    displayPosts,
    isSearching,
  } = useSearchPost(posts);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className={`text-xs gap-4 ${
          isMobileView
            ? "flex"
            : "hidden md:inline-flex md:w-[120px] lg:w-[190px]"
        }`}
        onClick={() => handleOpenChange(true)}
      >
        포스트 검색...
        <Kbd className="hidden md:block">⌘K</Kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        title="포스트 검색"
        description="포스트 제목으로 검색합니다"
      >
        <CommandInput
          placeholder="포스트 제목으로 검색..."
          onValueChange={setInputValue}
        />
        <CommandList>
          <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
          <CommandGroup heading={isSearching ? "검색 결과" : "최근 포스트"}>
            {displayPosts.map((post) => (
              <CommandItem
                key={post.slug}
                value={post.title}
                onSelect={() => handleSelect(post.slug)}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <FileTextIcon />
                    <p className="truncate">{post.title}</p>
                  </div>
                  <span className="text-xs text-muted-foreground ml-6">
                    {post.description}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
