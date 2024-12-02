import brand1 from '@/public/webp-images/home-banner/acc.svg';
import brand2 from '@/public/webp-images/home-banner/afeme.svg';
import brand3 from '@/public/webp-images/home-banner/anamer.svg';
import brand4 from '@/public/webp-images/home-banner/colegio-nutricionistas.svg';
import brand5 from '@/public/webp-images/home-banner/colmed.svg';
import brand6 from '@/public/webp-images/home-banner/conemege.svg';
import brand7 from '@/public/webp-images/home-banner/consejo-medico-santa-cruz.svg';
import brand8 from '@/public/webp-images/home-banner/consejo-superior-medico.svg';
import brand9 from '@/public/webp-images/home-banner/eimec.svg';
import brand10 from '@/public/webp-images/home-banner/euneiz.svg';
import brand11 from '@/public/webp-images/home-banner/fmc.svg';
import brand12 from '@/public/webp-images/home-banner/inspira-network.svg';
import brand13 from '@/public/webp-images/home-banner/saxum.svg';
import brand14 from '@/public/webp-images/home-banner/seen.svg';
import brand15 from '@/public/webp-images/home-banner/smhgm.svg';
import brand16 from '@/public/webp-images/home-banner/spmi.svg';
import brand17 from '@/public/webp-images/home-banner/tropos.svg';
import brand18 from '@/public/webp-images/home-banner/udima.svg';
import { StaticImageData } from 'next/image';

interface Brand {
	img: StaticImageData;
	width: number;
}

interface BrandsByCountry {
	[key: string]: Brand[];
}

const DEFAULT_BRANDS: Brand[] = [
	{ img: brand1, width: 200 },
	{ img: brand2, width: 200 },
	{ img: brand3, width: 100 },
	{ img: brand4, width: 200 },
	{ img: brand5, width: 200 },
	{ img: brand6, width: 200 },
	{ img: brand7, width: 100 },
	{ img: brand8, width: 200 },
	{ img: brand9, width: 200 },
	{ img: brand10, width: 200 },
	{ img: brand11, width: 100 },
	{ img: brand12, width: 200 },
	{ img: brand13, width: 100 },
	{ img: brand14, width: 200 },
	{ img: brand15, width: 100 },
	{ img: brand16, width: 200 },
	{ img: brand17, width: 200 },
	{ img: brand18, width: 200 },
];

export const BRANDS_BY_COUNTRY: BrandsByCountry = {
	cl: [
		// { img: brand2, width: 350 },
		// { img: brand2, width: 350 },
		// { img: brand3, width: 200 },
		// { img: brand4, width: 200 },
	],
	ar: DEFAULT_BRANDS,
	es: DEFAULT_BRANDS,
	ec: DEFAULT_BRANDS,
	mx: DEFAULT_BRANDS,
	co: DEFAULT_BRANDS,
	ni: DEFAULT_BRANDS,
	pe: DEFAULT_BRANDS,
	pa: DEFAULT_BRANDS,
	uy: DEFAULT_BRANDS,
	cr: DEFAULT_BRANDS,
};
