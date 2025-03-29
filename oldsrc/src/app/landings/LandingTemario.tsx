import Accordion from '@/components/Accordion/Accordion';
import { courseReviewRefs } from '@/components/SingleProductDetail/EmbedSocial';
import ProductInstructors from '@/components/SingleProductDetail/ProductInstructors';
import { FetchSingleProduct } from '@/data/types';
import React, { FC, useEffect, useState } from 'react';

interface LandingProps {
  product: FetchSingleProduct;
  country: string;
}

const LandingTemario: FC<LandingProps> = ({ product, country }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const handleAccordionClick = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const temarioArray = Object.values(product.temario).filter(
    item => typeof item === 'object',
  );

  const dataRef = courseReviewRefs[product.params.slug]
    ? courseReviewRefs[product.params.slug]
    : courseReviewRefs['general'];

  useEffect(() => {
    if (!document.getElementById('EmbedSocialHashtagScript')) {
      const script = document.createElement('script');
      script.id = 'EmbedSocialHashtagScript';
      script.src = 'https://embedsocial.com/cdn/ht.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, [dataRef]);

  return (
    <>
      <div className='my-10'>
        <div className='mb-6'>
          <h2 className='text-2xl mb-2'>Qué temas verás</h2>
          <div className='flex gap-2'>
            <p className='text-[#6474A6]'>
              {' '}
              {product.cantidad_modulos} módulos{' '}
            </p>
            <p className='text-[#6474A6]'>•</p>
            <p className='text-[#6474A6]'>
              {' '}
              {product.details.duration.value} horas estimadas{' '}
            </p>
          </div>
        </div>

        <div className='modules'>
          {temarioArray.map((item, index) => {
            if (!item.card_title || !item.card_body) return null;
            return (
              <Accordion
                title={item.card_title}
                index={index}
                currentIndex={openIndex}
                setCurrentIndex={() => handleAccordionClick(index)}
                key={`acc_${index}`}
              >
                <div
                  className='accordion-content p-3'
                  dangerouslySetInnerHTML={{ __html: item.card_body }}
                />
              </Accordion>
            );
          })}
        </div>

        <ProductInstructors product={product} />
        <div className='embedsocial-hashtag ' data-ref={dataRef}></div>
      </div>
    </>
  );
};

export default LandingTemario;
