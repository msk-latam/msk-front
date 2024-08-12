export const IS_PROD = !(
  process.env.PROD || process.env.NODE_ENV === 'production'
);
export const API_URL = process.env.NEXT_PUBLIC_MSK_WP_API;
export const PROD_BASE_URL = process.env.NEXT_PUBLIC_PUBLIC_URL;
export const DEV_BASE_URL = process.env.NEXT_PUBLIC_PUBLIC_URL_DEV;
export const SITE_URL = process.env.NEXT_PUBLIC_URL;
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_PK;
export const BASE_URL = IS_PROD ? PROD_BASE_URL : DEV_BASE_URL;
