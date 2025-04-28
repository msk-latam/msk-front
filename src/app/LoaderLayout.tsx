'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import '@/modules/home/skeletons/homeSkeleton.css';

const noLoaderRoutes = ['/login', '/register', '/forgot-password']; // ⬅️ rutas que ignoramos

export default function LoaderLayout() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleLoad = () => {
      clearTimeout(timeout);
      setLoading(false);
    };

    // Antes de mostrar loader, verificamos si estamos en ruta ignorada
    const isIgnoredRoute = noLoaderRoutes.some(route => pathname.startsWith(route));
    if (isIgnoredRoute) {
      setLoading(false);
      return;
    }

    // Si no es ruta ignorada:
    setLoading(true);

    if (document.readyState === 'complete') {
      timeout = setTimeout(() => {
        handleLoad();
      }, 2000); // pequeño delay para fluidez
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('load', handleLoad);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[9999] transition-opacity duration-300">
      <div className="flex flex-col items-center justify-center animate-pulse">
        <Image
          src="/isotipo.svg"
          alt="MSK Logo"
          width={100}
          height={100}
          className="mb-4"
        />
        <div className="h-4 w-32 rounded-full overflow-hidden bg-gray-300 relative">
          <div className="absolute inset-0 fill-animation"></div>
        </div>
      </div>
    </div>
  );
}
