import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const DEFAULT_LOCALE = 'ar';

const supportedLocales = ['ar', 'mx', 'cl', 'co', 'pe', 'uy', 'bo', 'ec', 've', 'pa', 'gt', 'hn', 'sv', 'ni', 'es'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorar archivos públicos, API, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Ya tiene prefijo de idioma
  const pathnameIsLocalized = supportedLocales.some((locale) =>
    pathname.startsWith(`/${locale}`)
  );
  if (pathnameIsLocalized || pathname === '/home') {
    return NextResponse.next();
  }

  // Detectar idioma del navegador
  const acceptLang = request.headers.get('accept-language') || '';
  const userLang = acceptLang.split(',')[0].split('-')[1]?.toLowerCase();

  const lang = supportedLocales.includes(userLang) ? userLang : DEFAULT_LOCALE;

  // Redirigir a /home para AR, y /[lang]/home para el resto
  const redirectPath = lang === 'ar' ? '/home' : `/${lang}/home`;
  return NextResponse.redirect(new URL(redirectPath, request.url));
}
