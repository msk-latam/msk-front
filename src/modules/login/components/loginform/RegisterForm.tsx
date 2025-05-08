'use client';

import { useSignup } from '@/hooks/useSignup';
import PhoneInputWithCode from '@/modules/dashboard/components/ui/PhoneInputWithCode';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	email: Yup.string().email('El correo no es válido').required('El correo es obligatorio'),

	first_name: Yup.string()
		.matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/, 'Solo se permiten letras, espacios, guiones y apóstrofes.')
		.max(10, 'Máximo 20 caracteres')
		.required('El nombre es obligatorio'),

	last_name: Yup.string()
		.matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/, 'Solo se permiten letras, espacios, guiones y apóstrofes.')
		.max(20, 'Máximo 20 caracteres')
		.required('El apellido es obligatorio'),

	//Se comenta porque el CRM ahora genera la contraseña automáticamente
	// password: Yup.string()
	// 	.required('La contraseña es obligatoria')
	// 	.test('len', 'Debe tener al menos 8 caracteres', (val) => (val?.length ?? 0) >= 8)
	// 	.test('upper', 'Debe incluir una letra mayúscula', (val) => /[A-Z]/.test(val || ''))
	// 	.test('lower', 'Debe incluir una letra minúscula', (val) => /[a-z]/.test(val || ''))
	// 	.test('digit', 'Debe incluir un número', (val) => /[0-9]/.test(val || ''))
	// 	.test('special', 'Debe incluir un carácter especial', (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val || '')),

	phone: Yup.string().min(7, 'Número inválido').max(20, 'Máximo 20 caracteres').required('El teléfono es obligatorio'),
});

type RegisterFormProps = {
	onBack: () => void;
};

