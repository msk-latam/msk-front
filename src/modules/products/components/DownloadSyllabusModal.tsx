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
import { usePathname } from 'next/navigation';

interface Specialty {
	id: number;
	name: string;
}

interface DownloadSyllabusModalProps {
	fileUrl: string;
	onClose: () => void;
	slug: string;
	isDownloadable?: boolean;
}

export default function DownloadSyllabusModal({ fileUrl, onClose, slug, isDownloadable }: DownloadSyllabusModalProps) {
	const modalRef = useRef<HTMLDivElement | null>(null);

	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	const country = match ? `${match[1]}` : 'ar';

	const countryMapping: any = {
		ar: 'Argentina',
		bo: 'Bolivia',
		br: 'Brasil',
		cl: 'Chile',
		co: 'Colombia',
		cr: 'Costa Rica',
		cu: 'Cuba',
		do: 'República Dominicana',
		ec: 'Ecuador',
		sv: 'El Salvador',
		gt: 'Guatemala',
		hn: 'Honduras',
		mx: 'México',
		ni: 'Nicaragua',
		pa: 'Panamá',
		py: 'Paraguay',
		pe: 'Perú',
		pr: 'Puerto Rico',
		uy: 'Uruguay',
		ve: 'Venezuela',
	};

	const { executeRecaptcha } = useGoogleReCaptcha();
	const [profession, setProfession] = useState('');
	const [specialty, setSpecialty] = useState('');
	const [career, setCareer] = useState('');
	const [year, setYear] = useState('');

	const [otherProfession, setOtherProfession] = useState<string>('');
	const [otherSpecialty, setOtherSpecialty] = useState<string>('');
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
	const [errorMessage, setErrorMessage] = useState('');
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

		setSubmitted(true); // <- Deshabilita el botón apenas empieza el submit
		setStatus('loading');
		setErrorMessage('');

		// Validar campos obligatorios
		if (
			!formData.name ||
			!formData.lastName ||
			!formData.email ||
			!formData.phone ||
			!formData.acceptTerms ||
			!profession ||
			(profession !== 'Estudiante' && !specialty) ||
			(profession === 'Otra profesión' && !otherProfession) ||
			(specialty === 'Otra Especialidad' && !otherSpecialty) ||
			(profession === 'Estudiante' && (!career || !year))
		) {
			setStatus('error');
			setErrorMessage('Por favor, completá todos los campos obligatorios.');
			return;
		}

		const utmState = {
			utm_source: sessionStorage.getItem('utm_source') || '',
			utm_medium: sessionStorage.getItem('utm_medium') || '',
			utm_campaign: sessionStorage.getItem('utm_campaign') || '',
			utm_content: sessionStorage.getItem('utm_content') || '',
		};

		if (!formData.acceptTerms) {
			setStatus('error');
			setErrorMessage('Debes aceptar los términos y condiciones para continuar.');
			return;
		}

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
		const countryComplete = countryMapping[country];
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
			Pais: countryComplete,
			Terms_And_Conditions: formData.acceptTerms,
			URL_ORIGEN: window.location.href.slice(0, 255),
			Cursos_consultados: slug,
			leadSource: 'Solicitud de temario',
			recaptcha_token: recaptchaToken,
			utm_source: utmState.utm_source,
			utm_medium: utmState.utm_medium,
			utm_campaign: utmState.utm_campaign,
			utm_content: utmState.utm_content,
		};

		try {
			const response = await fetch(`https://dev.msklatam.tech/msk-laravel/public/api/crm/CreateLeadHomeContactUs`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			const result = await response.json();

			if (!response.ok || !Array.isArray(result.data) || result.data[0]?.code !== 'SUCCESS') {
				setStatus('error');
				setErrorMessage('No se pudo completar el registro. Intenta nuevamente.');
				setSubmitted(false); // <- Permitir reintentar
				return;
			}

			setStatus('success');
			setErrorMessage('');

			// ✅ Descargar el archivo como blob para forzar la descarga
			try {
				const fileResponse = await fetch(fileUrl);
				const blob = await fileResponse.blob();

				const downloadUrl = URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = downloadUrl;
				link.download = fileUrl.split('/').pop() || 'temario.pdf';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				URL.revokeObjectURL(downloadUrl);
			} catch (downloadError) {
				console.error('Error descargando el archivo:', downloadError);
			}

			// Mostrar mensaje de éxito
			setShowSuccessModal(true);
		} catch (error) {
			setSubmitted(false); // <- Permite reenviar si hubo un error
			console.error('Error general:', error);
			setStatus('error');
			setErrorMessage('Hubo un problema al procesar tu solicitud. Intenta nuevamente.');
		}
	};
	const isFormValid = () => {
		return (
			formData.name.trim() !== '' &&
			formData.lastName.trim() !== '' &&
			formData.email.trim() !== '' &&
			formData.phone.trim() !== '' &&
			formData.acceptTerms &&
			profession !== '' &&
			(profession !== 'Estudiante' ? specialty !== '' : career !== '' && year !== '') &&
			(profession !== 'Otra profesión' || otherProfession.trim() !== '') &&
			(specialty !== 'Otra Especialidad' || otherSpecialty.trim() !== '')
		);
	};

	return (
		<div
			className='fixed inset-0 bg-black/50 flex items-center justify-center z-[99] px-4 !mt-0'
			onClick={(e) => {
				if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
				else e.stopPropagation();
			}}
		>
			<div ref={modalRef} className='relative w-full max-w-2xl p-8 bg-white shadow-lg rounded-2xl'>
				<button
					onClick={() => onClose()}
					type='button'
					className='absolute text-2xl text-gray-600 top-2 right-2 hover:text-gray-900'
					aria-label='Cerrar'
				>
					×
				</button>

				{showSuccessModal ? (
					<div className='flex flex-col items-center justify-center space-y-4 text-center'>
						<h2 className='text-2xl font-semibold'>¡Listo!</h2>
						<p className='text-sm text-gray-600'>Ya descargaste el temario completo de este curso en tu dispositivo.</p>
						<button onClick={onClose} className='mt-4 px-6 py-2 rounded-xl text-white bg-[#9200ad] hover:bg-[#a84db4]'>
							Seguir navegando
						</button>
					</div>
				) : (
					<>
						<h2 className='mb-6 text-2xl font-semibold text-center'>
							{isDownloadable ? 'Descarga la guía profesional' : 'Descarga el temario completo'}
						</h2>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div className='flex flex-col gap-4 md:flex-row'>
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

							<div className='flex flex-col gap-4 md:flex-row'>
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

							<div className='flex flex-col w-full gap-4 md:flex-row'>
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
									<div className='flex flex-col w-full gap-4 md:flex-row'>
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
									<div className='flex flex-col w-full gap-4 md:flex-row'>
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

							<button
								type='submit'
								disabled={!isFormValid() || submitted || status === 'loading'}
								className={`w-full py-2 mt-4 rounded-xl text-white transition ${
									isFormValid() && !submitted && status !== 'loading'
										? 'bg-[#9200ad] hover:bg-[#a84db4]'
										: 'bg-gray-400 cursor-not-allowed'
								}`}
							>
								{status === 'loading' ? 'Enviando...' : isDownloadable ? 'Descargar guía' : 'Descargar temario'}
							</button>
						</form>

						{status === 'loading' && (
							<div className='p-3 mt-4 text-sm text-center text-blue-600 bg-blue-100 rounded-lg'>
								Procesando tu solicitud...
							</div>
						)}
						{/* 
            {status === "success" && (
              <div className="p-3 mt-4 text-sm text-center text-green-600 bg-green-100 rounded-lg">
                ¡Archivo descargado con éxito!
              </div>
            )} */}
						{status === 'error' && (
							<div className='p-3 mt-4 text-sm text-center text-red-600 bg-red-100 rounded-lg'>{errorMessage}</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
