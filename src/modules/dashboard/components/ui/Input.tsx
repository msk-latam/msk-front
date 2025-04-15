import React from 'react';

// Define the props for the Input component
// Extends standard HTML input attributes
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	id: string; // Make id required for label association
	label: string;
	// Add any other custom props if needed, e.g., error messages
	error?: string;
}

const Input: React.FC<InputProps> = ({
	id,
	label,
	type = 'text', // Default type to text
	error,
	className = '', // Allow passing additional classes
	...props // Spread the rest of the standard input props
}) => {
	// Base input classes
	const baseClasses =
		'w-full px-4 py-3 border border-gray-300 rounded-[16px] focus:outline-none focus:ring-1 focus:ring-[#9200AD] focus:border-[#9200AD] sm:text-sm placeholder-gray-400';

	// Add error state classes if error prop is provided
	const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300';

	return (
		<div className='w-full'>
			<label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1.5'>
				{label}
			</label>
			<input
				type={type}
				id={id}
				className={`${baseClasses} ${errorClasses} ${className}`}
				{...props} // Spread other props like name, value, onChange, placeholder, required, etc.
			/>
			{/* Optional: Display error message */}
			{error && <p className='mt-1 text-xs text-red-600'>{error}</p>}
		</div>
	);
};

export default Input;
