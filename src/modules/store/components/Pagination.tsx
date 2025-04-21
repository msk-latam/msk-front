import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handlePageChange = (page: number) => {
		if (page < 1 || page > totalPages || page === currentPage) return;

		const current = new URLSearchParams(Array.from(searchParams.entries()));
		current.set('page', page.toString());

		const search = current.toString();
		const query = search ? `?${search}` : '';

		router.push(`${pathname}${query}`);
	};

	// Logic to determine which page numbers to display (can be customized)
	// For now, show first, last, and a few around the current page
	const getPageNumbers = () => {
		const delta = 1; // Number of pages around current page
		const left = currentPage - delta;
		const right = currentPage + delta + 1;
		const range = [];
		const rangeWithDots: (number | string)[] = [];
		let l;

		for (let i = 1; i <= totalPages; i++) {
			if (i === 1 || i === totalPages || (i >= left && i < right)) {
				range.push(i);
			}
		}

		for (let i of range) {
			if (l) {
				if (i - l === 2) {
					rangeWithDots.push(l + 1);
				} else if (i - l !== 1) {
					rangeWithDots.push('...');
				}
			}
			rangeWithDots.push(i);
			l = i;
		}

		// Limit to ~4-5 visible numbers like the example if many pages
		// This is a simple approach, could be refined
		if (rangeWithDots.length > 5) {
			if (currentPage <= 3) {
				return [...rangeWithDots.slice(0, 4), '...', totalPages];
			} else if (currentPage >= totalPages - 2) {
				return [1, '...', ...rangeWithDots.slice(-4)];
			} else {
				return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
			}
		}

		return rangeWithDots;
	};

	const pageNumbers = getPageNumbers();

	if (totalPages <= 1) {
		return null; // Don't render pagination if there's only one page
	}

	return (
		<div className='flex justify-center items-center space-x-4 mt-8'>
			{/* Previous Button */}
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100'
				aria-label='Previous Page'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-5 h-5'
				>
					<path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
				</svg>
			</button>

			{/* Page Numbers */}
			<div className='flex items-center space-x-2'>
				{pageNumbers.map((page, index) =>
					typeof page === 'number' ? (
						<button
							key={index}
							onClick={() => handlePageChange(page)}
							className={`px-3 py-1 rounded text-sm ${
								currentPage === page
									? 'font-bold text-gray-900' // Active page style like 01
									: 'text-gray-500 hover:text-gray-800' // Inactive page style like 02, 03, 04
							}`}
							aria-current={currentPage === page ? 'page' : undefined}
						>
							{page.toString().padStart(2, '0')} {/* Format as 01, 02 etc */}
						</button>
					) : (
						<span key={index} className='px-2 py-1 text-gray-500'>
							{page} {/* Ellipsis */}
						</span>
					),
				)}
			</div>

			{/* Next Button */}
			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100'
				aria-label='Next Page'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-5 h-5'
				>
					<path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
				</svg>
			</button>
		</div>
	);
};

export default Pagination;
