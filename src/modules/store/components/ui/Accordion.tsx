import ArrowRightIcon from '@/store/assets/icons/ArrowRightIcon';
import { FC, ReactNode } from 'react';

// Define paths for icons if they exist, otherwise use placeholders or SVGs directly
// For now, let's use simple text placeholders

interface Props {
	title: string;
	children: ReactNode;
	isOpen: boolean; // New prop: Is this specific accordion instance open?
	onToggle: () => void; // New prop: Function to call when header is clicked
	forModules?: boolean; // Keep this prop, might be useful for styling variations
}

const Accordion: FC<Props> = ({
	title,
	children,
	isOpen,
	onToggle,
	forModules = true, // Default can be adjusted
}) => {
	// Basic styling, adjust with Tailwind classes as needed
	return (
		<div className=''>
			<div className='cursor-pointer flex items-center justify-between' onClick={onToggle}>
				<div className='flex items-center text-left'>
					{/* Placeholder for styling based on forModules */}
					{forModules ? <h3 className='font-medium'>{title}</h3> : <span className='text-sm font-semibold'>{title}</span>}
				</div>
				{/* Icon display */}
				<div className='w-5 h-5 flex items-center justify-center text-gray-500'>
					{/* You might replace this with an actual SVG icon component later */}
					<span
						className={`text-lg font-bold text-black ${
							isOpen ? 'rotate-90' : 'rotate-0'
						} transition-transform duration-300 ease-in-out`}
					>
						<ArrowRightIcon />
					</span>
				</div>
			</div>
			{/* Content Area - basic transition example */}
			<div
				className={`transition-all duration-300 ease-in-out overflow-hidden ${
					isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0' // Use max-h for transition
				}`}
			>
				{/* Render children only when open to avoid potential layout shifts or performance issues with many closed items */}
				{isOpen && <div className='pt-3'>{children}</div>}
			</div>
		</div>
	);
};

export default Accordion;
