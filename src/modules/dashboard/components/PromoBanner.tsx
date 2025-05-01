import CtaButton from '@/dashboard/components/ui/CtaButton';
import { useOffers } from '@/modules/home/hooks/useOffer';
import router from 'next/router';
import React from 'react';

const PromoBanner: React.FC = () => {
	const { data: offer, loading, error } = useOffers();

	if (!offer) return null;

	const content = offer.content.replace(
		/<ul>/g,
		'<ul class="list-disc list-outside ml-5 mb-8 space-y-3 md:space-y-4 font-inter text-base md:text-xl max-w-[500px]">',
	);

	return (
		<div className='relative md:rounded-[30px] overflow-hidden -z-10 -mt-4 md:mt-5 text-white min-h-[450px] md:min-h-[350px] flex flex-col'>
			{/* Background Image */}
			<div
				className='absolute inset-0 z-0 bg-cover bg-center'
				style={{
					backgroundImage: `url(${offer.background_image?.[0]})`,
				}}
			></div>

			{/* Dark Overlay */}
			<div
				className='absolute inset-0 z-10'
				style={{
					background:
						'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%), linear-gradient(255.21deg, rgba(0, 0, 0, 0) 22.64%, rgba(0, 0, 0, 0.4) 49.04%)',
				}}
			></div>

			{/* Content Container - Flex Column for Mobile, Relative for Desktop Absolute Positioning */}
			<div className='relative z-20 flex flex-col flex-grow p-6 mt-40 md:mt-0 md:p-12 justify-between'>
				{/* Top Text Content */}
				<div>
					<p className='text-base md:text-lg font-inter font-normal mb-4 md:mb-8'>{offer.pre_text}</p>
					<h2
						className='text-3xl md:text-5xl font-raleway flex flex-col gap-2 md:gap-4 mb-6 md:mb-8'
						dangerouslySetInnerHTML={{ __html: offer.title }}
					/>

					<div className='max-w-[500px]' dangerouslySetInnerHTML={{ __html: content }} />
				</div>

				{/* Discount and Button Section - Flow on Mobile, Absolute on Desktop */}
				<div className='flex flex-col items-center md:items-end md:absolute md:bottom-12 md:right-12 md:flex-row gap-4 mt-6 md:mt-0'>
					{/* Discount - Centered Text on Mobile */}
					<div className='flex items-end gap-2 text-center md:text-right'>
						<span className='text-6xl md:text-[78.49px] font-inter font-bold leading-none md:leading-[100%] tracking-tighter md:tracking-[-13%]'>
							20%
						</span>
						<div className='flex flex-col items-center md:items-start gap-1 md:gap-2'>
							<span className='font-inter font-extralight text-4xl md:text-[47.42px] leading-none md:leading-[100%]'>%</span>
							<span className='text-sm md:text-[19.62px] font-inter font-light leading-none md:leading-[100%] tracking-[-2.5%] whitespace-pre-line'>
								OFF
							</span>
						</div>
						<span className='text-xl md:text-[26.16px] font-inter font-extrabold leading-tight md:leading-[90%] tracking-[-2.5%] opacity-90 whitespace-pre-line text-center md:text-start max-w-[160px]'>
							en tu inscripción
						</span>
					</div>
					{/* Button - Full width on mobile? No, keep original size but centered below discount */}
					<div className='w-full flex justify-center md:w-auto mb-10 md:mb-0'>
						<CtaButton
							onClick={() => router.push(offer.cta.url)} // Add routing later
							showIcon={true}
						>
							{offer.cta.title}
						</CtaButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PromoBanner;
