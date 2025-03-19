import { TABS_HOME } from '@/data/MSK/courses';
import { TABS_BLOG } from '@/data/MSK/blog';
import { HOME_SPECIALTIES } from '@/data/MSK/specialties';
import {
	getAllBestSellers,
	// getAllCourses,
	// getAllPosts,
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
import ClearLocalStorage from '@/components/versionStorage/ClearLocalStorage';
import { getJSONTiendaByCountry } from './productsTienda';
import { getJSONPostByCountry } from './posts';
import PasswordGate from '@/components/PasswordGate/PasswordGate';
import HomePage from '@/components/HomePage/HomePage';

// const BlogSummary = dynamic(() => import('@/components/MSK/BlogSummary'));
// const BrandSlider = dynamic(() => import('@/components/MSK/BrandSlider'));
// const CommentReferences = dynamic(() => import('@/components/CommentReferences'));
// const ContactForm = dynamic(() => import('@/components/MSK/ContactForm'));
// const CoursesForYou = dynamic(() => import('@/components/MSK/CoursesForYou'));
// const HomeExtraInfo = dynamic(() => import('@/components/MSK/HomeExtraInfo'));
// const Phrase = dynamic(() => import('@/components/Phrase/Phrase'));
// const Questions = dynamic(() => import('@/components/Questions/Questions'));
// const SectionGridCategoryBox = dynamic(() => import('@/components/SectionGridCategoryBox/SectionGridCategoryBox'));
// const SectionHero = dynamic(() => import('@/components/SectionHero/SectionHero'));
// const SectionSliderBestSellers = dynamic(() => import('@/components/Sections/SectionSliderBestSellers'));
// const WelcomeBox = dynamic(() => import('@/components/WelcomeBox/WelcomeBox'));

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
	// const jsonLd = generateSchemaJson('WebSite');
	// const loadingBestSellers = false;
	// const currentCountry = 'ar';
	// const JSONProduct = await getJSONTiendaByCountry(currentCountry);
	// const JSONBlog = getJSONPostByCountry(currentCountry);

	// if (true) {
	// 	//   const fetchedCourses = await ssr.getAllCourses(currentCountry);
	// 	if (!JSONProduct || !JSONProduct.products) {
	// 		console.error('No se pudo obtener la lista de productos');
	// 		return;
	// 	}
	// 	setAllCourses(JSONProduct.products);
	// }
	// if (!getAllBestSellers().length) {
	// 	const fetchedBestSellers = await ssr.getBestSellers(currentCountry);
	// 	setAllBestSellers(fetchedBestSellers);
	// }
	// if (!getAllPosts() || !getAllPosts().length) {
	// 	const fetchedPosts = await ssr.getPosts(currentCountry);
	// 	setAllPosts(fetchedPosts);
	// }
	// if (true) {
	// 	// const fetchedPosts = await ssr.getPosts(currentCountry);
	// 	setAllPosts(JSONBlog);
	// }

	// const fetchedContent = await ssr.getWpContent('/home-msk', currentCountry);
	// setPageHomeWpContent(fetchedContent);

	// const heroTitle = pageHomeWpContent?.header.cabecera || '';
	// const heroTitle =
	// 	'<p>Cursos de medicina <br /> para <span id="font-lora-italic" class="font-lora-italic"> expandir </span> tus <br /> metas profesionales</p>';

	// const heroImage = pageHomeWpContent?.header.imagen || '';

	// const heroImageWEBP = '/webp-images/home/home-msk.webp';

	// const faqs = homeFAQs(currentCountry);

	// const allBestSellers = await ssr.getBestSellers(currentCountry);

	// console.log(JSONProduct, 'mostrnado productos');
	// return false;

	console.log('testing branch');
	return (
		<>
			<HomePage />
		</>
	);
};

export default PageHome;
