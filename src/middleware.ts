import api from '@/services/api';
import { NextRequest, NextResponse } from 'next/server';
import { supportedLanguages } from '@/config/languages';

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // ✅ Redirección: /ar => /
  if (pathname.startsWith('/ar')) {
    const newPath = pathname.replace(/^\/ar/, '');
    return NextResponse.redirect(new URL(newPath || '/', origin), 301);
  }

  // ✅ Redirección: /mx/mx/... => /mx/...
  if (segments.length > 1 && supportedLanguages.includes(firstSegment) && firstSegment === segments[1]) {
    const newPath = '/' + segments.slice(1).join('/');
    return NextResponse.redirect(new URL(newPath || '/', origin), 301);
  }

  // ✅ Si la URL es de un país válido, continuar
  if (supportedLanguages.includes(firstSegment)) {
    return NextResponse.next();
  }

  // ✅ Si no tiene prefijo de idioma, continuar (puede ser la raíz argentina)
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};

export const fetchUserData = async () => {
  try {
    const res = await api.getUserData();
    if (!res.message) {
      localStorage.setItem('user', JSON.stringify({
        name: res.name,
        speciality: res.contact.speciality,
      }));
      localStorage.removeItem('bypassRedirect');
      return {
        name: res.name,
        speciality: res.contact.speciality,
        profile: res.contact,
      };
    } else {
      return null;
    }
  } catch (e) {
    console.error({ e });
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    return null;
  }
};
