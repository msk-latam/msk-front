import { NextRequest, NextResponse } from 'next/server';
import { supportedLanguages } from '@/config/languages';

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  const secondSegment = segments[1];

  const country = request.cookies.get('country')?.value || 'ar';

  // 🔥 Eliminar cualquier "home" o "ar" que aparezca en cualquier parte del path
  if (segments.includes('home') || segments.includes('ar')) {
    const newSegments = segments.filter(
      (segment) => segment !== 'home' && segment !== 'ar'
    );
    const newPath = '/' + newSegments.join('/');
    return NextResponse.redirect(new URL(newPath || '/', origin), 301);
  }

  // 🔥 Corregir duplicado /tienda/tienda solo en Argentina
  if (
    !supportedLanguages.includes(firstSegment) &&
    segments.length > 2 &&
    segments[0] === 'tienda' &&
    segments[1] === 'tienda'
  ) {
    const newPath = '/' + segments.slice(1).join('/');
    return NextResponse.redirect(new URL(newPath, origin), 301);
  }

  // Si la ruta es "/", determinar el país
  if (pathname === '/') {
    if (country === 'ar') {
      return NextResponse.rewrite(new URL('/ar/home', request.url));
    } else {
      return NextResponse.redirect(new URL(`/${country}/`, origin));
    }
  }

  // Evitar duplicados tipo "/mx/mx/..."
  if (
    segments.length > 1 &&
    supportedLanguages.includes(firstSegment) &&
    firstSegment === segments[1]
  ) {
    const newPath = '/' + firstSegment + '/' + segments.slice(2).join('/');
    return NextResponse.redirect(new URL(newPath, origin), 301);
  }

  // Si está en /{country}/ (sin home explícito)
  if (
    supportedLanguages.includes(firstSegment) &&
    firstSegment !== 'ar' &&
    segments.length === 1
  ) {
    const newUrl = new URL(`/${firstSegment}/home`, request.url);
    return NextResponse.rewrite(newUrl);
  }

  // Si es Argentina y la URL empieza con /ar
  if (firstSegment === 'ar') {
    const newPath = '/' + segments.slice(1).join('/');
    return NextResponse.rewrite(new URL(newPath || '/', request.url));
  }

  // Si no tiene prefijo, asumir Argentina
  if (!supportedLanguages.includes(firstSegment)) {
    return NextResponse.rewrite(new URL(`/ar${pathname}`, request.url));
  }

  // Si es un país válido, continuar normalmente
  if (supportedLanguages.includes(firstSegment)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|icons).*)'],
};
