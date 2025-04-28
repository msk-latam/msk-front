'use client';

import { Suspense, lazy } from 'react';
import TrustSectionSkeleton from '@/modules/home/skeletons/TrustSectionSkeleton'; // 👈 tu skeleton existente

// Lazy load TrustSection
const TrustSection = lazy(() => import('../TrustSection'));

export default function TrustSectionLazy() {
  return (
    <Suspense fallback={<TrustSectionSkeleton />}>
      <TrustSection />
    </Suspense>
  );
}
