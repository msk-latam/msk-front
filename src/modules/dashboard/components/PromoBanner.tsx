import CtaButton from '@/dashboard/components/ui/CtaButton';
import userData from '@/dashboard/data/dashboardMock.json';
import React from 'react';

const PromoBanner: React.FC = () => {
	const { promoBanner } = userData;

	if (!promoBanner) return null;

	return (
		<div className='relative rounded-[30px] overflow-hidden mt-5 text-white p-8 md:p-12 min-h-[350px] flex items-center'>
			{/* Background Image */}
			<div
				className='absolute inset-0 z-0 bg-cover bg-center'
				style={{
					backgroundImage: `url(${promoBanner.backgroundImage})`,
				}}
			></div>

			{/* Dark Overlay */}
			<div
				className='absolute inset-0 z-10'
				style={{ background: 'linear-gradient(255.21deg, rgba(0, 0, 0, 0) 22.64%, rgba(0, 0, 0, 0.4) 49.04%)' }}
			></div>

			{/* Content */}
			<div className='relative z-20 '>
				<p className='text-lg font-inter font-normal mb-14'>{promoBanner.availability}</p>
				<h2 className='text-4xl md:text-5xl font-raleway flex flex-col gap-6 mb-14'>
					<span className='font-bold'>{promoBanner.title}</span>
					<span className='font-medium'>{promoBanner.subtitle}</span>
				</h2>

				<ul className='list-disc list-outside ml-5 mb-8 space-y-6 font-inter text-xl max-w-[500px]'>
					{promoBanner.features.map((feature, index) => (
						<li key={index}>{feature}</li>
					))}
				</ul>
			</div>

			{/* Discount and Button (Positioned Absolutely on Larger Screens) */}
			<div className='absolute z-20 bottom-8 right-8 md:bottom-12 md:right-12 flex items-end gap-4'>
				{/* Discount */}
				<div className='flex  gap-2 text-right items-end'>
					<span className='text-[78.49px] font-inter font-bold leading-[100%] tracking-[-13%] align-middle'>
						{promoBanner.discount.percentage}
					</span>
					<div className='flex flex-col gap-2'>
						<span className='font-inter font-extralight text-[47.42px] leading-[100%] align-middle'>%</span>
						<span className='text-[19.62px] font-inter font-light leading-[100%] tracking-[-2.5%] align-middle whitespace-pre-line'>
							OFF
						</span>
					</div>
					<span className='text-[26.16px] font-inter font-extrabold leading-[90%] tracking-[-2.5%] align-middle opacity-90 whitespace-pre-line text-start'>
						{promoBanner.discount.description}
					</span>
				</div>
				{/* Button */}
				<CtaButton
					// onClick={() => router.push(promoBanner.buttonLink)} // Add routing later
					onClick={() => {}}
					showIcon={true}
				>
					{promoBanner.buttonText}
				</CtaButton>
			</div>
		</div>
	);
};

export default PromoBanner;
