import React, { useContext } from 'react';
import NcLink from '../NcLink/NcLink';
import { CountryContext } from '@/context/country/CountryContext';
import NcImage from '../NcImage/NcImage';
import { usePathname } from 'next/navigation';
import CountrySelector from '../Header/CountrySelector';

const FooterCTA = () => {
	const { countryState } = useContext(CountryContext);
	const currentYear = new Date().getFullYear();
	const pathname = usePathname();
	const match = pathname.match(/^\/([a-z]{2})\b/);
	const country = match ? match[1] : '';
	const isLandingPage = pathname.includes('/landings/');

	const addCountryCodeToUrl = (url: string) => {
		const domain = window.location.origin; // Obtiene el dominio completo (localhost, .com, .tech, etc.)

		if (country === '') {
			// Para Argentina, no se agrega el código del país
			return `${domain}/${url}/`;
		}

		const formattedUrl = `${url}`;
		return `${domain}/${country}/${formattedUrl}/`;
	};

	return (
		<div className='container'>
			<div className='flex flex-row justify-between px-4 pt-6 lg:hidden'>
				{/* Primer grupo */}
				<div className='flex-1'>
					<div className='footer-widget'>
						<ul className='space-y-2 text-sm md:text-base'>
							<li>
								<NcLink href={addCountryCodeToUrl('contacto')} className='font-light'>
									Contacto
								</NcLink>
							</li>
							<li>
								<NcLink href={addCountryCodeToUrl('bases-promocionales')} className='font-light'>
									Bases promocionales
								</NcLink>
							</li>
							<li>
								<NcLink href={addCountryCodeToUrl('politica-de-privacidad')} className='font-light'>
									Política de privacidad
								</NcLink>
							</li>
							<li>
								<NcLink href={addCountryCodeToUrl('politica-de-cookies')} className='font-light'>
									Política de cookies
								</NcLink>
							</li>
							<li>
								<NcLink href={addCountryCodeToUrl('terminos-y-condiciones')} className='font-light'>
									Términos y condiciones
								</NcLink>
							</li>
						</ul>
					</div>
				</div>

				{/* Segundo grupo */}
				<div className='flex-1'>
					<div className='footer-widget'>
						<ul className='space-y-2 text-sm md:text-base'>
							<li>
								<NcLink href={addCountryCodeToUrl('mision')} className='font-light'>
									Nuestra misión
								</NcLink>
							</li>
							<li>
								<NcLink href={addCountryCodeToUrl('nosotros')} className='font-light'>
									Quiénes Somos
								</NcLink>
							</li>
							<li>
								<NcLink href={addCountryCodeToUrl('certificados-digitales')} className='font-light'>
									Certificados digitales
								</NcLink>
							</li>
							<li>
								<a href='https://ayuda.msklatam.com/' target='_blank'>
									Centro de ayuda
								</a>
							</li>
							{countryState.country.includes('ec') && (
								<li>
									<NcLink href={addCountryCodeToUrl('cancelar-suscripcion')}>Arrepentimiento de compra</NcLink>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>

			<div className='relative grid grid-cols-1 mt-10 lg:grid-cols-4 lg:transform lg:mt-0 lg:pt-6'>
				<div className={`px-6 mb-6 lg:mb-0 lg:px-0 col-span-1 lg:col-span-2`}>
					<div className='mb-2 footer-widget f-w1'>
						<div className='content-center footer-img align-center'>
							<NcLink href={addCountryCodeToUrl('/')}>
								<div className='w-[150px]'>
									<NcImage src={'/images/msk-logo-light.svg'} alt='footer-logo' width='100' height='100' />
								</div>
							</NcLink>
							<p className='mb-1 lg:w-full'>Una propuesta moderna que desafía a expandir las metas profesionales</p>
							<p className='mb-8'>© {currentYear} • Medical&Scientific Knowledge S.L.</p>
						</div>
						<CountrySelector country={country} />
						<div className='footer-icon'>
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

				<div className={`hidden lg:block col-span-1`}>
					<div className='mt-6 footer-widget'>
						<ul className='space-y-2 text-sm md:text-base'>
							<li>
								<NcLink href={addCountryCodeToUrl('contacto')} className='font-light'>
									Contacto
								</NcLink>
							</li>
							<li>
								<NcLink href={addCountryCodeToUrl('bases-promocionales')} className='font-light'>
									Bases promocionales
								</NcLink>
							</li>
							<li>
								<NcLink href={addCountryCodeToUrl('politica-de-privacidad')} className='font-light'>
									Política de privacidad
								</NcLink>
							</li>
							<li>
								<NcLink href={addCountryCodeToUrl('politica-de-cookies')} className='font-light'>
									Política de cookies
								</NcLink>
							</li>
							<li>
								<NcLink href={addCountryCodeToUrl('terminos-y-condiciones')} className='font-light'>
									Términos y condiciones
								</NcLink>
							</li>
						</ul>
					</div>
				</div>
				<div className={`hidden lg:block col-span-1`}>
					<div className='mt-6 footer-widget'>
						<ul className='space-y-2 text-sm md:text-base'>
							<li>
								<NcLink href={addCountryCodeToUrl('mision')} className='font-light'>
									Nuestra misión
								</NcLink>
							</li>
							<li>
								<NcLink href={addCountryCodeToUrl('nosotros')} className='font-light'>
									Quiénes somos
								</NcLink>
							</li>
							<li>
								<NcLink href={addCountryCodeToUrl('certificados-digitales')} className='font-light'>
									Certificados digitales
								</NcLink>
							</li>

							<li>
								<a href='https://ayuda.msklatam.com/' target='_blank'>
									Centro de ayuda
								</a>
							</li>

							{countryState.country.includes('ec') && (
								<li>
									<NcLink href={addCountryCodeToUrl('cancelar-suscripcion')}>Arrepentimiento de compra</NcLink>
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
