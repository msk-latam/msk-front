const withNextIntl = require('next-intl/plugin')('./i18n.ts');
/** @type {import('next').NextConfig} */

const nextConfig = {
	async redirects() {
		return [
			{
				source: '/:lang/quienes-somos', // Detecta cualquier prefijo de país (e.g., /es/quienes-somos)
				destination: '/:lang/nosotros', // Redirige a la misma subruta del país
				permanent: true, // Redirección permanente (código 301)
			},
			{
				source: '/:lang/blog2',
				has: [
					{
						type: 'host',
						value: 'msklatam.com',
						// value: 'localhost',
					},
				],
				destination: '/',
				permanent: true,

				
			},
		];
	},
	async headers() {
		return [
			{
				// matching all API routes
				// https://vercel.com/guides/how-to-enable-cors
				source: '/api/:path*',
				headers: [
					// { key: 'Access-Control-Allow-Credentials', value: 'true' },
					{
						key: 'Access-Control-Allow-Origin',
						value: '*',
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: '*',
					},
				],
			},
			{
				// Cache control for /blog route
				source: '/blog/:slug*', // Aplica a todas las rutas que comienzan con /blog
				headers: [
					{
						key: 'Cache-Control',
						value: 'no-cache',
					},
				],
			},
		];
	},

	// These are all the locales you want to support in
	// your application
	//output: 'export', //For static site (loses SSR cappabilites)
	//distDir: "dist",
	reactStrictMode: false,
	trailingSlash: true,
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},

	
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.pexels.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'wp.msklatam.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'secure.gravatar.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'dev.msklatam.tech',
				port: '',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
