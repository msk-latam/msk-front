import ssr from '/src/services/ssr';
import { countries } from '@/data/countries';

let locales = countries.map((item) => item.id);
locales.push('int');

const getCountryCodeWithTimeout = (timeout = 3000) =>
	Promise.race([
		ssr.getCountryCode(),
		new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout fetching country code')), timeout)),
	]);

const i18nConfig = {
	locales: locales,
	defaultLocale: 'int',
	serverSetCookie: 'always',
	localeDetector: async (request, config) => {
		let cookie = request.cookies.get('NEXT_LOCALE');
		if (cookie && locales.includes(cookie.value)) {
			return cookie.value;
		} else {
			try {
				let countryCode = await getCountryCodeWithTimeout();
				if (locales.includes(countryCode)) {
					request.cookies.set('NEXT_LOCALE', countryCode);
					return countryCode;
				} else {
					return config.defaultLocale;
				}
			} catch {
				return config.defaultLocale; // Default en caso de error o timeout
			}
		}
	},
};

module.exports = i18nConfig;
