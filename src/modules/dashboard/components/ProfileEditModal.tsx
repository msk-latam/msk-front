import { careerOptions } from '@/data/careers';
import { countries } from '@/data/countries';
import { professions } from '@/data/professions';
import { specialtiesGroup } from '@/data/specialties';
import { years } from '@/data/years';
import { documents } from '@/data/documents';
import Modal from '@/modules/dashboard/components/ui/Modal';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FileInput from './ui/FileInput';
import Input from './ui/Input';
import PasswordInput from './ui/PasswordInput';
import PhoneInputWithCode, { findCodePrefix } from './ui/PhoneInputWithCode';
import Select from './ui/Select';

interface ProfileCompletion {
	percentage: number;
	message: string;
	ctaText: string;
	ctaLink: string;
}

interface Contract {
	id: number;
}

interface Course {
	id: string | number;
	title: string;
	image?: string | { high?: string; medium?: string; low?: string };
}

export interface UserProfileData {
	profileCompletion?: ProfileCompletion;
	name: string;
	lastName: string;
	profession: string;
	otherProfession?: string;
	speciality: string;
	otherSpecialty?: string;
	career?: string;
	year?: string;
	email: string;
	country: string;
	phone: string;
	contracts?: Contract[];
	coursesInProgress?: Course[];
	medicalCollegeName?: string | null;
	workplace?: string | null;
	intereses?: string[];
	interesesAdicionales?: string[];
	currentCourse?: Course;
	recommendedResourcesByInterests?: any[];
	workArea?: string;
	belongsToMedicalCollege?: boolean | null;
	phoneCode?: string;
	fullPhoneNumber?: string;
	asosiacion?: string;
	crm_id?: string;
	billingEmail?: string;
	billingName?: string;
	company_name?: string;
	billingPhone?: string;
	billingPhoneCode?: string;
	fullBillingPhoneNumber?: string;
	requiresInvoice?: string;
	documentType?: string;
	documentNumber?: string;
	taxRegime?: string;
	file?: File;
}

interface ProfileEditModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (updatedData: Partial<UserProfileData>, password?: string) => Promise<void>;
	user: UserProfileData | null;
	isSaving: boolean;
	saveError: string | null;
	saveSuccess: boolean;
}

const medicalCollegeOptions = [
	{ value: 'yes', label: 'Sí' },
	{ value: 'no', label: 'No' },
];

