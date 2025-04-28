// utils/getCurrentLang.ts
'use client';

import { supportedLanguages } from '@/config/languages'; // Aseguramos que usemos tu lista real

export function getCurrentLang() {
  if (typeof window === 'undefined') {
    return 'ar'; // fallback para SSR (por las dudas)
  }

  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (supportedLanguages.includes(firstSegment)) {
    return firstSegment;
  }

  return 'ar'; // Default: Argentina
}
