'use client';

import React, { useState, useEffect } from 'react';
import { useTrustSection } from '../../hooks/useTrustSection'; // Asegúrate de importar el hook correctamente
import Institutions from './institutions'; // Importar el componente de instituciones
import { useSwipeable } from 'react-swipeable';

const TrustSection = () => {
  const { data, loading, error } = useTrustSection(); // Llamamos al hook para obtener los datos

  // Si los datos están cargando
  if (loading) {
    return <div>Loading Trust Section...</div>;
  }

  // Si ocurre un error al cargar los datos
  if (error) {
    return <div>{error}</div>;
  }

  // Desestructuramos los datos de la API
  const { title, subtitle, figures, opinions } = data!;

  const TestimonialsMobile = ({ testimonials }: any) => {
    const [current, setCurrent] = useState(0);

    const handlers = useSwipeable({
      onSwipedLeft: () => {
        if (current < testimonials.length - 1) {
          setCurrent((prev) => prev + 1);
        }
      },
      onSwipedRight: () => {
        if (current > 0) {
          setCurrent((prev) => prev - 1);
        }
      },
      trackMouse: true,
    });

    return (
      <div className="md:hidden w-full flex flex-col items-center gap-6 overflow-x-hidden z-50">
        <div className="relative w-full overflow-hidden">
          <div
            {...handlers}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 340}px)` }}
          >
            {testimonials.map((testimonial: any, index: number) => (
              <div
                key={index}
                className="min-w-[320px] max-w-[320px] bg-[#f7f9ff] p-6 rounded-2xl shadow-sm flex flex-col justify-between h-full mx-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar[0]} // Usamos el avatar desde los datos de la API
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover border border-white shadow"
                  />
                  <p className="text-xs text-neutral-500 font-semibold">
                    {testimonial.name}
                  </p>
                </div>
                <p className="text-sm text-neutral-700 mb-4">
                  {testimonial.opinion} {/* Usamos la opinión desde los datos de la API */}
                </p>
                <p className="text-right text-sm font-medium mt-auto">
                  {testimonial.rating} {/* Usamos la calificación desde los datos de la API */}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full bg-gray-100 pt-24 pb-60 h-[1200px] md:h-[750px] z-[5]">
      <section className="relative bg-white rounded-[38px] md:p-[72px] md:px-[104px] -mt-40 mb-16 z-[50] py-10 pl-5 md:mx-20 shadow-lg">
        <h2 className="text-center pr-5 md:pr-0 md:text-left text-2xl md:text-[34px] font-semibold mb-4">
          {title}
        </h2>
        <p className="text-center pr-5 md:pr-0 md:text-left text-sm text-neutral-600 mb-10">
          {subtitle}
        </p>

        {/* Cifras */}
        <div className="flex flex-col pr-5 md:pr-0 md:flex-row justify-between text-center mb-10 gap-6">
          {figures.map((figure, index) => (
            <div key={index}>
              <p className="text-[34px] md:text-[38px] md:text-start font-bold">{figure.figure}</p>
              <p className="text-sm text-neutral-600">
                {index === 0
                  ? 'profesionales capacitados'
                  : index === 1
                  ? 'capacitaciones disponibles'
                  : 'expertos colaborando'}
              </p>
            </div>
          ))}
        </div>

        {/* Opiniones */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-700 ease-in-out">
          {opinions.map((testimonial, index) => (
            <div key={index} className="bg-[#f9fafe] p-6 rounded-2xl shadow-sm flex flex-col justify-between h-full transition-opacity duration-700 ease-in-out">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar[0]} // Usamos el avatar desde los datos de la API
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover border border-white shadow"
                />
                <p className="text-xs md:text-sm text-neutral-500 font-semibold">{testimonial.name}</p>
              </div>
              <p className="text-lg md:text-xl text-neutral-700 mb-4">{testimonial.opinion}</p>
              <p className="text-right text-xs font-medium mt-auto">{testimonial.rating}</p>
            </div>
          ))}
        </div>

        {/* Carrusel mobile swipeable */}
        <TestimonialsMobile testimonials={opinions} />
      </section>

      {/* Logos */}
      
        <Institutions /> 
     

      

     
    </div>
  );
};

export default TrustSection;
