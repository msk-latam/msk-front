'use client';

import '@/app/globals.css';
import { useCompleteProfile } from '@/hooks/useCompleteProfile';
import Footer from '@/modules/components/footer/footer';
import Navbar from '@/modules/components/navbar/Navbar';
import Newsletter from '@/modules/components/newsletter/NewsLetter';
import ProfileCompletionWrapper from '@/modules/profile-completion/ProfileCompletionWrapper';
import { useEffect, useState } from 'react';
/* eliminar cookie needsProfileCompletion */
export default function CompletarPerfilPage() {
	const { deleteCookie } = useCompleteProfile();

	useEffect(() => {
		deleteCookie();
	}, []);

	const [showRegister, setShowRegister] = useState(false);

	return (
		<>
			{/* HEADER CON GRADIENTE */}
			<div
				className='w-full h-[180px] sm:h-[290px] overflow-hidden m-0 p-0 '
				style={{
					background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
                       linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
				}}
			>
				<Navbar />
			</div>

			{/* FORMULARIO */}

			{/* ======================= */}
			{/* CONTENEDOR DE FORMULARIO */}
			{/* ======================= */}
			<div className='bg-gray-50 flex justify-center px-0 sm:px-4 relative pt-0 z-4 md:pb-20'>
				{/* Mostrar Login o Registro según el estado */}
				<ProfileCompletionWrapper />
				{/* Newsletter incluido dentro del bloque para que se vea parte del fondo */}
			</div>

			<Newsletter />

			<Footer />
		</>
	);
}
