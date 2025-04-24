// SEO/home/hooks/useHomeMetadata.ts
import { useEffect, useState } from 'react';
import { getHomeMetadata } from '../metaData/homeMetaData';

type Metadata = {
  title: string;
  description: string;
  canonical: string;
  hreflangs?: { [key: string]: string };
  robots: {
    index: boolean;
    follow: boolean;
  };
};

const SUPPORTED_LANGS = [
  'ar', 'mx', 'cl', 'cr', 'co', 'pe', 'uy', 'py', 'bo',
  'ec', 've', 'pa', 'gt', 'hn', 'sv', 'ni', 'es',
];

export function useHomeMetadata(langFromUrl?: string): Metadata {
  const [metadata, setMetadata] = useState<Metadata>({
    title: '',
    description: '',
    canonical: '',
    hreflangs: undefined,
    robots: {
      index: false,
      follow: false,
    },
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pathnameParts = window.location.pathname.split('/');
    const urlLang = pathnameParts[1];
    const lang = langFromUrl && SUPPORTED_LANGS.includes(langFromUrl)
      ? langFromUrl
      : SUPPORTED_LANGS.includes(urlLang)
        ? urlLang
        : 'ar';

    const meta = getHomeMetadata(lang);
    setMetadata(meta);
  }, [langFromUrl]);

  return metadata;
}
