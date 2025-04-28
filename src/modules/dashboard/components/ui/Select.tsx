import React from 'react';

// Define the structure for each option
interface SelectOption {
	value: string | number;
	label: string;
}

// Define the props for the Select component
// Extends standard HTML select attributes
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	id: string; // Make id required for label association
	label: string;
	options: SelectOption[]; // Array of options to display
	placeholder?: string; // Optional placeholder text
	error?: string; // Optional error message
}

const Select: React.FC<SelectProps> = ({
	id,
	label,
	options,
	placeholder,
	error,
	className = '', // Allow passing additional classes
	value, // Explicitly handle value for controlled component behavior
	...props // Spread the rest of the standard select props (name, onChange, required, etc.)
}) => {
	// Base select classes - adjusted padding for arrow, remove default appearance
	const baseClasses =
		'w-full pl-4 pr-10 py-3 border border-gray-300 rounded-[16px] bg-white focus:outline-none focus:ring-1 focus:ring-[#9200AD] focus:border-[#9200AD] sm:text-sm appearance-none'; // Adjusted padding-right for arrow

	// Add placeholder text color if no value is selected
	const placeholderColor = value === undefined || value === null || value === '' ? 'text-gray-400' : 'text-gray-900';

	// Add error state classes if error prop is provided
	const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300';

	// Custom arrow icon
	const customArrow = (
		<svg
			className='absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none'
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 20 20'
			fill='currentColor'
			aria-hidden='true'
		>
			<path
				fillRule='evenodd'
				d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
				clipRule='evenodd'
			/>
		</svg>
	);

	// Determine the value to pass to the select, ensuring it's a string or number
	const selectValue = value ?? '';

	return (
		<div className='w-full'>
			<label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1.5'>
				{label}
			</label>
			<div className='relative'>
				<select
					id={id}
					className={`${baseClasses} ${placeholderColor} ${errorClasses} ${className}`}
					value={selectValue} // Use the nullish coalescing operator
					{...props} // Spread other props like name, onChange, required
				>
					{/* Placeholder Option */}
					{placeholder && (
						<option value='' disabled={selectValue !== ''} hidden={selectValue !== ''}>
							{placeholder}
						</option>
					)}
					{/* Ensure an empty option exists if no placeholder and value can be empty */}
					{!placeholder && <option value='' disabled hidden></option>}

					{/* Actual Options */}
					{options.map((option) => (
						<option key={option.value} value={option.value} className='text-gray-900'>
							{option.label}
						</option>
					))}
				</select>
				{/* Add custom arrow overlay */}
			</div>
			{/* Optional: Display error message */}
			{error && <p className='mt-1 text-xs text-red-600'>{error}</p>}
		</div>
	);
};

export default Select;
