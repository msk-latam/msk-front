import React, { useContext } from 'react';
import NcLink from '../NcLink/NcLink';
import { CountryContext } from '@/context/country/CountryContext';
import NcImage from '../NcImage/NcImage';
import { usePathname } from 'next/navigation';

const FooterCTA = () => {
	const { countryState } = useContext(CountryContext);
	const currentYear = new Date().getFullYear();
	const pathname = usePathname();
	const isLandingPage = pathname.includes('/landings/');
	return (
		<div className='container '>
			<div className='lg:hidden flex flex-row justify-between pt-6 px-4'>
				{/* Primer grupo */}
				<div className='flex-1'>
					<div className='footer-widget'>
						<ul className='text-sm md:text-base space-y-2'>
							<li>
								<NcLink href='/contacto' className='font-light'>
									Contacto
								</NcLink>
							</li>
							<li>
								<NcLink href='/bases-promocionales' className='font-light'>
									Bases promocionales
								</NcLink>
							</li>
							<li>
								<NcLink href='/politica-de-privacidad' className='font-light'>
									Política de privacidad
								</NcLink>
							</li>
							<li>
								<NcLink href='/politica-de-cookies' className='font-light'>
									Política de cookies
								</NcLink>
							</li>
							<li>
								<NcLink href='/terminos-y-condiciones' className='font-light'>
									Términos y condiciones
								</NcLink>
							</li>
						</ul>
					</div>
				</div>

				{/* Segundo grupo */}
				<div className='flex-1'>
					<div className='footer-widget'>
						<ul className='text-sm md:text-base space-y-2'>
							<li>
								<NcLink href='/mision' className='font-light'>
									Nuestra misión
								</NcLink>
							</li>
							<li>
								<NcLink href='/nosotros' className='font-light'>
									Quiénes Somos
								</NcLink>
							</li>
							<li>
								<a href='https://ayuda.msklatam.com/' target='_blank'>
									Centro de ayuda
								</a>
							</li>
							{countryState.country.includes('ec') && (
								<li>
									<NcLink href='/cancelar-suscripcion'>Arrepentimiento de compra</NcLink>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-4 lg:transform  relative mt-10 lg:mt-0 lg:pt-6'>
				<div className={`px-6 mb-6 lg:mb-0 lg:px-0 col-span-1 lg:col-span-2`}>
					<div className='footer-widget f-w1 mb-2'>
						<div className='footer-img  align-center content-center'>
							<NcLink href='/'>
								<div className='w-[150px]'>
									<NcImage src={'/images/msk-logo-light.svg'} alt='footer-logo' width='100' height='100' />
								</div>
							</NcLink>
							<p className=' lg:w-full mb-1'>Una propuesta moderna que desafía a expandir las metas profesionales</p>
							<p className='mb-8'>© {currentYear} • Medical&Scientific Knowledge S.L.</p>
						</div>
						<div className='footer-icon '>
							<a href='https://www.facebook.com/msk.online.learning' target='_blank' rel='noopener noreferrer'>
								<NcImage src={'/images/icons/fb.svg'} alt='' width='10' height='10' className='object-fill' />
							</a>
							<a href='https://www.instagram.com/msk.latam' target='_blank' rel='noopener noreferrer'>
								<NcImage src={'/images/icons/ig.svg'} alt='' width='20' height='20' className='object-fill' />
							</a>
							<a href='https://www.youtube.com/@msk.online.learning' target='_blank' rel='noopener noreferrer'>
								<NcImage src={'/images/icons/yt.svg'} className='object-fill pt-[4px]' alt='' width='20' height='20' />
							</a>
							<a href='https://www.linkedin.com/company/msk-online-learning/' target='_blank' rel='noopener noreferrer'>
								<NcImage src={'/images/icons/in.svg'} className='object-fill' alt='' width='20' height='20' />
							</a>
						</div>
					</div>
				</div>

				<div className={`hidden lg:block col-span-1 `}>
					<div className='footer-widget  mt-6'>
						<ul className='text-sm md:text-base space-y-2'>
							<li>
								<NcLink href='/contacto' className='font-light'>
									Contacto
								</NcLink>
							</li>
							<li>
								<NcLink href='/bases-promocionales' className='font-light'>
									Bases promocionales
								</NcLink>
							</li>
							<li>
								<NcLink href='/politica-de-privacidad' className='font-light'>
									Política de privacidad
								</NcLink>
							</li>
							<li>
								<NcLink href='/politica-de-cookies' className='font-light'>
									Política de cookies
								</NcLink>
							</li>
							<li>
								<NcLink href='/terminos-y-condiciones' className='font-light'>
									Términos y condiciones
								</NcLink>
							</li>
						</ul>
					</div>
				</div>
				<div className={`hidden lg:block col-span-1 `}>
					<div className='footer-widget  mt-6 '>
						<ul className='text-sm md:text-base space-y-2'>
							<li>
								<NcLink href='/mision' className='font-light'>
									Nuestra misión
								</NcLink>
							</li>
							<li>
								<NcLink href='/nosotros' className='font-light'>
									Quiénes Somos
								</NcLink>
							</li>

							<li>
								<a href='https://ayuda.msklatam.com/' target='_blank'>
									Centro de ayuda
								</a>
							</li>

							{countryState.country.includes('ec') && (
								<li>
									<NcLink href='/cancelar-suscripcion'>Arrepentimiento de compra</NcLink>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FooterCTA;
