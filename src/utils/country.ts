// utils/country.ts

import { supportedLanguages } from '@/config/languages';
import countryCurrencies from '@/data/_countryCurrencies.json';
import countryInstallments from '@/data/_countryInstallments.json';

export function sanitizeCountry(lang: string): string {
  return supportedLanguages.includes(lang) ? lang : 'ar';
}

export function getCurrencyByCountry(country: string): string {
  return (countryCurrencies as Record<string, string>)[country] || 'USD';
}

export function formatPrice(amount: number, country: string): string {
  const currency = getCurrencyByCountry(country);

  return new Intl.NumberFormat('es', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function getInstallmentsByCountry(country: string) {
  return (countryInstallments as Record<string, { gateway: string; quotes: number | null }>)[country] || {
    gateway: 'REBILL',
    quotes: null,
  };
}
