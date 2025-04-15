interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  }
  
  export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
    return (
      <div className="flex justify-center gap-2 mt-10">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => onPageChange(n)}
            className={`px-3 py-1 border rounded-md text-sm font-medium hover:bg-neutral-100 ${
              n === currentPage ? 'bg-neutral-200' : ''
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    );
  }
  