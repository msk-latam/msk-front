import LayoutPage from '@/components/MSK/LayoutPage';

import CertificadosWidget from './CertificadosWidget';
import ssr from '@/services/ssr';
import { FC } from 'react';
import LandingNavBar from '../../landings/LandingNavBar';
import { getJSONTiendaByCountry } from '@/app/productsTienda';

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
	const JSONProduct = await getJSONTiendaByCountry(country);
	return (
		<LayoutPage heading='Avales y certificaciones ' className='pt-10'>
			<LandingNavBar product={product} country={country} />
			<CertificadosWidget product={product} country={country} allProducts={JSONProduct} />
		</LayoutPage>
	);
};

export default page;
