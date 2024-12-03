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
	url: string;
}

interface BrandsByCountry {
	[key: string]: Brand[];
}

const DEFAULT_BRANDS: Brand[] = [
	{ img: brand1, width: 200, url: 'https://www.acc.org/' },
	{ img: brand2, width: 200, url: 'http://www.afeme.org.ec/pagina/' },
	{ img: brand3, width: 80, url: 'https://anamer.org/' },
	{ img: brand4, width: 320, url: 'https://www.nutricionistaspba.org.ar/' },
	{ img: brand5, width: 250, url: 'https://www.colmed3.com.ar/' },
	{ img: brand6, width: 250, url: 'https://www.conamege.org.mx/' },
	{ img: brand7, width: 80, url: 'https://consejomedicosc.org.ar/' },
	{ img: brand8, width: 150, url: 'https://consejomedicolp.org.ar/' },
	{ img: brand9, width: 300, url: 'https://www.eimec.com/' },
	{ img: brand10, width: 220, url: 'https://www.euneiz.com/' },
	{ img: brand11, width: 80, url: 'https://www.sociedadmedicahgm.com/' },
	{ img: brand12, width: 200, url: 'https://www.inspiranetwork.com/' },
	{ img: brand13, width: 70, url: 'https://saxum.com.mx/' },
	{ img: brand14, width: 200, url: 'https://www.seen.es/portal/' },
	{ img: brand15, width: 90, url: 'https://www.federacionmedicacolombiana.com/' },
	{ img: brand16, width: 300, url: 'https://www.medicinainterna.net.pe/' },
	{ img: brand17, width: 200, url: 'https://troposformacion.com/' },
	{ img: brand18, width: 200, url: 'https://www.udima.es/' },
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
