import React, { FC } from 'react';
import PageGraciasComponent from '@/components/MSK/gracias/Page';
export async function generateMetadata() {
	return {
		title: 'Gracias | MSK',
		description:
			'Gracias por comenzar a cursar con nosotros. Desarrollate profesionalmente de la mano de expertos en tu campo.',
	};
}
const PageGracias: FC = () => {
	return <PageGraciasComponent className={''} />;
};

export default PageGracias;
