import React from 'react';
import ButtonPrimary from '@/components/Button/ButtonPrimary';

const NoContent = () => (
  <div className='border border-gray-200 rounded-lg p-6 flex flex-col justify-center items-center h-full min-h-[50vh]'>
    <p
      className='font-raleway text-[#6474A6] text-center w-[85%] mb-2'
      style={{ fontSize: 24, fontWeight: 100 }}
    >
      Aún puedes descubrir mucho más en Medical & Scientific Knowledge
    </p>
    <ButtonPrimary href='/tienda/?profesion=medicos&recurso=curso'>
      Comienza un Curso
    </ButtonPrimary>
  </div>
);

export default NoContent;
