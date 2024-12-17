import React from 'react';

interface DocumentDetailsFormProps {
	formData: {
		type_doc: string;
		identification: string;
	};
	handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	handleBlur: (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
	errors: {
		type_doc?: string;
		identification?: string;
	};
	touched: {
		type_doc?: boolean;
		identification?: boolean;
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
				<label htmlFor='type_doc' className='block text-sm font-medium text-[#6474A6]'>
					Tipo de documento
				</label>
				<select
					id='type_doc'
					name='type_doc'
					value={formData.type_doc}
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
				{touched.type_doc && errors.type_doc && <p className='text-red-500 text-sm'>{errors.type_doc}</p>}
			</div>

			{/* Número de documento */}
			<div>
				<label htmlFor='identification' className='block text-sm font-medium text-[#6474A6]'>
					Número de documento
				</label>
				<input
					id='identification'
					name='identification'
					type='text'
					value={formData.identification}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder='Ingrese número de documento'
					className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.identification && errors.identification && <p className='text-red-500 text-sm'>{errors.identification}</p>}
			</div>
		</div>
	);
};

export default DocumentDetailsForm;
