import LayoutPage from '@/components/MSK/LayoutPage';
import { FC } from 'react';
import ContactForm from '@/components/MSK/ContactForm';

export interface PageContactProps {
	className?: string;
}

export async function generateMetadata() {
	return {
		title: 'Contactanos | MSK',
		description:
			'Puedes contactarte con MSK a través de diferentes canales de comunicación. Rellena nuestro formulario, llama por teléfono o escríbenos un correo electrónico.',
	};
}

const PageContact: FC<PageContactProps> = ({ className = '' }) => {
	return (
		<div className={`nc-PageDashboard ${className} animate-fade-down`} data-nc-id='PageDashboard'>
			<LayoutPage heading='Contacto' subHeading='Completa el formulario y en breve nos comunicaremos contigo'>
				<ContactForm hideHeader />
			</LayoutPage>
		</div>
	);
};

export default PageContact;
