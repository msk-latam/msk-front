import { FetchSingleProduct } from '@/data/types';

export const cedenteTropos = (product: FetchSingleProduct) =>
  product.params.slug === 'medicina-interna' ? 'formación' : '';

export const paymentLinks: Record<string, Record<string, string>> = {
  co: {
    // Colombia - links vacíos por ahora
    'medicina-interna': '',
    accsap: '',
  },
  cr: {
    // Costa Rica
    'medicina-interna': 'https://buy.stripe.com/aEU4grdUz8Mq7pC3d9',
    accsap: 'https://buy.stripe.com/aEUeV5g2HfaO6ly6pm',
  },
  pe: {
    // Perú
    'medicina-interna': 'https://buy.stripe.com/aEU9ALcQv8Mqh0c7tr',
    accsap: 'https://buy.stripe.com/fZedR1dUz4wafW8aFE',
  },
};
