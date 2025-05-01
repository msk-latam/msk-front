// 'use client'

// type RecoveryPasswordSentProps = {
//   onContinue?: () => void
// }

// export default function RecoveryPasswordSent({ onContinue }: RecoveryPasswordSentProps) {
//   return (
//     <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:mb-24 py-10 z-[10] relative overflow-visible max-w-[1600px] h-screen md:h-full flex md:items-center justify-center">
//       <section
//         className="w-full max-w-[1632px] relative z-[1] mx-auto px-4 py-6 sm:py-12 text-center"
//         style={{ fontFamily: 'Raleway, sans-serif' }}
//       >
//         <div className="flex justify-center">
//           <div className="rounded-full w-44 mx-auto h-auto p-6">
//             <img src="/images/emails/email-icon.svg" alt="Correo enviado" />
//           </div>
//         </div>

//         <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 md:mb-2">Correo enviado</h2>
//         <p className="text-sm text-gray-600 max-w-md mx-auto">
//           Revisa tu bandeja de entrada, spam o correos no deseados y sigue los pasos detallados.
//         </p>

//         {onContinue && (
//           <button
//             onClick={onContinue}
//             className="mt-6 bg-purple-700 hover:bg-purple-800 text-white py-2 px-6 rounded-[20px]"
//           >
//             Continuar
//           </button>
//         )}
//       </section>
//     </div>
//   )
// }

'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import { supportedLanguages } from '@/config/languages';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function NewPasswordForm() {
	const pathname = usePathname();
	const pathParts = pathname.split('/');
	const lang = supportedLanguages.includes(pathParts[1]) ? pathParts[1] : 'ar';

	const handleRedirect = () => {
		window.location.href = getLocalizedUrl(lang, '/login');
	};

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
					<h2 className='text-2xl sm:text-3xl font-semibold text-gray-900 md:mb-6 mb-2'>¡Listo!</h2>
					<p className='text-sm text-gray-600 max-w-md mx-auto mb-4'>
						Ya confirmaste tu e-mail. En breve recibirás un correo con tus credenciales de{' '}
						<strong>Medical & Scientific Knowledge</strong>.
					</p>
					<button
						onClick={handleRedirect}
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
				<div className='text-center mt-16 mb-6'>
					<h1 className='text-2xl md:text-3xl md:pb-6 mb-2 font-semibold text-gray-900'>Cambiar contraseña</h1>
					<p className='text-base md:text[18px] text-gray-500'>Elige una nueva clave para iniciar sesión</p>
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
								className='absolute right-3 top-3 p-1 text-gray-500'
							>
								{showPassword ? (
									<img src='/icons/eye-off.svg' alt='Ocultar contraseña' width={20} height={20} />
								) : (
									<img src='/icons/eye.svg' alt='Mostrar contraseña' width={20} height={20} />
								)}
							</button>
						</div>
						{errors.password && <p className='text-red-500 text-sm mt-2'>{errors.password.message}</p>}

						<ul className='text-sm mt-4 space-y-2'>
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
