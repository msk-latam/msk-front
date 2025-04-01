'use client';

import React, { useState } from 'react';
import { faqItems } from '@/modules/home/components/faq/data/faqData';
import { useFaqs } from '@/modules/home/components/faq/hooks/useFaqs';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-gray-100 pt-24 font-raleway">
      <div className=" rounded-[40px] max-w-7xl mx-auto px-6 md:px-12 py-12 ">
        <h2 className="text-xl md:text-2xl font-semibold mb-10 text-left">Preguntas frecuentes</h2>

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
                    <p className="text-sm text-neutral-600">{item.answer}</p>
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
