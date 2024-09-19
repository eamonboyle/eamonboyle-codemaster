import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxPageItems = 5;
  const halfMaxPageItems = Math.floor(maxPageItems / 2);
  let startPage = Math.max(currentPage - halfMaxPageItems, 1);
  let endPage = Math.min(currentPage + halfMaxPageItems, totalPages);

  if (currentPage <= halfMaxPageItems) {
    endPage = Math.min(maxPageItems, totalPages);
  } else if (currentPage + halfMaxPageItems >= totalPages) {
    startPage = Math.max(totalPages - maxPageItems + 1, 1);
  }

  const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);

  return (
    <div className="flex justify-center">
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationPrevious
              onClick={() => onPageChange(currentPage - 1)}
              className="cursor-pointer"
            />
          )}
          {visiblePageNumbers.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                onClick={() => onPageChange(number)}
                isActive={currentPage === number}
                className={
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "cursor-pointer"
                }
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
          {currentPage < totalPages && (
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              className="cursor-pointer"
            />
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationContainer;
