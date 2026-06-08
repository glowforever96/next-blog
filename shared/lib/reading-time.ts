export function getReadingTime(content: string): number {
  const plainText = content
    .replace(/```[\s\S]*?```/g, "") // 코드블록 제거
    .replace(/`[^`]*`/g, "") // 인라인 코드 제거
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // 이미지/링크 → 텍스트만
    .replace(/[#>*_~\-]/g, "") // 마크다운 기호 제거
    .trim();

  const koreanChars = (plainText.match(/[가-힣]/g) || []).length;
  const otherWords = plainText
    .replace(/[가-힣]/g, "")
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = koreanChars / 500 + otherWords / 200;

  return Math.max(1, Math.ceil(minutes));
}
