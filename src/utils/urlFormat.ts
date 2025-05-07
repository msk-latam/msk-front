'use client';

export function urlFormat(inputUrl: any) {
	if (typeof window === 'undefined') return inputUrl; // 👈 prevención en SSR
	
	if(!inputUrl)
		return "#";

	const { pathname, origin } = window.location;

	const isRelative = !/^(http|https):\/\//i.test(inputUrl);

	if (!isRelative) {
		const allowedDomains = ['msklatam.com', 'msklatam.tech', 'localhost'];
		try {
			const parsedHost = new URL(inputUrl).hostname;
			if (!allowedDomains.includes(parsedHost)) return inputUrl;
		} catch (e) {
			return inputUrl;
		}
	}

	const langMatch = pathname.match(/^\/([^/]+)\//);
	const lang = langMatch && langMatch[1].length <= 2 ? langMatch[1] : null;

	const baseUrl = lang ? `${origin}/${lang}/` : `${origin}/`;

	let urlPath;
	try {
		const parsed = new URL(inputUrl);
		urlPath = parsed.pathname;
	} catch (e) {
		urlPath = inputUrl?.startsWith('/') ? inputUrl : `/${inputUrl}`;
	}

	const finalUrl = new URL(urlPath.replace(/^\/+/, ''), baseUrl);
	return finalUrl.toString();
}
