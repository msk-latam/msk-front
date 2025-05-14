// SEO/home/metaData/homeMetaData.ts

const countries = {
	ar: 'Argentina',
	mx: 'México',
	cl: 'Chile',
	cr: 'Costa Rica',
	co: 'Colombia',
	pe: 'Perú',
	uy: 'Uruguay',
	py: 'Paraguay',
	bo: 'Bolivia',
	ec: 'Ecuador',
	ve: 'Venezuela',
	pa: 'Panamá',
	gt: 'Guatemala',
	hn: 'Honduras',
	sv: 'El Salvador',
	ni: 'Nicaragua',
	es: 'España',
};

// 🌐 Detectar siteUrl basado en el host recibido o desde window
function getSiteUrl(host?: string): string {
	if (host) {
		if (host.includes('.tech')) return 'https://msklatam.tech';
		if (host.includes('.com')) return 'https://msklatam.com';
		return 'https://msklatam.tech'; // fallback si el dominio no es reconocido
	}

	if (typeof window !== 'undefined') {
		const clientHost = window.location.hostname;
		if (clientHost.includes('.tech')) return 'https://msklatam.tech';
		if (clientHost.includes('.com')) return 'https://msklatam.com';
		return 'https://msklatam.tech';
	}

	// fallback SSR sin host ni window
	return 'https://msklatam.com';
}

export function getHomeMetadata(lang: string = 'ar', host?: string) {
	const siteUrl = getSiteUrl(host);

	const hreflangUrls = Object.fromEntries(
		Object.keys(countries).map((country) => [`es-${country}`, `${siteUrl}${country === 'ar' ? '/' : `/${country}/`}`]),
	);

	const isProd = siteUrl.includes('.com');

	return {
		title: 'Cursos de medicina para expandir tus metas profesionales | MSK',
		//description: 'Una propuesta moderna para expandir tus metas profesionales',
		//Cambiada la descripcion para mejora de SEO en home
		description:
			'Una propuesta moderna para expandir tus metas profesionales, fórmate en cursos a distancia. Aprovecha descuentos exclusivos y becas',
		canonical: hreflangUrls[`es-${lang}`] || siteUrl,
		hreflangs: hreflangUrls,
		robots: isProd ? { index: true, follow: true } : { index: false, follow: false },
	};
}
