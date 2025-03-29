import { IS_PROD } from '@/contains/constants';

export function generateURLPayments(suffix: string) {
  const baseURL = IS_PROD
    ? process.env.NEXT_PUBLIC_API_PAYMENTS_URL
    : 'http://localhost:8000';

  return `${baseURL}${suffix}`;
}
