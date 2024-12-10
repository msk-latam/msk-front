'use client';
import { useContext, useEffect, useState } from 'react';
import bts from '../../styles/bts.module.css';
import NcModal from '@/components/NcModal/NcModal';
import FooterNewsletter from './Newsletter';
import { CountryContext } from '@/context/country/CountryContext';
import NcLink from '../NcLink/NcLink';
import NcImage from '../NcImage/NcImage';
import { usePathname } from 'next/navigation';
import FooterLinksSection from './FooterLinks';
import FooterCTA from './FooterCTA';

const FooterEduman = () => {
	const [show, setShow] = useState(false);
	const [email, setEmail] = useState('');
	const [isOnBlog, setIsOnBlog] = useState(false);
	const { countryState } = useContext(CountryContext);
	const scrollToContactForm = () => {
		const contactForm = document.getElementById('contactanos');
		if (contactForm) {
			window.scrollTo({
				top: document.getElementById('contactanos')!.offsetTop,
				behavior: 'smooth',
			});
		}
	};

	const openModal = (e: any) => {
		e.preventDefault();
		setShow(true);
	};

	const pathname = usePathname();
	const isLandingPage = pathname.includes('/landings/');
	const isCheckoutPage = pathname.includes('/checkout/');

	useEffect(() => {
		setIsOnBlog(pathname == '/blog');
	}, [pathname]);
	if (isCheckoutPage) {
		return null;
	}

	return (
		<footer>
			<div className={isLandingPage ? '' : 'footer-area'}>
				<div className=''>
					<div className='lg:container'>
						{isOnBlog || isLandingPage ? null : (
							<div className='copyright-area grid grid-cols-1 md:grid-cols-6 items-center sm:gap-1 mb-6 w-screen left-1/2 transform -translate-x-1/2 relative md:w-auto md:left-auto md:transform-none md:-translate-x-0 '>
								<div className='footer-column col-span-6 md:mx-auto text-center md:text-left lg:col-span-1'>
									<div className='copyright-text -mb-3'>
										<p className='!text-[18px]'>Nuestro newsletter</p>
									</div>
								</div>
								<div className='footer-column col-span-6 mx-auto lg:col-span-2'>
									<div className='divisor' />
									<p className='discounts md:mx-auto text-center md:text-left text-[12px] sm:text-[14px] leading-4 sm:leading-6'>
										Descuentos exclusivos y becas <br className='sm:hidden' /> completas solo con tu suscripción
									</p>
									<div className='divisor' />
								</div>
								<div className='footer-column col-span-6 md:mx-auto text-center md:text-left lg:col-span-3'>
									<div className='copyright-subcribe '>
										<form onSubmit={openModal} method='post' className='widget__subscribe '>
											<div className='field relative '>
												<NcImage src={'/images/icons/email_alt.svg'} alt='' width='10' height='20' />
												<input
													type='email'
													name='Email'
													placeholder='Ingresar e-mail'
													onChange={(e) => setEmail(e.target.value)}
													required
												/>
											</div>
											<button type='submit' className='!p-0'>
												<span className='hidden lg:inline'>Suscribirme</span>
												<NcImage src={'/images/icons/plane.svg'} alt='' width='20' height='20' />
											</button>
										</form>
									</div>
								</div>
							</div>
						)}
						<div className='footer-main '>{!isLandingPage && <FooterLinksSection />}</div>
					</div>
				</div>
			</div>
			<div className=' bg-[#1A1F27] relative'>
				<FooterCTA />
			</div>
			<NcModal
				isOpenProp={show}
				onCloseModal={() => {
					setShow(false);
				}}
				renderTrigger={() => {
					return null;
				}}
				contentExtraClass='max-w-screen-lg'
				renderContent={() => <FooterNewsletter email={email} setShow={setShow} />}
				modalTitle='Nuestro Newsletter'
				modalSubtitle='Suscrí­bete para acceder a descuentos exclusivos, becas completas y contenido personalizado'
			/>
		</footer>
	);
};

export default FooterEduman;
