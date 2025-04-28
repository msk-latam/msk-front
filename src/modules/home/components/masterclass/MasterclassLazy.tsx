'use client';

import { Suspense, lazy } from 'react';
import MasterclassSkeleton from '@/modules/home/skeletons/MasterclassSkeleton'; // Tu skeleton ya existe

const Masterclass = lazy(() => import('./Masterclass'));

export default function MasterclassLazy() {
  return (
    <Suspense fallback={<MasterclassSkeleton />}>
      <Masterclass />
    </Suspense>
  );
}
