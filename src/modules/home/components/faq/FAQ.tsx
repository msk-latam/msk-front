import React, { useEffect, useState } from 'react';
import { getFaqSection } from '../../service/faq.service'; // Import the service
import { Faq } from '@/modules/home/types'; // Import the Faq type

const FaqSection = () => {
  const [faqItems, setFaqItems] = useState<Faq[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const faqs = await getFaqSection(); // Call the service to fetch FAQs
        setFaqItems(faqs); // Set the FAQ data in state
      } catch (error) {
        console.error("Error loading FAQs: ", error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <section className="w-full bg-gray-100 pt-24 font-raleway -mt-20">
      <div className="rounded-[40px] max-w-7xl mx-auto px-6 md:px-12 py-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-10 text-left">Preguntas frecuentes</h2>

        <div className="divide-y divide-neutral-200">
          {faqItems.length > 0 ? (
            faqItems.map((item, index) => (
              <div key={item.id}>
                <button className="w-full flex justify-between items-center py-6 text-left">
                  <span className="text-base font-medium">{item.question}</span>
                </button>
                <div className="overflow-hidden pb-6 pr-2">
                  <p className="text-sm text-neutral-600" dangerouslySetInnerHTML={{ __html: item.answer }} />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-lg text-gray-500 py-6">
              <p>No hay preguntas frecuentes disponibles en este momento</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
