import { FetchSingleProduct } from '@/data/types';

export const cedenteTropos = (product: FetchSingleProduct) =>
  product.params.slug === 'medicina-interna' ? 'formación' : '';
