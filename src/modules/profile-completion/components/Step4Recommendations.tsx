'use client';

import Modal from '@/modules/dashboard/components/ui/Modal';
import Link from 'next/link';
import { useEffect } from 'react';

interface Step4RecommendationsProps {
	onBack: () => void;
}

export default function Step4Recommendations({ onBack }: Step4RecommendationsProps) {
	useEffect(() => {
		document.body.classList.add('step4-active');
		return () => {
			document.body.classList.remove('step4-active');
		};
	}, []);

	const cards = [
		{
			title: 'Nutrición en oncología',
			type: ['Nutrición', 'Curso'],
			source: 'Medical & Scientific Knowledge',
			button: 'Descubrir',
			image: '/images/recomendations/nutricion-oncologia.png',
		},
		{
			title: 'Planes de nutrición para deportistas profesionales',
			type: ['Nutrición', 'Infografía'],
			source: 'Colegio de Médicos de la Prov. de Bs. As. Distrito III',
			button: 'Descargar gratis',
			image: '/images/recomendations/nutricion-deportistas.png',
		},
		{
			title: 'Cómo afecta el deporte en la nutrición',
			type: ['Nutrición', 'Blog'],
			source: 'Colegio de Médicos de la Prov. de Bs. As. Distrito III',
			button: 'Leer',
			image: '/images/recomendations/deporte-nutricion.png',
		},
		{
			title: 'Nuevas herramientas para detectar problemas de tiroides',
			type: ['Endocrinología', 'Guía profesional'],
			source: 'Colegio de Médicos de la Prov. de Bs. As. Distrito III',
			button: 'Descargar gratis',
			image: '/images/recomendations/tiroides.png',
		},
	];

	return (
		<Modal isOpen={true} onClose={() => {}} title=' Ya puedes acceder a estos recursos recomendados para ti' size='x-large'>
			<div className='flex flex-col gap-4'>
				<div className='flex-1 overflow-y-auto px-4 sm:px-10'>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6'>
						{cards.map((card, index) => (
							<div
								key={index}
								className='flex bg-white border border-[#DBDDE2] rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg'
							>
								<div className='w-1/3 bg-gray-100 flex items-center justify-center'>
									<img src={card.image} alt={card.title} className='object-cover w-full h-full' />
								</div>
								<div className='w-2/3 p-4 flex flex-col justify-between'>
									<div>
										<div className='mb-1'>
											{card.type.map((tag, i) => (
												<span
													key={i}
													className={`text-xs inline-block mr-2 mb-1 px-2 py-1 rounded-full whitespace-nowrap ${
														tag === 'Curso' || tag === 'Guía profesional'
															? 'bg-orange-100 text-orange-700'
															: tag === 'Infografía'
															? 'bg-yellow-100 text-yellow-700'
															: tag === 'Blog'
															? 'bg-blue-100 text-blue-700'
															: 'bg-indigo-100 text-indigo-700'
													}`}
												>
													{tag}
												</span>
											))}
										</div>
										<h3 className='text-lg font-bold text-[#1A1A1A] font-raleway mb-1'>{card.title}</h3>
										<p className='text-sm text-[#4F5D89] font-medium font-inter'>{card.source}</p>
									</div>
									<div className='flex justify-end mt-4'>
										<button
											className='text-white text-sm font-medium bg-black hover:bg-[#7A0095] whitespace-nowrap transition'
											style={{
												width: '180px',
												height: '52px',
												padding: '14px 24px',
												borderRadius: '38px',
												gap: '8px',
											}}
										>
											{card.button}
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className='p-4 sm:py-6 text-center'>
						<Link
							href='/dashboard'
							className='bg-[#9200AD] hover:scale-105 text-white font-semibold transition w-full sm:w-[522px] h-[52px] px-6 py-4 md:mb-18   mb-9 rounded-[38px] inline-block'
						>
							Ir a mi perfil
						</Link>
					</div>
				</div>
			</div>
		</Modal>
	);
}
