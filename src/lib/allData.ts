import { WpContentData } from '@/data/types';
import ssr from '@/services/ssr';

// Courses
let allCourses: any = [];
export const setAllCourses = (courses: any) => {
	allCourses = courses;
};
export const getAllCourses = () => allCourses;

let storeCourses: any = [];
export const getStoreCourses = () => storeCourses;
export const setStoreCourses = (courses: any) => {
	storeCourses = courses;
};

let loadingCourses: boolean = false;
export const setLoadingCourses = (value: boolean) => (loadingCourses = value);
export const isLoadingCourses = () => loadingCourses;

// Best Sellers
let allBestSellers: any = [];
let loadingBestSellers: boolean = false;
export const setAllBestSellers = (bestSellers: any) => {
	allBestSellers = bestSellers;
};
export const getAllBestSellers = () => allBestSellers;
export const setLoadingBestSellers = (value: boolean) => (loadingBestSellers = value);
export const isLoadingBestSellers = () => loadingBestSellers;

// Posts
let allPosts: any = [];
let loadingPosts: boolean = false;
export const setAllPosts = (posts: any) => {
	allPosts = posts;
};
export const getAllPosts = () => allPosts;
export const setLoadingPosts = (value: boolean) => (loadingPosts = value);
export const isLoadingPosts = () => loadingPosts;

// Store
let allStoreSpecialties: any = [];
let loadingAllStoreSpecialties: boolean = false;
export const setAllStoreSpecialties = (value: any) => {
	allStoreSpecialties = value;
};

export const getAllStoreSpecialties = async (currentCountry: string) => {
	if (!allStoreSpecialties.length) {
		try {
			const specialties = await ssr.getSpecialtiesStore(currentCountry);
			setAllStoreSpecialties(specialties);
			return specialties;
		} catch (error) {
			console.error('Error fetching specialties:', error);
			return [];
		}
	}
	return allStoreSpecialties;
};
export const isLoadingStoreSpecialties = () => loadingAllStoreSpecialties;

let allProfessions: any = [];
let loadingAllProfessions: boolean = false;
export const setAllProfessions = (value: any) => {
	allProfessions = value;
};

export const getAllProfessions = async () => {
	if (!allProfessions.length) {
		try {
			const professions = await ssr.getAllProfessions();
			setAllProfessions(professions);
			return professions;
		} catch (error) {
			console.error('Error fetching professions:', error);
			return [];
		}
	}
	return allProfessions;
};

export const isLoadingProfessions = () => loadingAllProfessions;

//PageHome
export let pageHomeWpContent: WpContentData | undefined = undefined;
let loadingPageHomeWpContent: boolean = false;

export const setPageHomeWpContent = (value: any) => {
	pageHomeWpContent = value;
};
export const getPageHomeWpContent = () => pageHomeWpContent;
export const getPageHomeWpData = async (currentCountry: string) => {
	const pageData = getPageHomeWpContent();

	if (typeof pageData === 'undefined') {
		const fetchedContent = await ssr.getWpContent('/home-msk', currentCountry);
		setPageHomeWpContent(fetchedContent);
	}
};
export const isLoadingPageHomeWpContent = () => loadingPageHomeWpContent;
