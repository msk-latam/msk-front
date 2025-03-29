import React, { FC } from 'react';
import PageCancelarSuscripcionComponent from '@/components/MSK/cancelar-suscripcion/Page';
import { cookies } from 'next/headers';
export async function generateMetadata() {
	return {
		title: 'Cancelar inscripción | MSK',
		description: 'Puedes cancelar tu suscripción a nuestros cursos con una serie de simples pasos.',
	};
}
const PageCancelSubscription: FC<{ params: { lang: string } }> = ({ params }) => {
	const currentCountry = (params.lang || cookies().get('country')?.value) as string;

	return <PageCancelarSuscripcionComponent country={currentCountry} />;
};

export default PageCancelSubscription;
