import React from 'react';

// Si tienes una lista de videos, la puedes pasar como props o definirla dentro del componente.
const BlogVideos: React.FC = () => {
	// Ejemplo de una lista de videos con URLs de YouTube (puedes modificarla según lo que necesites).
	const videoList = [
		{ title: 'Video 1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
		{ title: 'Video 2', url: 'https://www.youtube.com/embed/oHg5SJYRHA0' },
		{ title: 'Video 3', url: 'https://www.youtube.com/embed/kJQP7kiw5Fk' },
	];

	return (
		<section id='videos' className='py-8'>
			<h2 className='text-2xl font-bold mb-4'>Videos</h2>
			<p className='mb-6'>Otra manera de informarte y desarrollar tu aprendizaje</p>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{videoList.map((video, index) => (
					<div key={index} className='bg-white shadow-md rounded-lg overflow-hidden'>
						<iframe
							width='100%'
							height='315'
							src={video.url}
							title={video.title}
							frameBorder='0'
							allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen
						/>
						<div className='p-4'>
							<h3 className='text-lg font-semibold'>{video.title}</h3>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default BlogVideos;
