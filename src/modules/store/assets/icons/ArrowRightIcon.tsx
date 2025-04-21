import React from 'react';

interface ArrowRightIconProps {
	className?: string;
}

const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({ className = '' }) => (
	<svg
		width='24'
		height='24'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth={1.5}
		className={`w-5 h-5 ${className}`}
	>
		<path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
	</svg>
);

export default ArrowRightIcon;
