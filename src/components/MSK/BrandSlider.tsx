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
		<div className='swiper-container'>
			<Swiper
				pagination={{ clickable: true }}
				slidesPerView={1}
				spaceBetween={8}
				breakpoints={{
					640: {
						slidesPerView: 2,
						spaceBetween: 12, // Espaciado específico para pantallas medianas
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 12, // Espaciado específico para pantallas grandes
					},
				}}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
			>
				{brands?.map((brand, index) => (
					<SwiperSlide key={index} className='flex justify-center items-center'>
						<Image src={brand.img} alt='Brand logo' width={brand.width} height={100} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default BrandSlider;
