"use client";
import useCopyText from "@/hooks/useCopyText";
import { CopyIcon } from "lucide-react";
import { useRef } from "react";

export default function CustomPre({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(
    null
  ) as React.RefObject<HTMLPreElement>;

  const { handleClickCopy } = useCopyText(preRef);

  return (
    <pre
      ref={preRef}
      className="relative bg-muted p-4 rounded-lg overflow-x-auto mb-4 [&_code]:bg-transparent [&_code]:text-inherit [&_code]:p-0 [&_code]:text-base [&_code]:font-medium"
      {...props}
    >
      <div className="absolute top-3 right-3">
        <button
          onClick={handleClickCopy}
          className="text-muted-foreground cursor-pointer bg-muted-foreground/10 rounded-md p-2 hover:bg-muted-foreground/20 transition-colors"
        >
          <CopyIcon size={17} className="text-muted-foreground" />
        </button>
      </div>
      {children}
    </pre>
  );
}
