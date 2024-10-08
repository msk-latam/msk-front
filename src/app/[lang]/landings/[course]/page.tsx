import ssr from '@/services/ssr';
import { cookies, headers } from 'next/headers';
import React, { FC } from 'react';
import Landing from '../Landing';
import { redirect } from 'next/navigation';
import Script from 'next/script';

const LandingPage: FC = async ({ params }: any) => {
	const currentCountry = params.lang || cookies().get('country')?.value;
	const allowedCountries = ['co', 'cr', 'pe'];
	const allowedCourses = ['accsap', 'medicina-interna'];

	const reqHeaders = headers();
	const currentHost = reqHeaders.get('host') || '';
	const isProduction = currentHost.includes('msklatam.com');
	const courseSlug = params.course;

	if (isProduction && (!allowedCountries.includes(currentCountry) || !allowedCourses.includes(courseSlug))) {
		// Modal o redirección cuando el curso no está permitido o el país no es permitido
		redirect('/');
	}
	<Script id='hotjar-init' strategy='afterInteractive'>
		{`
                    (function(h,o,t,j,a,r){
                        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                        h._hjSettings={hjid:5162115,hjsv:6};
                        a=o.getElementsByTagName('head')[0];
                        r=o.createElement('script');r.async=1;
                        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                        a.appendChild(r);
                    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                `}
	</Script>;

	const { product } = await ssr.getSingleProduct(courseSlug, currentCountry);
	return <Landing product={product} country={currentCountry} />;
};

export default LandingPage;
