// utils/getCurrentLang.ts
'use client';

export function urlFormat(inputUrl:any) {
  const { hostname, pathname, origin } = window.location;

  const allowedDomains = ['msklatam.com', 'msklatam.tech', 'localhost'];
  const isAllowedHost = allowedDomains.includes(inputUrl);
  if (!isAllowedHost) return inputUrl;

  const langMatch = pathname.match(/^\/([^/]+)\//);
  const lang = langMatch && langMatch[1].length <= 2 ? langMatch[1] : null;

  const baseUrl = lang ? `${origin}/${lang}/` : `${origin}/`;

  let urlPath;
  try {
    const parsed = new URL(inputUrl);
    urlPath = parsed.pathname;
  } catch (e) {
    urlPath = inputUrl.startsWith('/') ? inputUrl : `/${inputUrl}`;
  }

  const finalUrl = new URL(urlPath.replace(/^\/+/, ''), baseUrl);
  return finalUrl.toString();
  }
  