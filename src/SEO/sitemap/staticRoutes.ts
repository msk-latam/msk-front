const baseUrl = 'https://msklatam.com';
export const staticRoutes = [
	'/',
	'/bases-promocionales',
	'/contacto',
	'/nosotros',
	'/mision',
	'/politica-de-cookies',
	'/politica-de-privacidad',
	'/terminos-y-condiciones',
].map((route) => ({
	url: `${baseUrl}${route}`,
	lastModified: new Date().toISOString(),
}));
