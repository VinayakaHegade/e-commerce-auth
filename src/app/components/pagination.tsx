import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <section className="flex flex-wrap items-center justify-center gap-y-4 space-x-2">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="rounded border px-2 py-1"
      >
        {"<<"}
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded border px-2 py-1"
      >
        {"<"}
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded border px-2 py-1 ${currentPage === page ? "bg-gray-200" : ""}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded border px-2 py-1"
      >
        {">"}
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="rounded border px-2 py-1"
      >
        {">>"}
      </button>
    </section>
  );
};

export default Pagination;
