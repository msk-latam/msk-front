const hostname = process.env.VERCEL_URL || '';
export const isProductive = hostname.includes('msklatam') && !hostname.includes('tech');
export const environmentBackend = isProductive ? process.env.NEXT_PUBLIC_URL : process.env.NEXT_PUBLIC_PUBLIC_URL_DEV;
