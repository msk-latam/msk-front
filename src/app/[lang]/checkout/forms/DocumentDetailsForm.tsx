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
	country: string | undefined;
}

const DocumentDetailsForm: React.FC<DocumentDetailsFormProps> = ({
	formData,
	handleChange,
	handleBlur,
	errors,
	touched,
	country,
}) => {
	const documentsByCountry: any = {
		ar: [
			{ value: 'CUIT', label: 'CUIT' },
			{ value: 'CUIL', label: 'CUIL' },
			{ value: 'CDI', label: 'CDI' },
			{ value: 'LE', label: 'Libreta de enrolamiento' },
			{ value: 'LC', label: 'Libreta cívica' },
			{ value: 'DNI', label: 'DNI' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		bo: [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		cl: [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'RUT', label: 'RUT' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		co: [
			{ value: 'Cédula de ciudadanía', label: 'Cédula de ciudadanía' },
			{ value: 'Cédula de extranjero', label: 'Cédula de extranjero' },
			{ value: 'NIT', label: 'NIT' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		cr: [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		ec: [
			{ value: '04 - RUC', label: 'RUC' },
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: '06 - PASAPORTE', label: 'Pasaporte' },
		],
		sv: [
			{ value: 'DUI', label: 'DUI' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		es: [
			{ value: 'DNI', label: 'DNI' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
			{ value: 'TIE', label: 'TIE' },
			{ value: 'NIE', label: 'NIE' },
		],
		gt: [
			{ value: 'DNI', label: 'DNI' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		hn: [
			{ value: 'DNI', label: 'DNI' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		mx: [
			{ value: 'RFC', label: 'RFC' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		ni: [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		pa: [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		py: [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		pe: [
			{ value: 'DNI', label: 'DNI' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
			{ value: 'Cédula de extranjero', label: 'Cédula de extranjero' },
			{ value: 'CURP', label: 'CURP' },
			{ value: 'RUC', label: 'RUC' },
		],
		do: [
			{ value: 'DNI', label: 'DNI' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		uy: [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
			{ value: 'RUT', label: 'RUT' },
		],
		ve: [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
	};

	const documents = documentsByCountry[country] || [];

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
					className='mt-1 block w-full border-transparent py-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				>
					<option value='' disabled>
						Seleccione tipo de documento
					</option>
					{documents.map((doc: any) => (
						<option key={doc.value} value={doc.value}>
							{doc.label}
						</option>
					))}
				</select>
				{touched.type_doc && errors.type_doc && <p className='text-red-500 text-sm mt-1'>{errors.type_doc}</p>}
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
					className='mt-1 block w-full border-transparent py-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.identification && errors.identification && (
					<p className='text-red-500 text-sm mt-1'>{errors.identification}</p>
				)}
			</div>
		</div>
	);
};

export default DocumentDetailsForm;
