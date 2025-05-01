import React from 'react';

interface FormData {
	cardholderName: string;
	cardNumber: string;
	expiryMonth: string;
	expiryYear: string;
	cvv: string;
}

interface Errors {
	cardholderName?: string;
	cardNumber?: string;
	expiryMonth?: string;
	expiryYear?: string;
	cvv?: string;
}

interface Touched {
	cardholderName?: boolean;
	cardNumber?: boolean;
	expiryMonth?: boolean;
	expiryYear?: boolean;
	cvv?: boolean;
}

interface Props {
	formData: FormData;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
	errors: Errors;
	touched: Touched;
}

const CardDetailsForm: React.FC<Props> = ({ formData, handleChange, handleBlur, errors, touched }) => {
	return (
		<div className='space-y-6'>
			{/* Fila para el nombre y número de tarjeta */}
			<div className='flex flex-col gap-4 md:grid md:grid-cols-2'>
				<div>
					<label htmlFor='cardholderName' className='block text-sm font-medium text-[#1A1A1A]'>
						Nombre y apellido del titular
					</label>
					<input
						id='cardholderName'
						name='cardholderName'
						type='text'
						value={formData.cardholderName}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder='Ingrese nombre y apellido del titular'
						className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
					/>
					{touched.cardholderName && errors.cardholderName && (
						<p className='text-[#f5006d] text-sm'>{errors.cardholderName}</p>
					)}
				</div>

				<div>
					<label htmlFor='cardNumber' className='block text-sm font-medium text-[#1A1A1A]'>
						Número de tarjeta
					</label>
					<input
						id='cardNumber'
						name='cardNumber'
						type='text'
						value={formData.cardNumber}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder='Ingrese número de tarjeta'
						className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
					/>
					{touched.cardNumber && errors.cardNumber && <p className='text-[#f5006d] text-sm'>{errors.cardNumber}</p>}
				</div>
			</div>

			{/* Fila para la fecha de vencimiento y CVV */}
			<div className='flex flex-col gap-4 md:grid md:grid-cols-2'>
				<div className='flex flex-col'>
					<label htmlFor='expiryDate' className='block text-sm font-medium text-[#1A1A1A]'>
						Fecha de vencimiento (MM/AAAA)
					</label>
					<div className='flex gap-2 mt-2'>
						<input
							id='expiryMonth'
							name='expiryMonth'
							type='text'
							maxLength={2}
							value={formData.expiryMonth}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='MM'
							className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
						/>
						{touched.expiryMonth && errors.expiryMonth && <p className='text-[#f5006d] text-sm'>{errors.expiryMonth}</p>}
						<span className='text-[#6474A6] flex items-center'>/</span>
						<input
							id='expiryYear'
							name='expiryYear'
							type='text'
							maxLength={4}
							value={formData.expiryYear}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='AAAA'
							className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
						/>
						{touched.expiryYear && errors.expiryYear && <p className='text-[#f5006d] text-sm'>{errors.expiryYear}</p>}
					</div>
				</div>

				<div>
					<label htmlFor='cvv' className='block text-sm font-medium text-[#1A1A1A]'>
						Código de seguridad (CVV)
					</label>
					<input
						id='cvv'
						name='cvv'
						type='text'
						value={formData.cvv}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder='CVV'
						maxLength={4}
						className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
					/>
					{touched.cvv && errors.cvv && <p className='text-[#f5006d] text-sm'>{errors.cvv}</p>}
				</div>
			</div>
		</div>
	);
};

export default CardDetailsForm;
