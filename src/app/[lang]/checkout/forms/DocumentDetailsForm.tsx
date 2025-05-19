import React from 'react';

interface DocumentDetailsFormProps {
	formData: {
		type_doc: string;
		identification: string;
	};
	handleChange2: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
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
	handleChange2,
	handleBlur,
	errors,
	touched,
	country,
}) => {
	const documentsByCountry: any = {
		Argentina: [
			{ value: 'DNI', label: 'DNI' },
			{ value: 'CUIT', label: 'CUIT' },
			{ value: 'CUIL', label: 'CUIL' },
			{ value: 'CDI', label: 'CDI' },
			{ value: 'LE', label: 'Libreta de enrolamiento' },
			{ value: 'LC', label: 'Libreta cívica' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		Bolivia: [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		Chile: [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'RUT', label: 'RUT' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
			{ value: 'DNI', label: 'DNI' },
		],
		Colombia: [
			{ value: 'Cédula de ciudadanía', label: 'Cédula de ciudadanía' },
			{ value: 'Cédula de extranjero', label: 'Cédula de extranjero' },
			{ value: 'NIT', label: 'NIT' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		'Costa Rica': [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		Ecuador: [
			{ value: '04 - RUC', label: 'RUC' },
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: '06 - PASAPORTE', label: 'Pasaporte' },
		],
		'El Salvador': [
			{ value: 'DUI', label: 'DUI' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		España: [
			{ value: 'DNI', label: 'DNI' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
			{ value: 'TIE', label: 'TIE' },
			{ value: 'NIE', label: 'NIE' },
		],
		Guatemala: [
			{ value: 'DNI', label: 'DNI' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		Honduras: [
			{ value: 'DNI', label: 'DNI' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		México: [
			{ value: 'RFC', label: 'RFC' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		Nicaragua: [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		Panamá: [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		Paraguay: [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		Perú: [
			{ value: 'DNI', label: 'DNI' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
			{ value: 'Cédula de extranjero', label: 'Cédula de extranjero' },
			{ value: 'CURP', label: 'CURP' },
			{ value: 'RUC', label: 'RUC' },
		],
		'Republica Dominicana': [
			{ value: 'DNI', label: 'DNI' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
		Uruguay: [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
			{ value: 'RUT', label: 'RUT' },
		],
		Venezuela: [
			{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
			{ value: 'Pasaporte', label: 'Pasaporte' },
		],
	};

	const documents = documentsByCountry[country] || [];

	return (
		<div className='grid md:grid-cols-2 gap-4'>
			{/* Tipo de documento */}
			<div>
				<label htmlFor='type_doc' className='block text-sm font-medium text-[#1A1A1A]'>
					Tipo de documento
				</label>
				<select
					id='type_doc'
					name='type_doc'
					value={formData.type_doc}
					onChange={handleChange2}
					onBlur={handleBlur}
					className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
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
				{touched.type_doc && errors.type_doc && <p className='mt-1 text-sm text-[#f5006d]'>{errors.type_doc}</p>}
			</div>

			{/* Número de documento */}
			<div>
				<label htmlFor='identification' className='block text-sm font-medium text-[#1A1A1A]'>
					Número de documento
				</label>
				<input
					id='identification'
					name='identification'
					type='text'
					value={formData.identification}
					onChange={handleChange2}
					onBlur={handleBlur}
					placeholder='Ingrese número de documento'
					className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
				/>
				{touched.identification && errors.identification && (
					<p className='mt-1 text-sm text-[#f5006d]'>{errors.identification}</p>
				)}
			</div>
		</div>
	);
};

export default DocumentDetailsForm;