export default function RegisterForm({ onBack }: RegisterFormProps) {
	const { signup, loading: signupLoading, error: signupError, success: signupSuccess } = useSignup();
	const searchParams = useSearchParams();
	const [submitted, setSubmitted] = useState(false);
	const [onRequest, setOnRequest] = useState(false);
	const [areaCode, setAreaCode] = useState('+54');
	const [error, setError] = useState<string | null>(null);
	const [phone, setPhone] = useState<string>('');
	let errorMessages: string = '...';
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
		watch,
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(validationSchema),
	});

	//const passwordValue = watch('password');

	useEffect(() => {
		const email = searchParams?.get('email');
		const firstName = searchParams?.get('firstName');
		const lastName = searchParams?.get('lastName');

		if (email) setValue('email', email);
		if (firstName) setValue('first_name', firstName);
		if (lastName) setValue('last_name', lastName);
	}, [searchParams, setValue]);

	const onSubmit = async (data: { phone: string; email: string; first_name: string; last_name: string }) => {
		setOnRequest(true);
		setError(null);

		const payload = {
			...data,
			country: 'AR',
			phone: `${data.phone}`,
			Terms_And_Conditions: true,
			email: data.email,
			first_name: data.first_name,
			last_name: data.last_name,
			profession: '-',
			speciality: '-',
			Otra_profesion: '',
			Otra_especialidad: '',
			Career: '',
			Year: '',
			type: '',
			identification: '',
		};

		signup(payload);
	};

	const handleSocialSignup = (connection: string) => {
		sessionStorage.setItem('needsProfileCompletion', 'true');
		window.location.href = `/api/auth/login?connection=${connection}`;
	};

	// componente visual de sugerencias en tiempo real para la contraseña
	//const passwordHints = [
	{
		/*	{
			label: 'Debe tener al menos 8 caracteres',
			valid: passwordValue?.length >= 8,
		},
		{
			label: 'Debe incluir una letra mayúscula',
			valid: /[A-Z]/.test(passwordValue || ''),
		},
		{
			label: 'Debe incluir una letra minúscula',
			valid: /[a-z]/.test(passwordValue || ''),
		},
		{
			label: 'Debe incluir un número',
			valid: /[0-9]/.test(passwordValue || ''),
		},
		{
			label: 'Debe incluir un carácter especial',
			valid: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue || ''),
		},
	];*/
	}

	if (submitted) {
		return (
			<div className='w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 p-4 md:mb-20 z-[10] relative overflow-visible max-w-[1600px] mx-auto md:px-4 h-screen md:h-auto'>
				<div className='text-center py-20'>
					<div className='flex justify-center w-full animate-pulse'>
						<div className='w-44 mx-auto h-auto p-6'>
							<img src='/images/emails/email-icon.svg' alt='Correo enviado' />
						</div>
					</div>
					<h2 className='text-xl font-semibold text-[#1A1A1A] mb-2 font-Raleway'>¡Listo!</h2>
					<p className='text-sm text-[#6E737C] max-w-md md:pb-6 mx-auto font-inter'>
						Recibirás en tu casilla de e-mail un correo de verificación. <br />
						Revisa tu bandeja de entrada, spam o correos no deseados.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:p-0 md:mb-20 z-[10] relative overflow-visible mx-auto'>
			<button
				onClick={onBack}
				className='md:top-10 md:left-8 top-5 left-5 flex z-10 items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition absolute'
			>
				<svg width='6' height='12' viewBox='0 0 6 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path d='M5 1L1 6L5 11' stroke='#1F2937' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
				</svg>
			</button>

			<section className='w-full max-w-[1632px] h-fit relative z-8 mx-auto px-6 pt-[84px] pb-28 md:py-16 md:px-9'>
				<div className='text-center mb-6'>
					<h1 className='md:text-[34px] text-2xl md:mb-6 mb-2 text-[#1A1A1A] font-medium font-raleway'>Crear cuenta</h1>
					<p className='text-base md:text-[18px] text-[#6E737C] mt-1 font-inter'>
						Regístrate y disfruta al máximo de nuestra propuesta académica
					</p>
				</div>

				<form className='max-w-md mx-auto space-y-6 font-inter' onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label className='block text-sm font-medium text-[#1A1A1A] text-left'>E-mail</label>
						<input
							type='email'
							maxLength={50}
							{...register('email')}
							placeholder='Ingresar e-mail'
							className='mt-1 w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
						/>
						{errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
					</div>

					<PhoneInputWithCode
						id='phone'
						label='Teléfono'
						value={phone}
						defaultCode={'+54'}
						onChange={(value) => setPhone(value)} // Correctly use the direct string value
						required
					/>

					<div>
						<label className='block text-sm font-medium text-[#1A1A1A] text-left'>Nombre/s</label>
						<input
							type='text'
							maxLength={20}
							{...register('first_name')}
							placeholder='Ingresar nombre/s'
							className='mt-1 w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
						/>
						{errors.first_name && <p className='text-red-500 text-xs mt-1'>{errors.first_name.message}</p>}
					</div>

					<div>
						<label className='block text-sm font-medium text-[#1A1A1A] text-left'>Apellido/s</label>
						<input
							type='text'
							maxLength={20}
							{...register('last_name')}
							placeholder='Ingresar apellido/s'
							className='mt-1 w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
						/>
						{errors.last_name && <p className='text-red-500 text-xs mt-1'>{errors.last_name.message}</p>}
					</div>

					{/* ✅ Contraseña eliminada temporalmente porque el CRM la genera automáticamente por email */}
					{/*
<div>
	<label className='block text-sm font-medium text-[#1A1A1A] text-left'>Contraseña</label>
	<div className='relative'>
		<input
			type={showPassword ? 'text' : 'password'}
			{...register('password')}
			placeholder='Ingresar contraseña'
			className='mt-1 w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 pr-10 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
		/>
		<button
			type='button'
			onClick={() => setShowPassword(!showPassword)}
			className='absolute right-3 top-1/2 -translate-y-1/2'
		>
			<Image
				src={showPassword ? '/icons/eye-off.svg' : '/icons/eye.svg'}
				alt='Mostrar/Ocultar'
				width={20}
				height={20}
			/>
		</button>
	</div>
	{errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}

	<ul className='text-sm mt-3 space-y-2'>
		{passwordHints.map((hint, index) => (
			<li key={index} className='flex items-center gap-2'>
				<div
					className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
						hint.valid ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-400'
					}`}
				>
					{hint.valid && <Check size={16} />}
				</div>
				<span className={hint.valid ? 'text-green-600' : 'text-gray-400'}>{hint.label}</span>
			</li>
		))}
	</ul>
</div>
*/}

					<button
						type='submit'
						disabled={!isValid}
						className={`w-full text-white py-3 px-4 rounded-[38px] font-inter font-medium transition ${
							isValid ? 'bg-[#9200AD] hover:bg-[#700084]' : 'bg-[#989CA4] cursor-not-allowed'
						} ${onRequest ? 'opacity-75 cursor-wait' : ''}`}
					>
						{onRequest ? 'Creando...' : 'Crear'}
					</button>

					<p className='text-xs text-center text-[#6E737C] font-inter'>
						Al registrarte, aceptás las{' '}
						<a href='#' className='text-[#9200AD] font-medium underline'>
							condiciones de privacidad
						</a>{' '}
						y los{' '}
						<a href='#' className='text-[#9200AD] font-medium underline'>
							términos y condiciones
						</a>
					</p>

					<div className='flex items-center gap-2'>
						<hr className='w-full border-[#6E737C]' />
						<span
							className='px-2 py-0.5 bg-white text-[#6E737C]'
							style={{
								fontFamily: 'DM Sans, sans-serif',
								fontWeight: 400,
								fontSize: '14px',
								lineHeight: '22px',
								letterSpacing: '0.5%',
							}}
						>
							o
						</span>
						<hr className='w-full border-[#6E737C]' />
					</div>

					{[
						{ name: 'Google', icon: '/icons/google.svg', connection: 'google-oauth2' },
						{ name: 'Facebook', icon: '/icons/facebook.svg', connection: 'facebook' },
						{ name: 'Apple', icon: '/icons/apple.svg', connection: 'apple' },
					].map((provider) => (
						<button
							key={provider.name}
							type='button'
							onClick={() => handleSocialSignup(provider.connection)}
							className='w-full border border-gray-300 rounded-[38px] py-2 flex items-center justify-center gap-2 font-inter font-medium hover:bg-gray-100 transition'
						>
							Crear con {provider.name}
							<Image src={provider.icon} alt={provider.name} width={20} height={20} />
						</button>
					))}

					<p className='text-center text-sm text-[#6E737C] mt-4 font-inter'>
						¿Ya tienes una cuenta?{' '}
						<button type='button' onClick={onBack} className='text-[#9200AD] underline font-medium'>
							Inicia sesión aquí
						</button>
					</p>
				</form>
			</section>
		</div>
	);
}
