'use client';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import Logo from '@/components/Logo/Logo';
import MenuBar from '@/components/MenuBar/MenuBar';
import Navigation from '@/components/Navigation/Navigation';
import NavigationUser from '@/components/Navigation/NavigationUser';
import { AuthContext } from '@/context/user/AuthContext';
import { NAVIGATION_MSK, NAVIGATION_BLOG_MSK, NAVIGATION_ARCHIVE_MSK } from '@/data/navigation';
import React, { FC, useContext, useEffect, useState } from 'react';
import SearchProducts from './SearchProducts';
import ModalSignOut from '@/components/Modal/SignOut';
import { usePathname } from 'next/navigation';
import { useCurrentLocale } from 'next-i18n-router/client';
// @ts-ignore
import i18nConfig from '@/i18nConfig';
import CategoriesDropdown from './categoriesDropdown/CategoriesDropdown';
import Link from 'next/link';
import CountrySelector from './CountrySelector';

const MainNav2: FC = () => {
	const locale = useCurrentLocale(i18nConfig);

	const { state } = useContext(AuthContext);
	const countryCodes: { [key: string]: string } = {
		Argentina: 'ar',
		Bolivia: 'bo',
		Brasil: 'br',
		Chile: 'cl',
		Colombia: 'co',
		'Costa Rica': 'cr',
		Cuba: 'cu',
		Ecuador: 'ec',
		'El Salvador': 'sv',
		Guatemala: 'gt',
		Honduras: 'hn',
		México: 'mx',
		Nicaragua: 'ni',
		Panamá: 'pa',
		Paraguay: 'py',
		Perú: 'pe',
		Uruguay: 'uy',
		Venezuela: 've',
		España: 'es',
	};

	const countryName = state?.profile?.country; // Esto trae "Argentina", por ejemplo
	const countryCode = countryCodes[countryName] || 'ar';
	const [isOnBlog, setIsOnBlog] = useState(false);
	const [isOnArchive, setIsOnArchive] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [initialLoad, setInitialLoad] = useState(false);

	const handleModalLogout = () => {
		setIsModalOpen(!isModalOpen);
	};

	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	let country = match ? `${match[1]}` : '';

	if (country === 'mi') {
		country = '';
	}

	useEffect(() => {
		setIsOnBlog(pathName.includes('/blog'));
		setInitialLoad(true);
	}, [pathName]);

	return (
		<div className={`nc-MainNav nc-MainNav2 relative z-10 container`}>
			<div className='py-5 relative flex items-center justify-between'>
				<div className='flex items-center space-x-3 sm:space-x-8'>
					<Logo isOnBlog={isOnBlog} country={country} />
					<div className='hidden sm:block h-10 border-l border-neutral-300 dark:border-neutral-6000 m-0'></div>
					<div>
						{!pathName.includes('blog2') && (
							<div className='hidden xl:block'>
								<CategoriesDropdown country={countryCode} />
							</div>
						)}
					</div>
				</div>

				{/* Esta parte empuja SearchProducts a la derecha */}
				<div className={`hidden sm:flex flex-grow mr-10 ${pathName.includes('blog2') ? 'justify-start' : 'justify-end'}`}>
					<SearchProducts />
				</div>
				<div>
					{pathName.includes('blog2') && (
						<div>
							<Link href={'/'} target='_blank' className='mr-5'>
								Capacítate
							</Link>
						</div>
					)}
				</div>

				{initialLoad && (
					<div className='flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1'>
						<div className={'hidden items-center xl:flex space-x-2'}>
							{isOnBlog && <>{/* <Navigation navigations={NAVIGATION_BLOG_MSK} /> */}</>}
							{isOnArchive && <>{/* <Navigation navigations={NAVIGATION_ARCHIVE_MSK} /> */}</>}
							{!isOnBlog && !isOnArchive && <>{/* <Navigation navigations={NAVIGATION_MSK} /> */}</>}
							{state.isAuthenticated ? (
								<>
									<ButtonSecondary
										onClick={() => handleModalLogout()}
										sizeClass='px-4 py-2 sm:px-5'
										className='border-solid border-1 border-neutral-200'
										bordered
									>
										Cerrar sesión
									</ButtonSecondary>
									<NavigationUser />
								</>
							) : (
								<>
									<div className='hidden sm:block h-10 border-l border-neutral-300 dark:border-neutral-6000 pr-5'></div>
									<ButtonSecondary
										href={
											country === ''
												? `${window.location.origin}/iniciar-sesion`
												: `${window.location.origin}/${country}/iniciar-sesion`
										}
										locale={locale}
										sizeClass='px-4 py-2 sm:px-5'
										className='border-solid border-1 border-neutral-200 text-neutral-500'
										bordered
									>
										Iniciar sesión
									</ButtonSecondary>
									<ButtonPrimary
										href={
											country === ''
												? `${window.location.origin}/crear-cuenta`
												: `${window.location.origin}/${country}/crear-cuenta`
										}
										sizeClass='px-4 py-2 sm:px-5'
										className='font-semibold'
									>
										Crear cuenta
									</ButtonPrimary>
								</>
							)}
						</div>
						<CountrySelector country={country} />
						<div className='flex items-center space-x-4 xl:hidden'>
							<NavigationUser />
							<MenuBar />
						</div>
					</div>
				)}
			</div>
			<ModalSignOut open={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</div>
	);
};

export default MainNav2;
