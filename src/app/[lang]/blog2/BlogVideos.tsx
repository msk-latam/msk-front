'use client';
import React, { useState } from 'react';

const BlogVideos: React.FC = () => {
	// Lista de videos con miniaturas
	const videoList = [
		{
			title: 'Video 1',
			url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
			thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
		},
		{
			title: 'Video 2',
			url: 'https://www.youtube.com/embed/oHg5SJYRHA0',
			thumbnail: 'https://img.youtube.com/vi/oHg5SJYRHA0/hqdefault.jpg',
		},
		{
			title: 'Video 3',
			url: 'https://www.youtube.com/embed/kJQP7kiw5Fk',
			thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg',
		},
		{
			title: 'Video 1',
			url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
			thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
		},
		{
			title: 'Video 2',
			url: 'https://www.youtube.com/embed/oHg5SJYRHA0',
			thumbnail: 'https://img.youtube.com/vi/oHg5SJYRHA0/hqdefault.jpg',
		},
		{
			title: 'Video 3',
			url: 'https://www.youtube.com/embed/kJQP7kiw5Fk',
			thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg',
		},
		{
			title: 'Video 1',
			url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
			thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
		},
		{
			title: 'Video 2',
			url: 'https://www.youtube.com/embed/oHg5SJYRHA0',
			thumbnail: 'https://img.youtube.com/vi/oHg5SJYRHA0/hqdefault.jpg',
		},
		{
			title: 'Video 3',
			url: 'https://www.youtube.com/embed/kJQP7kiw5Fk',
			thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg',
		},
	];

	// Estado para manejar el video actualmente seleccionado
	const [currentVideo, setCurrentVideo] = useState(videoList[0]);

	return (
		<section id='videos' className='py-8'>
			<h2 className='!font-raleway text-4xl font-medium text-[#392C35]'>Videos</h2>
			<p className='!font-inter text-[#6474A6] text-xl font-light'>Otra manera de informarte y desarrollar tu aprendizaje</p>

			<div className='flex flex-col lg:flex-row gap-20 mt-6'>
				{/* Video principal */}
				<div className='flex-1'>
					<div className='aspect-w-16 aspect-h-9'>
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
					<h3 className='mt-4 text-lg font-semibold text-[#392C35]'>{currentVideo.title}</h3>
				</div>

				{/* Lista de videos con miniaturas */}
				<div className='w-full lg:w-1/5'>
					<ul
						className='space-y-4 overflow-y-auto'
						style={{ maxHeight: '600px' }} // Ajusta la altura máxima según lo que necesites
					>
						{videoList.map((video, index) => (
							<li
								key={index}
								className={`flex items-center gap-4 cursor-pointer transition-colors rounded-2xl ${
									video.url === currentVideo.url ? 'bg-[#FF5D5E] text-white' : 'bg-white hover:bg-gray-100'
								}`}
								onClick={() => setCurrentVideo(video)}
							>
								<img src={video.thumbnail} alt={`Thumbnail for ${video.title}`} className='w-56 object-cover rounded' />
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default BlogVideos;
