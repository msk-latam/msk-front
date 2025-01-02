'use client';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import React, { useState } from 'react';

type Video = {
	title: string;
	url: string;
};

const BlogVideos: React.FC = () => {
	// Lista de videos con miniaturas
	const rawVideoList: Video[] = [
		{
			title: 'Desafíos del diagnóstico y tratamiento del SIBO',
			url: 'https://www.youtube.com/watch?v=1P5yyeeYF9o',
		},
		{
			title: 'Cómo inscribirte a un curso | Medical & Scientific Knowledge',
			url: 'https://www.youtube.com/watch?v=WzTRgehFvn0',
		},
	];

	// Función para normalizar URLs
	const normalizeYouTubeUrl = (url: string): string => {
		const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|v\/))([\w-]{11})/);
		if (videoIdMatch && videoIdMatch[1]) {
			return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
		}
		return url; // Retorna el original si no se encuentra un ID válido
	};

	// Normalizar la lista de videos
	const videoList: Video[] = rawVideoList.map((video) => ({
		...video,
		url: normalizeYouTubeUrl(video.url),
	}));

	const getThumbnailFromUrl = (url: string) => {
		const videoId = url.split('/').pop(); // Extraer el ID del video
		return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
	};

	// Estado para manejar el índice del video actual
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const currentVideo = videoList[currentVideoIndex];

	// Función para navegar al video anterior
	const handlePreviousVideo = () => {
		if (currentVideoIndex > 0) {
			setCurrentVideoIndex((prevIndex) => prevIndex - 1);
		}
	};

	// Función para navegar al siguiente video
	const handleNextVideo = () => {
		if (currentVideoIndex < videoList.length - 1) {
			setCurrentVideoIndex((prevIndex) => prevIndex + 1);
		}
	};

	return (
		<section id='videos' className='py-8'>
			<div className='flex justify-between items-center '>
				<div>
					<h2 className='!font-raleway text-3xl font-medium text-[#392C35] mb-1'>Videos</h2>
					<p className='!font-inter text-[#6474A6] text-lg font-light'>
						Otra manera de informarte y desarrollar tu aprendizaje
					</p>
				</div>
				<div>
					<ButtonSecondary
						className='!leading-none border-solid border-1 border-neutral-200 text-neutral-400'
						sizeClass='px-3 py-2 sm:py-3 sm:px-6 text-[11px]'
					>
						<span className='text-[11px] sm:text-sm'>Ver más</span>
						<svg className='w-3 h-3 sm:w-5 sm:h-5 ml-3 rtl:rotate-180' viewBox='0 0 24 24' fill='none'>
							<path
								d='M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeMiterlimit='10'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<path
								d='M3.5 12H20.33'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeMiterlimit='10'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</ButtonSecondary>
				</div>
			</div>

			<div className='flex flex-col lg:flex-row gap-8 mt-6'>
				{/* Video principal */}
				<div className='flex-1'>
					<div className='aspect-w-16 aspect-h-9 z-10'>
						<iframe
							width='120%'
							height='120%'
							src={currentVideo.url}
							title={currentVideo.title}
							frameBorder='0'
							allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen
							className='rounded-2xl'
						/>
					</div>
					<div className='p-6 lg:p-8 lg:pt-14 bg-white shadow-md rounded-b-2xl pt-8 relative transform -translate-y-6 z-0 '>
						<span className='bg-[#FDCEBC] text-[#903916] py-2 px-4 rounded-md '>Videoinfografía</span>
						<h3 className='mt-4 text-2xl font-semibold text-[#392C35] !font-raleway'>{currentVideo.title}</h3>
					</div>

					{/* Controles para mobile */}
					<div className='flex justify-center items-center mt-4 lg:hidden gap-4'>
						<button
							onClick={handlePreviousVideo}
							disabled={currentVideoIndex === 0}
							className={`w-10 h-10 flex items-center justify-center rounded-full border ${
								currentVideoIndex === 0
									? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
									: 'border-[#E9EAEE] bg-[#FCFCFD] text-[#81858D] hover:bg-[#f3f4f6] transition-colors'
							}`}
						>
							←
						</button>
						<button
							onClick={handleNextVideo}
							disabled={currentVideoIndex === videoList.length - 1}
							className={`w-10 h-10 flex items-center justify-center rounded-full border ${
								currentVideoIndex === videoList.length - 1
									? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
									: 'border-[#E9EAEE] bg-[#FCFCFD] text-[#81858D] hover:bg-[#f3f4f6] transition-colors'
							}`}
						>
							→
						</button>
					</div>
				</div>

				{/* Lista de videos con miniaturas (solo en pantallas grandes) */}
				<div className='hidden lg:block lg:w-1/5 px-4 '>
					<ul
						className='space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'
						style={{ maxHeight: '690px' }}
					>
						{videoList.map((video, index) => (
							<li
								key={index}
								className={`flex items-center gap-4 cursor-pointer transition-colors rounded-2xl mr-4 ${
									index === currentVideoIndex ? 'text-white bg-[#FDCEBC]' : 'bg-white hover:bg-gray-100'
								}`}
								onClick={() => setCurrentVideoIndex(index)}
							>
								<img
									src={getThumbnailFromUrl(video.url)}
									alt={`Thumbnail for ${video.title}`}
									className=' object-cover rounded'
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default BlogVideos;
