import brand1 from '@/public/webp-images/home-banner/acc.svg';
import brand1Hover from '@/public/webp-images/home-banner/accHover.svg';

import brand2 from '@/public/webp-images/home-banner/afeme.svg';
import brand2Hover from '@/public/webp-images/home-banner/afemeHover.svg';

import brand3 from '@/public/webp-images/home-banner/anamer.svg';
import brand3Hover from '@/public/webp-images/home-banner/anamerHover.svg';

import brand4 from '@/public/webp-images/home-banner/colegio-nutricionistas.svg';
import brand4Hover from '@/public/webp-images/home-banner/colegio-nutricionistasHover.svg';

import brand5 from '@/public/webp-images/home-banner/colmed.svg';
import brand5Hover from '@/public/webp-images/home-banner/colmedHover.svg';

import brand6 from '@/public/webp-images/home-banner/conemege.svg';
import brand6Hover from '@/public/webp-images/home-banner/conemegeHover.svg';

import brand7 from '@/public/webp-images/home-banner/consejo-medico-santa-cruz.svg';
import brand7Hover from '@/public/webp-images/home-banner/consejo-medico-santa-cruzHover.svg';

import brand8 from '@/public/webp-images/home-banner/consejo-superior-medico.svg';
import brand8Hover from '@/public/webp-images/home-banner/consejo-superior-medicoHover.svg';

import brand9 from '@/public/webp-images/home-banner/eimec.svg';
import brand9Hover from '@/public/webp-images/home-banner/eimecHover.svg';

import brand10 from '@/public/webp-images/home-banner/euneiz.svg';
import brand10Hover from '@/public/webp-images/home-banner/euneizHover.svg';

import brand11 from '@/public/webp-images/home-banner/fmc.svg';
import brand11Hover from '@/public/webp-images/home-banner/fmcHover.svg';

import brand12 from '@/public/webp-images/home-banner/inspira-network.svg';
import brand12Hover from '@/public/webp-images/home-banner/inspira-networkHover.svg';

import brand13 from '@/public/webp-images/home-banner/saxum.svg';
import brand13Hover from '@/public/webp-images/home-banner/saxumHover.svg';

import brand14 from '@/public/webp-images/home-banner/seen.svg';
import brand14Hover from '@/public/webp-images/home-banner/seenHover.svg';

import brand15 from '@/public/webp-images/home-banner/smhgm.svg';
import brand15Hover from '@/public/webp-images/home-banner/smhgmHover.svg';

import brand16 from '@/public/webp-images/home-banner/spmi.svg';
import brand16Hover from '@/public/webp-images/home-banner/spmiHover.svg';

import brand17 from '@/public/webp-images/home-banner/tropos.svg';
import brand17Hover from '@/public/webp-images/home-banner/troposHover.svg';

import brand18 from '@/public/webp-images/home-banner/udima.svg';
import brand18Hover from '@/public/webp-images/home-banner/udimaHover.svg';

import { StaticImageData } from 'next/image';

interface Brand {
	img?: StaticImageData;
	width: number;
	url: string;
	imgDefault: StaticImageData;
	imgHover: StaticImageData;
}

interface BrandsByCountry {
	[key: string]: Brand[];
}

const DEFAULT_BRANDS: Brand[] = [
	{ imgDefault: brand1, imgHover: brand1Hover, width: 200, url: 'https://www.acc.org/' },
	{ imgDefault: brand2, imgHover: brand2Hover, width: 200, url: 'http://www.afeme.org.ec/pagina/' },
	{ imgDefault: brand3, imgHover: brand3Hover, width: 80, url: 'https://anamer.org/' },
	{ imgDefault: brand4, imgHover: brand4Hover, width: 320, url: 'https://www.nutricionistaspba.org.ar/' },
	{ imgDefault: brand5, imgHover: brand5Hover, width: 250, url: 'https://www.colmed3.com.ar/' },
	{ imgDefault: brand6, imgHover: brand6Hover, width: 250, url: 'https://www.conamege.org.mx/' },
	{ imgDefault: brand7, imgHover: brand7Hover, width: 80, url: 'https://consejomedicosc.org.ar/' },
	{ imgDefault: brand8, imgHover: brand8Hover, width: 150, url: 'https://consejomedicolp.org.ar/' },
	{ imgDefault: brand9, imgHover: brand9Hover, width: 300, url: 'https://www.eimec.com/' },
	{ imgDefault: brand10, imgHover: brand10Hover, width: 220, url: 'https://www.euneiz.com/' },
	{ imgDefault: brand11, imgHover: brand11Hover, width: 80, url: 'https://www.sociedadmedicahgm.com/' },
	{ imgDefault: brand12, imgHover: brand12Hover, width: 200, url: 'https://www.inspiranetwork.com/' },
	{ imgDefault: brand13, imgHover: brand13Hover, width: 70, url: 'https://saxum.com.mx/' },
	{ imgDefault: brand14, imgHover: brand14Hover, width: 200, url: 'https://www.seen.es/portal/' },
	{ imgDefault: brand15, imgHover: brand15Hover, width: 90, url: 'https://www.federacionmedicacolombiana.com/' },
	{ imgDefault: brand16, imgHover: brand16Hover, width: 300, url: 'https://www.medicinainterna.net.pe/' },
	{ imgDefault: brand17, imgHover: brand17Hover, width: 200, url: 'https://troposformacion.com/' },
	{ imgDefault: brand18, imgHover: brand18Hover, width: 200, url: 'https://www.udima.es/' },
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
