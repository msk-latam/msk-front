'use client';

import { useState } from 'react';

type RecoveryPasswordProps = {
	onBack: () => void;
	onSent: () => void;
};

export default function RecoveryPassword({ onBack, onSent }: RecoveryPasswordProps) {
	const [email, setEmail] = useState('');
	const isValid = email.trim() !== '';
	const [emailSent, setEmailSent] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch('https://laravel-api.msklatam.com/msk-laravel/public/api/RequestPasswordChange', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});

			if (res.ok) {
				setEmailSent(true); // ✅ Mostramos mensaje solo después del envío
			} else {
				const data = await res.json();
				alert(data.message || 'Error al enviar el correo.');
			}
		} catch (err) {
			console.error(err);
			alert('No se pudo conectar con el servidor.');
		}
	};

	if (emailSent) {
		return (
			<div className='w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:mb-24 py-10 z-[10] relative overflow-visible max-w-[1600px] h-screen md:h-full flex md:items-center justify-center'>
				<section className='w-full max-w-[1632px] relative z-[1] mx-auto px-4 py-6 sm:py-12 text-center'>
					<div className='flex justify-center w-full animate-pulse'>
						<div className='w-44 mx-auto h-auto p-6'>
							<img src='/images/emails/email-icon.svg' alt='Correo enviado' />
						</div>
					</div>
					<h2 className='text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 md:mb-2'>Correo enviado</h2>
					<p className='text-sm text-gray-600 max-w-md mx-auto'>
						Revisa tu bandeja de entrada, spam o correos no deseados y sigue los pasos detallados.
					</p>
				</section>
			</div>
		);
	}

	return (
		<div className='w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:p-0 md:mb-20 z-[10] overflow-visible max-w-[1600px] mx-auto md:px-4 h-full min-h-96'>
			{/* 🔙 Botón de volver */}
			<div className='relative md:top-10 md:left-8 top-5 left-5 z-10'>
				<button
					onClick={onBack}
					className='w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition'
				>
					<svg width='6' height='12' viewBox='0 0 6 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path d='M5 1L1 6L5 11' stroke='#1F2937' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
					</svg>
				</button>
			</div>

			<section className='w-full max-w-[1632px] h-fit relative z-8 mx-auto px-6 pt-[84px] pb-28 md:py-16 md:px-9'>
				{/* 🧾 Título */}
				<div className='text-center mb-6'>
					<h1
						className='md:text-3xl text-2xl font-[500] pb-2 md:pb-6 text-gray-900'
						style={{ fontFamily: 'Raleway, sans-serif' }}
					>
						Cambiar contraseña
					</h1>
					<p className='text-base md:text-[18px] font-inter text-gray-500 mt-1'>
						Te enviaremos un correo para que puedas crear una nueva
					</p>
				</div>

				{/* 📧 Formulario */}
				<form onSubmit={handleSubmit} className='max-w-md mx-auto space-y-6'>
					<div>
						<label htmlFor='email' className='block font-medium text-sm text-gray-700 text-left font-inter'>
							E-mail
						</label>
						<input
							id='email'
							type='email'
							placeholder='Ingresar e-mail'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='mt-1 w-full text-base font-inter rounded-2xl border border-gray-300 p-3 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7]'
						/>
						{/* Si en el futuro hay error visual, podés agregar una clase como: border-red-500 bg-red-50 */}
					</div>

					<button
						type='submit'
						disabled={!isValid}
						className={`w-full text-white py-3 px-4 rounded-full font-inter font-medium transition ${
							isValid ? 'bg-[#9200AD] hover:bg-[#700084]' : 'bg-[#989CA4] cursor-not-allowed'
						}`}
					>
						Confirmar
					</button>
				</form>

				<p className='text-center text-base font-inter text-gray-500 mt-4 mb-24'>
					Volver a{' '}
					<button type='button' onClick={onBack} className='text-[#9200AD] font-medium underline'>
						iniciar sesión
					</button>
				</p>
			</section>
		</div>
	);
}
