'use client';
import { careerOptions } from '@/data/careers';
import { countries } from '@/data/countries';
import { professions } from '@/data/professions';
import { specialtiesGroup } from '@/data/specialties';
import { years } from '@/data/years';
import Input from '@/modules/dashboard/components/ui/Input';
import Select from '@/modules/dashboard/components/ui/Select';
import { useState } from 'react';
import ProgressIndicator from './ProgressIndicator';

interface Step1BasicInfoProps {
	data: {
		profession?: string;
		specialty?: string;
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
	const [otherProfession, setOtherProfession] = useState('');
	const [specialty, setSpecialty] = useState(data.specialty || '');
	const [country, setCountry] = useState(data.country || '');
	const [phone, setPhone] = useState(data.phone || '');
	const [year, setYear] = useState(data.year || '');
	const [career, setCareer] = useState(data.career || '');

	const professionId = professions.find((p) => p.name === profession)?.id;

	const filteredSpecialties =
		professionId && specialtiesGroup[professionId]
			? specialtiesGroup[professionId].slice().sort((a, b) => a.name.localeCompare(b.name))
			: [];

	const isValid = profession && specialty && country && phone;

	return (
		<section className='w-full max-w-[1632px] h-fit relative z-8 mx-auto px-6 pt-[84px] md:pb-28 mb-16 md:py-16 md:px-9 font-inter'>
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

				{/* País */}
				<Select
					id='country'
					label='País'
					name='country'
					options={countries.map((p) => ({ label: p.name, value: p.id }))}
					placeholder='Seleccionar país'
					value={country}
					onChange={(e) => setCountry(e.target.value)}
				/>

				{/* Teléfono */}
				{/* <PhoneInputWithCode
					id='phone'
					label='Teléfono'
					// Use fullPhoneNumber which holds the combined value
					value={phone}
					defaultCode={'+54'}
					onChange={(e) => setPhone(e.target.value)} // Use the new handler
					required
				/> */}
				{/* <div>
					<label className='block text-sm font-medium text-[#1A1A1A] text-left mb-1'>Teléfono</label>
					<div className='flex gap-2 border rounded-2xl border-[#DBDDE2] px-3 py-2 focus-within:ring-4 focus-within:ring-[#F5E6F7]'>
						<select
							className='border-0 bg-transparent focus:ring-0 focus:outline-none text-[#1A1A1A] w-24'
							defaultValue='+54'
						>
							<option value='+54'>+54</option>
							<option value='+52'>+52</option>
							<option value='+57'>+57</option>
						</select>
						<input
							type='tel'
							placeholder='Ingresar teléfono'
							value={phone}
							onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
							className='flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-[#6E737C]'
						/>
					</div>
				</div> */}

				{/* CTA: Siguiente */}
				<button
					type='button'
					disabled={!isValid}
					onClick={onNext}
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
