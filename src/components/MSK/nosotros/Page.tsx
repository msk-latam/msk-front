'use client';
import React, { FC, ReactNode, useContext } from 'react';
import { PostDataType, SinglePageType, TaxonomyType } from '@/data/types';
import { CountryContext } from '@/context/country/CountryContext';
import useTyC from '@/hooks/useTyC';
import { CommentType } from '@/components/CommentCard/CommentCard';
import SingleHeader from '@/components/MSK/Privacy/SingleHeader';
import SingleContent from '@/components/MSK/Privacy/SingleContent';
import Image from 'next/image';
import { PageSingleTemp3SidebarProps } from '../bases-promocionales/Page';
import useNosotros from '@/hooks/useNosotros';
import ContactForm from '../ContactForm';
import LoadingText from '../Loader/Text';
import SectionSliderPosts from '@/components/Sections/SectionSliderPosts';
import Link from 'next/link';

const SINGLE: SinglePageType = {
  id: 'eae0212192f63287e0c212',
  featuredImage: '/public/images/banners/nosotros.png',
  title: 'Quiénes Somos',
  desc: 'Medical & Scientific Knowledge es una propuesta moderna que desafía a expandir las metas profesionales. Nuestra presencia en Latinoamérica y España promueve la difusión de un nuevo concepto en e-learning que transforma la experiencia de aprendizaje a distancia del personal de la salud hispanoparlante, con orientación hacia los resultados y el éxito profesional.',
  date: 'May 20, 2021',
  href: '/single/this-is-single-slug',
  commentCount: 14,
  viewdCount: 2378,
  readingTime: 6,
  bookmark: { count: 3502, isBookmarked: false },
  like: { count: 773, isLiked: true },
  author: {
    id: 10,
    firstName: 'Mimi',
    lastName: 'Fones',
    displayName: 'Fones Mimi',
    email: 'mfones9@canalblog.com',
    avatar: '',
    count: 38,
    href: '/author/the-demo-author-slug',
    desc: 'There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.',
    jobName: 'Author Job',
  },
  articles: [],
  categories: [
    {
      id: 1,
      name: 'Garden',
      href: '/archive/the-demo-archive-slug',
      thumbnail:
        'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGdhcmRlbmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
      count: 13,
      color: 'pink',
      taxonomy: 'category',
    },
    {
      id: 2,
      name: 'Jewelry',
      href: '/archive/the-demo-archive-slug',
      thumbnail:
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGpld2Vscnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
      count: 16,
      color: 'red',
      taxonomy: 'category',
    },
  ],
  postType: 'standard',
  tags: [],
  content: '',
  comments: [],
};

