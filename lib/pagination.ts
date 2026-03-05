interface BuildPageUrlParams {
  page: number;
  category?: string;
  tag?: string;
}

export function buildPageUrl({
  page,
  category,
  tag,
}: BuildPageUrlParams): string {
  const params = new URLSearchParams();
  if (category) params.set("c", category);
  if (tag) params.set("t", tag);
  params.set("page", String(page));
  return `/?${params.toString()}`;
}

interface GetPageNumbersParams {
  currentPage: number;
  totalPages: number;
}

export function getPageNumbers({
  currentPage,
  totalPages,
}: GetPageNumbersParams): (number | "ellipsis")[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const result: (number | "ellipsis")[] = [];

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  if (start > 1) {
    result.push(1);
    if (start > 2) result.push("ellipsis");
  }

  for (let i = start; i <= end; i++) result.push(i);

  if (end < totalPages) {
    if (end < totalPages - 1) result.push("ellipsis");
    result.push(totalPages);
  }

  return result;
}
