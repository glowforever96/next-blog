import { toast } from "sonner";

const useCopyText = (preRef: React.RefObject<HTMLPreElement>) => {
  // 구형 브라우저 지원을 위한 fallback 함수
  const copyWithExecCommand = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  const handleClickCopy = async () => {
    if (!preRef.current) {
      toast.error("복사할 텍스트를 찾을 수 없어요.");
      return;
    }

    const textToCopy = preRef.current.innerText;

    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("코드가 복사되었어요.");
    } catch (error) {
      if (error instanceof Error) {
        copyWithExecCommand(textToCopy);
        toast.success("코드가 복사되었어요.");
      }
    }
  };

  return { handleClickCopy };
};

export default useCopyText;
