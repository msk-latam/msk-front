import LayoutPage from '@/components/MSK/LayoutPage';
import { FC } from 'react';
import ContactForm from '@/components/MSK/ContactForm';
import Navbar from '@/modules/components/navbar/Navbar';
import Footer from '@/modules/components/footer/footer';

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
		<>
			<header
				className='w-full h-40 p-0 m-0 overflow-hidden md:h-64'
				style={{
					background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
					linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
				}}
			>
				<Navbar />
			</header>
			<div className={``} data-nc-id='PageDashboard'>
				<ContactForm hideHeader />
			</div>

			<Footer />
		</>
	);
};

export default PageContact;
