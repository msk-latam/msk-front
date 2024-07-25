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

const SINGLE: SinglePageType = {
  id: 'eae0212192f63287e0c212',
  featuredImage: '/webp-images/misc/mission.webp',
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
        <div className='md:container '>
          <div className='md:container px-4 sm:px-8 md:px-12 lg:px-20 nc-SingleContent  relative space-y-10 mb-16'>
            <h1>{data.title}</h1>
            <h2>{data.title_convenios}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: data.description_convenios }}
            />
            <h2>{data.title_nuestro_equipo}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: data.description_nuestro_equipo,
              }}
            />
            <h2>{data.title_direccion_medica}</h2>
            <div className='flex justify-center'>
              <Image src={data.imagen} alt='doctor' width={100} height={100} />
            </div>

            <h3>Staff</h3>
            {data.staff &&
              data.staff.map((member, index) => (
                <div key={index}>
                  <h4>{member.title}</h4>
                  <div className='flex justify-center'>
                    <Image
                      src={member.imagen}
                      alt={member.title}
                      width={100}
                      height={100}
                    />
                  </div>
                  <p>{member.description}</p>
                </div>
              ))}

            <h3>Dirección Médica</h3>
            {data.direccion_medica &&
              data.direccion_medica.map((medico, index) => (
                <div key={index}>
                  <h4>{medico.title}</h4>
                  <div className='flex justify-center'>
                    <Image
                      src={medico.imagen}
                      alt={medico.title}
                      width={100}
                      height={100}
                    />
                  </div>
                  <p>{medico.description}</p>
                </div>
              ))}

            <h3>Avales</h3>
            {data.avales &&
              data.avales.map((aval, index) => (
                <div key={index}>
                  <h4>{aval.title}</h4>
                  <div className='flex justify-center'>
                    <Image
                      src={aval.image}
                      alt={aval.title}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: aval.description_long }}
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      {/* transformar a componente */}

      <div className='md:container'>
        <div className='px-4 sm:px-8 md:px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-4 my-16'>
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default PageNosotrosComponent;
