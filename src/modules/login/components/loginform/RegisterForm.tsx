'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type RegisterFormProps = {
	onBack: () => void;
};

type SignUpApiPayload = {
	email: string;
	first_name: string;
	last_name: string;
	password: string;
	country: string;
	phone: string;
	profession: string;
	speciality: string;
	Otra_profesion: string;
	Otra_especialidad: string;
	Career: string;
	Year: string;
	type: string;
	identification: string;
	Terms_And_Conditions: boolean;
};

type SignUpSuccessResponse = {
	access_token: string;
};

type SignUpErrorResponse = {
	message?: string;
	errors?: {
		[key: string]: string[];
	};
};

const API_SIGNUP_URL = 'https://dev.msklatam.tech/msk-laravel/public/api/signup';

export default function RegisterForm({ onBack }: RegisterFormProps) {
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [phone, setPhone] = useState('');
	const [areaCode, setAreaCode] = useState('+54');
	const [submitted, setSubmitted] = useState(false);
	const [onRequest, setOnRequest] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const searchParams = useSearchParams();

	useEffect(() => {
		const emailParam = searchParams.get('email');
		const firstNameParam = searchParams.get('firstName');
		const lastNameParam = searchParams.get('lastName');

		if (emailParam) setEmail(emailParam);
		if (firstNameParam) setFirstName(firstNameParam);
		if (lastNameParam) setLastName(lastNameParam);
	}, [searchParams]);

	const executeRecaptcha = async (action: string): Promise<string> => {
		console.warn('Using placeholder executeRecaptcha');
		return 'dummy-recaptcha-token';
	};

	const isValid =
		email.trim() !== '' &&
		firstName.trim() !== '' &&
		lastName.trim() !== '' &&
		password.trim() !== '' &&
		phone.trim() !== '' &&
		!onRequest;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isValid || !executeRecaptcha) return;

		setOnRequest(true);
		setError(null);

		try {
			const formData: SignUpApiPayload = {
				first_name: firstName,
				last_name: lastName,
				email: email,
				country: 'AR',
				password: password,
				phone: `${areaCode}${phone}`,
				profession: '-',
				speciality: '-',
				Otra_profesion: '',
				Otra_especialidad: '',
				Career: '',
				Year: '',
				type: '',
				identification: '',
				Terms_And_Conditions: true,
			};

			const response = await fetch(API_SIGNUP_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const resData: SignUpSuccessResponse | SignUpErrorResponse = await response.json();

			if (response.ok && 'access_token' in resData) {
				setSubmitted(true);
			} else {
				let errorMessages = 'Ocurrió un error al registrar la cuenta.';
				if (!response.ok && 'errors' in resData && resData.errors) {
					const errorValues = Object.values(resData.errors).flat();
					errorMessages = errorValues
						.map((msg: unknown) => {
							if (typeof msg === 'string' && msg.includes('El Email ya ha sido registrado')) {
								return (
									msg +
									' <a href="/login" class="font-bold cursor-pointer text-violet-custom hover:underline hover:text-violet-custom">Inicia sesión</a>'
								);
							}
							return String(msg);
						})
						.join('<br />');
				} else if (!response.ok && 'message' in resData && resData.message) {
					errorMessages = resData.message;
				}
				setError(errorMessages);
			}
		} catch (err) {
			console.error('Error during sign up:', err);
			setError('No se pudo conectar con el servidor. Inténtalo de nuevo.');
		} finally {
			setOnRequest(false);
		}
	};

	const handleSocialSignup = (connection: string) => {
		sessionStorage.setItem('needsProfileCompletion', 'true');
		window.location.href = `/api/auth/login?connection=${connection}`;
	};

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

				<form className='max-w-md mx-auto space-y-6 font-inter' onSubmit={handleSubmit}>
					<div>
						<label className='block text-sm font-medium text-[#1A1A1A] text-left'>E-mail</label>
						<input
							type='email'
							placeholder='Ingresar e-mail'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className='mt-1 w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-[#1A1A1A] text-left mb-1'>Teléfono</label>
						<div className='flex gap-2 border rounded-2xl border-[#DBDDE2] px-3 py-2 focus-within:ring-4 focus-within:ring-[#F5E6F7]'>
							<select
								className='border-0 bg-transparent focus:ring-0 focus:outline-none text-[#1A1A1A] w-24'
								defaultValue='+54'
								onChange={(e) => setAreaCode(e.target.value)}
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
					</div>
					<div>
						<label className='block text-sm font-medium text-[#1A1A1A] text-left'>Nombre/s</label>
						<input
							type='text'
							placeholder='Ingresar nombre/s'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
							className='mt-1 w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-[#1A1A1A] text-left'>Apellido/s</label>
						<input
							type='text'
							placeholder='Ingresar apellido/s'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
							className='mt-1 w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-[#1A1A1A] text-left'>Contraseña</label>
						<div className='relative'>
							<input
								type={showPassword ? 'text' : 'password'}
								placeholder='Ingresar contraseña'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className='mt-1 w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 pr-10 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
							/>
							<button
								type='button'
								onClick={() => setShowPassword(!showPassword)}
								className='absolute right-3 top-[50%] translate-y-[-50%]'
							>
								<Image
									src={showPassword ? '/icons/eye-off.svg' : '/icons/eye.svg'}
									alt='Mostrar/Ocultar'
									width={20}
									height={20}
									className='opacity-70'
								/>
							</button>
						</div>
					</div>

					{error && (
						<div
							className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative text-sm'
							role='alert'
							dangerouslySetInnerHTML={{ __html: error }}
						/>
					)}

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
