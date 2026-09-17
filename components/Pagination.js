import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

// Which page buttons to show, e.g. [1, "...", 4, 5, 6, "...", 12]
function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 7) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }
  if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
  if (currentPage >= totalPages - 3) {
    return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}

const buttonClass =
  "inline-flex h-8 items-center gap-1 rounded-md border border-gray-300 bg-white px-2.5 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white";

export default function Pagination({ currentPage, totalPages, totalItems, rowsPerPage, onPageChange, onRowsPerPageChange }) {
  const firstItem = (currentPage - 1) * rowsPerPage + 1;
  const lastItem = Math.min(currentPage * rowsPerPage, totalItems);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-between gap-4 border-t border-gray-200 px-4 py-3 text-sm">
      <div className="pagination-info flex items-center gap-5 text-gray-500">
        <span className="whitespace-nowrap">
          Showing{" "}
          <span className="font-medium tabular-nums text-gray-900">
            {firstItem}–{lastItem}
          </span>{" "}
          of <span className="font-medium tabular-nums text-gray-900">{totalItems}</span>
        </span>

        <label className="rows-per-page items-center gap-2 whitespace-nowrap">
          Rows per page
          <span className="relative">
            <select
              value={rowsPerPage}
              onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
              className="h-8 cursor-pointer appearance-none rounded-md border border-gray-300 bg-white pl-2.5 pr-7 text-sm text-gray-700 hover:border-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
          </span>
        </label>
      </div>

      <div className="pagination-controls flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={buttonClass}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
          <span className="page-btn-label">Previous</span>
        </button>

        <div className="page-numbers items-center gap-1 px-1">
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span key={index} className="w-6 text-center text-gray-400">
                …
              </span>
            ) : (
              <button
                key={index}
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`h-8 min-w-8 rounded-md px-2 text-sm tabular-nums ${
                  page === currentPage ? "bg-gray-900 font-medium text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        <span className="page-mobile-label text-gray-600">
          Page <span className="font-medium text-gray-900">{currentPage}</span> of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={buttonClass}
          aria-label="Next page"
        >
          <span className="page-btn-label">Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
