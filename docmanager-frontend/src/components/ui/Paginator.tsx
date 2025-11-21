import React from "react";
import { PAGE_SIZES } from "../../constants/pageSizes";
import {
  STORAGE_KEY_CURRENT_PAGE,
  STORAGE_KEY_ITEMS_PER_PAGE,
} from "../../constants/storageKeys";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

interface PaginatorProps {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange?: (page: number, pageSize: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePageChange = (page: number) => {
    sessionStorage.setItem(STORAGE_KEY_CURRENT_PAGE, page.toString());
    onPageChange?.(page, pageSize);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    sessionStorage.setItem(STORAGE_KEY_ITEMS_PER_PAGE, newSize.toString());
    onPageChange?.(1, newSize);
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) pages.push(1, "...");
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    if (endPage < totalPages) pages.push("...", totalPages);

    return pages.map((p, idx) =>
      typeof p === "number" ? (
        <Button
          key={idx}
          variant={`${p === currentPage ? "primary" : "secondary"}`}
          onClick={() => handlePageChange(p)}
        >
          {p}
        </Button>
      ) : (
        <span key={idx} className="px-2">
          {p}
        </span>
      )
    );
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      {/* Show dropdown */}
      <div className="flex items-center space-x-2">
        <span>Show</span>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="border rounded px-2 py-1"
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>
          {startItem}-{endItem} of {totalItems}
        </span>
      </div>

      {/* Pagination */}
      <div className="flex items-center space-x-1">
        <Button
          variant="secondary"
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          {/* Mobile icon */}
          <ChevronLeft className="w-4 h-4 inline sm:hidden" />

          {/* Desktop text */}
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {renderPageNumbers()}

        <Button
          variant="secondary"
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          disabled={currentPage === totalPages}
        >
          {/* Mobile icon */}
          <ChevronRight className="w-4 h-4 inline sm:hidden" />

          {/* Desktop text */}
          <span className="hidden sm:inline">Next</span>
        </Button>
      </div>
    </div>
  );
};

export default Paginator;
