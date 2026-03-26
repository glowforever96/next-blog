import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/shared/ui/pagination";
import { buildPageUrl, getPageNumbers } from "@/shared/lib/pagination";

interface PostsPaginationProps {
  currentPage: number;
  totalPages: number;
  category?: string;
  tag?: string;
}

export default function PostsPagination({
  currentPage,
  totalPages,
  category,
  tag,
}: PostsPaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers({ currentPage, totalPages });

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              currentPage <= 1
                ? "#"
                : buildPageUrl({ page: currentPage - 1, category, tag })
            }
            aria-disabled={currentPage <= 1}
            className={
              currentPage <= 1
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
        {pageNumbers.map((page, i) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={buildPageUrl({ page, category, tag })}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage >= totalPages
                ? "#"
                : buildPageUrl({ page: currentPage + 1, category, tag })
            }
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
