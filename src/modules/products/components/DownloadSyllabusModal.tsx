'use client';

import CountrySelect from '@/modules/login/components/hooks/CountrySelect';
import { useState, useEffect, useRef } from 'react';
import { getCountryCallingCode, getCountries } from 'react-phone-number-input';
import { getName } from 'country-list';
import { careerOptions } from '@/data/careers';
import { countries } from '@/data/countries';
import { professions } from '@/data/professions';
import { specialtiesGroup } from '@/data/specialties';
import { years } from '@/data/years';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

interface Specialty {
	id: number;
	name: string;
}

interface DownloadSyllabusModalProps {
	fileUrl: string;
	onClose: () => void;
	slug: string;
}

export default function DownloadSyllabusModal({ fileUrl, onClose, slug }: DownloadSyllabusModalProps) {
	const modalRef = useRef<HTMLDivElement | null>(null);

	const getCountryNameByCode = (dialCode: string): string => {
		const countryCode = getCountries().find((code) => `+${getCountryCallingCode(code)}` === dialCode);
		return countryCode ? getName(countryCode) ?? '' : '';
	};

	const { executeRecaptcha } = useGoogleReCaptcha();
	const [profession, setProfession] = useState('');
	const [specialty, setSpecialty] = useState('');
	const [career, setCareer] = useState('');
	const [year, setYear] = useState('');

	const [otherProfession, setOtherProfession] = useState<string>('');
	const [otherSpecialty, setOtherSpecialty] = useState<string>('');

	const [formData, setFormData] = useState({
		name: '',
		lastName: '',
		email: '',
		phone: '',
		areaCode: '+54',
		profession: '',
		speciality: '',
		message: '',
		acceptTerms: false,
	});

	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
	const [errorMessage, setErrorMessage] = useState('');
	const [filteredSpecialties, setFilteredSpecialties] = useState<Array<Specialty>>([]);
	const professionId = professions.find((p) => p.name === formData.profession)?.id;

	useEffect(() => {
		if (professionId && specialtiesGroup[professionId]) {
			const sortedSpecialties: Specialty[] = specialtiesGroup[professionId]
				.slice()
				.sort((a, b) => a.name.localeCompare(b.name))
				.map((s) => ({ id: s.id, name: s.name }));
			setFilteredSpecialties(sortedSpecialties);
		} else {
			setFilteredSpecialties([]);
		}
	}, [professionId]);

	const countryName = getCountryNameByCode(formData.areaCode);
	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};
		window.addEventListener('keydown', handleEscKey);
		return () => window.removeEventListener('keydown', handleEscKey);
	}, [onClose]);

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (window.innerWidth <= 768 && !modalRef.current?.contains(e.target as Node)) {
			onClose();
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		const isCheckbox = type === 'checkbox';
		setFormData((prev) => ({
			...prev,
			[name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
		}));
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setStatus('loading');
		setErrorMessage('');

		const utmState = {
			utm_source: sessionStorage.getItem('utm_source') || '',
			utm_medium: sessionStorage.getItem('utm_medium') || '',
			utm_campaign: sessionStorage.getItem('utm_campaign') || '',
			utm_content: sessionStorage.getItem('utm_content') || '',
		};

		if (!executeRecaptcha) {
			console.error('reCAPTCHA no está disponible.');
			setStatus('error');
			setErrorMessage('Error al validar reCAPTCHA. Intenta nuevamente.');
			return;
		}

		const recaptchaToken = await executeRecaptcha('syllabus_form');

		if (!recaptchaToken) {
			console.error('reCAPTCHA no se pudo inicializar correctamente.');
			setStatus('error');
			setErrorMessage('Error al validar reCAPTCHA. Intenta nuevamente.');
			return;
		}

		const body = {
			First_Name: formData.name,
			Last_Name: formData.lastName,
			Email: formData.email,
			Phone: `${formData.areaCode}${formData.phone}`,
			Description: formData.message,
			Profesion: profession,
			Especialidad: specialty,
			Otra_profesion: profession === 'Otra Profesión' ? otherProfession : '',
			Otra_especialidad: specialty === 'Otra Especialidad' ? otherSpecialty : '',
			Pais: getCountryNameByCode(formData.areaCode),
			Terms_And_Conditions: formData.acceptTerms,
			URL_ORIGEN: window.location.href,
			Cursos_consultados: slug,
			leadSource: 'Descarga de temario',
			recaptcha_token: recaptchaToken,
			utm_source: utmState.utm_source,
			utm_medium: utmState.utm_medium,
			utm_campaign: utmState.utm_campaign,
			utm_content: utmState.utm_content,
		};

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_PUBLIC_URL}/api/crm/CreateLeadHomeContactUs`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(body),
				},
			);

			const result = await response.json();

			if (!response.ok || !Array.isArray(result.data) || result.data[0]?.code !== 'SUCCESS') {
				setStatus('error');
				setErrorMessage('No se pudo completar el registro. Intenta nuevamente.');
				return;
			}

			setStatus('success');
			setErrorMessage('');

			// Disparar la descarga del temario
			const link = document.createElement('a');
			link.href = fileUrl;
			link.download = ''; // opcional: podés poner un nombre de archivo si querés
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error('Error general:', error);
			setStatus('error');
			setErrorMessage('Hubo un problema al procesar tu solicitud. Intenta nuevamente.');
		}
	};

	return (
		<div
			className='fixed inset-0 bg-black/50 flex items-center justify-center z-[99] px-4 !mt-0'
			onClick={(e) => {
				if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
				else e.stopPropagation();
			}}
		>
			<div ref={modalRef} className='relative bg-white rounded-2xl p-8 max-w-2xl w-full shadow-lg'>
				<button
					onClick={() => onClose()}
					type='button'
					className='absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl'
					aria-label='Cerrar'
				>
					×
				</button>
				<h2 className='text-2xl font-semibold mb-6 text-center'>Descarga el temario completo</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='flex flex-col md:flex-row gap-4'>
						<input
							name='name'
							value={formData.name}
							onChange={handleChange}
							placeholder='Ingresar nombre'
							className='w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
						/>
						<input
							name='lastName'
							value={formData.lastName}
							onChange={handleChange}
							placeholder='Ingresar apellido'
							className='w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
						/>
					</div>

					<div className='flex flex-col md:flex-row gap-4'>
						<input
							name='email'
							value={formData.email}
							onChange={handleChange}
							placeholder='Ingresar e-mail'
							type='email'
							className='w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
						/>
						<div className='w-full'>
							<div className='flex gap-2 border rounded-2xl border-[#DBDDE2] px-[2.7px] py-1 focus-within:ring-4 focus-within:ring-[#F5E6F7]'>
								<div className='w-18'>
									<CountrySelect onChange={(code) => setFormData((prev) => ({ ...prev, areaCode: code }))} />
								</div>
								<input
									type='tel'
									name='phone'
									value={formData.phone}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											phone: e.target.value.replace(/\D/g, ''),
										}))
									}
									placeholder='Ingresar número telefónico'
									className='flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-[#6E737C]'
								/>
							</div>
						</div>
					</div>

					<div className='flex flex-col md:flex-row gap-4 w-full'>
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
							<div className='flex flex-col md:flex-row gap-4 w-full'>
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

					{/* Message */}
					<textarea
						name='message'
						value={formData.message}
						onChange={handleChange}
						placeholder='Deja tu mensaje'
						rows={4}
						className='w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
					></textarea>

					{/* Terms and Conditions */}
					<div className='flex items-center gap-2'>
						<input
							type='checkbox'
							id='acceptTerms'
							name='acceptTerms'
							checked={formData.acceptTerms}
							onChange={handleChange}
							className='text-[#8A8A8A]'
						/>
						<label htmlFor='acceptTerms' className='text-xs text-[#8A8A8A] leading-5'>
							Acepto los{' '}
							<a href='#' className='underline'>
								términos y condiciones
							</a>
						</label>
					</div>

					<button type='submit' className='w-full py-2 mt-4 text-white bg-[#9200ad] rounded-xl hover:bg-[#a84db4]'>
						Descargar temario
					</button>
				</form>

				{status === 'loading' && (
					<div className='mt-4 text-sm text-blue-600 bg-blue-100 rounded-lg p-3 text-center'>Procesando tu solicitud...</div>
				)}

				{status === 'success' && (
					<div className='mt-4 text-sm text-green-600 bg-green-100 rounded-lg p-3 text-center'>
						¡Temario descargado con éxito!
					</div>
				)}

				{status === 'error' && (
					<div className='mt-4 text-sm text-red-600 bg-red-100 rounded-lg p-3 text-center'>{errorMessage}</div>
				)}
			</div>
		</div>
	);
}
