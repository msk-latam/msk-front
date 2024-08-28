'use client';
import React, { FC, useEffect, useState } from 'react';
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
import api from '@/services/api';
import { SinglePageType } from './PageMission';
import SectionSliderBestSellers from '@/components/Sections/SectionSliderBestSellers';

export interface SingleContentProps {
  data: SinglePageType;
}

const SingleContent: FC<SingleContentProps> = ({ data }) => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await api.getBestSellers();
    setCourses(res);
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className='nc-SingleContent space-y-10'>
      {/* ENTRY CONTENT */}
      <div
        id='single-entry-content'
        className='prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert'
      >
        <p className='font-lora text-xl'>
          Medical & Scientific Knowledge{' '}
          <strong className='font-lora-italic'>
            es una propuesta moderna que desafía a expandir las metas
            profesionales
          </strong>
          . Nuestra presencia en Latinoamérica y España promueve la difusión de
          un nuevo concepto en e-learning que transforma la experiencia de
          aprendizaje a distancia del personal de la salud hispanoparlante, con
          orientación hacia los resultados y el éxito profesional.
        </p>
        <p className='font-lora  text-xl'>
          Nuestro método de capacitación es flexible: brindamos distintos
          formatos de contenidos de nivel académico, entre los que se incluyen
          guías profesionales y webinars. Además, contamos con el respaldo de
          grandes instituciones de todo el mundo que certifican nuestros cursos.
        </p>
        <img src='/webp-images/misc/woman_pc.webp' alt='Doctor on PC' />
        <p className='font-lora text-xl'>
          Quienes hacemos Medical & Scientific Knowledge{' '}
          <strong className='font-lora-italic'>
            queremos acompañar y ayudar a cada persona en un camino de retos y
            crecimiento laboral.
          </strong>{' '}
          Todos los cursos que ofrecemos están desarrollados por sellos,
          instituciones y autores de prestigio. La capacitación se realiza en un
          campus virtual práctico y cada profesional tendrá el apoyo y la
          asesoría permanente de nuestros agentes académicos.
        </p>
        <p className='font-lora text-xl text-[#6474A6]'>
          ¿Te gustaría alcanzar nuevos objetivos y obtener un mayor
          reconocimiento en tu profesión?
        </p>
      </div>
      {/* <div className='max-w-[1700px] mx-auto'>
        <div className='relative py-16 my-32'>
          <BackgroundSection />
          <SectionSliderBestSellers
            postCardName='card9'
            heading='Comienza tu experiencia aquí'
            subHeading='Estos son los cursos más elegidos entre profesionales de la salud'
            sliderStype='style2'
            posts={courses}
            uniqueSliderClass='pageHome-section6'
            className='mx-auto max-w-[85%]'
          />
        </div>
      </div> */}
      <div className='md:rounded-[40px] bg-neutral-100 dark:bg-black dark:bg-opacity-20 relative py-8 md:py-16 mb-[96px] md:w-[129%] left-1/2 transform -translate-x-1/2  w-screen'>
        <SectionSliderBestSellers
          posts={courses}
          // loading={loadingBestSellers}
          className='w-full section-slider-posts-container'
          postCardName='card9'
          heading='Comienza tu experiencia aquí'
          subHeading='Estos son los cursos más elegidos entre profesionales de la salud'
          sliderStype='style2'
          uniqueSliderClass='pageHome-section6'
        />
      </div>
    </div>
  );
};

export default SingleContent;
