import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-feather'; // Or your preferred icon library

// Define the props, extending standard input attributes but forcing type to password initially
interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
	id: string;
	label: string;
	containerClassName?: string; // Optional class for the outer container
	error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
	id,
	label,
	error,
	className = '',
	containerClassName = '',
	...props // Spread the rest of the standard input props (name, value, onChange, etc.)
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	// Base input classes (similar to Input, but might need padding adjustment for the icon)
	const baseClasses =
		'w-full pl-4 pr-10 py-3 border rounded-[16px] focus:outline-none focus:ring-1 focus:ring-[#9200AD] focus:border-[#9200AD] sm:text-sm placeholder-gray-400';

	// Add error state classes
	const errorClasses = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300';

	return (
		<div className={`w-full ${containerClassName}`}>
			<label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1.5'>
				{label}
			</label>
			<div className='relative'>
				<input
					type={showPassword ? 'text' : 'password'} // Dynamically change type
					id={id}
					className={`${baseClasses} ${errorClasses} ${className}`}
					{...props}
				/>
				<button
					type='button'
					onClick={togglePasswordVisibility}
					className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none'
					aria-label={showPassword ? 'Hide password' : 'Show password'}
				>
					{showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
				</button>
			</div>
			{/* Optional: Display error message */}
			{error && <p className='mt-1 text-xs text-red-600'>{error}</p>}
		</div>
	);
};

export default PasswordInput;
