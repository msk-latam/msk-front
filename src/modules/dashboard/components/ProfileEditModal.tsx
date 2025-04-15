import Modal from '@/modules/dashboard/components/ui/Modal';
import React, { useEffect, useState } from 'react';
// Import the new UI components
import Input from './ui/Input';
import PasswordInput from './ui/PasswordInput';
import PhoneInputWithCode, { findCodePrefix } from './ui/PhoneInputWithCode'; // Import the helper
import Select from './ui/Select';
// Import types from the service
import { UserData, UserDetail } from '@/lib/localStorageService/userDataService';

interface ProfileEditModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (updatedData: Partial<UserData>) => void;
	initialData: UserData | null;
}

// --- Dummy Data for Selects (Replace with actual data source) ---
const professionOptions = [
	{ value: 'medico', label: 'Médico/a' },
	{ value: 'enfermero', label: 'Enfermero/a' },
	{ value: 'farmaceutico', label: 'Farmacéutico/a' },
	{ value: 'otro', label: 'Otro' },
];

const specialtyOptions = [
	{ value: 'cardiologia', label: 'Cardiología' },
	{ value: 'dermatologia', label: 'Dermatología' },
	{ value: 'endocrinologia', label: 'Endocrinología' },
	{ value: 'ginecologia', label: 'Ginecología' },
	{ value: 'nutricion', label: 'Nutrición' },
	// Add all specialties from your service/config
];

const countryOptions = [
	{ value: 'ar', label: 'Argentina' },
	{ value: 'mx', label: 'México' },
	{ value: 'es', label: 'España' },
	{ value: 'co', label: 'Colombia' },
	// Add more countries
];

const medicalCollegeOptions = [
	{ value: 'yes', label: 'Sí' },
	{ value: 'no', label: 'No' },
];

