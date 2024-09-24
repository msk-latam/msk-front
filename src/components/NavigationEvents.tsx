'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useStoreFilters } from '@/context/storeFilters/StoreProvider';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { clearFilters } = useStoreFilters();

  // useEffect(() => {
  //   const url = `${pathname}?${searchParams}`;
  //   // if url does not include "tienda" then we need to clear all filters
  //   if (!url.includes('tienda')) {
  //     console.log('clear filters');
  //     clearFilters();
  //   }
  // }, [pathname, searchParams]);

  return null;
}
