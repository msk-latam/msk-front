import React, { FC } from 'react';

export interface CheckboxProps {
	label?: string;
	inputClass?: string;
	subLabel?: string;
	name: string;
	checked?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<CheckboxProps> = ({ subLabel = '', label = '', inputClass = '', name, checked, onChange }) => {
	// ID for linking label and input
	const inputId = `checkbox-${name}`;

	return (
		// Use label tag as the main container for better accessibility
		<label htmlFor={inputId} className='flex items-center cursor-pointer'>
			{/* Hidden actual checkbox */}
			<input
				id={inputId}
				name={name}
				type='checkbox'
				className={`sr-only ${inputClass}`} // Hide default checkbox but keep it functional
				checked={checked}
				onChange={onChange}
			/>
			{/* Custom Checkbox Visual */}
			<div
				className={`w-4 h-4 border-[1.5px] rounded-[5px] flex-shrink-0 mr-3 flex items-center justify-center transition-colors ${
					checked ? 'border-[#9200AD] bg-white' : 'border-gray-400 bg-white' // Purple border when checked, gray otherwise
				}`}
			>
				{/* Checkmark SVG - only shown when checked */}
				{checked && (
					<svg width='10' height='8' viewBox='0 0 12 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M10.6668 1.5L4.25016 7.91667L1.3335 5'
							stroke='#9200AD' // Purple stroke for checkmark
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				)}
			</div>
			{/* Label Text */}
			{label && (
				<div className='text-sm'>
					{/* Adjust text color/weight based on checked state if needed, or keep consistent */}
					<span className={` ${checked ? 'text-[#1A1A1A] font-medium' : 'text-[#4F5D89]'}`}>{label}</span>
					{subLabel && <p className='text-gray-500 text-xs mt-1'>{subLabel}</p>}
				</div>
			)}
		</label>
	);
};

export default Checkbox;
