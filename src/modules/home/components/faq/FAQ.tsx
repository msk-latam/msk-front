'use client';

import React, { useState } from 'react';
import useFaqs from '@/modules/home/hooks/useFaqs';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';

const FaqSection = () => {
  const { data: faqItems, loading, error } = useFaqs();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <section className="w-full bg-gray-100 font-inter text-[#1A1A1A]">
        <div className="rounded-[40px] max-w-7xl mx-auto px-6 md:px-12 py-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-5">Preguntas frecuentes</h2>
          <p className="text-sm text-neutral-600">Cargando preguntas frecuentes...</p>
        </div>
      </section>
    );
  }

  if (error || !faqItems.length) {
    return (
      <section className="w-full bg-gray-100 font-inter text-[#1A1A1A]">
        <div className="rounded-[40px] max-w-7xl mx-auto px-6 md:px-12 py-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-5">Preguntas frecuentes</h2>
          <p className="text-sm text-neutral-600">No se pudieron cargar las preguntas frecuentes.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full md:mb-60  ">
      <div className="rounded-[40px] max-w-7xl mx-auto px-6 md:px-12 pb-12">
        <h2 className="text-xl md:text-[34px] md:text-2xl font-Raleway mb-5 md:mb-[100px] md:mt-10 md:text-left text-center">Preguntas frecuentes</h2>

        <div className="divide-y divide-[#C4C7CD]">
          {faqItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center py-6 text-left"
              >
                <span className="md:text-[24px] text-[14px] text-[#1A1A1A] font-Inter md:mb-[25px] translate-y-[18px]">{item.question}</span>
                {openIndex === index ? (
                  <ArrowUp className="md:h-[20px] md:w-[16px] h-4 w-4 text-[#1A1A1A] adasd" />
                ) : (
                  <ArrowDown className="md:h-[20px] md:w-[16px] h-4 w-4 text-[#1A1A1A]" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                 <motion.div
                 key="content"
                 layout
                 initial={{ opacity: 0, y: -10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.20, ease: 'easeIn' }}
                 className="overflow-hidden pb-6 pr-2"
               >
                 <div
                   className="md:text-[20px] text-[14px] text-[#1A1A1A]"
                   dangerouslySetInnerHTML={{ __html: item.answer }}
                 />
               </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
