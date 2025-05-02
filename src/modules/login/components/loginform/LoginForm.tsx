'use client';

import { supportedLanguages } from '@/config/languages';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type LoginFormProps = {
	onCreateAccount: () => void;
	onBack: () => void;
	onForgotPassword: () => void;
};

// Define the structure for the login API response
type LoginApiResponse = {
	token: string;
	name: string;
	speciality: string;
	token_type: string;
	message?: string; // For errors like 401
};

// Define the structure for the data sent to the backend
type LoginApiPayload = {
	email: string;
	password: string; // Assuming backend expects 'contrasenia' based on typical Spanish naming, adjust if needed
};

// Placeholder for your actual API URL - replace with env variable ideally
// const API_SIGN_IN_URL = 'https://dev.msklatam.tech/msk-laravel/public/api/login';
// Usaremos nuestro endpoint interno
const API_SIGN_IN_URL = '/api/auth/login-c?returnTo=es/dashboard';

export default function LoginForm({ onBack, onCreateAccount, onForgotPassword }: LoginFormProps) {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [shouldAskToCompleteProfile, setShouldAskToCompleteProfile] = useState(false);
	const [onRequest, setOnRequest] = useState(false); // Loading state
	const [loginError, setLoginError] = useState<string | null>(null); // Login error state
	const params = useParams();
	const lang = params.lang || 'es';

	const executeRecaptcha = async (action: string): Promise<string> => {
		console.warn('Using placeholder executeRecaptcha');
		return 'dummy-recaptcha-token';
	};
	const dispatch = (action: { type: string; payload: any }) => {
		console.warn('Using placeholder dispatch', action);
	};
	// --- End Placeholders ---

	const isFormValid = email.trim() !== '' && password.trim() !== '' && !onRequest; // Disable submit when requesting

	useEffect(() => {
		// 🔁 Lógica escalable para cuando se integre Auth0 o localStorage
		// Por ahora siempre true para mostrar el modal
		const userShouldCompleteProfile = true; // cambiar luego por localStorage / auth0 check
		setShouldAskToCompleteProfile(userShouldCompleteProfile);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isFormValid || !executeRecaptcha) return; // Exit if form invalid, loading, or recaptcha not ready

		setOnRequest(true);
		setLoginError(null); // Clear previous errors

		try {
			const recaptchaToken = await executeRecaptcha('login');
			const formData: LoginApiPayload = {
				email: email,
				password: password, // Ensure backend expects 'contrasenia'
			};

			const response = await fetch(API_SIGN_IN_URL, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				router.push(`/${lang}/dashboard/`);
			} else {
				// Intentar obtener el mensaje de error del cuerpo de la respuesta
				try {
					const errorData = await response.json();
					setLoginError(errorData.message || `Error: ${response.status} ${response.statusText}`);
				} catch (parseError) {
					// Si el cuerpo no es JSON o está vacío, usar el statusText
					setLoginError(`Error: ${response.status} ${response.statusText}`);
				}
			}
		} catch (error) {
			console.error('Login failed:', error);
			setLoginError('Ocurrió un error inesperado. Inténtalo de nuevo.');
		} finally {
			setOnRequest(false); // Reset loading state
		}
	};

	const handleRedirect = (path: string) => {
		setShowModal(false);
		router.push(path);
	};

	const handleSocialLogin = (connection: string) => {
		console.log('Redirecting to Auth0 login endpoint for connection:', connection);
		window.location.href = `/api/auth/login?connection=${connection}`;
	};

	return (
		<div className='w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:p-0 md:mb-20 z-[10] relative overflow-visible max-w-[1600px] mx-auto md:px-4'>
			{/* ✅ Modal */}
			{showModal && (
				<div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
					<div className='bg-white p-6 rounded-2xl max-w-sm w-full shadow-lg text-center'>
						<h2 className='text-lg font-semibold text-gray-800 mb-4'>¿Querés completar tu perfil ahora?</h2>
						<div className='flex justify-between gap-4'>
							<button
								onClick={() => handleRedirect('/profile-completion')}
								className='flex-1 bg-[#9200AD] hover:bg-[#700084] text-white font-medium py-2 rounded-full transition'
							>
								Sí
							</button>
							<button
								onClick={() => handleRedirect('/dashboard')}
								className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-full transition'
							>
								No
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Resto del login (sin cambios) */}
			<div className='absolute md:top-10 md:left-8 top-5 left-5 flex z-10'>
				<button
					onClick={onBack}
					className='w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition'
				>
					<svg width='6' height='12' viewBox='0 0 6 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path d='M5 1L1 6L5 11' stroke='#1F2937' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
					</svg>
				</button>
			</div>

			<section className='w-full h-fit relative z-8 mx-auto px-6 pt-[84px] pb-28 md:py-16 md:px-9'>
				<div className='text-center mb-6'>
					<h1 className='md:text-[34px] text-[#1A1A1A] text-[24px] md:mb-6 mb-2 font-raleway font-medium'>Iniciar sesión</h1>
					<p className='text-[16px] md:text-[18px] font-inter text-[#6E737C] mt-1'>Accede a tu perfil personal</p>
				</div>

				<form onSubmit={handleSubmit} className='max-w-md mx-auto space-y-6 font-inter'>
					{/* Email */}
					<div>
						<label htmlFor='email' className='block text-[#1A1A1A] font-medium text-left'>
							E-mail
						</label>
						<input
							id='email'
							type='email'
							placeholder='Ingresar e-mail'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='mt-1 w-full rounded-2xl border border-gray-300 p-3 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
						/>
					</div>

					{/* Contraseña */}
					<div>
						<div className='flex justify-between items-center'>
							<label htmlFor='password' className='block text-[#1A1A1A] font-medium text-left'>
								Contraseña
							</label>
							<button
								type='button'
								onClick={() => {
									const pathLang = window.location.pathname.split('/').filter(Boolean)[0];
									const lang = supportedLanguages.includes(pathLang) ? pathLang : 'ar';

									document.cookie = 'recovery_flow_active=true; path=/; max-age=600';
									document.cookie = `country=${lang}; path=/; max-age=60`;

									console.log('[LoginForm] Activando flujo de recuperación con lang:', lang);
									onForgotPassword();
								}}
								className='text-[#9200AD]'
							>
								¿Olvidaste tu contraseña?
							</button>
						</div>
						<div className='relative'>
							<input
								id='password'
								type={showPassword ? 'text' : 'password'}
								placeholder='Ingresar contraseña'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='mt-1 w-full rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] text-[#6e737c] py-2.5 px-3.5'
							/>
							<button
								type='button'
								onClick={() => setShowPassword(!showPassword)}
								className='absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-200'
								aria-label='Mostrar/Ocultar contraseña'
							>
								<Image
									src={showPassword ? '/icons/eye-off.svg' : '/icons/eye.svg'}
									alt={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
									width={20}
									height={14}
								/>
							</button>
						</div>
					</div>

					{/* Display Login Error */}
					{loginError && (
						<div
							className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative text-sm'
							role='alert'
						>
							<span className='block sm:inline'>{loginError}</span>
						</div>
					)}

					{/* Acceder */}
					<button
						type='submit'
						disabled={!isFormValid}
						className={`w-full py-3 px-4 rounded-[38px] font-medium text-white transition font-inter ${
							isFormValid ? 'bg-[#9200AD] hover:bg-[#700084]' : 'bg-[#989CA4] cursor-not-allowed'
						} ${onRequest ? 'opacity-75 cursor-wait' : ''}`}
					>
						{onRequest ? 'Accediendo...' : 'Acceder'}
					</button>

					{/* Divider */}
					<div className='flex items-center gap-2 mt-4'>
						<hr className='w-full border-[#6E737C]' />
						<span
							className='px-2 py-0.5 bg-white text-[#6E737C]'
							style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', lineHeight: '22px' }}
						>
							O
						</span>
						<hr className='w-full border-[#6E737C]' />
					</div>

					{/* Redes sociales */}
					<div className='space-y-4 mt-2'>
						{[
							{ name: 'Google', icon: '/icons/google.svg', connection: 'google-oauth2' },
							{ name: 'Facebook', icon: '/icons/facebook.svg', connection: 'facebook' },
							{ name: 'Apple', icon: '/icons/apple.svg', connection: 'apple' },
							// NOTE: Ensure these connection names ('google-oauth2', 'facebook', 'apple')
							// match exactly how they are named in your Auth0 dashboard connections.
						].map((provider) => (
							<button
								key={provider.name}
								type='button'
								onClick={() => handleSocialLogin(provider.connection)}
								className='w-full border text-sm font-medium border-gray-300 rounded-[38px] py-[14px] flex items-center justify-center gap-2 font-inter transition hover:bg-gray-100 hover:text-gray-800'
							>
								Continuar con {provider.name}
								<img src={provider.icon} alt={provider.name} className='h-5 w-5' />
							</button>
						))}
					</div>

					{/* Crear cuenta */}
					<p className='text-center text-base text-[#6E737C] mt-4 font-inter'>
						¿No tienes una cuenta?{' '}
						<button type='button' onClick={onCreateAccount} className='text-[#9200AD] underline'>
							Créala aquí
						</button>
					</p>
				</form>
			</section>
		</div>
	);
}
