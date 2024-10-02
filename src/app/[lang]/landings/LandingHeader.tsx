import { FetchSingleProduct } from '@/data/types';
import Image from 'next/image';
import React, { FC } from 'react';
import { cedenteTropos } from './LandingsVariables';

interface LandingProps {
  product: FetchSingleProduct;
  country: string;
}

const LandingHeader: FC<LandingProps> = ({ product, country }) => {
  const accsapIcons = [
    '/webp-images/landing-icons/accsap.svg',
    '/webp-images/landing-icons/saxum.svg',
    '/webp-images/landing-icons/colmed3.svg',
    '/webp-images/landing-icons/conamege.svg',
    '/webp-images/landing-icons/consejo-superior-medico.svg',
    '/webp-images/landing-icons/msk-andros-otec.svg',
    '/webp-images/landing-icons/smhgm.svg',
    '/webp-images/landing-icons/ucuenca.svg',
    '/webp-images/landing-icons/afeme.svg',
    '/webp-images/landing-icons/anamer.svg',
  ];

  const medicinaIcons = [
    '/webp-images/landing-icons/euneiz.svg',
    '/webp-images/landing-icons/saxum.svg',
    '/webp-images/landing-icons/colmed3.svg',
    '/webp-images/landing-icons/consejo-superior-medico.svg',
    '/webp-images/landing-icons/conamege.svg',
    '/webp-images/landing-icons/msk-andros-otec.svg',
    '/webp-images/landing-icons/sociedad-peruana-medicina-interna.svg',
    '/webp-images/landing-icons/smhgm.svg',
    '/webp-images/landing-icons/ucuenca.svg',
    '/webp-images/landing-icons/afeme.svg',
    '/webp-images/landing-icons/anamer.svg',
  ];

  const headerIcons =
    product.params.slug === 'medicina-interna' ? medicinaIcons : accsapIcons;

  const bannerImage =
    product.params.slug === 'medicina-interna'
      ? '/webp-images/landing-images/header-medicina-interna.png'
      : '/webp-images/landing-images/header-accsap.png';

  const cedenteImage =
    product.params.slug === 'medicina-interna'
      ? '/webp-images/landing-icons/cedente-tropos.svg'
      : '/webp-images/landing-icons/cedente-accsap.svg';

  const headerDescription =
    product.params.slug === 'medicina-interna'
      ? 'Con este amplio curso de actualización en medicina interna incorporarás los conocimientos necesarios para el abordaje de distintas enfermedades, el diagnóstico de estados patológicos poco frecuentes, el manejo clínico de las comorbilidades y la toma de decisiones sobre la derivación del paciente.'
      : product.ficha.description;

  return (
    <>
      <div className='relative'>
        <div className='absolute inset-0 w-screen left-1/2 transform -translate-x-1/2 overflow-hidden '>
          <Image
            src={bannerImage}
            alt='Banner'
            layout='fill'
            objectFit='cover'
            quality={100}
            className='z-0'
          />
        </div>
        <div className='relative z-10'>
          <div className='inline-block bg-[#FEF9C3] px-2 py-1 rounded-sm my-4'>
            <p className='font-medium text-[#8E5A1C] '>
              Capacitación a distancia
            </p>
          </div>
          <h2 className='font-bold text-3xl text-[#392C35] mb-4'>
            {product.ficha.title}
          </h2>
          <p
            className='text-[#6474A6] font-inter mb-6 mr-0 lg:mr-60 font-medium'
            dangerouslySetInnerHTML={{ __html: headerDescription }}
          ></p>
          <p className='text-[#6474A6] font-inter font-bold'>
            CERTIFICADO Y AVALADO POR:
          </p>
          <div className='flex gap-4 my-4 overflow-x-auto whitespace-nowrap'>
            {headerIcons.map((icon, index) => (
              <Image
                key={index}
                src={icon}
                alt={`icon-${index}`}
                width={500}
                height={500}
                className='inline-block'
              />
            ))}
          </div>
          <button className='rounded-md border-2 border-[#9200AD] text-[#9200AD] py-2 px-4 my-8 mb-12 font-bold'>
            Contáctanos para más información
          </button>
          <div className='flex flex-col md:flex-row '>
            <div className='bg-[#E0E7FF] flex gap-2 p-6  justify-center items-center'>
              <div className='rounded-full p-2 bg-white'>
                <Image
                  src={cedenteImage}
                  alt='Cedente'
                  width={50}
                  height={50}
                  className='rounded-full'
                />
              </div>

              <div className='flex-col md:flex'>
                <p className=' text-[#6474A6] font-bold font-inter'>CEDENTE</p>
                <div className='flex gap-1'>
                  <p className='font-inter font-medium text-[#392C35]'>
                    {product.lista_de_cedentes?.[0]?.post_title}
                  </p>
                  <p className='font-inter font-medium text-[#392C35]'>
                    {' '}
                    {cedenteTropos(product)}{' '}
                  </p>
                </div>
              </div>
            </div>

            <div className='bg-[#E0E7FF] flex gap-6 bg-opacity-50 p-6 justify-center items-center'>
              <div className=''>
                <p className='text-[#6474A6] font-inter font-bold'>DURACIÓN</p>
                <div className='flex  gap-2'>
                  <p> {product.details.duration.value} horas </p>
                  <p>|</p>
                  <p> {product.cantidad_modulos} módulos </p>
                </div>
              </div>
              <div>
                <p className='text-[#6474A6] font-bold font-inter'>MODALIDAD</p>
                <p> {product.modalidad} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingHeader;