// --- End Dummy Data ---

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
	const [formData, setFormData] = useState<Partial<UserData>>({});
	const [password, setPassword] = useState<string>('');

	useEffect(() => {
		if (initialData) {
			// Extract email from details array if it exists there
			const initialEmail = initialData.details?.find((d: UserDetail) => d.label === 'Email')?.value || '';
			// Construct the initial combined phone value
			const initialPhoneCode = initialData.phoneCode || '+54';
			const initialPhone = initialData.phone || '';
			const combinedInitialPhone = `${initialPhoneCode}${initialPhone}`;

			setFormData({
				email: initialEmail,
				firstName: initialData.firstName || '',
				lastName: initialData.lastName || '',
				country: initialData.country || '',
				phoneCode: initialPhoneCode, // Keep separate phoneCode if needed elsewhere, otherwise could remove
				phone: initialPhone, // Keep separate phone if needed elsewhere, otherwise could remove
				profesion: initialData.profesion || '',
				specialty: initialData.specialty || '',
				workplace: initialData.workplace || '',
				workArea: initialData.workArea || '',
				belongsToMedicalCollege: initialData.belongsToMedicalCollege ?? null,
				medicalCollegeName: initialData.medicalCollegeName || '',
				fullPhoneNumber: combinedInitialPhone,
			});
			setPassword(''); // Always clear password field on open
		} else {
			setFormData({});
			setPassword('');
		}
	}, [initialData, isOpen]);

	// Updated handler for combined phone input and other regular inputs
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev: Partial<UserData>) => ({ ...prev, [name]: value }));
	};

	// Handler for password input
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	// Handler for most select inputs (excluding phone code which is handled internally now)
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		if (name === 'belongsToMedicalCollege') {
			setFormData((prev: Partial<UserData>) => ({
				...prev,
				[name]: value === 'yes' ? true : value === 'no' ? false : null,
			}));
		} else if (name === 'phoneCode') {
			// This case might no longer be needed if PhoneInputWithCode handles it
			// However, keeping it might be useful if you still store phoneCode separately
			setFormData((prev: Partial<UserData>) => ({ ...prev, [name]: value }));
		} else {
			setFormData((prev: Partial<UserData>) => ({ ...prev, [name]: value }));
		}
	};

	// Handler for the combined phone input component
	const handleCombinedPhoneChange = (combinedValue: string) => {
		// Option 1: Store only the combined value (requires UserData schema change)
		// setFormData(prev => ({ ...prev, combinedPhone: combinedValue }));

		// Option 2: Parse and store separately (if you keep phone/phoneCode in UserData)
		const parsed = findCodePrefix(combinedValue);
		const code = parsed ? parsed.code : formData.phoneCode || '+54'; // Use current/default if parse fails
		const number = parsed ? parsed.number : combinedValue; // Assume number if parse fails

		setFormData((prev) => ({
			...prev,
			phoneCode: code, // This still updates the separate field
			phone: number, // This still updates the separate field
			// Add a new field to store the combined value directly
			fullPhoneNumber: combinedValue,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const dataToSave = { ...formData };
		if (password) {
			console.warn('Password field was changed - In a real app, this should be handled securely (e.g., hashed).');
			// Password is not saved back to UserData state/localStorage in this example
		}
		onSave(dataToSave);
		onClose(); // Close modal on save
	};

	if (!isOpen || !initialData) return null;

	return (
		<Modal isOpen={isOpen} onClose={onClose} title='Mi cuenta' size='large'>
			<div className='text-center text-sm text-gray-600 mb-6 -mt-2'>
				Gestiona todo lo relacionado con tus datos personales
			</div>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
					<Input
						id='email'
						label='E-mail'
						type='email'
						name='email'
						value={formData.email || ''}
						onChange={handleChange}
						placeholder='Ingresar e-mail'
						required
						autoComplete='email'
					/>
					<Select
						id='profession'
						label='Profesión'
						name='profesion'
						options={professionOptions}
						value={formData.profesion || ''}
						onChange={handleSelectChange}
						placeholder='Seleccionar profesión'
					/>

					<Input
						id='firstName'
						label='Nombre/s'
						type='text'
						name='firstName'
						value={formData.firstName || ''}
						onChange={handleChange}
						placeholder='Ingresar nombre/s'
						required
						autoComplete='given-name'
					/>
					<Select
						id='specialty'
						label='Especialidad'
						name='specialty'
						options={specialtyOptions}
						value={formData.specialty || ''}
						onChange={handleSelectChange}
						placeholder='Seleccionar especialidad'
					/>
					<Input
						id='lastName'
						label='Apellido/s'
						type='text'
						name='lastName'
						value={formData.lastName || ''}
						onChange={handleChange}
						placeholder='Ingresar apellido/s'
						required
						autoComplete='family-name'
					/>
					<Input
						id='workplace'
						label='Lugar de trabajo'
						type='text'
						name='workplace'
						value={formData.workplace || ''}
						onChange={handleChange}
						placeholder='Ingresar lugar de trabajo'
						autoComplete='organization'
					/>
					<div className='relative'>
						<PasswordInput
							id='password'
							label='Contraseña'
							name='password'
							value={password}
							onChange={handlePasswordChange}
							placeholder='Ingresar contraseña'
							autoComplete='new-password'
						/>
						<span className='absolute top-0 right-0 mt-1.5 text-xs font-medium text-[#6E737C] '>
							¿Necesitas cambiar tu contraseña? 
							<a href='#' tabIndex={-1} className='text-[#9200AD]'>
								Hazlo aquí
							</a>
						</span>
					</div>
					<Input
						id='workArea'
						label='Área de trabajo'
						type='text'
						name='workArea'
						value={formData.workArea || ''}
						onChange={handleChange}
						placeholder='Ingresar área de trabajo'
					/>
					<Select
						id='country'
						label='País'
						name='country'
						options={countryOptions}
						value={formData.country || ''}
						onChange={handleSelectChange}
						placeholder='Seleccionar país'
						required
						autoComplete='country-name'
					/>
					<Select
						id='belongsToMedicalCollege'
						label='¿Perteneces a un colegio médico, sociedad o similar?'
						name='belongsToMedicalCollege'
						options={medicalCollegeOptions}
						value={
							formData.belongsToMedicalCollege === true ? 'yes' : formData.belongsToMedicalCollege === false ? 'no' : ''
						}
						onChange={handleSelectChange}
						placeholder='Seleccionar'
					/>

					<PhoneInputWithCode
						id='phone'
						label='Teléfono'
						// Pass the combined value (or derive it)
						value={formData.fullPhoneNumber || `${formData.phoneCode || '+54'}${formData.phone || ''}`} // Use fullPhoneNumber if available, otherwise reconstruct
						onChange={handleCombinedPhoneChange} // Use the new handler
						required
					/>

					<Input
						id='medicalCollegeName'
						label='¿Cuál?'
						type='text'
						name='medicalCollegeName'
						value={formData.medicalCollegeName || ''}
						onChange={handleChange}
						placeholder='Ingresar colegio médico, sociedad o similar'
					/>
				</div>

				<div className='flex justify-center pt-6 mt-6'>
					<button
						type='submit'
						className='px-8 py-3 bg-[#9200AD] text-white font-medium rounded-full hover:bg-[#7a0092] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9200AD]'
					>
						Guardar cambios
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default ProfileEditModal;
