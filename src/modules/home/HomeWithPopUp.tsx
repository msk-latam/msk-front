// src/modules/home/HomeWithPopUp.tsx
'use client';

import { useState } from 'react';
import PopUp from '@/modules/components/PopUp';
import HomeContent from './HomeContent';

type Props = {
  lang: string;
};

export default function HomeWithPopUp({ lang }: Props) {
  const [showPopUp, setShowPopUp] = useState(true);

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
