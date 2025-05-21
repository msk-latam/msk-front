'use client';
import '@/app/globals.css';
import Footer from '@/modules/components/footer/footer';
import Navbar from '@/modules/components/navbar/Navbar';
import NewsLetter from '@/modules/components/newsletter/NewsLetter';
import GenericHeader from '@/modules/generic/components/GenericHeader';
import { useEffect, useState } from 'react';

interface PageData {
	ID: number;
	post_author: string;
	post_date: string;
	post_date_gmt: string;
	post_content: string;
	post_title: string;
	post_excerpt: string;
	post_status: string;
	comment_status: string;
	ping_status: string;
	post_password: string;
	post_name: string;
	to_ping: string;
	pinged: string;
	post_modified: string;
	post_modified_gmt: string;
	post_content_filtered: string;
	post_parent: number;
	guid: string;
	menu_order: number;
	post_type: string;
	post_mime_type: string;
	comment_count: string;
	filter: string;
}

// Placeholder data while loading or if fetch fails
const initialPageData = {
	title: 'Cargando...',
	description: '',
	tags: [],
	breadcrumbs: [],
};

export default function TerminosYCondiciones({ params }: { params: { slug: string } }) {
	const [pageData, setPageData] = useState<PageData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const country = params.slug ?? 'ar';

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(`https://cms1.msklatam.com/wp-json/msk/v1/page/nuestra-mision?lang=${country}`);

				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data: PageData = await response.json();
				setPageData(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An unknown error occurred');
				console.error('Failed to fetch page data:', err);
			} finally {
				setLoading(false);
			}
		};

		if (country) {
			fetchData();
		}
	}, [country]);

	console.log(pageData);
	// Display values, use placeholders if loading or error
	const displayTitle = loading || error ? initialPageData.title : pageData?.post_title || 'Título no disponible';
	const displayContent = loading
		? '<p>Cargando contenido...</p>'
		: error
		? `<p>Error al cargar el contenido: ${error}</p>`
		: pageData?.nuestra_mision.contenido || '<p>Contenido no disponible.</p>';

	const styledContent = displayContent.replace(
		/<img([^>]*)src="([^"]+)"([^>]*)>/g,
		`<img$1src="$2"$3 style="width: 100%; max-width: 1200px; display: block; " />`,
	);

	return (
		<>
			<header
				className='w-full h-[400px] overflow-hidden m-0 p-0'
				style={{
					background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
                       linear-gradient(180deg, rgba(0, 0, 0, 0) 32.33%, rgba(0, 0, 0, 0.4) 88.46%),
                       linear-gradient(360deg, rgba(0, 0, 0, 0) 43.69%, rgba(0, 0, 0, 0.2) 100%)`,
				}}
			>
				<Navbar />
				<GenericHeader title={'Nuestra misión'} description={initialPageData.description} />
			</header>

			<main className='bg-[#f3f4f6] flex justify-center px-0 sm:px-4 relative pt-0 pb-20  md:mb-0'>
				<section className='w-full -mt-[100px] z-[10] relative overflow-visible max-w-[1600px] mx-auto '>
					<div className='mb-4 bg-white rounded-[30px] p-[36px] mt-8'>
						{/* Render the HTML content from the API */}
						<div className='mx-56 mt-8 whitespace-pre-line' dangerouslySetInnerHTML={{ __html: styledContent }} />
					</div>
				</section>
			</main>

			<NewsLetter />
			<Footer />
		</>
	);
}
