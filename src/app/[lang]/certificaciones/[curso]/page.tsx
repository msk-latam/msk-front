import LayoutPage from '@/components/MSK/LayoutPage';

import CertificadosWidget from './CertificadosWidget';
import ssr from '@/services/ssr';
import { FC } from 'react';
import LandingNavBar from '../../landings/LandingNavBar';

export async function generateMetadata() {
	return {
		title: 'Certificaciones | MSK',
	};
}

interface PageCourseProps {
	params: any;
}

const page: FC<PageCourseProps> = async ({ params }) => {
	const { product } = await ssr.getSingleProduct(params.curso, params.lang);
	const country = params.lang;
	console.log(product);
	return (
		<LayoutPage heading='Avales y certificaciones ' className='pt-10'>
			<LandingNavBar product={product} country={country} />
			<CertificadosWidget product={product} />
		</LayoutPage>
	);
};

export default page;
