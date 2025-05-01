'use client';

import '@/app/globals.css';
import { Suspense } from 'react';

import Navbar from '@/modules/components/navbar/Navbar';
import Newsletter from '@/modules/components/newsletter/NewsLetter';
import Footer from '@/modules/components/footer/footer';

import NewPasswordForm from '@/modules/login/components/loginform/RecoveryPasswordSent';

export default function ChangePassPage() {
	return (
		<>
			{/* 🌈 Header con fondo de gradiente */}
			<header
				className='w-full h-40 md:h-64 overflow-hidden m-0 p-0'
				style={{
					background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
                       linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
				}}
			>
				<Navbar />
			</header>

			{/* 🧾 Formulario de cambio de contraseña */}
			<main className='bg-gray-50 flex justify-center w-full relative pt-0 pb-20 -mb-[100px] md:mb-0'>
				<section
					aria-label='Formulario de cambio de contraseña'
					className='w-full overflow-visible max-w-[1600px] mx-auto md:px-4'
				>
					<Suspense fallback={<div>Loading...</div>}>
						<NewPasswordForm />
					</Suspense>
				</section>
			</main>

			{/* ✉️ Newsletter encimado */}
			<section className='relative z-[20] -mt-28 md:-mt-[4rem]'>
				<Newsletter />
			</section>

			{/* 👣 Footer */}
			<footer>
				<Footer />
			</footer>
		</>
	);
}
