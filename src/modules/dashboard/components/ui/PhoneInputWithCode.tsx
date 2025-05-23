import phoneCode from '@/data/phoneCode'; // Import phoneCode
import React, { useCallback, useEffect, useState } from 'react';
import SelectAsReactSelect, {
	components,
	type MenuListProps,
	type Props as SelectProps,
	type SingleValue,
	type SingleValueProps,
} from 'react-select'; // Renamed import and added SingleValue
import Input from './Input'; // Assuming Input is in the same directory

// --- Transformed Country Code Options ---
const countryOptions = phoneCode.map((item) => ({
	value: item.code,
	label: item.name, // react-select uses this for searching
	code: item.code,
	flag: item.flag,
	name: item.name, // Keep original name for display
}));

// Helper to find the longest matching prefix - EXPORTED
export const findCodePrefix = (value: string): { code: string; number: string } | null => {
	// Sort by code string length, longest first, to handle cases like +1, +1-234
	const sortedOptions = [...countryOptions].sort((a, b) => b.value.length - a.value.length);
	for (const option of sortedOptions) {
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
			setInternalCode((prevCode) => (countryOptions.some((o) => o.value === prevCode) ? prevCode : defaultCode));
			setInternalNumber(value); // Treat the whole value as the number part
		}
	}, [value, defaultCode]);

	const triggerOnChange = useCallback(
		(code: string, number: string) => {
			onChange(`${code}${number}`);
		},
		[onChange],
	);

	// Type for react-select option
	type CountryOptionType = (typeof countryOptions)[0];

	const handleCodeChangeReactSelect = (selectedOption: SingleValue<CountryOptionType>) => {
		if (selectedOption) {
			const newCode = selectedOption.value;
			setInternalCode(newCode);
			triggerOnChange(newCode, internalNumber);
		}
	};

	const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newNumber = e.target.value;
		// Basic filtering: allow only digits (adjust if other chars are needed)
		const filteredNumber = newNumber.replace(/\D/g, '');
		setInternalNumber(filteredNumber);
		triggerOnChange(internalCode, filteredNumber);
	};

	const formatOptionLabel = ({ flag, name, code }: CountryOptionType) => (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<img src={flag} alt={name} style={{ width: '20px', marginRight: '8px' }} />
			<span>
				{name} ({code})
			</span>
		</div>
	);

	// Custom component for displaying the selected value
	const CustomSingleValue = (props: SingleValueProps<CountryOptionType>) => (
		<components.SingleValue {...props}>
			{props.data.code} {/* Display only the code */}
		</components.SingleValue>
	);

	// Custom MenuList component with a search input at the top
	const CustomMenuList = (props: MenuListProps<CountryOptionType, false>) => {
		const { children, selectProps } = props;
		const { onInputChange, inputValue } = selectProps as SelectProps<CountryOptionType, false>;

		return (
			<components.MenuList {...props}>
				<div
					style={{
						position: 'sticky',
						top: 0,
						zIndex: 10,
						backgroundColor: 'white',
						padding: '8px 12px',
						borderBottom: '1px solid #eee',
					}}
				>
					<input
						type='text'
						placeholder='Buscar país o código...'
						value={inputValue || ''}
						onChange={(e) => {
							if (onInputChange) {
								onInputChange(e.target.value, { action: 'input-change', prevInputValue: inputValue || '' });
							}
						}}
						onClick={(e) => e.stopPropagation()}
						style={{
							width: '100%',
							boxSizing: 'border-box',
							paddingTop: '4px',
							paddingBottom: '4px',
							paddingLeft: '8px',
							paddingRight: '8px',
							border: '1px solid #D1D5DB',
							borderRadius: '16px',
						}}
						autoFocus
					/>
				</div>
				{children}
			</components.MenuList>
		);
	};

	const currentSelectValue = countryOptions.find((option) => option.value === internalCode);
	const isMobile = typeof window !== 'undefined' && window.innerWidth < 1000;
	console.log(isMobile);

	return (
		<div className='flex flex-col '>
			<label htmlFor={`${id}-code`} className='block text-sm font-medium text-[#1a1a1a] mb-1.5'>
				{label}
			</label>
			<div className='flex flex-row items-end'>
				<SelectAsReactSelect
					{...({} as SelectProps<CountryOptionType, false>)}
					id={`${id}-code`}
					name={`${id}-code`}
					options={countryOptions}
					value={currentSelectValue}
					onChange={handleCodeChangeReactSelect}
					formatOptionLabel={formatOptionLabel}
					components={{
						Input: () => null,
						MenuList: CustomMenuList,
						SingleValue: CustomSingleValue,
						IndicatorSeparator: () => null,
					}}
					placeholder='Código'
					required={required}
					styles={{
						control: (base, state) => ({
							...base,
							width: '130px',
							borderTopRightRadius: 0,
							borderBottomRightRadius: 0,
							paddingTop: isMobile ? '6px' : '4px',
							paddingBottom: isMobile ? '6px' : '4px',
							paddingLeft: '8px',
							paddingRight: '8px',
							borderColor: state.isFocused ? '#9200AD' : '#d1d5db',
							borderRadius: '16px',
							boxShadow: state.isFocused ? '0 0 0 1px #9200AD' : 'none',
							'&:hover': {
								borderColor: state.isFocused ? '#9200AD' : '#9CA3AF',
							},
						}),
						input: (base) => ({
							...base,
							borderTopRightRadius: 0,
							borderBottomRightRadius: 0,
						}),
						menu: (base) => ({
							...base,
							width: '350px', // Set a wider width for the dropdown menu
							zIndex: 20, // Ensure menu appears above other elements if necessary
						}),
						placeholder: (base) => ({
							...base,
						}),
						singleValue: (base) => ({
							...base,
						}),
					}}
					classNamePrefix='react-select'
				/>
				<Input
					id={id}
					label=' '
					type='tel'
					name={id}
					value={internalNumber}
					onChange={handleNumberChange}
					placeholder='Ingresar teléfono'
					autoComplete='tel-national'
					required={required}
					className='w-full mb-0 border-l-0 rounded-l-none'
				/>
			</div>
		</div>
	);
};

export default PhoneInputWithCode;
