import React from 'react';

interface AddressFormProps {
	formData: {
		country: string;
		state: string;
		city: string;
		address: string;
		postal_code: string;
	};
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
	errors: {
		country?: string;
		state?: string;
		city?: string;
		address?: string;
		postalCode?: string;
	};
	touched: {
		country?: boolean;
		state?: boolean;
		city?: boolean;
		address?: boolean;
		postal_code?: boolean;
	};
}

const AddressForm: React.FC<AddressFormProps> = ({ formData, handleChange, handleBlur, errors, touched }) => {
	return (
		<div className='grid grid-cols-2 gap-4'>
			{/* País */}
			<div>
				<label htmlFor='country' className='block text-sm font-medium text-[#6474A6]'>
					País
				</label>
				<input
					id='country'
					name='country'
					type='text'
					value={formData.country}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder='Ingrese país'
					className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.country && errors.country && <p className='text-red-500 text-sm'>{errors.country}</p>}
			</div>

			{/* Estado */}
			<div>
				<label htmlFor='state' className='block text-sm font-medium text-[#6474A6]'>
					Estado
				</label>
				<input
					id='state'
					name='state'
					type='text'
					value={formData.state}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder='Ingrese estado'
					className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.state && errors.state && <p className='text-red-500 text-sm'>{errors.state}</p>}
			</div>

			{/* Ciudad */}
			<div>
				<label htmlFor='city' className='block text-sm font-medium text-[#6474A6]'>
					Ciudad
				</label>
				<input
					id='city'
					name='city'
					type='text'
					value={formData.city}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder='Ingrese ciudad'
					className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.city && errors.city && <p className='text-red-500 text-sm'>{errors.city}</p>}
			</div>

			{/* Dirección */}
			<div>
				<label htmlFor='address' className='block text-sm font-medium text-[#6474A6]'>
					Dirección
				</label>
				<input
					id='address'
					name='address'
					type='text'
					value={formData.address}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder='Ingrese dirección'
					className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.address && errors.address && <p className='text-red-500 text-sm'>{errors.address}</p>}
			</div>

			{/* Código postal */}
			<div className='col-span-2'>
				<label htmlFor='postal_code' className='block text-sm font-medium text-[#6474A6]'>
					Código postal
				</label>
				<input
					id='postal_code'
					name='postal_code'
					type='text'
					value={formData.postal_code}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder='Ingrese código postal'
					className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.postal_code && errors.postalCode && <p className='text-red-500 text-sm'>{errors.postalCode}</p>}
			</div>
		</div>
	);
};

export default AddressForm;
