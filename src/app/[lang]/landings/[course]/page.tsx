import ssr from '@/services/ssr';
import { cookies, headers } from 'next/headers';
import React, { FC } from 'react';
import Landing from '../Landing';
import { redirect } from 'next/navigation';

const LandingPage: FC = async ({ params }: any) => {
	const currentCountry = params.lang || cookies().get('country')?.value;
	const allowedCountries = ['co', 'cr', 'pe'];
	const allowedCourses = ['accsap', 'medicina-interna'];

	const reqHeaders = headers();
	const currentHost = reqHeaders.get('host') || '';
	const isProduction = currentHost.includes('msklatam.com');
	const courseSlug = params.course;

	// Lógica de redirección solo en producción
	if (isProduction && (!allowedCountries.includes(currentCountry) || !allowedCourses.includes(courseSlug))) {
		// Modal o redirección cuando el curso no está permitido o el país no es permitido
		redirect('/');
	}

	const { product } = await ssr.getSingleProduct(courseSlug, currentCountry);
	return <Landing product={product} country={currentCountry} />;
};

export default LandingPage;
