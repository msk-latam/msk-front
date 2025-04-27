'use client';

import { useState, useEffect } from 'react';
import PopUp from '@/modules/components/PopUp';
import HomeContent from './HomeContent';
import HomeSkeleton from './skeletons/HomeSkeleton'; // importamos tu HomeSkeleton

type Props = {
  lang: string;
};

export default function HomeWithPopUp({ lang }: Props) {
  const [showPopUp, setShowPopUp] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Podés ajustar el tiempo a tu gusto

    return () => clearTimeout(timer);
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
