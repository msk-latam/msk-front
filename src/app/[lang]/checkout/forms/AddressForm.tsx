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

const AddressForm: React.FC<AddressFormProps> = ({ formData, handleChange, handleBlur, errors, touched }) => {
	const countryMap = {
		ar: 'Argentina',
		cl: 'Chile',
		mx: 'Mexico',
		uy: 'Uruguay',
		// Agrega más países según sea necesario
	};
	const normalizeCountryCode = (code: any) => code?.toLowerCase() || '';
	const getCountryName = (code: any) => {
		const normalizedCode = normalizeCountryCode(code);
		return countryMap[normalizedCode] || '';
	};

	const countryName = getCountryName(formData.country);
	const provinciasPorPais = {
		Chile: [
			'Arica y Parinacota',
			'Tarapacá',
			'Antofagasta',
			'Atacama',
			'Coquimbo',
			'Valparaíso',
			'Región Metropolitana de Santiago',
			"O'Higgins",
			'Maule',
			'Ñuble',
			'Biobío',
			'Araucanía',
			'Los Ríos',
			'Los Lagos',
			'Aysén',
			'Magallanes y la Antártica Chilena',
		],
		Argentina: [
			'Ciudad Autónoma de Buenos Aires',
			'Buenos Aires',
			'Catamarca',
			'Chaco',
			'Chubut',
			'Córdoba',
			'Corrientes',
			'Entre Ríos',
			'Formosa',
			'Jujuy',
			'La Pampa',
			'La Rioja',
			'Mendoza',
			'Misiones',
			'Neuquén',
			'Río Negro',
			'Salta',
			'San Juan',
			'San Luis',
			'Santa Cruz',
			'Santa Fe',
			'Santiago del Estero',
			'Tierra del Fuego',
			'Tucumán',
		],
		Mexico: [
			'Aguascalientes',
			'Baja California',
			'Baja California Sur',
			'Campeche',
			'Chiapas',
			'Chihuahua',
			'Ciudad de México',
			'Coahuila',
			'Colima',
			'Durango',
			'Guanajuato',
			'Guerrero',
			'Hidalgo',
			'Jalisco',
			'México',
			'Michoacán',
			'Morelos',
			'Nayarit',
			'Nuevo León',
			'Oaxaca',
			'Puebla',
			'Querétaro',
			'Quintana Roo',
			'San Luis Potosí',
			'Sinaloa',
			'Sonora',
			'Tabasco',
			'Tamaulipas',
			'Tlaxcala',
			'Veracruz',
			'Yucatán',
			'Zacatecas',
		],
		España: [
			'Andalucía',
			'Aragón',
			'Asturias',
			'Baleares',
			'Canarias',
			'Cantabria',
			'Castilla-La Mancha',
			'Castilla y León',
			'Cataluña',
			'Comunidad Valenciana',
			'Extremadura',
			'Galicia',
			'La Rioja',
			'Madrid',
			'Murcia',
			'Navarra',
			'País Vasco',
		],
		Colombia: [
			'Amazonas',
			'Antioquia',
			'Arauca',
			'Atlántico',
			'Bolívar',
			'Boyacá',
			'Caldas',
			'Caquetá',
			'Casanare',
			'Cauca',
			'Cesar',
			'Chocó',
			'Córdoba',
			'Cundinamarca',
			'Guainía',
			'Guaviare',
			'Huila',
			'La Guajira',
			'Magdalena',
			'Meta',
			'Nariño',
			'Norte de Santander',
			'Putumayo',
			'Quindío',
			'Risaralda',
			'San Andrés y Providencia',
			'Santander',
			'Sucre',
			'Tolima',
			'Valle del Cauca',
			'Vaupés',
			'Vichada',
		],
		Uruguay: [
			'Artigas',
			'Canelones',
			'Cerro Largo',
			'Colonia',
			'Durazno',
			'Flores',
			'Florida',
			'Lavalleja',
			'Maldonado',
			'Montevideo',
			'Paysandú',
			'Río Negro',
			'Rivera',
			'Rocha',
			'Salto',
			'San José',
			'Soriano',
			'Tacuarembó',
			'Treinta y Tres',
		],
		Peru: [
			'Amazonas',
			'Áncash',
			'Apurímac',
			'Arequipa',
			'Ayacucho',
			'Cajamarca',
			'Callao',
			'Cusco',
			'Huancavelica',
			'Huánuco',
			'Ica',
			'Junín',
			'La Libertad',
			'Lambayeque',
			'Lima',
			'Loreto',
			'Madre de Dios',
			'Moquegua',
			'Pasco',
			'Piura',
			'Puno',
			'San Martín',
			'Tacna',
			'Tumbes',
			'Ucayali',
		],
	};

	function obtenerProvincias(country) {
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
					value={formData.country}
					onChange={handleChange}
					onBlur={handleBlur}
					// disabled
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
							onChange={handleChange}
							onBlur={handleBlur}
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
					id='city'
					name='city'
					type='text'
					value={formData.city}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder='Ingrese ciudad'
					className='mt-1 block w-full border-transparent py-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.city && errors.city && <p className='text-red-500 text-sm mt-1'>{errors.city}</p>}
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
					className='mt-1 block w-full border-transparent py-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.address && errors.address && <p className='text-red-500 text-sm mt-1'>{errors.address}</p>}
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
					className='mt-1 block w-full border-transparent py-3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.postal_code && errors.postal_code && <p className='text-red-500 text-sm mt-1'>{errors.postal_code}</p>}
			</div>
		</div>
	);
};

export default AddressForm;
