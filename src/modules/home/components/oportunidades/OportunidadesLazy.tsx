'use client';

import dynamic from 'next/dynamic';

// Cargamos Oportunidades.tsx solo cuando se necesita
const Oportunidades = dynamic(() => import('./Oportunidades'), {
  ssr: false, // 🚫 No lo cargamos del lado del servidor
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      {/* Loader temporal mientras carga Oportunidades */}
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black" />
    </div>
  ),
});

export default Oportunidades;