// const documentsByCountry: any = {
// 	ar: [
// 		{ value: 'DNI', label: 'DNI' },
// 		{ value: 'CUIT', label: 'CUIT' },
// 		{ value: 'CUIL', label: 'CUIL' },
// 		{ value: 'CDI', label: 'CDI' },
// 		{ value: 'LE', label: 'Libreta de enrolamiento' },
// 		{ value: 'LC', label: 'Libreta cívica' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 	],
// 	bo: [
// 		{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 	],
// 	cl: [
// 		{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
// 		{ value: 'RUT', label: 'RUT' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 	],
// 	co: [
// 		{ value: 'Cédula de ciudadanía', label: 'Cédula de ciudadanía' },
// 		{ value: 'Cédula de extranjero', label: 'Cédula de extranjero' },
// 		{ value: 'NIT', label: 'NIT' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 	],
// 	cr: [
// 		{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 	],
// 	ec: [
// 		{ value: '04 - RUC', label: 'RUC' },
// 		{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
// 		{ value: '06 - PASAPORTE', label: 'Pasaporte' },
// 	],
// 	sv: [
// 		{ value: 'DUI', label: 'DUI' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 	],
// 	es: [
// 		{ value: 'DNI', label: 'DNI' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 		{ value: 'TIE', label: 'TIE' },
// 		{ value: 'NIE', label: 'NIE' },
// 	],
// 	gt: [
// 		{ value: 'DNI', label: 'DNI' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 	],
// 	hn: [
// 		{ value: 'DNI', label: 'DNI' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 	],
// 	mx: [
// 		{ value: 'RFC', label: 'RFC' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 	],
// 	ni: [
// 		{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 	],
// 	pa: [
// 		{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 	],
// 	py: [
// 		{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 	],
// 	pe: [
// 		{ value: 'DNI', label: 'DNI' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 		{ value: 'Cédula de extranjero', label: 'Cédula de extranjero' },
// 		{ value: 'CURP', label: 'CURP' },
// 		{ value: 'RUC', label: 'RUC' },
// 	],
// 	do: [
// 		{ value: 'DNI', label: 'DNI' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 	],
// 	uy: [
// 		{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 		{ value: 'RUT', label: 'RUT' },
// 	],
// 	ve: [
// 		{ value: '05 - CÉDULA', label: 'Cédula de identidad' },
// 		{ value: 'Pasaporte', label: 'Pasaporte' },
// 	],
// };

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
	isOpen,
	onClose,
	onSave,
	user,
	isSaving,
	saveError,
	saveSuccess,
}) => {
	const [formData, setFormData] = useState<Partial<any>>({});
	const [password, setPassword] = useState<string>('');
	const [selectedProfessionId, setSelectedProfessionId] = useState<number | null>(null);
	const [initialSnapshot, setInitialSnapshot] = useState<Partial<UserProfileData>>({});

	useEffect(() => {
		console.log('(ProfileEditModal useEffect) User prop received:', JSON.stringify(user, null, 2));
		console.log('(ProfileEditModal useEffect) isOpen state:', isOpen);
		if (user) {
			const parsedPhone = findCodePrefix(user.phone || '');
			const initialPhoneCode = parsedPhone ? parsedPhone.code : '+54';
			const initialPhone = parsedPhone ? parsedPhone.number : user.phone || '';

			const rawBillingPhone = user.billingPhone || '';
			const parsedBillingPhone = findCodePrefix(rawBillingPhone);

			const initialBillingPhoneCode = parsedBillingPhone ? parsedBillingPhone.code : rawBillingPhone === '' ? '+54' : '';
			const initialBillingPhone = parsedBillingPhone ? parsedBillingPhone.number : rawBillingPhone;
			const initialFullBillingPhoneNumber = rawBillingPhone;

			const selectedProfession = professions.find((p) => p.name === user.profession);

			const initialData = {
				crm_id: user.crm_id || '',
				email: user.email || '',
				name: user.name || '',
				lastName: user.lastName || '',
				country: user.country || '',
				phoneCode: initialPhoneCode,
				phone: initialPhone,
				fullPhoneNumber: user.phone || '',
				profession: user.profession || '',
				speciality: user.speciality || '',
				workplace: user.workplace || '',
				workArea: user.workArea || '',
				belongsToMedicalCollege: user.medicalCollegeName ? true : user.medicalCollegeName === null ? null : false,
				medicalCollegeName: user.medicalCollegeName || '',
				asosiacion: user.asosiacion || '',
				otherProfession: user.otherProfession || '',
				otherSpecialty: user.otherSpecialty || '',
				year: user.year || '',
				career: user.career || '',
				billingEmail: user.billingEmail || '',
				company_name: user.company_name || '',
				billingPhone: initialBillingPhone,
				billingPhoneCode: initialBillingPhoneCode,
				fullBillingPhoneNumber: initialFullBillingPhoneNumber,
				requiresInvoice: user.requiresInvoice || '',
				documentType: user.documentType || '',
				documentNumber: user.documentNumber || '',
				taxRegime: user.taxRegime || '',
			};

			setFormData(initialData);
			setInitialSnapshot(initialData);

			setSelectedProfessionId(selectedProfession?.id || null);
			setPassword('');
		} else {
			setFormData({});
			setInitialSnapshot({});
			setPassword('');
			setSelectedProfessionId(null);
		}
	}, [user, isOpen]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev: Partial<UserProfileData>) => ({
			...prev,
			[name]: value,
		}));
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const pathname = usePathname();
	const lang = pathname ? pathname.split('/')[1] || 'ar' : 'ar';
	const targetPath = lang === 'ar' ? '/login?form=change-pass' : `/${lang}/login?form=change-pass`;

	const selectedCountryObject = countries.find((c) => c.name === formData.country);
	const selectedCountryCode = selectedCountryObject ? selectedCountryObject.id.toLowerCase() : undefined;
	const documentTypes = selectedCountryCode ? documents[selectedCountryCode] || [] : [];

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;
		if (name === 'belongsToMedicalCollege') {
			setFormData((prev: Partial<UserProfileData>) => ({
				...prev,
				[name]: value === 'yes' ? true : value === 'no' ? false : null,
			}));
		} else if (name === 'phoneCode') {
			setFormData((prev: Partial<UserProfileData>) => ({
				...prev,
				[name]: value,
			}));
		} else if (name === 'profession') {
			const selected = professions.find((p) => p.name === value);
			setSelectedProfessionId(selected?.id || null);
			setFormData((prev) => ({ ...prev, profession: value, speciality: '' }));
		} else {
			setFormData((prev: Partial<UserProfileData>) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const professionId = professions.find((p) => p.name === formData.profession)?.id;

	const filteredSpecialties =
		professionId && specialtiesGroup[professionId]
			? specialtiesGroup[professionId].slice().sort((a, b) => a.name.localeCompare(b.name))
			: [];

	const handleCombinedPhoneChange = (combinedValue: string) => {
		const parsed = findCodePrefix(combinedValue);
		const code = parsed ? parsed.code : formData.phoneCode || '+54';
		const number = parsed ? parsed.number : combinedValue;

		setFormData((prev: Partial<UserProfileData>) => ({
			...prev,
			phoneCode: code,
			phone: number,
			fullPhoneNumber: combinedValue,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const changedData: Partial<UserProfileData> = {};

		(Object.keys(formData) as Array<keyof UserProfileData>).forEach((key) => {
			if (key !== 'file' && key in initialSnapshot && formData[key] !== initialSnapshot[key]) {
				changedData[key] = formData[key];
			}
		});

		if (formData.file) {
			changedData.file = formData.file;
		}

		onSave(changedData, password || undefined);
	};

	if (!isOpen || !user) return null;

	let buttonContent: React.ReactNode = 'Guardar cambios';
	let buttonDisabled = isSaving || saveSuccess;
	let buttonClasses =
		'px-8 py-3 w-full max-w-[500px] text-white font-medium rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center';

	if (isSaving) {
		buttonContent = (
			<>
				<span className='ml-2'>Guardando...</span>
			</>
		);
		buttonClasses += ' bg-[#a9a9a9] cursor-not-allowed';
	} else if (saveSuccess) {
		buttonContent = 'Datos guardados';
		buttonClasses += ' bg-green-500 cursor-not-allowed';
	} else if (saveError) {
		buttonClasses += ' bg-[#9200AD] hover:bg-[#7a0092] focus:ring-[#9200AD]';
		buttonDisabled = false;
	} else {
		buttonClasses += ' bg-[#9200AD] hover:bg-[#7a0092] focus:ring-[#9200AD]';
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose} title='Mi cuenta' size='large'>
			<div className='text-center text-base md:text-lg text-[#6E737C] mb-6 mt-2'>
				Gestiona todo lo relacionado con tus datos personales
			</div>{' '}
			<h3 className='text-lg md:text-2xl  text-center font-medium mb-2'>Datos personales</h3>
			<form onSubmit={handleSubmit} className='space-y-4 text-[#1a1a1a]'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-1'>
					<Input
						id='firstName'
						label='Nombre/s'
						type='text'
						name='name'
						value={formData.name || ''}
						onChange={handleChange}
						placeholder='Ingresar nombre/s'
						required
						autoComplete='given-name'
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
					<Select
						id='country'
						label='País'
						name='country'
						options={countries.map((p) => ({ label: p.name, value: p.name }))}
						placeholder='Seleccionar país'
						value={formData.country || ''}
						onChange={handleSelectChange}
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
						<span className='md:absolute top-0 right-0 relative mt-1.5 text-xs font-medium text-[#6E737C] '>
							¿Necesitas cambiar tu contraseña?&nbsp;
							<button
								type='button'
								onClick={() => {
									document.cookie = 'recovery_flow_active=true; path=/; max-age=600';
									document.cookie = `country=${lang}; path=/; max-age=60`;

									console.log(`[Hazlo aquí] Cookies activadas: recovery_flow_active=true, country=${lang}`);
									window.location.href = targetPath;
								}}
								className='text-[#9200AD] underline hover:text-[#700084] transition'
							>
								Hazlo aquí
							</button>
						</span>
					</div>
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
					<PhoneInputWithCode
						id='phone'
						label='Teléfono'
						value={formData.fullPhoneNumber || ''}
						defaultCode={formData.phoneCode || '+54'}
						onChange={handleCombinedPhoneChange}
						required
					/>
				</div>

				<div className='mt-6'>
					<h3 className='text-lg md:text-2xl  text-center font-medium mb-2'>Datos profesionales</h3>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-1'>
						<div className='flex flex-col gap-2'>
							<Select
								id='profession'
								label='Profesión'
								name='profession'
								options={professions.map((p) => ({ label: p.name, value: p.name }))}
								value={formData.profession || ''}
								onChange={handleSelectChange}
								placeholder='Seleccionar profesión'
							/>

							{formData.profession === 'Otra profesión' && (
								<Input
									id='profession'
								label='Profesión'
									type='text'
									name='otherProfession'
									value={formData.otherProfession || ''}
									onChange={handleChange}
									placeholder='Ingresar profesión'
									required
									autoComplete='profession'
								/>
							)}
						</div>

						{formData.profession === 'Estudiante' && (
							<div className='grid grid-cols-[1fr_2fr] gap-4'>
								<Select
									id='year'
									label='Año'
									name='year'
									options={years.map((p) => ({ label: p.label, value: p.value }))}
									placeholder='Seleccionar año'
									value={formData.year || ''}
									onChange={(e) => setFormData((prev) => ({ ...prev, year: e.target.value }))}
								/>
								<Select
									id='career'
									label='Carrera'
									name='career'
									options={careerOptions.map((p) => ({ label: p.label, value: p.value }))}
									placeholder='Seleccionar carrera'
									value={formData.career || ''}
									onChange={(e) => setFormData((prev) => ({ ...prev, career: e.target.value }))}
								/>
							</div>
						)}

						<div className='flex flex-col gap-2'>
							<Select
								id='specialty'
								label='Especialidad'
								name='speciality'
								options={filteredSpecialties.map((s) => ({ label: s.name, value: s.name }))}
								value={formData.speciality || ''}
								onChange={(e) => setFormData((prev) => ({ ...prev, speciality: e.target.value }))}
								placeholder='Seleccionar especialidad'
							/>

							{formData.speciality === 'Otra Especialidad' && (
								<Input
									id='specialty'
								label='Especialidad'
									type='text'
									name='otherSpecialty'
									value={formData.otherSpecialty || ''}
									onChange={handleChange}
									placeholder='Ingresar especialidad'
									required
									autoComplete='specialty'
								/>
							)}
						</div>

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
					<div className='mt-6'>
						<h3 className='text-lg md:text-2xl text-center font-medium mb-2'>Datos de facturación</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-1'>
							<Select
								id='requiresInvoice'
								label='¿Requiere factura fiscal?'
								name='requiresInvoice'
								options={[
									{ label: 'Sí', value: 'yes' },
									{ label: 'No', value: 'no' },
								]}
								value={formData.requiresInvoice || ''}
								onChange={handleSelectChange}
								placeholder='Seleccionar'
							/>
							<Input
								id='billingEmail'
								label='E-mail de facturación'
								type='email'
								name='billingEmail'
								value={formData.billingEmail || ''}
								onChange={handleChange}
								placeholder='Ingresar e-mail de facturación'
							/>
							<PhoneInputWithCode
								id='billingPhone'
								label='Teléfono de facturación'
								value={formData.fullBillingPhoneNumber || ''}
								defaultCode={formData.billingPhoneCode || '+54'}
								onChange={(combinedValue) => {
									const parsed = findCodePrefix(combinedValue);
									const code = parsed ? parsed.code : formData.billingPhoneCode || '+54';
									const number = parsed ? parsed.number : combinedValue;
									setFormData((prev) => ({
										...prev,
										billingPhoneCode: code,
										billingPhone: number,
										fullBillingPhoneNumber: combinedValue,
									}));
								}}
							/>
							<Input
								id='billingName'
								label='Razón social'
								type='text'
								name='company_name'
								value={formData.company_name || ''}
								onChange={handleChange}
								placeholder='Ingresar razón social'
							/>
							<Select
								id='documentType'
								label='Tipo de identificación'
								name='documentType'
								options={documentTypes}
								value={formData.documentType || ''}
								onChange={handleSelectChange}
								placeholder='Seleccionar'
							/>
							<Input
								id='documentNumber'
								label='Número de Identificación'
								type='text'
								name='documentNumber'
								value={formData.documentNumber || ''}
								onChange={handleChange}
								placeholder='Ingresar Número de Identificación'
							/>
							<Select
								id='documentType'
								label='Regimen fiscal'
								name='documentType'
								options={[]}
								value={formData.documentType || ''}
								onChange={handleSelectChange}
								placeholder='Seleccionar'
							/>

							<FileInput
								id='file'
								label='Constancia de la situación fiscal'
								name='file'
								onChange={(e) => {
									const file = (e.target as HTMLInputElement).files?.[0] || null;
									setFormData((prev) => ({
										...prev,
										file,
									}));
								}}
							/>
						</div>
					</div>
				</div>
				<div className='flex flex-col items-center pt-6 mt-6'>
					{saveError && !isSaving && <p className='text-red-600 text-sm mt-2 text-center'>{saveError}</p>}
					<button type='submit' className={buttonClasses} disabled={buttonDisabled}>
						{buttonContent}
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default ProfileEditModal;
