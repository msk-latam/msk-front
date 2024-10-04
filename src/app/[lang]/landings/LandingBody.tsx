import CourseRequirements from '@/components/SingleProductDetail/Requirements/CourseRequirements';
import { FetchSingleProduct } from '@/data/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { paymentLinks } from './LandingsVariables';

interface LandingProps {
  product: FetchSingleProduct;
  country: string;
}

const LandingBody: FC<LandingProps> = ({ product, country }) => {
  const aboutCourse =
    product.params.slug === 'medicina-interna'
      ? 'Sobre el curso'
      : 'Sobre el programa';

  const aboutCourseBody =
    product.params.slug === 'medicina-interna'
      ? 'Con el curso de Medicina interna de MSK, podrás mejorar tus competencias en la especialidad para ser capaz de llevar a cabo una práctica diaria al máximo nivel de responsabilidad, dirigida a resolver los procesos que afectan a los distintos órganos y sistemas del adulto. Tu aprendizaje tendrá el foco puesto en las patologías prevalentes, preparándote para promover la salud y prevenir la enfermedad de personas y colectivos que requieran tu atención. Al finalizar el curso de Medicina interna de MSK, habrás adquirido especiales habilidades para el razonamiento clínico y la toma de decisiones. También contarás con conocimientos científicos clave para el manejo básico de distintas enfermedades y procesos nosológicos, para determinar derivaciones a cirugía o subespecialistas y para aplicar correctamente diversos medios diagnósticos y terapéuticos, con el plus de haber aprendido sobre cómo informar adecuadamente al paciente y a sus familiares.'
      : 'El programa ACCSAP es la herramienta de actualización clínica bandera del American College of Cardiology. Se trata de la oportunidad para la capacitación continuada más importante de la especialidad, empleada por especialistas en cardiología de todo el mundo para mantenerse al corriente de los últimos desarrollos del área y satisfacer sus necesidades de recertificación. El programa ACCSAP está conformado por 130 temas que cubren todo el espectro de la cardiología, desde la ciencia básica hasta los avances más específicos de cada área de conocimiento. Cada apartado incluye una actualización completa en texto, complementada con videos creados por los más grandes expertos del American College of Cardiology, además de preguntas de autoevaluación que te permitirán comprobar tu progreso, detectar posibles lagunas y profundizar en los aspectos prácticos de los temas que trata el programa.';

  const bannerImagesDesktop =
    product.params.slug === 'medicina-interna'
      ? '/webp-images/landing-images/banner-medicina-interna-desktop.webp'
      : '/webp-images/landing-images/banner-accsap-desktop.webp';
  const bannerImagesMobile =
    product.params.slug === 'medicina-interna'
      ? '/webp-images/landing-images/banner-medicina-interna-mobile.webp'
      : '/webp-images/landing-images/banner-accsap-mobile.webp';

  const bell = '/webp-images/landing-icons/campana.svg';
  const accsapTranslateMessage =
    'La edición en español de ACCSAP ha sido traducida de la edición en inglés por Dandelion Contents, SL con permiso de la American College of Cardiology Foundation (ACCF). La ACCF se exime de cualquier responsabilidad derivada de cualquier error contenido en el producto o en los materiales de marketing.';

  const productSlug = product?.params?.slug || '';
  const paymentLink = paymentLinks[country]?.[productSlug] || '#';

  return (
    <>
      <div className='my-6'>
        <h2 className='text-2xl mb-2 '> {aboutCourse} </h2>
        <p className='text-[#392C35] font-medium'> {aboutCourseBody} </p>

        <div className='block md:hidden mt-6'>
          <Link href={paymentLink} target='_blank' rel='noopener noreferrer'>
            <Image
              src={bannerImagesMobile}
              alt='Banner Mobile'
              width={500}
              height={300}
              className='w-full h-auto'
            />
          </Link>
        </div>

        <div className='hidden md:block'>
          <Link href={paymentLink} target='_blank' rel='noopener noreferrer'>
            <Image
              src={bannerImagesDesktop}
              alt='Banner Desktop'
              width={1000}
              height={500}
              className='w-full h-auto'
            />
          </Link>
        </div>

        <div className='lg:flex block my-4 lg:justify-between'>
          {product.params.slug === 'accsap' && (
            <div className='flex  gap-4 px-6 lg:px-10 py-4 bg-[#F5F8FF] rounded-md my-6 lg:my-0'>
              <Image src={bell} alt='bell' width={80} height={80} />
              <p className='w-[27.7rem] font-medium text-sm text-[#6474A6]'>
                {' '}
                {accsapTranslateMessage}{' '}
              </p>
            </div>
          )}
          {product.requirements && (
            <CourseRequirements
              title='Qué necesitas'
              requirements={product.requirements}
              requireImage={false}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LandingBody;
