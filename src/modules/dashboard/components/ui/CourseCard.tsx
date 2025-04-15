'use client';

import Image from 'next/image';

interface CourseCardProps {
	title: string;
	image: string;
	category: string;
	categoryColor?: string;
	progress: number;
	status: 'not-started' | 'in-progress' | 'completed';
	certificado: boolean;
	fecha?: string;
	showDownloadButton?: boolean;
	altTags?: string[];
	onClick?: () => void;
}

export default function CourseCard({
	title,
	image,
	category,
	categoryColor = 'text-violet-600',
	progress,
	status,
	certificado,
	fecha,
	showDownloadButton = false,
	altTags = [],
	onClick,
}: CourseCardProps) {
	const statusColors = {
		'not-started': 'bg-yellow-400',
		'in-progress': 'bg-green-400',
		completed: 'bg-blue-400',
	};

	const statusText = {
		'not-started': 'Por iniciar',
		'in-progress': 'En curso',
		completed: 'Finalizado',
	};

	return (
		<div
			className='bg-white rounded-lg shadow overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105'
			onClick={onClick}
		>
			<div className='relative h-48 w-full'>
				<Image src={image} alt={title} fill={true} className='object-cover' />
				<div className='absolute top-4 left-4 bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full'>
					{progress}% completado
				</div>

				{altTags.length > 0 && (
					<div className='absolute top-4 right-4'>
						<span className='bg-white text-xs px-2 py-1 rounded-full text-gray-700'>{altTags[0]}</span>
					</div>
				)}
			</div>
			<div className='p-4'>
				<p className={`text-xs ${categoryColor} mb-1`}>{category}</p>
				<h3 className='text-base font-semibold text-gray-800 mb-3'>{title}</h3>
				<div className='flex justify-between items-center mb-3'>
					<div className='flex items-center gap-1'>
						<div className={`h-2 w-2 rounded-full ${statusColors[status]}`}></div>
						<span className='text-xs text-gray-500'>{statusText[status]}</span>
					</div>
					{fecha ? (
						<span className='text-xs text-gray-500'>Fecha de finalización: {fecha}</span>
					) : (
						<span className='text-xs text-gray-500'>Certificado: {certificado ? 'Sí' : 'No'}</span>
					)}
				</div>
				<div className='w-full bg-gray-200 rounded-full h-2'>
					<div className='bg-pink-500 h-2 rounded-full' style={{ width: `${progress}%` }}></div>
				</div>
				<button
					className={`w-full mt-3 ${
						showDownloadButton ? 'bg-gray-100 text-gray-800' : 'bg-gray-800 text-white'
					} text-sm rounded-full py-2`}
				>
					{showDownloadButton ? 'Descargar' : 'Ir al curso'}
				</button>
			</div>
		</div>
	);
}
