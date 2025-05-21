import LayoutPage from '@/components/MSK/LayoutPage';
import { FC } from 'react';
import ContactForm from '@/components/MSK/ContactForm';
import Navbar from '@/modules/components/navbar/Navbar';
import Footer from '@/modules/components/footer/footer';
import BlogHeader from '@/modules/components/blog/components/BlogHeader';
import { ChevronRight } from 'react-feather';
import Link from 'next/link';
import { RiHome6Line } from 'react-icons/ri';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import ContactSidebar from '@/components/MSK/ContactSidebar';
import NewsLetter from '@/modules/components/newsletter/NewsLetter';

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
			<div
				className='relative w-full z-9'
				style={{
					background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%),
                       linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
				}}
			>
				<Navbar />
				<div className='px-4 overflow-visible max-w-[1600px] md:px-14  min-h-96 h-fit flex md:flex-col md:justify-end md:items-start flex-row flex-wrap justify-center items-center text-white mx-[23rem]'>
					<div className='w-full mt-20 mb-16 text-sm text-white md:mb-14 md:mt-0 h-fit'>
						<nav className='flex max-w-full gap-1 mb-4 overflow-hidden text-sm font-medium whitespace-nowrap text-ellipsis font-raleway'>
							<Link href={getLocalizedUrl('ar', '/home')} className='my-auto shrink-0'>
								<RiHome6Line className='my-auto text-white' />
							</Link>

							<span className='shrink-0'>
								<ChevronRight />
							</span>

							<span className='my-auto font-bold truncate'>Contacto</span>
						</nav>

						<h1 className='md:text-[51px] leading-none text-3xl text-white font-bold text-center md:text-left my-6'>
							Contacto
						</h1>
						<p className='mb-12'>¿Quieres dar el siguiente paso en tu carrera? Completa el formulario y te asesoramos.</p>
					</div>
				</div>
			</div>

			<div className='bg-[#f3f4f6]'>
				<section className='w-full z-[10] relative overflow-visible max-w-[2000px] mx-auto md:px-4'>
					<div className='flex justify-center mx-60 '>
						<div className='flex flex-col-reverse lg:flex-row gap-6 md:py-12 pt-12 overflow-visible max-w-[1500px] w-full md:px-4   '>
							<div className='w-full bg-white rounded-[38px] flex flex-col relative z-[9] md:-mt-24 px-5 pt-9 h-full my-auto pb-10 md:px-9 mb-20 gap-6 md:gap-0 overflow-visible max-w-[1600px] '>
								<ContactForm hideHeader />
							</div>
						</div>
						<div className='flex flex-col   gap-8 md:py-12 pt-12 overflow-visible max-w-[1600px] md:px-4  '>
							<div className=' bg-white rounded-[38px] flex flex-col relative z-[9] md:-mt-24 px-5 pt-9  my-auto pb-10 md:px-9 mb-20 gap-6 md:gap-0 overflow-visible max-w-[1600px] w-[350px] '>
								<ContactSidebar variant={1} />
							</div>
							<div className='w-full bg-white rounded-[38px] flex flex-col relative z-[9] md:-mt-24 px-12 pt-9  my-auto pb-10 md:px-9 mb-20 gap-6 md:gap-0 overflow-visible max-w-[1600px] '>
								<ContactSidebar variant={2} />
							</div>
						</div>
					</div>
				</section>
				<NewsLetter />
				<Footer />
			</div>
		</>
	);
};

export default PageContact;
