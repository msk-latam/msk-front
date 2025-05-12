'use client';
import { careerOptions } from '@/data/careers';
import { countries } from '@/data/countries';
import { professions } from '@/data/professions';
import { specialtiesGroup } from '@/data/specialties';
import { years } from '@/data/years';
import Input from '@/modules/dashboard/components/ui/Input';
import PhoneInputWithCode from '@/modules/dashboard/components/ui/PhoneInputWithCode';
import Select from '@/modules/dashboard/components/ui/Select';
import { useEffect, useState } from 'react';
import ProgressIndicator from './ProgressIndicator';

interface Step1BasicInfoProps {
	data: {
		profession?: string;
		otherProfession?: string;
		specialty?: string;
		otherSpecialty?: string;
		country?: string;
		phone?: string;
		year?: string;
		career?: string;
	};
	onNext: () => void;
	onSkip: () => void;
	onBack?: () => void;
	onUpdate: (data: Partial<Step1BasicInfoProps['data']>) => void;
}

export default function Step1BasicInfo({ data, onNext, onSkip, onBack, onUpdate }: Step1BasicInfoProps) {
	const [profession, setProfession] = useState(data.profession || '');
	const [otherProfession, setOtherProfession] = useState(data.otherProfession || '');
	const [specialty, setSpecialty] = useState(data.specialty || '');
	const [country, setCountry] = useState(data.country || '');
	const [phone, setPhone] = useState(data.phone || '');
	const [year, setYear] = useState(data.year || '');
	const [career, setCareer] = useState(data.career || '');
	const [otherSpecialty, setOtherSpecialty] = useState(data.otherSpecialty || '');

	useEffect(() => {
		setProfession(data.profession || '');
	}, [data.profession]);

	useEffect(() => {
		setOtherProfession(data.otherProfession || '');
	}, [data.otherProfession]);

	useEffect(() => {
		// Reset specialty if profession changes and specialty belongs to the old profession
		const currentProfessionId = professions.find((p) => p.name === data.profession)?.id;
		const specialtyExistsInCurrentProfession =
			currentProfessionId && specialtiesGroup[currentProfessionId]?.some((s) => s.name === data.specialty);

		if (data.specialty && !specialtyExistsInCurrentProfession) {
			setSpecialty(''); // Clear specialty if it doesn't belong to the new profession
		} else {
			setSpecialty(data.specialty || '');
		}
	}, [data.specialty, data.profession]); // Depend on profession as well

	useEffect(() => {
		setOtherSpecialty(data.otherSpecialty || '');
	}, [data.otherSpecialty]);

	useEffect(() => {
		setCountry(data.country || '');
	}, [data.country]);

	useEffect(() => {
		setPhone(data.phone || '');
	}, [data.phone]);

	useEffect(() => {
		setYear(data.year || '');
	}, [data.year]);

	useEffect(() => {
		setCareer(data.career || '');
	}, [data.career]);

	const professionId = professions.find((p) => p.name === profession)?.id;

	const filteredSpecialties =
		professionId && specialtiesGroup[professionId]
			? specialtiesGroup[professionId].slice().sort((a, b) => a.name.localeCompare(b.name))
			: [];

	const isValid = profession && specialty && country && phone;

	return (
		<section className='w-full max-w-[1632px] h-fit relative z-8 mx-auto px-6 pt-[84px] md:pb-28 mb-16 md:py-16 md:px-9 font-inter'>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			{/* Botón volver */}
			<button
				onClick={onBack}
				className='md:top-10 md:left-8 top-5 left-5 flex z-10 items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-[#6E737C] hover:bg-gray-100 transition absolute'
			>
				<svg width='6' height='12' viewBox='0 0 6 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path d='M5 1L1 6L5 11' stroke='#1F2937' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
				</svg>
			</button>

			<div className='text-center mb-6 z-[1] '>
				<h2 className='text-2xl sm:text-3xl font-semibold pb-5 text-[#1A1A1A]'>
					Completa tu perfil y personaliza tu experiencia en MSK
				</h2>
				<ProgressIndicator currentStep={1} />
			</div>

			<form className='max-w-md mx-auto space-y-6 font-inter'>
				{/* Profesión */}
				<Select
					id='profession'
					label='Profesión'
					name='profession'
					options={professions.map((p) => ({ label: p.name, value: p.name }))}
					value={profession || ''}
					onChange={(e) => {
						setProfession(e.target.value);
						setSpecialty('');
					}}
					placeholder='Seleccionar profesión'
				/>

				{/* si selecciona "otra profesión" */}
				{profession === 'Otra profesión' && (
					<Input
						id='profession'
						type='text'
						name='profession'
						value={otherProfession || ''}
						onChange={(e) => setOtherProfession(e.target.value)}
						placeholder='Ingresar profesión'
						required
						autoComplete='profession'
					/>
				)}

				{/* si es estudiante. mostrar select año y carrera */}
				{profession === 'Estudiante' && (
					<div className='grid grid-cols-[1fr_2fr] gap-4'>
						<Select
							id='year'
							label='Año'
							name='year'
							options={years.map((p) => ({ label: p.label, value: p.value }))}
							placeholder='Seleccionar año'
							value={year}
							onChange={(e) => setYear(e.target.value)}
						/>
						<Select
							id='career'
							label='Carrera'
							name='career'
							options={careerOptions.map((p) => ({ label: p.label, value: p.value }))}
							placeholder='Seleccionar carrera'
							value={career}
							onChange={(e) => setCareer(e.target.value)}
						/>
					</div>
				)}

				{/* Especialidad */}
				<Select
					id='specialty'
					label='Especialidad'
					name='speciality'
					options={filteredSpecialties.map((s) => ({ label: s.name, value: s.name }))}
					value={specialty || ''}
					onChange={(e) => setSpecialty(e.target.value)}
					placeholder='Seleccionar especialidad'
				/>

				{/* si selecciona "otra especialidad" */}
				{specialty === 'Otra Especialidad' && (
					<Input
						id='specialty'
						type='text'
						name='specialty'
						value={otherSpecialty || ''}
						onChange={(e) => setOtherSpecialty(e.target.value)}
						placeholder='Ingresar especialidad'
						required
						autoComplete='specialty'
					/>
				)}
				{/* País */}
				<Select
					id='country'
					label='País'
					name='country'
					options={countries.map((p) => ({ label: p.name, value: p.name }))}
					placeholder='Seleccionar país'
					value={country}
					onChange={(e) => setCountry(e.target.value)}
				/>

				{/* Teléfono */}
				<PhoneInputWithCode
					id='phone'
					label='Teléfono'
					// Use fullPhoneNumber which holds the combined value
					value={phone}
					defaultCode={'+54'}
					onChange={(value) => setPhone(value)} // Correctly use the direct string value
					required
				/>

				{/* CTA: Siguiente */}
				<button
					type='button'
					disabled={!isValid}
					onClick={() => {
						onUpdate({
							profession,
							otherProfession,
							specialty,
							otherSpecialty,
							country,
							phone,
							year,
							career,
						});
						onNext();
					}}
					className={`w-full text-white py-3 px-4 rounded-[38px] font-inter font-medium transition ${
						isValid ? 'bg-[#9200AD] hover:bg-[#700084]' : 'bg-[#989CA4] cursor-not-allowed'
					}`}
				>
					Siguiente
				</button>

				{/* CTA: Completar más tarde */}
				<button
					type='button'
					onClick={onSkip}
					className='w-full mt-2 border border-gray-300 font-inter font-semibold text-sm text-[#1A1A1A] py-3 px-4 rounded-[38px] hover:bg-[#8387901a]'
				>
					Completar más adelante
				</button>
			</form>
		</section>
	);
}
