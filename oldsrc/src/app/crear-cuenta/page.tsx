import React, { FC } from 'react';
import PageCrearCuentaComponent from '@/components/MSK/crear-cuenta/Page';
export async function generateMetadata() {
	return {
		title: 'Crear Cuenta | MSK',
		description: 'Crea una cuenta en MSK para acceder a tu plataforma de cursos y mantenerte al día con tu formación. ',
	};
}
const PageCrearCuenta: FC = () => {
	return <PageCrearCuentaComponent />;
};

export default PageCrearCuenta;
