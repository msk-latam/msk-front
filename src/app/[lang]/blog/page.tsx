import { TABS_BLOG } from '@/data/MSK/blog';
import BlogSummary from '@/components/MSK/BlogSummary';
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
import HomeExtraInfo from '@/components/MSK/HomeExtraInfo';
import { cookies } from 'next/headers';
import ssr from '@/services/ssr';
import { FetchPostType } from '@/data/types';
import WelcomeBlog from '@/components/MSK/Blog/WelcomeBlog';
import NewsletterBlog from '@/components/MSK/Blog/NewsletterBlog';
import { IS_PROD, SITE_URL } from '@/contains/constants';
import { Props } from '@/app/layout';
import { Metadata } from 'next';
import SectionSliderBestSellers from '@/components/Sections/SectionSliderBestSellers';

interface PageProps {
  params: any;
}
export const runtime = 'edge';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const currentCountry = params.lang || cookies().get('country')?.value;
  return {
    title: 'Blog | MSK',
    alternates: IS_PROD
      ? {
          canonical: `${SITE_URL}/${currentCountry}/blog`,
        }
      : undefined,
    robots: IS_PROD
      ? {
          index: true,
          follow: true,
        }
      : undefined,
  };
}

const PageBlog: React.FC<PageProps> = async ({ params }) => {
  const currentCountry = params.lang || cookies().get('country')?.value;
  const allBestSellers = await ssr.getBestSellers(currentCountry);

  console.log({ allBestSellers });
  const allPosts = await ssr.getPosts();
  const welcomePosts = allPosts.filter((p: FetchPostType, i: number) => i < 4);

  return (
    <div className='nc-PageBlog relative animate-fade-down'>
      <div className='md:container relative overflow-hidden'>
        <div className='px-4 sm:px-8 md:px-6 lg:px-20 relative'>
          <WelcomeBlog tabs={[]} heading='' posts={welcomePosts} />
          <BlogSummary
            posts={allPosts}
            tabs={TABS_BLOG}
            className='py-16'
            desc=''
            heading=''
            showTitle
            forSingleNote={false}
          />
          <HomeExtraInfo country={currentCountry} />
        </div>
        <div className='max-w-[1700px] mx-auto my-16'>
          <div className='relative py-16'>
            <BackgroundSection />
            <SectionSliderBestSellers
              posts={allBestSellers}
              postCardName='card9'
              heading='¿Buscas capacitarte a distancia?'
              subHeading='Estos son los cursos más elegidos entre profesionales de la salud'
              sliderStype='style2'
              uniqueSliderClass='PageBlog-section6'
              className='mx-auto max-w-[85%]'
            />
          </div>
        </div>
        <div className='px-4 sm:px-8 md:px-12 lg:px-20 relative'>
          <NewsletterBlog />
        </div>
      </div>
    </div>
  );
};

export default PageBlog;
