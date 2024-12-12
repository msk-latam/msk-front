import React from 'react';

interface DocumentDetailsFormProps {
	formData: {
		idType: string;
		documentNumber: string;
	};
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	handleBlur: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
	errors: {
		idType?: string;
		documentNumber?: string;
	};
	touched: {
		idType?: boolean;
		documentNumber?: boolean;
	};
}

const DocumentDetailsForm: React.FC<DocumentDetailsFormProps> = ({
	formData,
	handleChange,
	handleBlur,
	errors,
	touched,
}) => {
	return (
		<div className='grid grid-cols-2 gap-4'>
			{/* Tipo de documento */}
			<div>
				<label htmlFor='idType' className='block text-sm font-medium text-[#6474A6]'>
					Tipo de documento
				</label>
				<select
					id='idType'
					name='idType'
					value={formData.idType}
					onChange={handleChange}
					onBlur={handleBlur}
					className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				>
					<option value='' disabled>
						Seleccione tipo de documento
					</option>
					<option value='DNI'>DNI</option>
					<option value='RUT'>RUT</option>
					<option value='Pasaporte'>Pasaporte</option>
				</select>
				{touched.idType && errors.idType && <p className='text-red-500 text-sm'>{errors.idType}</p>}
			</div>

			{/* Número de documento */}
			<div>
				<label htmlFor='documentNumber' className='block text-sm font-medium text-[#6474A6]'>
					Número de documento
				</label>
				<input
					id='documentNumber'
					name='documentNumber'
					type='text'
					value={formData.documentNumber}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder='Ingrese número de documento'
					className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.documentNumber && errors.documentNumber && <p className='text-red-500 text-sm'>{errors.documentNumber}</p>}
			</div>
		</div>
	);
};

export default DocumentDetailsForm;
