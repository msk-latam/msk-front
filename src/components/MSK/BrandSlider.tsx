'use client';
import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BRANDS_BY_COUNTRY } from '@/data/MSK/brands';
import 'swiper/css/bundle';
import Image from 'next/image';

interface BrandSliderProps {
	country: string;
}

const BrandSlider: FC<BrandSliderProps> = ({ country }) => {
	const brands = BRANDS_BY_COUNTRY[country] || BRANDS_BY_COUNTRY['default'];

	return (
		<div>
			{/* Slider visible solo en mobile */}
			<div className='block lg:hidden swiper-container'>
				<Swiper
					pagination
					a11y={{ enabled: true }}
					slidesPerView={3}
					breakpoints={{
						320: {
							slidesPerView: 1,
						},
						480: {
							slidesPerView: 2,
						},
						770: {
							slidesPerView: 3,
						},
					}}
					autoplay={{
						delay: 2000,
						disableOnInteraction: true,
					}}
				>
					{brands?.map((brand, i) => (
						<SwiperSlide key={i} className='w-100 bg-primary'>
							<div className='brand-container'>
								<Image src={brand.img} alt='img not found' width={brand.width} />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* Grid visible solo en desktop */}
			<div className='hidden lg:grid grid-cols-4 gap-4'>
				{brands?.map((brand, i) => (
					<div key={i} className=' flex justify-center py-2'>
						<Image src={brand.img} alt='img not found' width={brand.width} />
					</div>
				))}
			</div>
		</div>
	);
};

export default BrandSlider;
