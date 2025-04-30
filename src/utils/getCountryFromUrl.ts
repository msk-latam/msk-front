// src/utils/getCountryFromUrl.ts
import { supportedLanguages, defaultLang } from '@/config/languages';


export function getCountryFromUrl(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  return supportedLanguages.includes(firstSegment) ? firstSegment : defaultLang;
}