import { TABS_HOME } from '@/data/MSK/courses';
import { TABS_BLOG } from '@/data/MSK/blog';
import { HOME_SPECIALTIES } from '@/data/MSK/specialties';
import {
  getAllBestSellers,
  getAllCourses,
  getAllPosts,
  isLoadingBestSellers,
  isLoadingCourses,
  setAllBestSellers,
  setAllCourses,
  setAllPosts,
  setPageHomeWpContent,
  pageHomeWpContent,
} from '@/lib/allData';
import { cookies } from 'next/headers';
import { generateSchemaJson } from '@/lib/pageSchemaJson';
import { removeFirstSubdomain } from '@/utils/removeFirstSubdomain';
import { FetchCourseType, WpContentData } from '@/data/types';
import { SITE_URL } from '@/contains/constants';
import ssr from '@/services/ssr';
import dynamic from 'next/dynamic';
// import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';

// import BlogSummary from '@/components/MSK/BlogSummary';
// import BrandSlider from '@/components/MSK/BrandSlider';
// import CommentReferences from '@/components/CommentReferences';
// import ContactForm from '@/components/MSK/ContactForm';
// import CoursesForYou from '@/components/MSK/CoursesForYou';
// import HomeExtraInfo from '@/components/MSK/HomeExtraInfo';
// import Phrase from '@/components/Phrase/Phrase';
// import Questions from '@/components/Questions/Questions';
// import SectionHero from '@/components/SectionHero/SectionHero';
// import SectionGridCategoryBox from '@/components/SectionGridCategoryBox/SectionGridCategoryBox';
// import SectionSliderBestSellers from '@/components/Sections/SectionSliderBestSellers';
// import WelcomeBox from '@/components/WelcomeBox/WelcomeBox';
const SectionHero = dynamic(
  () => import('@/components/SectionHero/SectionHero'),
);
const WelcomeBox = dynamic(() => import('@/components/WelcomeBox/WelcomeBox'));
const BrandSlider = dynamic(() => import('@/components/MSK/BrandSlider'));
const Phrase = dynamic(() => import('@/components/Phrase/Phrase'));
const SectionGridCategoryBox = dynamic(
  () => import('@/components/SectionGridCategoryBox/SectionGridCategoryBox'),
);
const HomeExtraInfo = dynamic(() => import('@/components/MSK/HomeExtraInfo'));
const CommentReferences = dynamic(
  () => import('@/components/CommentReferences'),
);
const CoursesForYou = dynamic(() => import('@/components/MSK/CoursesForYou'));
const BlogSummary = dynamic(() => import('@/components/MSK/BlogSummary'));
const Questions = dynamic(() => import('@/components/Questions/Questions'));
const SectionSliderBestSellers = dynamic(
  () => import('@/components/Sections/SectionSliderBestSellers'),
);
const ContactForm = dynamic(() => import('@/components/MSK/ContactForm'));

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}) {
  const hostname = process.env.VERCEL_URL || '';
  const IS_PROD = hostname.includes('msklatam') && !hostname.includes('tech');
  return {
    title: 'Cursos de medicina para expandir tus metas profesionales | MSK',
    description: 'Una propuesta moderna para expandir tus metas profesionales',
    alternates: IS_PROD
      ? {
          canonical: `${SITE_URL}`,
        }
      : undefined,
    robots: IS_PROD
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}

interface PageProps {
  params: any;
}

export interface FAQS {
  texto: string;
  items: { titulo: string; parrafo: string }[];
}

const PageHome: React.FC<PageProps> = async ({ params }) => {
  const jsonLd = generateSchemaJson('WebSite');
  const currentCountry = params.lang || cookies().get('country')?.value;
  const loadingBestSellers = false;

  if (!getAllCourses().length) {
    const fetchedCourses = await ssr.getAllCourses(currentCountry);
    setAllCourses(fetchedCourses);
  }
  if (!getAllBestSellers().length) {
    const fetchedBestSellers = await ssr.getBestSellers(currentCountry);
    setAllBestSellers(fetchedBestSellers);
  }
  if (!getAllPosts() || !getAllPosts().length) {
    const fetchedPosts = await ssr.getPosts(currentCountry);
    setAllPosts(fetchedPosts);
  }

  const fetchedContent = await ssr.getWpContent('/home-msk', currentCountry);
  setPageHomeWpContent(fetchedContent);

  const heroTitle = pageHomeWpContent?.header.cabecera || '';
  const heroImage = pageHomeWpContent?.header.imagen || '';

  return (
    <div className='nc-PageHome relative animate-fade-down'>
      <div className='relative  md:overflow-visible '>
        <section className=''>
          <div className=' relative'>
            <SectionHero
              rightImg={removeFirstSubdomain(heroImage)}
              className='pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20'
              btnText='Comienza tu experiencia'
              redirectUrl='/tienda?recurso=curso'
              heading={heroTitle}
            />
          </div>

          <WelcomeBox content={pageHomeWpContent as WpContentData} />

          <div className=' relative mb-10 md:mb-28'>
            <BrandSlider country={currentCountry} />
            <Phrase content={pageHomeWpContent?.cedentes.texto as string} />
            <SectionGridCategoryBox
              headingCenter={false}
              categories={HOME_SPECIALTIES.filter((_, i) => i < 4)}
              categoryCardType='card2'
              className='pb-8 lg:pb-28'
            />

            <HomeExtraInfo country={currentCountry} />
          </div>

          <div className='md:w-[124%] left-1/2 transform -translate-x-1/2 relative w-screen'>
            <CommentReferences content={pageHomeWpContent as WpContentData} />
          </div>

          <div className=' relative'>
            <CoursesForYou
              courses={getAllCourses().filter(
                (course: FetchCourseType) =>
                  course.father_post_type === 'course',
              )}
              bestSeller={getAllBestSellers()}
              tabs={TABS_HOME}
              className='pt-8 pb-2'
              heading='Oportunidades para ti'
              desc='Cursos destacados para realizar a distancia'
              loading={isLoadingCourses() || isLoadingBestSellers()}
            />
            <BlogSummary
              posts={getAllPosts()}
              tabs={TABS_BLOG}
              className='pt-4 md:mt-16 md:mb-8 pb-8'
              heading='Blog'
              desc='Recursos para informarte y aprender de distintas maneras'
              showTitle
              forSingleNote={false}
            />

            <Questions
              content={pageHomeWpContent?.preguntas_frecuentes as FAQS}
            />
          </div>

          <div className=' md:rounded-[40px] bg-neutral-100 dark:bg-black dark:bg-opacity-20 relative py-8 md:py-16 mb-[96px] xl:w-[129%] left-1/2 transform -translate-x-1/2  w-screen -mt-10'>
            <SectionSliderBestSellers
              posts={getAllBestSellers()}
              loading={loadingBestSellers}
              className='w-full section-slider-posts-container px-12 md:px-4'
              postCardName='card9'
              heading='Nuestros cursos más elegidos'
              subHeading='Profesionales como tú ya se capacitaron con ellos. ¡Ahora te toca a ti!'
              sliderStype='style2'
              uniqueSliderClass='pageNewHome-section6'
            />
          </div>

          <div className=' grid grid-cols-1 md:grid-cols-3 gap-4 my-16'>
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PageHome;
