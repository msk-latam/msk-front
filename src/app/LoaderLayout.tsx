'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import '@/modules/home/skeletons/homeSkeleton.css';

export default function LoaderLayout() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleLoad = () => {
      // Si todo el contenido terminó de cargar, ocultamos el loader
      clearTimeout(timeout);
      setLoading(false);
    };

    // Cuando cambia el pathname:
    setLoading(true);

    if (document.readyState === 'complete') {
      // Si ya está todo cargado, ocultamos rápido
      timeout = setTimeout(() => {
        handleLoad();
      },2500); // pequeño delay para dar sensación de fluidez
    } else {
      // Esperar al evento real de carga
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
