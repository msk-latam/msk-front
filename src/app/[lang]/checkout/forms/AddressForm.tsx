import React, { useEffect, useState } from 'react';
import { countries, countryToName } from '../utils/utils';
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

	const provincias = obtenerProvincias(
		(formData.country && formData.country.length > 2 ? formData.country : countryName) || 'Argentina',
	);

	return (
		<div className='grid grid-cols-2 gap-4'>
			{/* País */}
			<div>
				<label htmlFor='country' className='block text-sm font-medium text-[#1A1A1A]'>
					País
				</label>
				<select
					id='country'
					name='country'
					value={(formData.country && formData.country.length > 2 ? formData.country : countryName) || 'Argentina'}
					onChange={(e) => handleChange2(e)}
					onBlur={handleBlur}
					className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
				>
					<option value='' disabled>
						Seleccione un país
					</option>
					{countries.map((country) => (
						<option key={country} value={country}>
							{country}
						</option>
					))}
				</select>
				{touched.country && errors.country && <p className='mt-1 text-sm text-[#f5006d]'>{errors.country}</p>}
			</div>
			{/* <div>
				<label htmlFor='country' className='block text-sm font-medium text-[#1A1A1A]'>
					País
				</label>
				<input
					id='country'
					name='country'
					type='text'
					value={countryName}
					onChange={handleChange2}
					onBlur={handleBlur}
					// disabled
					placeholder='Ingrese país'
					className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
				/>
				{touched.country && errors.country && <p className='mt-1 text-sm text-[#f5006d]'>{errors.country}</p>}
			</div> */}

			{/* Estado */}
			<div>
				<label htmlFor='state' className='block text-sm font-medium text-[#1A1A1A]'>
					{countryName === 'Chile' ? 'Provincia' : 'Estado'}
					{/* {formData.country === 'Chile' ? 'Provincia' : 'Estado'} */}
				</label>
				{formData.country && (
					<select
						id='state'
						name='state'
						value={formData.state}
						onChange={handleChange2}
						onBlur={handleBlur}
						className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
					>
						<option value='' disabled>
							Seleccione una provincia
						</option>
						{provincias.map((provincia: any) => (
							<option key={provincia} value={provincia}>
								{provincia}
							</option>
						))}
					</select>
				)}
				{touched.state && errors.state && <p className='mt-1 text-sm text-[#f5006d]'>{errors.state}</p>}
			</div>

			{/* Ciudad */}
			<div>
				<label htmlFor='city' className='block text-sm font-medium text-[#1A1A1A]'>
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
					className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
				/>
				{touched.city && errors.city && <p className='mt-1 text-sm text-[#f5006d]'>{errors.city}</p>}
			</div>

			<div>
				{/* Código postal */}
				<div>
					<label htmlFor='postal_code' className='block text-sm font-medium text-[#1A1A1A]'>
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
						className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
					/>
					{touched.postal_code && errors.postal_code && <p className='mt-1 text-sm text-[#f5006d]'>{errors.postal_code}</p>}
				</div>
			</div>
			{/* Dirección */}
			<div className='col-span-2'>
				<label htmlFor='address' className='block text-sm font-medium text-[#1A1A1A]'>
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
					className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
				/>
				{touched.address && errors.address && <p className='mt-1 text-sm text-[#f5006d]'>{errors.address}</p>}
			</div>
		</div>
	);
};

export default AddressForm;
