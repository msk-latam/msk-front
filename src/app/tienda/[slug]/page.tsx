// Form y botones de arriba del form sea estático
'use client';

import '@/app/globals.css';
import ProductPageComponent from '@/modules/products/ProductPage'


//https://cms1.msklatam.com/wp-json/msk/v1/course/333437 import link


export default function ProductPage() {
    return (
      <main className="bg-white text-neutral-900">
        <ProductPageComponent />
        
      </main>
    );
  }
  