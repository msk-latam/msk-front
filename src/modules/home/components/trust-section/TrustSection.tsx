'use client';

import TrustSectionSkeleton from '@/modules/home/skeletons/TrustSectionSkeleton'; // Importamos el Skeleton
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useTrustSection } from '../../hooks/useTrustSection';
import Institutions from './institutions';

const TrustSection = () => {
  const { data, loading, error } = useTrustSection();

  if (loading) {
    return <TrustSectionSkeleton />; // Mostrar Skeleton mientras carga
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-100 text-red-500 font-semibold">
        Error al cargar testimonios.
      </div>
    );
  }

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
      <div className="md:hidden w-full flex flex-col items-center gap-4 overflow-x-hidden z-5">
        <div className="relative w-full overflow-hidden">
          <div
            {...handlers}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 330}px)` }}
          >
            {testimonials.map((testimonial: any, index: number) => (
              <div
                key={index}
                className="min-w-80 max-w-[320px] bg-[#f7f9ff] p-6 rounded-2xl shadow-sm flex flex-col justify-between h-[260px] mx-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.picture}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover border border-white shadow"
                  />
                  <p className="text-xs text-neutral-500 font-semibold">
                    {testimonial.name}
                  </p>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <p className="text-[18px] font-normal mb-4 min-h-[96px] leading-snug" dangerouslySetInnerHTML={{ __html: testimonial.review }}>
                  </p>
                  <p className="text-right text-sm font-medium flex items-center justify-end gap-1 text-black">
                    {testimonial.stars}/5 <span className="text-black text-base">★</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full bg-gray-100 pt-24 pb-60 h-[1200px] md:h-[750px] z-9 md:px-4">
      <section className="relative bg-white rounded-[38px] md:p-[72px] md:px-[104px] translate-y-[20px] -mt-40 mb-16 z-9 py-10 pl-5 md:overflow-visible max-w-[1600px] mx-auto shadow-lg md:min-h-[500px] md:max-h-[750px] overflow-hidden">
        <h2 className="text-center pr-5 md:pr-0 md:text-left text-2xl md:text-[34px] mb-4">
          {title}
        </h2>
        <p className="text-center pr-5 md:pr-0 md:text-left text-sm font-inter text-neutral-600 mb-10">
          {subtitle}
        </p>

        {/* Figures */}
        <div className="flex flex-col pr-5 md:pr-0 md:flex-row justify-between text-center mb-10 font-lora gap-6">
          {figures.map((figure, index) => (
            <div key={index}>
              <p className="text-[34px] md:text-[38px] md:text-start md:font-[500] font-[Lora]">{figure.figure}</p>
              <p className="text-sm font-[500] font-raleway">
                {index === 0
                  ? 'profesionales capacitados'
                  : index === 1
                  ? 'capacitaciones disponibles'
                  : 'expertos colaborando'}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Desktop */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 h-full">
          {opinions.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#f9fafe] p-6 rounded-2xl shadow-sm flex flex-col justify-between h-[260px] transition-opacity duration-700 ease-in-out"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar[0]}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover border border-white shadow"
                />
                <p className="text-xs md:text-sm text-neutral-500 font-semibold">
                  {testimonial.name}
                </p>
              </div>
              <div className="flex flex-col justify-between flex-grow">
                <p className="text-lg font-[400] md:text-[17px] text-neutral-700 mb-4 min-h-[96px] leading-snug">
                  {testimonial.opinion}
                </p>
                <p className="text-right text-sm font-medium flex items-center justify-end gap-1 text-black">
                  5/5 <span className="text-black text-base">★</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Mobile */}
        <TestimonialsMobile testimonials={opinions} />
      </section>

      {/* Logos */}
      <Institutions />
    </div>
  );
};

export default TrustSection;
