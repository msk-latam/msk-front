import React, { useCallback, useEffect, useState } from 'react';
import Input from './Input'; // Assuming Input is in the same directory
import Select from './Select'; // Assuming Select is in the same directory

// --- Country Code Options (Consider moving to a shared constants file) ---
const phoneCodeOptions = [
	{ value: '+54', label: 'AR (+54)' },
	{ value: '+52', label: 'MX (+52)' },
	{ value: '+34', label: 'ES (+34)' },
	{ value: '+57', label: 'CO (+57)' },
	{ value: '+1', label: 'US (+1)' },
	// Add more relevant country codes
];

// Helper to find the longest matching prefix - EXPORTED
export const findCodePrefix = (value: string): { code: string; number: string } | null => {
	for (const option of phoneCodeOptions.sort((a, b) => b.value.length - a.value.length)) {
		// Check longer codes first
		if (value.startsWith(option.value)) {
			return { code: option.value, number: value.substring(option.value.length) };
		}
	}
	return null;
};

interface PhoneInputWithCodeProps {
	id: string;
	label: string;
	value: string; // Combined value (e.g., +5411...) or just number
	onChange: (value: string) => void; // Callback with combined value
	defaultCode?: string;
	required?: boolean;
}

const PhoneInputWithCode: React.FC<PhoneInputWithCodeProps> = ({
	id,
	label,
	value,
	onChange,
	defaultCode = '+54', // Default Argentine code
	required,
}) => {
	const [internalCode, setInternalCode] = useState<string>(defaultCode);
	const [internalNumber, setInternalNumber] = useState<string>('');

	// Parse initial value or update when prop changes
	useEffect(() => {
		const parsed = findCodePrefix(value);
		if (parsed) {
			setInternalCode(parsed.code);
			setInternalNumber(parsed.number);
		} else {
			// If no prefix matches, assume the value is just the number
			// and use the default code (or the last used code if appropriate)
			setInternalCode((prevCode) => (phoneCodeOptions.some((o) => o.value === prevCode) ? prevCode : defaultCode));
			setInternalNumber(value); // Treat the whole value as the number part
		}
	}, [value, defaultCode]);

	const triggerOnChange = useCallback(
		(code: string, number: string) => {
			onChange(`${code}${number}`);
		},
		[onChange],
	);

	const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newCode = e.target.value;
		setInternalCode(newCode);
		triggerOnChange(newCode, internalNumber);
	};

	const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newNumber = e.target.value;
		// Basic filtering: allow only digits (adjust if other chars are needed)
		const filteredNumber = newNumber.replace(/\D/g, '');
		setInternalNumber(filteredNumber);
		triggerOnChange(internalCode, filteredNumber);
	};

	return (
		<div className='grid grid-cols-[auto_1fr]  items-end'>
			<Select
				id={`${id}-code`}
				label={label} // Label on the code part
				name={`${id}-code`} // Unique name for the select element
				options={phoneCodeOptions}
				value={internalCode}
				onChange={handleCodeChange}
				placeholder='Código'
				required={required}
				className='mb-0 mr-2 border-r-0 rounded-r-none' // Adjust as needed
			/>
			<Input
				id={id} // Main ID for the phone number input
				label=' ' // Empty label to align visually
				type='tel'
				name={id} // Unique name for the input element
				value={internalNumber}
				onChange={handleNumberChange}
				placeholder='Ingresar teléfono'
				autoComplete='tel-national'
				required={required}
				className='mb-0 border-l-0 rounded-l-none' // Adjust as needed
			/>
		</div>
	);
};

export default PhoneInputWithCode;
