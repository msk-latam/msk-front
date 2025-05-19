'use client';

import Modal from '@/modules/dashboard/components/ui/Modal';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { supportedLanguages } from '@/config/languages';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';

interface Step4RecommendationsProps {
	onBack: () => void;
}

export default function Step4Recommendations({ onBack }: Step4RecommendationsProps) {
	const [isOpen, setIsOpen] = useState(true);
	const pathname = usePathname();

	// Detectar el idioma desde la URL
	const firstSegment = pathname?.split('/')[1];
	const lang = supportedLanguages.includes(firstSegment ?? '') ? firstSegment : 'ar';

	useEffect(() => {
		document.body.classList.add('step4-active');
		return () => {
			document.body.classList.remove('step4-active');
		};
	}, []);

	const closeAndRedirect = () => {
		setIsOpen(false);

		setTimeout(() => {
			const localizedDashboardUrl = getLocalizedUrl(lang, '/dashboard');
			window.location.href = localizedDashboardUrl;
		}, 300);
	};

	return (
		<Modal isOpen={isOpen} onClose={closeAndRedirect} title='¡Listo para avanzar!' size='large'>
			<div className='flex flex-col gap-4'>
				<div className='flex-1 overflow-y-auto px-4 sm:px-10'>
					<p className='text-center font-inter text-lg font-base font-normal text-[#6E737C]'>
						Has dado el primer paso para potenciar tu carrera con la mejor formación médica online. En MSK te conectamos con
						conocimientos actualizados, herramientas prácticas y una comunidad profesional de toda Latinoamérica. ¡Vamos
						juntos!
					</p>
					<div className='p-4 sm:py-6 text-center'>
						<button
							onClick={closeAndRedirect}
							className='bg-[#9200AD] hover:scale-105 text-white font-semibold transition h-[52px] px-6 py-4 mb-9 rounded-[38px] inline-block'
						>
							Ir a mi perfil
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
}
