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
      <section className="w-full bg-gray-100 font-raleway">
        <div className="rounded-[40px] max-w-7xl mx-auto px-6 md:px-12 py-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-5">Preguntas frecuentes</h2>
          <p className="text-sm text-neutral-600">Cargando preguntas frecuentes...</p>
        </div>
      </section>
    );
  }

  if (error || !faqItems.length) {
    return (
      <section className="w-full bg-gray-100 font-raleway">
        <div className="rounded-[40px] max-w-7xl mx-auto px-6 md:px-12 py-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-5">Preguntas frecuentes</h2>
          <p className="text-sm text-neutral-600">No se pudieron cargar las preguntas frecuentes.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-100 font-raleway">
      <div className="rounded-[40px] max-w-7xl mx-auto px-6 md:px-12 pb-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-5 text-left">Preguntas frecuentes</h2>

        <div className="divide-y divide-neutral-200">
          {faqItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center py-6 text-left"
              >
                <span className="text-base font-medium">{item.question}</span>
                {openIndex === index ? (
                  <ArrowUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ArrowDown className="h-5 w-5 text-gray-500" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pb-6 pr-2"
                  >
                    <div
                      className="text-sm text-neutral-600"
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
