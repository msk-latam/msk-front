// utils/getCurrentLang.ts
'use client';

export function urlFormat(inputUrl:any) {
  const { hostname, pathname, origin } = window.location;

  const isAllowedHost = hostname.includes('msklatam') || hostname === 'localhost';
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
  