import ssr from '@/services/ssr';
import { cookies, headers } from 'next/headers';
import React, { FC } from 'react';
import Landing from '../Landing';
import { redirect } from 'next/navigation';
import HotjarLandings from '@/hotjar/hotjarLandings';
import Script from 'next/script';

const LandingPage: FC = async ({ params }: any) => {
	const currentCountry = params.lang || cookies().get('country')?.value;
	const allowedCountries = ['co', 'cr', 'pe', 'es'];
	const allowedCourses = ['accsap', 'medicina-interna'];

	const reqHeaders = headers();
	const currentHost = reqHeaders.get('host') || '';
	const isProduction = currentHost.includes('msklatam.com');
	const courseSlug = params.course;
	console.log(currentCountry, 'pais');

	if (isProduction && (!allowedCountries.includes(currentCountry) || !allowedCourses.includes(courseSlug))) {
		redirect('/');
	}

	const { product } = await ssr.getSingleProduct(courseSlug, currentCountry);
	return (
		<>
			<HotjarLandings />
			{currentCountry === 'es' && (
				<>
					<Script src='https://cdn.botpress.cloud/webchat/v2.2/inject.js' strategy='afterInteractive' />
					<Script src='https://files.bpcontent.cloud/2024/11/15/12/20241115125334-L2ZW3YCQ.js' strategy='afterInteractive' />
				</>
			)}
			<Landing product={product} country={currentCountry} />
		</>
	);
};

export default LandingPage;
