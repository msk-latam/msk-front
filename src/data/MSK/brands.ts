import brand1 from '../../../public/images/brands/tropos.svg';
import brand2 from '../../../public/webp-images/brands/colmed.webp';
import brand3 from '../../../public/images/brands/acc.svg';
import brand4 from '../../../public/images/brands/Euneiz.svg';
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
	{ img: brand2, width: 350 },
	{ img: brand3, width: 200 },
	{ img: brand4, width: 200 },
];

export const BRANDS_BY_COUNTRY: BrandsByCountry = {
	cl: [
		// { img: brand2, width: 350 },
		{ img: brand2, width: 350 },
		{ img: brand3, width: 200 },
		{ img: brand4, width: 200 },
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
