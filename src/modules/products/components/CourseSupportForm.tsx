'use client';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input';
import { getName } from 'country-list';
import CountrySelect from '@/modules/login/components/hooks/CountrySelect';
import { useState } from 'react';
import { careerOptions } from '@/data/careers';
import { professions } from '@/data/professions';
import { specialtiesGroup } from '@/data/specialties';
import { years } from '@/data/years';

interface Specialty {
	id: number;
	name: string;
}
const getCountryNameByCode = (dialCode: string): string => {
	const countryCode = getCountries().find((code) => `+${getCountryCallingCode(code)}` === dialCode);
	return countryCode ? getName(countryCode) ?? '' : '';
};

export default function CourseSupportForm() {
	const [formData, setFormData] = useState({
		name: '',
		lastName: '',
		email: '',
		phone: '',
		areaCode: '+54',
		profession: '',
		otherProfession: '',
		specialty: '',
		otherSpecialty: '',
		message: '',
		acceptTerms: false,
	});

	const { executeRecaptcha } = useGoogleReCaptcha();
	const [formSent, setFormSent] = useState(false);
	const [formError, setFormError] = useState('');
	const [profession, setProfession] = useState('');
	const [specialty, setSpecialty] = useState('');
	const [career, setCareer] = useState('');
	const [year, setYear] = useState('');

	const [otherProfession, setOtherProfession] = useState<string>('');
	const [otherSpecialty, setOtherSpecialty] = useState<string>('');
	const [filteredSpecialties, setFilteredSpecialties] = useState<Array<Specialty>>([]);
	const professionId = professions.find((p) => p.name === formData.profession)?.id;
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		const isCheckbox = type === 'checkbox';
		setFormData((prev) => ({
			...prev,
			[name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.name || !formData.email || !formData.acceptTerms) {
			setFormError('Por favor, completá los campos obligatorios.');
			setFormSent(false);
			return;
		}

		const country = getCountryNameByCode(formData.areaCode);
		const urlOrigen = typeof window !== 'undefined' ? window.location.href : '';

		const utmState = {
			utm_source: sessionStorage.getItem('utm_source') || '',
			utm_medium: sessionStorage.getItem('utm_medium') || '',
			utm_campaign: sessionStorage.getItem('utm_campaign') || '',
			utm_content: sessionStorage.getItem('utm_content') || '',
		};

		type ContactLeadPayload = {
			First_Name: string;
			Last_Name: string;
			Email: string;
			Phone: string;
			Profesion: string;
			Otra_profesion: string;
			Especialidad: string;
			Otra_especialidad: string;
			Description: string;
			Preferencia_de_contactaci_n: string;
			Pais: string;
			Terms_And_Conditions: boolean;
			year: string;
			career: string;
			URL_ORIGEN: string;
			leadSource: string;
			Ebook_consultado: string | null;
			Cursos_consultados: string | null;
			utm_source: string;
			utm_medium: string;
			utm_campaign: string;
			utm_content: string;
			recaptcha_token?: string;
		};

		const body: ContactLeadPayload = {
			First_Name: formData.name,
			Last_Name: formData.lastName,
			Email: formData.email,
			Phone: `${formData.areaCode}${formData.phone}`,
			Profesion: formData.profession,
			Otra_profesion: formData.profession === 'Otra Profesión' ? formData.otherProfession : '',
			Especialidad: formData.specialty,
			Otra_especialidad: formData.specialty === 'Otra Especialidad' ? formData.otherSpecialty : '',
			Description: formData.message,
			Preferencia_de_contactaci_n: '',
			Pais: country,
			Terms_And_Conditions: true,
			year: '',
			career: '',
			URL_ORIGEN: urlOrigen,
			leadSource: 'Formulario de soporte de cursos',
			Ebook_consultado: null,
			Cursos_consultados: null,
			...utmState,
		};

		if (!executeRecaptcha) {
			console.warn('reCAPTCHA not ready');
			return;
		}
		body.recaptcha_token = await executeRecaptcha('contact_form');

		if (!body.recaptcha_token) {
			console.error('reCAPTCHA token inválido');
			setFormError('Error al validar reCAPTCHA. Intenta nuevamente.');
			setFormSent(false);
			return;
		}

		try {
			const endpoint = `${
				process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_PUBLIC_URL
			}/api/crm/CreateLeadHomeContactUs`;
			console.log('Enviando a:', endpoint);
			console.log('Payload:', body);
			const token = await executeRecaptcha('contact_form');

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			const result = await response.json();
			console.log('Respuesta del servidor:', result);

			if (!response.ok || !Array.isArray(result.data) || result.data[0]?.code !== 'SUCCESS') {
				console.error('Error en respuesta del CRM:', result);
				return alert('No se pudo enviar el formulario. Intenta nuevamente.');
			}

			setFormSent(true);
			setFormError('');

			setFormData({
				name: '',
				lastName: '',
				email: '',
				phone: '',
				areaCode: '+54',
				profession: '',
				otherProfession: '',
				specialty: '',
				otherSpecialty: '',
				message: '',
				acceptTerms: false,
			});
		} catch (error) {
			console.error('Error general:', error);
			setFormError('Hubo un error al enviar el formulario.');
			setFormSent(false);
		}
	};
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;

		if (name === 'profession') {
			setProfession(value);
			const selected = professions.find((p) => p.name === value);
			const selectedId = selected ? selected.id : null;

			if (selectedId) {
				const sortedSpecialties: Specialty[] =
					specialtiesGroup[selectedId]
						?.slice()
						.sort((a, b) => a.name.localeCompare(b.name))
						.map((s) => ({ id: s.id, name: s.name })) || [];
				setFilteredSpecialties(sortedSpecialties);
			} else {
				setFilteredSpecialties([]);
			}

			if (value === 'Estudiante') {
				setCareer('');
				setYear('');
				setSpecialty('');
			}
		} else if (name === 'career') {
			setCareer(value);
		} else if (name === 'year') {
			setYear(value);
		} else if (name === 'speciality') {
			setSpecialty(value);
		}

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};
	return (
		<div className='bg-white space-y-6' id='course-support-form'>
			<h2 className='text-[24px] md:text-[32px] font-raleway font-bold text-[#1A1A1A]'>
				¿Necesitás ayuda para elegir tu curso?
			</h2>
			<p className='text-base font-raleway font-normal text-[#1A1A1A]'>
				Nuestro equipo de especialistas en educación médica está listo para asesorarte. No dudes en escribirnos.
			</p>

			<form className='grid grid-cols-1 md:grid-cols-2 gap-4' onSubmit={handleSubmit}>
				<input
					name='name'
					value={formData.name}
					onChange={handleChange}
					placeholder='Ingresar nombre'
					className='border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2'
				/>
				<input
					name='lastName'
					value={formData.lastName}
					onChange={handleChange}
					placeholder='Ingresar apellido'
					className='border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2'
				/>

				<div className='flex gap-2 rounded-[16px] border border-[#DBDDE2] focus-within:outline-none focus-within:ring-4 focus-within:border-[#DBDDE2] focus-within:ring-[#F5E6F7] px-3 py-1 items-center'>
					<div className='w-[40px] flex items-center'>
						<CountrySelect onChange={(code) => setFormData((prev) => ({ ...prev, areaCode: code }))} />
					</div>
					<input
						type='tel'
						name='phone'
						value={formData.phone}
						onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
						placeholder='Ingresar teléfono'
						className='rounded-[16px] border-0 focus:outline-none focus:ring-0 w-full text-[#6E737C]'
					/>
				</div>

				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					placeholder='Ingresar email'
					className='border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2'
				/>

				{/* Profesión */}
				<div className='flex flex-col gap-4 w-full'>
					<select
						name='profession'
						value={profession}
						onChange={handleSelectChange}
						className='w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
					>
						<option value=''>Seleccionar profesión</option>
						{professions.map((p) => (
							<option key={p.id} value={p.name}>
								{p.name}
							</option>
						))}
					</select>

					{profession === 'Otra profesión' && (
						<input
							type='text'
							name='otherProfession'
							value={otherProfession}
							onChange={(e) => {
								setOtherProfession(e.target.value);
								setFormData((prev) => ({
									...prev,
									otherProfession: e.target.value,
								}));
							}}
							placeholder='Ingresar otra profesión'
							className='w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
						/>
					)}
				</div>

				<div>
					{profession !== 'Estudiante' && (
						<div className='flex flex-col gap-4 w-full'>
							<select
								name='speciality'
								value={specialty}
								onChange={handleSelectChange}
								className='w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
							>
								<option value=''>Seleccionar especialidad</option>
								{filteredSpecialties.map((s) => (
									<option key={s.id} value={s.name}>
										{s.name}
									</option>
								))}
							</select>

							{specialty === 'Otra Especialidad' && (
								<input
									type='text'
									name='otherSpecialty'
									value={otherSpecialty}
									onChange={(e) => {
										setOtherSpecialty(e.target.value);
										setFormData((prev) => ({
											...prev,
											otherSpecialty: e.target.value,
										}));
									}}
									placeholder='Ingresar otra especialidad'
									className='w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
								/>
							)}
						</div>
					)}
					{profession === 'Estudiante' && (
						<div className='flex flex-col md:flex-row gap-4 w-full'>
							<select
								name='career'
								value={career}
								onChange={handleSelectChange}
								className='w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
							>
								<option value=''>Seleccionar carrera</option>
								{careerOptions.map((c) => (
									<option key={c.value} value={c.value}>
										{c.label}
									</option>
								))}
							</select>

							<select
								name='year'
								value={year}
								onChange={handleSelectChange}
								className='w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
							>
								<option value=''>Seleccionar año</option>
								{years.map((y) => (
									<option key={y.value} value={y.value}>
										{y.label}
									</option>
								))}
							</select>

							<input type='hidden' name='speciality' value={specialty} />
						</div>
					)}
				</div>

				<textarea
					name='message'
					value={formData.message}
					onChange={handleChange}
					placeholder='Mensaje'
					className='border border-[#DBDDE2] focus:outline-none focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] rounded-[16px] px-3 py-2 col-span-1 md:col-span-2'
					rows={4}
				/>

				{/* Checkbox + Botón */}
				<div className='col-span-1 md:col-span-2 flex flex-col md:flex-row justify-between items-center gap-4 md:mt-4'>
					<div className='flex items-center gap-2'>
						<input
							type='checkbox'
							id='privacy'
							name='acceptTerms'
							checked={formData.acceptTerms}
							onChange={handleChange}
							className='accent-[#9200AD] border rounded-[4px]'
						/>
						<label htmlFor='privacy' className='text-sm font-raleway font-normal text-[#1A1A1A]'>
							Acepto las{' '}
							<a href='https://msklatam.tech/politica-de-privacidad/' className='text-[#9200AD] underline'>
								condiciones de privacidad
							</a>
						</label>
					</div>

					<button
						type='submit'
						className='bg-[#9200AD] hover:bg-[#6b1679] text-white px-6 py-2 rounded-full flex items-center gap-2 w-full md:w-fit justify-center md:justify-end'
					>
						Enviar
					</button>
				</div>
			</form>

			{formSent && (
				<div className='text-green-700 bg-green-100 px-4 py-2 rounded-md mt-4'>
					¡Gracias! En breve un asesor se comunicará con vos.
				</div>
			)}

			{formError && <div className='text-red-700 bg-red-100 px-4 py-2 rounded-md mt-4'>{formError}</div>}
		</div>
	);
}
