// utils/getLocalizedUrl.ts
export function getLocalizedUrl(lang: string, path: string) {
    if (lang === 'ar') {
      return `${path.startsWith('/') ? '' : '/'}${path}`;
    }
    return `/${lang}${path.startsWith('/') ? '' : '/'}${path}`;
  }
  