const PageNosotrosComponent: FC<PageSingleTemp3SidebarProps> = ({
  className = '',
}) => {
  const { countryState } = useContext(CountryContext);
  const { data } = useNosotros(countryState.country);
  console.log(data);

  function cleanHTML(html: string) {
    // Crear un elemento temporal para manipular el HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Eliminar clases innecesarias y otros atributos
    const spans = tempDiv.querySelectorAll('span');
    spans.forEach(span => {
      span.removeAttribute('class');
      span.removeAttribute('lang');
      span.removeAttribute('xml:lang');
      span.removeAttribute('data-contrast');
    });

    // Convertir el HTML limpio en texto
    const cleanedText = tempDiv.innerText;

    return cleanedText;
  }

  return (
    <>
      <header className='relative pt-16 z-10 md:py-20 lg:py-14 bg-neutral-900 dark:bg-black'>
        <div className='dark container relative z-10 ml-0 sm:ml-6 md:ml-12 lg:ml-24 max-w-screen-lg'>
          <div className='max-w-screen-md'>
            <SingleHeader
              hiddenDesc
              metaActionStyle='style2'
              pageData={SINGLE}
            />
          </div>
        </div>

        <div className='mt-8 md:mt-0 md:absolute md:top-0 md:right-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3 mission-image-container'>
          <div className='hidden md:block absolute top-0 left-0 bottom-0 w-1/5 from-neutral-900 dark:from-black bg-gradient-to-r'></div>
          <Image
            className='mission-image'
            src='/webp-images/misc/mission.webp'
            alt='Nuestra Mision'
            width={1000}
            height={500}
          />
        </div>
      </header>

      {/* transformar a componente */}

      {!data && (
        <div className='flex flex-col gap-8 container'>
          <LoadingText />
          <LoadingText />
          <LoadingText />
        </div>
      )}

      {data && (
        <div className=' '>
          <div className=' nc-SingleContent  relative space-y-10 mb-16'>
            <div className='w-full max-w-[50rem] mx-auto '>
              <p className='font-lora text-[#392C35] pb-2 pt-4 text-base sm:text-lg lg:text-xl'>
                Medical & Scientific Knowledge es un grupo español con más de
                ocho años de trayectoria en la industria pharma y en el
                desarrollo de cursos de medicina.
              </p>
              <p className='font-lora text-[#392C35] py-2 text-base sm:text-lg lg:text-xl'>
                Nuestra misión es satisfacer las necesidades de los
                profesionales de la salud que buscan estudiar medicina a
                distancia, gestionando sus procesos de capacitación a través de
                una propuesta dinámica con cursos de actualización a la medida
                de sus posibilidades. Ofrecemos una experiencia exitosa, fluida
                y de mejora continua. Puedes conocer más sobre nuestra misión{' '}
                <Link
                  className='text-[#9200AD] underline text-base sm:text-lg lg:text-xl'
                  href='/mision'
                >
                  ingresando aquí
                </Link>
                .
              </p>
              <h1 className='py-2 text-base sm:text-lg lg:text-xl'>
                {' '}
                {data.title}{' '}
              </h1>
              <Image
                src={data.imagen}
                alt=''
                width={1000}
                height={1000}
                className='object-cover w-full h-auto'
              />
              <h1 className='py-2 text-base sm:text-lg lg:text-xl'>
                {' '}
                {data.title_convenios}{' '}
              </h1>
              <p className='font-lora text-[#392C35] pb-4 text-base sm:text-lg lg:text-xl'>
                {cleanHTML(data.description_convenios)}
              </p>

              {data.avales && (
                <div className='bg-neutral-100 slider-container px-4 sm:px-10 py-10 rounded-2xl'>
                  <SectionSliderPosts
                    heading=''
                    postCardName='card20'
                    sliderStype='style2'
                    posts={data.avales}
                    uniqueSliderClass='curso-avales-slider'
                  />
                </div>
              )}
              <h1 className='py-2 pt-6 text-base sm:text-lg lg:text-xl'>
                {' '}
                {data.title_nuestro_equipo}{' '}
              </h1>
              <p className='font-lora text-[#392C35] pb-6 text-base sm:text-lg lg:text-xl'>
                {' '}
                {cleanHTML(data.description_nuestro_equipo)}{' '}
              </p>
              <div className='flex flex-col space-y-4'>
                {data.staff.map((person, index) => (
                  <div key={index} className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <Image
                        src={person.imagen}
                        alt={person.title}
                        width={100}
                        height={100}
                        className='rounded-md'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-base sm:text-lg font-semibold'>
                        {person.title}
                      </span>
                      <span className='text-[#6474A6] text-sm sm:text-base'>
                        {person.description}
                      </span>
                    </div>
                  </div>
                ))}
                <h1 className='py-2 text-base sm:text-lg lg:text-xl'>
                  {' '}
                  {data.title_direccion_medica}{' '}
                </h1>
                {data.direccion_medica.map((person, index) => (
                  <div key={index} className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <Image
                        src={person.imagen}
                        alt={person.title}
                        width={100}
                        height={100}
                        className='rounded-md'
                      />
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-base sm:text-lg font-semibold'>
                        {person.title}
                      </span>
                      <span className='text-[#6474A6] text-sm sm:text-base'>
                        {person.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* transformar a componente */}

      <div className=''>
        <div className=' grid grid-cols-1 md:grid-cols-3 gap-4 my-16'>
          <ContactForm isNosotros={true} />
        </div>
      </div>
    </>
  );
};

export default PageNosotrosComponent;
