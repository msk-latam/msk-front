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
// import { removeFirstSubdomain } from '@/utils/removeFirstSubdomain';
import { FetchCourseType, WpContentData } from '@/data/types';
import { SITE_URL } from '@/contains/constants';
import ssr from '@/services/ssr';
import dynamic from 'next/dynamic';
import { generateHomeMetadata } from '@/SEO/home/metaData/homeMetaData';
import { homeFAQs } from '@/components/faqs/homeFAQs';

const BlogSummary = dynamic(() => import('@/components/MSK/BlogSummary'));
const BrandSlider = dynamic(() => import('@/components/MSK/BrandSlider'));
const CommentReferences = dynamic(() => import('@/components/CommentReferences'));
const ContactForm = dynamic(() => import('@/components/MSK/ContactForm'));
const CoursesForYou = dynamic(() => import('@/components/MSK/CoursesForYou'));
const HomeExtraInfo = dynamic(() => import('@/components/MSK/HomeExtraInfo'));
const Phrase = dynamic(() => import('@/components/Phrase/Phrase'));
const Questions = dynamic(() => import('@/components/Questions/Questions'));
const SectionGridCategoryBox = dynamic(() => import('@/components/SectionGridCategoryBox/SectionGridCategoryBox'));
const SectionHero = dynamic(() => import('@/components/SectionHero/SectionHero'));
const SectionSliderBestSellers = dynamic(() => import('@/components/Sections/SectionSliderBestSellers'));
const WelcomeBox = dynamic(() => import('@/components/WelcomeBox/WelcomeBox'));

export async function generateMetadata({ params }: { params: { lang: string } }) {
	return await generateHomeMetadata({ params });
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

	// const heroTitle = pageHomeWpContent?.header.cabecera || '';
	const heroTitle =
		'<p>Cursos de medicina <br /> para <span id="font-lora-italic" class="font-lora-italic"> expandir </span> tus <br /> metas profesionales</p>';

	const heroImage = pageHomeWpContent?.header.imagen || '';

	const heroImageWEBP = '/webp-images/home/home-msk.webp';

	const faqs = homeFAQs(currentCountry);

	return (
		<div className='nc- relative animate-fade-down'>
			<div className='relative  md:overflow-visible '>
				<section className=''>
					<div className=' relative'>
						<SectionHero
							rightImg={heroImageWEBP}
							// rightImg={removeFirstSubdomain(heroImage)}
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
							courses={getAllCourses().filter((course: FetchCourseType) => course.father_post_type === 'course')}
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

						<Questions content={faqs} />
					</div>

					<div className=' md:rounded-[40px] bg-neutral-100 dark:bg-black dark:bg-opacity-20  relative py-8 md:py-16 mb-[96px] xl:w-[129%] left-1/2 transform -translate-x-1/2  w-screen -mt-10'>
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
