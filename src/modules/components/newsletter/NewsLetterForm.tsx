'use client';

import CountrySelect from '@/modules/login/components/hooks/CountrySelect';
import { useState, useEffect, useRef } from 'react';
import { getCountryCallingCode, getCountries } from 'react-phone-number-input';
import { getName } from 'country-list';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { motion, AnimatePresence } from 'framer-motion';
import { careerOptions } from '@/data/careers';
import { professions } from '@/data/professions';
import { specialtiesGroup } from '@/data/specialties';
import { years } from '@/data/years';

interface Specialty {
	id: number;
	name: string;
}

interface NewsLetterFormProps {
	onClose: () => void;
	initialEmail: string;
}

export default function NewsLetterForm({ onClose, initialEmail }: NewsLetterFormProps) {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const { executeRecaptcha } = useGoogleReCaptcha();

	const [submitted, setSubmitted] = useState(false);
	const [success, setSuccess] = useState(false);
	const [profession, setProfession] = useState('');
	const [specialty, setSpecialty] = useState('');
	const [career, setCareer] = useState('');
	const [year, setYear] = useState('');

	const [formData, setFormData] = useState({
		name: '',
		lastName: '',
		email: initialEmail || '',
		phone: '',
		areaCode: '+54',
		profession: '',
		speciality: '',
		message: '',
		acceptTerms: false,
	});
	useEffect(() => {
		setFormData((prev) => ({ ...prev, email: initialEmail }));
	}, [initialEmail]);
	const [otherProfession, setOtherProfession] = useState<string>('');
	const [otherSpecialty, setOtherSpecialty] = useState<string>('');
	const [filteredSpecialties, setFilteredSpecialties] = useState<Array<Specialty>>([]);
	const professionId = professions.find((p) => p.name === formData.profession)?.id;
	const getCountryNameByCode = (dialCode: string): string => {
		const countryCode = getCountries().find((code) => `+${getCountryCallingCode(code)}` === dialCode);
		return countryCode ? getName(countryCode) ?? '' : '';
	};

	const countryName = getCountryNameByCode(formData.areaCode);

	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
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
		setSubmitted(true);

		const { name, lastName, email, phone, areaCode, message, acceptTerms } = formData;

		if (!name.trim() || !email.trim()) {
			setSubmitted(false);
			return alert('Por favor, completá tu nombre y correo electrónico.');
		}

		if (!acceptTerms) {
			setSubmitted(false);
			return alert('Debes aceptar las condiciones de privacidad.');
		}

		if (!executeRecaptcha) {
			setSubmitted(false);
			return alert('La verificación de seguridad aún no está lista. Intenta nuevamente.');
		}

		try {
			const recaptcha_token = await executeRecaptcha('newsletter');
			const utmState = {
				utm_source: sessionStorage.getItem('utm_source') || '',
				utm_medium: sessionStorage.getItem('utm_medium') || '',
				utm_campaign: sessionStorage.getItem('utm_campaign') || '',
				utm_content: sessionStorage.getItem('utm_content') || '',
			};
			const body = {
				First_Name: name,
				Last_Name: lastName,
				Email: email,
				Phone: `${areaCode}${phone}`,
				Description: message,
				Profesion: profession,
				Especialidad: specialty,
				Otra_profesion: profession === 'Otra Profesión' ? formData.profession : '',
				Otra_especialidad: specialty === 'Otra Especialidad' ? formData.speciality : '',
				Pais: countryName,
				Terms_And_Conditions: true,
				URL_ORIGEN: window.location.href,
				leadSource: 'Formulario de contacto',
				recaptcha_token,
				Cursos_consultados: [],
				utm_source: utmState.utm_source,
				utm_medium: utmState.utm_medium,
				utm_campaign: utmState.utm_campaign,
				utm_content: utmState.utm_content,
			};

			const response = await fetch('https://dev.msklatam.tech/msk-laravel/public/api/crm/CreateLeadHomeContactUs', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			const result = await response.json();

			if (!response.ok || !Array.isArray(result.data) || result.data[0]?.code !== 'SUCCESS') {
				console.warn('Error en respuesta del CRM:', result);
				alert('No se pudo completar el registro. Intenta nuevamente.');
			} else {
				setSuccess(true);
			}
		} catch (error) {
			console.error('Error general:', error);
			alert('Hubo un problema al procesar tu solicitud. Intenta nuevamente.');
		} finally {
			setSubmitted(false);
		}
	};

	return (
		<div
			className='fixed inset-0 bg-black/50 flex items-center justify-center z-[99] px-4 py-20 !mt-0'
			onClick={(e) => {
				if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
				else e.stopPropagation();
			}}
		>
			<motion.div
				ref={modalRef}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.3 }}
				className='relative bg-white rounded-2xl p-8 max-w-2xl w-full shadow-lg'
			>
				<button
					onClick={onClose}
					type='button'
					className='absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl'
					aria-label='Cerrar'
				>
					×
				</button>

				<AnimatePresence mode='wait'>
					{!success ? (
						<motion.form
							key='form'
							onSubmit={handleSubmit}
							className='space-y-4'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							<h2 className='text-[#1A1A1A] text-2xl font-semibold mb-6 text-center'>Formulario de contacto</h2>

							<div className='flex flex-col md:flex-row gap-4 text-[#7a808d] '>
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

							<div className='flex flex-col md:flex-row gap-4 text-[#7a808d] '>
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

							<div className='flex flex-col md:flex-row gap-4 w-full text-[#7a808d] '>
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
									<div className='flex flex-col md:flex-row gap-4 w-full text-[#7a808d] '>
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
									<div className='flex flex-col md:flex-row gap-4 w-full text-[#7a808d] '>
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

							<div className='space-y-3 text-[#1A1A1A] '>
								<textarea
									name='message'
									value={formData.message}
									onChange={handleChange}
									placeholder='Mensaje (opcional)'
									rows={4}
									className='w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
								/>
							</div>

							<div className='flex items-center'>
								<input
									type='checkbox'
									name='acceptTerms'
									checked={formData.acceptTerms}
									onChange={handleChange}
									id='terms'
									className='h-4 w-4 text-[#F5E6F7] border-[#DBDDE2] rounded'
								/>
								<label htmlFor='acceptTerms' className='text-xs text-[#8A8A8A] leading-5'>
									Acepto los{' '}
									<a href='#' className='underline'>
										términos y condiciones
									</a>
								</label>
							</div>

							<div className='flex justify-center'>
								<button
									type='submit'
									disabled={submitted}
									className='w-full mt-4 py-2 text-white bg-[#9200ad] rounded-3xl hover:bg-[#a84db4]'
								>
									{submitted ? 'Procesando...' : 'Enviar'}
								</button>
							</div>
						</motion.form>
					) : (
						<motion.div
							key='success'
							className='text-center space-y-4 py-6 px-4'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							<>
								<h1 className='text-[#1A1A1A] text-3xl font-bold'>¡Listo!</h1>
								<h3 className='text-[#1A1A1A] text-xl font-semibold'>Gracias por suscribirte a nuestro newsletter</h3>
							</>
							<p className='text-[#6E737C] text-base whitespace-pre-line'>
								Ahora es momento de avanzar en tu camino profesional.
								{'\n'}Conoce nuestras capacitaciones 100% a distancia, desarrolladas por
								{'\n'}autores de prestigio y respaldadas por grandes instituciones.
							</p>
							<button
								onClick={onClose}
								className='mt-4 inline-block px-6 py-2 bg-[#9200ad] text-white rounded-3xl hover:bg-[#a84db4]'
							>
								Continuar navegando
							</button>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}
