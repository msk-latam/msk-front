'use client';

import { useState, useEffect } from 'react';
import PopUp from '@/modules/components/PopUp';
import HomeContent from './HomeContent';
import HomeSkeleton from './skeletons/HomeSkeleton';

type Props = {
  lang: string;
};

export default function HomeWithPopUp({ lang }: Props) {
  const [showPopUp, setShowPopUp] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasLoadedHome = sessionStorage.getItem('homeLoaded');

    if (hasLoadedHome) {
      // Si ya había cargado en esta sesión
      setLoading(false);
    } else {
      const images = Array.from(document.images);
      let loadedImages = 0;
      let timeout: NodeJS.Timeout;

      const checkIfAllLoaded = () => {
        loadedImages++;
        if (loadedImages === images.length) {
          finishLoading();
        }
      };

      const finishLoading = () => {
        clearTimeout(timeout);
        sessionStorage.setItem('homeLoaded', 'true');
        setLoading(false);
      };

      // Si no hay imágenes (caso extremo), terminar rápido
      if (images.length === 0) {
        finishLoading();
      } else {
        images.forEach((img) => {
          if (img.complete) {
            checkIfAllLoaded();
          } else {
            img.addEventListener('load', checkIfAllLoaded);
            img.addEventListener('error', checkIfAllLoaded); // si falla una img también continuar
          }
        });

        // Timeout de seguridad: máximo 5 segundos
        timeout = setTimeout(() => {
          finishLoading();
        }, 5000);
      }

      return () => clearTimeout(timeout);
    }
  }, []);

  if (loading) {
    return (
      <main className="mx-auto bg-gray-100 text-neutral-900 transition-all duration-500 ease-in-out">
        <HomeSkeleton />
      </main>
    );
  }

  return (
    <main
      className={`mx-auto bg-gray-100 text-neutral-900 transition-all duration-500 ease-in-out ${
        showPopUp ? 'md:pt-12' : 'md:pt-0'
      }`}
    >
      {showPopUp && <PopUp onClose={() => setShowPopUp(false)} />}
      <HomeContent lang={lang} />
    </main>
  );
}
