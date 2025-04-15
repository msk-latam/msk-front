import ArrowRightIcon from '@/dashboard/assets/icons/ArrowRightIcon';
import React from 'react';

interface CtaButtonProps {
	onClick: () => void;
	showIcon?: boolean;
	children: React.ReactNode;
}

const CtaButton: React.FC<CtaButtonProps> = ({ onClick, showIcon = false, children }) => (
	<button
		onClick={onClick}
		className='bg-[#1A1A1A] text-white px-6 py-3 rounded-full md:rounded-[38px] font-inter font-medium shadow-md hover:scale-105 transition text-sm w-full md:w-auto'
	>
		<span className='flex flex-row gap-2 justify-center items-center'>
			<p className='my-auto'>{children}</p>
			{showIcon && (
				<div className='w-6 h-6 flex items-center justify-center'>
					<ArrowRightIcon />
				</div>
			)}
		</span>
	</button>
);

export default CtaButton;
