'use client';
import Logo from '@/components/Logo/Logo';
import NcImage from '@/components/NcImage/NcImage';
import NcLink from '@/components/NcLink/NcLink';
import React from 'react';

const CheckoutMSKFooter = () => {
	const currentYear = new Date().getFullYear();
	return (
		<>
			<div className='flex justify-between items-center mt-20  py-10 bg-[#141517] w-screen transform -translate-x-1/2 left-1/2 relative'>
				<div className='container flex justify-between items-center'>
					<div className='flex items-end gap-4'>
						<NcLink href='/'>
							<div className='w-[100px]'>
								<NcImage src={'/images/msk-logo-light.svg'} alt='footer-logo' width='80' height='80' />
							</div>
						</NcLink>
						<p className='text-white w-72 text-sm'>Una propuesta moderna que desafía a expandir las metas profesionales</p>
					</div>
					<div className='flex gap-4'>
						<a
							href='https://www.facebook.com/msk.online.learning'
							target='_blank'
							rel='noopener noreferrer'
							className='w-10 h-10 bg-[#392C35] flex items-center justify-center rounded-full'
						>
							<NcImage src={'/images/icons/fb.svg'} alt='' width='10' height='10' className='object-fill' />
						</a>
						<a
							href='https://www.instagram.com/msk.latam'
							target='_blank'
							rel='noopener noreferrer'
							className='w-10 h-10 bg-[#392C35] flex items-center justify-center rounded-full'
						>
							<NcImage src={'/images/icons/ig.svg'} alt='' width='20' height='20' className='object-fill' />
						</a>
						<a
							href='https://www.youtube.com/@msk.online.learning'
							target='_blank'
							rel='noopener noreferrer'
							className='w-10 h-10 bg-[#392C35] flex items-center justify-center rounded-full'
						>
							<NcImage src={'/images/icons/yt.svg'} className='object-fill pt-[4px]' alt='' width='20' height='20' />
						</a>
						<a
							href='https://www.linkedin.com/company/msk-online-learning/'
							target='_blank'
							rel='noopener noreferrer'
							className='w-10 h-10 bg-[#392C35] flex items-center justify-center rounded-full'
						>
							<NcImage src={'/images/icons/in.svg'} className='object-fill' alt='' width='20' height='20' />
						</a>
					</div>
				</div>
			</div>
			<div className='flex justify-between items-center  py-4 bg-[#1A1F27] w-screen transform -translate-x-1/2 left-1/2 relative'>
				<div className='container flex justify-center items-center'>
					<p className='text-white text-sm'>© {currentYear} • Medical&Scientific Knowledge S.L.</p>
				</div>
			</div>
		</>
	);
};

export default CheckoutMSKFooter;
