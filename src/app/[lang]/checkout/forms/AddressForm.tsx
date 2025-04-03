import React from 'react';
import { countryToName } from '../utils/utils';
import { provinciasPorPais } from '../utils/provincias';

interface AddressFormProps {
	formData: {
		country: string;
		state: string;
		city: string;
		address: string;
		postal_code: string;
	};
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleChange2: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
	errors: {
		country?: string;
		state?: string;
		city?: string;
		address?: string;
		postal_code?: string;
	};
	touched: {
		country?: boolean;
		state?: boolean;
		city?: boolean;
		address?: boolean;
		postal_code?: boolean;
	};
}

const AddressForm: React.FC<AddressFormProps> = ({ formData, handleChange, handleChange2, handleBlur, errors, touched }) => {
	const normalizeCountryCode = (code: any) => code?.toLowerCase() || '';
	const getCountryName = (code: any) => {
		const normalizedCode = normalizeCountryCode(code);
		return countryToName[normalizedCode] || '';
	};
	const countryName = getCountryName(formData.country);

	function obtenerProvincias(country: string) {
		return provinciasPorPais[country] || [];
	}

	const provincias = obtenerProvincias(countryName);

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
					value={countryName}
					onChange={handleChange2}
					onBlur={handleBlur}
					disabled
					placeholder='Ingrese país'
					className='mt-1 block w-full border-transparent py-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.country && errors.country && <p className='text-red-500 text-sm mt-1'>{errors.country}</p>}
			</div>

			{/* Estado */}
			<div>
				<label htmlFor='state' className='block text-sm font-medium text-[#6474A6]'>
					{countryName === 'Chile' ? 'Provincia' : 'Estado'}
					{/* {formData.country === 'Chile' ? 'Provincia' : 'Estado'} */}
				</label>
				{
					formData.country && (
						<select
							id='state'
							name='state'
							value={formData.state}
							onChange={handleChange2}
							// onBlur={handleBlur}
							className='mt-1 block w-full border-transparent py-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
						>
							<option value=''>Seleccione una provincia</option>
							{provincias.map((provincia: any) => (
								<option key={provincia} value={provincia}>
									{provincia}
								</option>
							))}
						</select>
					)
					// (
					// 	<input
					// 		id='state'
					// 		name='state'
					// 		type='text'
					// 		value={formData.state}
					// 		onChange={handleChange}
					// 		onBlur={handleBlur}
					// 		placeholder='Ingrese estado'
					// 		className='mt-1 block w-full border-transparent py-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
					// 	/>
					// )
				}
				{touched.state && errors.state && <p className='text-red-500 text-sm mt-1'>{errors.state}</p>}
			</div>

			{/* Ciudad */}
			<div>
				<label htmlFor='city' className='block text-sm font-medium text-[#6474A6]'>
					Ciudad
				</label>
				<input
					required
					id='city'
					name='city'
					type='text'
					value={formData.city}
					onChange={handleChange2}
					onBlur={handleBlur}
					placeholder='Ingrese ciudad'
					className='mt-1 block w-full border-transparent py-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.city && errors.city && <p className='text-red-500 text-sm mt-1'>{errors.city}</p>}
			</div>

			<div>
				{/* Código postal */}
				<div>
					<label htmlFor='postal_code' className='block text-sm font-medium text-[#6474A6]'>
						Código postal
					</label>
					<input
						required
						id='postal_code'
						name='postal_code'
						type='text'
						value={formData.postal_code}
						onChange={handleChange2}
						onBlur={handleBlur}
						placeholder='Ingrese código postal'
						className='mt-1 block w-full border-transparent py-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
					/>
					{touched.postal_code && errors.postal_code && <p className='text-red-500 text-sm mt-1'>{errors.postal_code}</p>}
				</div>
			</div>
			{/* Dirección */}
			<div className='col-span-2'>
				<label htmlFor='address' className='block text-sm font-medium text-[#6474A6]'>
					Dirección
				</label>
				<input
					id='address'
					name='address'
					type='text'
					value={formData.address}
					onChange={handleChange2}
					onBlur={handleBlur}
					placeholder='Ingrese dirección'
					className='mt-1 block w-full border-transparent py-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.address && errors.address && <p className='text-red-500 text-sm mt-1'>{errors.address}</p>}
			</div>
		</div>
	);
};

export default AddressForm;
