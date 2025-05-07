'use client';

import { useOffers } from '@/modules/home/hooks/useOffer';
import OffersSkeleton from '@/modules/home/skeletons/OfertasSkeleton'; // 👈 Importamos el Skeleton
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const stripHtml = (html: string) => {
	if (!html) return '';
	return html.replace(/<[^>]*>/g, '').trim();
};

// Componente de descuento y botón
const DiscountAndButton = ({ offer, content, discountNumber, descLine1, descLine2 }: any) => {
	const pathname = usePathname();
	const lang = pathname?.split('/')[1] || 'ar';

	return (
		<div className='flex flex-col md:items-end md:flex-row gap-4 mt-6 md:mt-4 w-full md:w-auto md:text-right'>
			<div className='md:hidden flex items-end gap-2 text-left md:text-right w-full md:w-auto'>
				<span className='text-6xl md:text-[78.49px] font-inter font-bold leading-none tracking-tighter'>
					{discountNumber}
				</span>
				<div className='flex flex-col items-center md:items-start gap-1'>
					<span className='font-inter font-extralight text-4xl md:text-[47.42px] leading-none'>%</span>
					<span className='text-sm md:text-[19.62px] font-inter font-light leading-none whitespace-pre-line'>OFF</span>
				</div>
				{(descLine1 || descLine2) && (
					<span className='text-xl md:text-[26.16px] font-inter font-extrabold leading-tight opacity-90 whitespace-pre-line text-left md:text-start'>
						<span>en tu</span>
						<br />
						<span>inscripción</span>
					</span>
				)}
			</div>

			<a
				href={getLocalizedUrl(lang, offer.cta?.url)}
				className='bg-[#1A1A1A] text-white px-6 md:mt-4 py-3 rounded-full font-inter font-medium shadow-md hover:bg-gray-800 transition text-sm w-full md:w-auto flex flex-row gap-2 justify-center items-center'
			>
				<p className='my-auto'>{offer.cta?.title || ''}</p>
				<svg width='25' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M5.21582 12H19.2158M19.2158 12L12.2158 5M19.2158 12L12.2158 19'
						stroke='white'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</a>
		</div>
	);
};

const Ofertas = () => {
	const { data: offer, loading, error } = useOffers();

	if (loading) return <OffersSkeleton />; // 👈 Mostrar Skeleton mientras carga
	if (error || !offer) return null;

	const discountNumber = stripHtml(offer.pre_cta_content?.match(/\d+/)?.[0] || '20');
	const discountDescription = stripHtml(
		offer.pre_cta_content?.replace(/<[^>]+>/g, '').replace(/\d+%?\s*/g, '') || 'en tu suscripción',
	);

	const [descLine1, descLine2] =
		discountDescription.split(/\s+/).length >= 2
			? [discountDescription.split(/\s+/).slice(0, 2).join(' '), discountDescription.split(/\s+/).slice(2).join(' ')]
			: [discountDescription, ''];

	const getSplitTitle = () => {
		const rawTitle = stripHtml(offer.title || '');
		const match = rawTitle.match(/¿Sos profesional de la salud\?/);
		if (match) {
			const firstPart = match[0];
			const secondPart = rawTitle.replace(firstPart, '').trim();
			return [firstPart, secondPart];
		}
		return [rawTitle, ''];
	};

	const [firstTitlePart, secondTitlePart] = getSplitTitle();

	return (
		<section className='relative w-full md:h-[993px] md:px-4 md:mt-[120px] min-h-screen flex items-end md:items-center justify-center md:translate-y-5  -translate-y-24 text-white font-raleway'>
			{/* Imagen de fondo Mobile */}
			<div className='absolute inset-0 z-0 block lg:hidden '>
				<Image
					src={offer.background_image?.[0]}
					alt='Oferta Salud Mobile'
					layout='fill'
					objectFit='cover'
					objectPosition='66% center'
					quality={100}
					priority
				/>
				<div className='absolute inset-0 bg-black/20' />
			</div>

			{/* Imagen de fondo Desktop */}
			<div className='absolute inset-0 z-0 hidden lg:block'>
				<Image
					src={offer.background_image?.[0]}
					alt='Oferta Salud Desktop'
					layout='fill'
					objectFit='cover'
					objectPosition='center'
					quality={100}
					priority
				/>
				<div className='absolute inset-0 bg-black/40' />
			</div>

			{/* Contenido */}
			<div className='relative z-10 w-full overflow-visible max-w-[1600px] mx-auto md:px-4 px-5 py-16 flex flex-col md:flex-row items-center md:items-end md:justify-between justify-end gap-5'>
				<div className='text-left text-white max-w-xl  font-raleway hidden md:block mt-0 leading-[100px]'>
					<div>
						<p className='text-base md:text-lg font-raleway mb-4 md:mb-20 font-regular   '>{offer.pre_text}</p>

						<h2
							className='text-3xl md:text-5xl font-raleway flex flex-col gap-2 md:gap-4 mb-6 md:mb-32 line-height: 1rem; whitespace-nowrap'
							dangerouslySetInnerHTML={{ __html: offer.title }}
						/>

						<div
							className='max-w-[500px] md:-mt-20 font-raleway font-semibold md:text-[25px] md: whitespace-nowrap '
							dangerouslySetInnerHTML={{ __html: offer.content }}
						/>
					</div>
					<div className='flex items-end gap-2 text-left md:text-right w-full md:w-auto'>
						<span className='text-6xl md:text-[78.49px] font-inter font-bold leading-none tracking-tighter'>
							{discountNumber}
						</span>
						<div className='flex flex-col items-center md:items-start gap-1'>
							<span className='font-inter font-extralight text-4xl md:text-[40.42px] leading-none'>{descLine1}</span>
						</div>
						<span className='text-xl md:text-[26.16px] md:mt-10 font-inter font-extrabold leading-tight opacity-90  text-left md:text-start whitespace-nowrap'>
							{descLine2}
						</span>
					</div>
				</div>

				{/* Texto Mobile */}
				<div className='text-left text-white font-raleway md:hidden w-full px-3 pt-12'>
					<p className='text-[14px] leading-[14px] font-inter font-normal mb-6'>{stripHtml(offer.pre_text)}</p>
					<h2 className='text-[28px] leading-[32px] mb-10'>
						<span className='font-bold'>{firstTitlePart}</span> <span className='font-medium'>{secondTitlePart}</span>
					</h2>
					<ul className='mt-5 space-y-8'>
						{stripHtml(offer.content || '')
							.split(/\n|\r|\r\n/)
							.filter((line) => line.trim() !== '')
							.map((line, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<div className='mt-2 w-[6px] h-[6px] rounded-full bg-white flex-shrink-0' />
									<p className='text-[16px] leading-[20px] font-[500]'>{line}</p>
								</li>
							))}
					</ul>

					{/* Botón Mobile */}
					<div className='mt-10 w-full'>
						<DiscountAndButton offer={offer} discountNumber={discountNumber} descLine1={descLine1} descLine2={descLine2} />
					</div>
				</div>

				{/* Botón Desktop */}
				<div className='hidden md:block md:absolute md:bottom-12 md:right-12 md:mt-20 md:translate-y-[-10px] md:translate-x-[20px]'>
					<DiscountAndButton offer={offer} discountNumber={discountNumber} descLine1={descLine1} descLine2={descLine2} />
				</div>
			</div>
		</section>
	);
};

export default Ofertas;
