'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { supportedLanguages } from '@/config/languages';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import { useParams } from 'next/navigation';

export default function NewPasswordForm() {
	const params = useParams();
	const lang = typeof params.lang === 'string' ? params.lang : 'es';

	useEffect(() => {
		const pathname = window.location.pathname;
		const search = window.location.search;
		const pathParts = pathname.split('/').filter(Boolean);

		const hasLang = supportedLanguages.includes(pathParts[0]);

		// ✅ Solo correr si estamos en el flujo de recuperación
		const inRecoveryFlow = document.cookie.includes('recovery_flow_active=true');
		if (!inRecoveryFlow) {
			return;
		}

		if (!hasLang) {
			const country =
				document.cookie
					.split('; ')
					.find((row) => row.startsWith('country='))
					?.split('=')[1] || 'ar';

			if (country === 'ar' && pathname.startsWith('/change-pass')) {
				return;
			}

			const newLang = supportedLanguages.includes(country) ? country : 'ar';
			const newPath = `/${newLang}${pathname}${search}`;
			window.location.replace(newPath);
		}
	}, []);

	useEffect(() => {
		// Desactiva recovery_flow_active al entrar al formulario de nueva contraseña
		document.cookie = 'recovery_flow_active=; Max-Age=0; path=/';
	}, []);

	const validationSchema = Yup.object().shape({
		password: Yup.string()
			.required('La contraseña es obligatoria')
			.test('len', 'Debe tener al menos 8 caracteres', (val) => (val?.length ?? 0) >= 8)
			.test('upper', 'Debe incluir una letra mayúscula', (val) => /[A-Z]/.test(val || ''))
			.test('lower', 'Debe incluir una letra minúscula', (val) => /[a-z]/.test(val || ''))
			.test('digit', 'Debe incluir un número', (val) => /[0-9]/.test(val || ''))
			.test('special', 'Debe incluir un carácter especial', (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val || '')),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	});

	const password = watch('password') || '';
	const [showPassword, setShowPassword] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const passwordHints = [
		{ label: 'Debe tener al menos 8 caracteres', valid: password.length >= 8 },
		{ label: 'Debe incluir una letra mayúscula', valid: /[A-Z]/.test(password) },
		{ label: 'Debe incluir una letra minúscula', valid: /[a-z]/.test(password) },
		{ label: 'Debe incluir un número', valid: /[0-9]/.test(password) },
		{ label: 'Debe incluir un carácter especial', valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
	];

	const isPasswordValid = passwordHints.every((hint) => hint.valid);

	if (submitted) {
		return (
			<div className='w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:mb-24 p-4 sm:p-20 pb-[80px] md:pb-0 z-[10] relative overflow-visible max-w-[1600px] mx-auto md:px-4 min-h-fit h-[550px] flex md:items-center justify-center'>
				<section className='w-full max-w-[1632px] absolute top-0 z-[1] mx-auto px-4 py-6 sm:py-12 md:mt-20 mt-28 text-center'>
					<h2 className='mb-2 text-2xl font-semibold text-gray-900 sm:text-3xl md:mb-6'>¡Listo!</h2>
					<p className='max-w-md mx-auto mb-4 text-sm text-gray-600'>
						Ya confirmaste tu e-mail. En breve podrás iniciar sesión con tu nueva contraseña en{' '}
						<strong>Medical & Scientific Knowledge</strong>.
					</p>
					<button
						onClick={() => {
							document.cookie = 'recovery_flow_active=; Max-Age=0; path=/';
							document.cookie = 'country=; Max-Age=0; path=/';
							window.location.href = getLocalizedUrl(lang, '/tienda');
						}}
						className='mt-6 bg-[#9200ad] hover:bg-purple-800 text-white py-3 px-6 rounded-full'
					>
						Seguir navegando
					</button>
				</section>
			</div>
		);
	}

	return (
		<div className='w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:mb-24 p-4 sm:p-20 pb-[80px] md:pb-0 z-[10] relative overflow-visible max-w-[1600px] min-h-fit h-[550px] flex md:items-center justify-center'>
			<section className='w-full max-w-[1632px] absolute md:top-0 z-[1] mx-auto px-4 md:py-12'>
				<div className='mt-16 mb-6 text-center'>
					<h1 className='mb-2 text-2xl font-semibold text-gray-900 md:text-3xl md:pb-6'>Cambiar contraseña</h1>
					<p className='text-base md:text-[18px] text-gray-500'>Elige una nueva clave para iniciar sesión</p>
				</div>

				<form
					onSubmit={handleSubmit(async ({ password }) => {
						const urlParams = new URLSearchParams(window.location.search);
						const token = urlParams.get('token');

						if (!token) {
							alert('Token inválido.');
							return;
						}

						try {
							const res = await fetch('https://laravel-api.msklatam.com/msk-laravel/public/api/newPassword', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									password,
									validator: token,
								}),
							});

							if (res.ok) {
								setSubmitted(true);
							} else {
								const data = await res.json();
								alert(data.message || 'Ocurrió un error al cambiar la contraseña.');
							}
						} catch (err) {
							console.error(err);
							alert('Error de red. Intenta nuevamente.');
						}
					})}
					className='max-w-md mx-auto space-y-5'
				>
					<div>
						<label className='block text-sm font-medium text-[#1a1a1a] text-left pl-2 mb-2'>Nueva contraseña</label>
						<div className='relative'>
							<input
								type={showPassword ? 'text' : 'password'}
								placeholder='Ingresar nueva contraseña'
								{...register('password')}
								className='mt-0 w-full text-base rounded-2xl border border-[#DBDDE2] p-3 pl-4 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
							/>
							<button
								type='button'
								onClick={() => setShowPassword(!showPassword)}
								className='absolute p-1 text-gray-500 right-3 top-3'
							>
								<img
									src={showPassword ? '/icons/eye-off.svg' : '/icons/eye.svg'}
									alt={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
									width={20}
									height={20}
								/>
							</button>
						</div>
						{errors.password && <p className='mt-2 text-sm text-red-500'>{errors.password.message}</p>}

						<ul className='mt-4 space-y-2 text-sm'>
							{passwordHints.map((hint, index) => (
								<li key={index} className='flex items-center gap-2'>
									<div
										className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
											hint.valid ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-400'
										}`}
									>
										{hint.valid && (
											<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
												<path
													d='M4 8L7 11L12 5'
													stroke='currentColor'
													strokeWidth='2'
													strokeLinecap='round'
													strokeLinejoin='round'
												/>
											</svg>
										)}
									</div>
									<span className={hint.valid ? 'text-green-600' : 'text-gray-400'}>{hint.label}</span>
								</li>
							))}
						</ul>
					</div>

					<button
						type='submit'
						disabled={!isPasswordValid}
						className={`w-full text-white py-3 px-4 rounded-[38px] transition ${
							isPasswordValid ? 'bg-[#9200ad] hover:bg-purple-700' : 'bg-gray-300 cursor-not-allowed'
						}`}
					>
						Guardar cambios
					</button>
				</form>
			</section>
		</div>
	);
}
