import { DataContext } from '@/context/data/DataContext';
import React, { useContext, useState } from 'react';

interface UserFormProps {
	formData: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		profession: string;
		specialty: string;
		privacyPolicy: boolean;
		birthday: string;
	};
	errors: Record<string, string>;
	touched: Record<string, boolean>;
	handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const UserForm: React.FC<UserFormProps> = ({ formData, errors, touched, handleChange, handleBlur }) => {
	const {
		state: { allSpecialties: specialties, allSpecialtiesGroups: specialtiesGroup, allProfessions: professions },
	} = useContext(DataContext);
	const [selectedProfessionIndex, setSelectedProfessionIndex] = useState<number | null>(null);

	const handleProfessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedIndex = e.target.selectedIndex;
		setSelectedProfessionIndex(selectedIndex);
		handleChange(e);
	};
	const filteredSpecialties =
		selectedProfessionIndex !== null && specialtiesGroup[selectedProfessionIndex]
			? specialtiesGroup[selectedProfessionIndex].slice().sort((a: any, b: any) => a.name.localeCompare(b.name))
			: [];

	return (
		<form className='grid grid-cols-1 md:grid-cols-2 gap-4'>
			<div>
				<label htmlFor='firstName' className='block text-sm font-medium text-[#6474A6]'>
					Nombre
				</label>
				<input
					type='text'
					id='firstName'
					value={formData.firstName}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder='Ingresar Nombre'
					className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.firstName && errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName}</p>}
			</div>
			<div>
				<label htmlFor='lastName' className='block text-sm font-medium text-[#6474A6]'>
					Apellido
				</label>
				<input
					type='text'
					id='lastName'
					value={formData.lastName}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder='Ingresar Apellido'
					className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.lastName && errors.lastName && <p className='text-red-500 text-sm'>{errors.lastName}</p>}
			</div>
			<div>
				<label htmlFor='email' className='block text-sm font-medium text-[#6474A6]'>
					Correo electrónico
				</label>
				<input
					type='email'
					id='email'
					value={formData.email}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder='Ingresar Correo'
					className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.email && errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
			</div>
			<div>
				<label htmlFor='phone' className='block text-sm font-medium text-[#6474A6]'>
					Teléfono
				</label>
				<input
					type='text'
					id='phone'
					value={formData.phone}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder='Ingresar Teléfono'
					className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.phone && errors.phone && <p className='text-red-500 text-sm'>{errors.phone}</p>}
			</div>
			<div>
				<label htmlFor='birthday' className='block text-sm font-medium text-[#6474A6]'>
					Fecha de nacimiento
				</label>
				<input
					type='date'
					id='birthday'
					value={formData.birthday}
					onChange={(e) => {
						const selectedDate = new Date(e.target.value).toISOString().split('T')[0];
						handleChange({ target: { id: 'birthday', value: selectedDate } });
					}}
					// onChange={handleChange}
					onBlur={handleBlur}
					placeholder='seleccione una fecha'
					className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				/>
				{touched.birthday && errors.birthday && <p className='text-red-500 text-sm'>{errors.birthday}</p>}
			</div>
			<div>
				<label htmlFor='profession' className='block text-sm font-medium text-[#6474A6]'>
					Profesión
				</label>
				<select
					id='profession'
					value={formData.profession}
					onChange={handleProfessionChange}
					onBlur={handleBlur}
					className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				>
					<option value=''>Seleccione una profesión</option>
					{professions.map((profession: any) => (
						<option key={profession.id} value={profession.name}>
							{profession.name}
						</option>
					))}
				</select>
				{touched.profession && errors.profession && <p className='text-red-500 text-sm'>{errors.profession}</p>}
			</div>

			<div>
				<label htmlFor='specialty' className='block text-sm font-medium text-[#6474A6]'>
					Especialidad
				</label>
				<select
					id='specialty'
					value={formData.specialty}
					onChange={handleChange}
					onBlur={handleBlur}
					className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
				>
					<option value=''>Seleccione una especialidad</option>
					{filteredSpecialties.map((specialty: any) => (
						<option key={specialty.id} value={specialty.name}>
							{specialty.name}
						</option>
					))}
				</select>
				{touched.specialty && errors.specialty && <p className='text-red-500 text-sm'>{errors.specialty}</p>}
			</div>
		</form>
	);
};

export default UserForm;
