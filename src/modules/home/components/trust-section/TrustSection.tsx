'use client';

import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

const testimonials = [
  {
    name: 'JOSÉ IGNACIO SREBOT',
    content:
      'Contenido académico excelente. La plataforma es muy amigable y la modalidad del curso es muy cómoda. Para recomendar.',
    rating: '5/5 ⭐',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'MARÍA BENÍTEZ',
    content:
      'Un contenido muy amplio me brindaron. Me ayudó mucho en mi labor. Gracias a mi asesora por acompañarme y estar cada vez que necesité algo.',
    rating: '5/5 ⭐',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'AGUSTINA ORSI',
    content:
      'Hice el curso de Hematología y realmente fue muy bueno e interesante. Aprendí un montón. Súper recomendable!',
    rating: '5/5 ⭐',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

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
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover border border-white shadow"
                />
                <p className="text-xs text-neutral-500 font-semibold">{testimonial.name}</p>
              </div>
              <p className="text-sm text-neutral-700 mb-4">{testimonial.content}</p>
              <p className="text-right text-sm font-medium mt-auto">{testimonial.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TrustSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);
  if (visibleTestimonials.length < 3) {
    visibleTestimonials.push(...testimonials.slice(0, 3 - visibleTestimonials.length));
  }

  return (
    <div className="relative w-full bg-gray-100 pt-24 pb-60 h-[1400px] md:h-[700px] z-[5]">
      <section className="relative bg-white rounded-[38px] md:p-[72px] md:px-[104px] -mt-40 mb-16 z-[50] py-10 pl-5 md:mx-20 shadow-lg">
        <h2 className="text-center pr-5 md:pr-0 md:text-left text-2xl md:text-[34px] font-semibold mb-4">
          Nos avala nuestra amplia trayectoria y experiencia
        </h2>
        <p className="text-center pr-5 md:pr-0 md:text-left text-sm text-neutral-600 mb-10">
          Acompañamos y ayudamos a todo el personal de la salud en el camino del crecimiento profesional
        </p>

        {/* Cifras */}
        <div className="flex flex-col pr-5 md:pr-0 md:flex-row justify-between text-center mb-10 gap-6">
          <div>
            <p className="text-[34px] md:text-[38px] md:text-start font-bold">+11.000</p>
            <p className="text-sm text-neutral-600">profesionales capacitados</p>
          </div>
          <div>
            <p className="text-[34px] md:text-[38px] md:text-start font-bold">+50</p>
            <p className="text-sm md:text-lg text-neutral-600">capacitaciones disponibles</p>
          </div>
          <div>
            <p className="text-[34px] md:text-[38px] md:text-start font-bold">+200</p>
            <p className="text-sm md:text-lg text-neutral-600">expertos colaborando</p>
          </div>
        </div>

        {/* Carrusel desktop */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-700 ease-in-out">
          {visibleTestimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#f9fafe] p-6 rounded-2xl shadow-sm flex flex-col justify-between h-full transition-opacity duration-700 ease-in-out">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover border border-white shadow"
                />
                <p className="text-xs md:text-sm text-neutral-500 font-semibold">{testimonial.name}</p>
              </div>
              <p className="text-lg md:text-xl text-neutral-700 mb-4">{testimonial.content}</p>
              <p className="text-right text-xs font-medium mt-auto">{testimonial.rating}</p>
            </div>
          ))}
        </div>

        {/* Carrusel mobile swipeable */}
        <TestimonialsMobile testimonials={testimonials} />
      </section>

      {/* Logos */}
      <section className="relative bg-white rounded-[40px] max-w-7xl mx-auto -mt-24 translate-y-[60px] z-[60] py-10 px-5 md:px-10 shadow-lg">
        <h2 className="text-center text-xl md:text-2xl font-semibold mb-6">
          Nos respaldan prestigiosas instituciones de todo el mundo con sus certificaciones
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-items-center">
          <img src="https://via.placeholder.com/120x40?text=Tropos" alt="Tropos" width={120} height={40} />
          <img src="https://via.placeholder.com/120x40?text=Colegio" alt="Colegio" width={120} height={40} />
          <img src="https://via.placeholder.com/120x40?text=American+College" alt="American College" width={120} height={40} />
          <img src="https://via.placeholder.com/120x40?text=EUNEIZ" alt="EUNEIZ" width={120} height={40} />
          <img src="https://via.placeholder.com/120x40?text=CONAMEGE" alt="CONAMEGE" width={120} height={40} />
          <img src="https://via.placeholder.com/120x40?text=AFEME" alt="AFEME" width={120} height={40} />
        </div>
      </section>
    </div>
  );
};

export default TrustSection;
