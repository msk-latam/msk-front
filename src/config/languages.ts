// src/config/languages.ts

export const supportedLanguages = [
    'ar', 'mx', 'cl', 'cr', 'co', 'pe', 'uy', 'py', 'bo',
    'ec', 've', 'pa', 'gt', 'hn', 'sv', 'ni', 'es'
  ];
  
  export const isValidLang = (lang: string): boolean =>
    supportedLanguages.includes(lang);
  
  export const defaultLang = 'ar';
  