//navbar
'use client';

import { useSessionStatus } from '@/hooks/useSessionStatus';
import { BurgerButton } from '@/modules/components/navbar/common/BurguerButton';
import Image from 'next/image';
import Link from 'next/link';

import { supportedLanguages } from '@/config/languages';
import NavbarSkeleton from '@/modules/home/skeletons/NavbarSkeleton';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'react-feather';
import AuthButtons from './common/AuthButtons';
import AuthButtonsSkeleton from './common/AuthButtonsSkeleton';
import SearchBar from './common/SearchBar';
import UserButtons from './common/UserButtons';
import DropdownContent from './DropdownContent';

type NavbarProps = {
	isDashboard?: boolean;
};

const Navbar = ({ isDashboard = false }: NavbarProps) => {
	const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
	const [currentView, setCurrentView] = useState('main');
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const toggleDiscover = () => {
		setIsDiscoverOpen(!isDiscoverOpen);
		if (!isDiscoverOpen) setCurrentView('main');
	};

	const toggleInstitutions = () => {
		if (isDiscoverOpen && currentView === 'institutions') {
			// Si ya está abierto en instituciones, lo cerramos
			setIsDiscoverOpen(false);
		} else {
			// Si está cerrado o en otra vista, abrimos instituciones
			setIsDiscoverOpen(true);
			setCurrentView('institutions');
		}
	};

	const pathname = usePathname();
	const firstSegment = pathname?.split('/')[1];
	const lang = supportedLanguages.includes(firstSegment ?? '') ? firstSegment : 'ar';
	// ✅ Esta es la verdadera URL que deberías usar en el logo
	const logoHref = lang === 'ar' ? '/' : `/${lang}/`;
	
	const isAnyViewOpen = isDiscoverOpen && currentView !== ''; 
	
	const handleCreateAccount = () => {
		const loginPath = lang === 'ar' ? '/login' : `/${lang}/login`;
		window.location.href = loginPath;
	};
	
	const isMainView = isDiscoverOpen && currentView === 'main';
	const isDiscoverView = isDiscoverOpen && currentView === 'discover';
	const isInstitutionsView = isDiscoverOpen && currentView === 'institutions';
	const isSpecialtyView = isDiscoverOpen && currentView === 'specialty';
	const isSpecialtyDetailView = isDiscoverOpen && currentView === 'specialtyDetail';
	
	const { isAuthenticated, isLoading } = useSessionStatus();
	
	useEffect(() => {
		// Cada vez que cambia la ruta, cerramos el menú móvil
		setIsDiscoverOpen(false);
		setCurrentView('');
		setSelectedCategory(null);
	}, [pathname]);
	console.log('isAnyViewOpen', isAnyViewOpen, 'currentView', currentView, 'isDiscoverOpen', isDiscoverOpen);

	return (
		<header className='absolute left-0 w-full'>
			{/* Overlay fondo oscuro móvil */}
			{isDiscoverOpen && <div className='fixed inset-0 bg-transparent z-50 md:hidden'></div>}

			<nav className='relative bg-transparent z-50'>
				{/* --- NAV MOBILE --- */}
				<section className='flex justify-start items-center mt-2 py-5 px-6 md:hidden relative'>
					{/* Botón hamburguesa */}
					<BurgerButton isOpen={isAnyViewOpen} onClick={toggleDiscover} />

					{/* Logo */}
					<Link href={getLocalizedUrl(lang, '/home')} className='m-auto pr-7 pb-1'>
						<Image src='/images/msk-logo/logo.png' alt='MSK' priority width={64} height={64} className='w-16 h-auto' />
					</Link>
				</section>

				{/* --- NAV DESKTOP --- */}
				{isLoading ? (
					<NavbarSkeleton /> // 👈 Muestra skeleton
				) : (
					<section className='hidden md:flex md:flex-row items-center pt-2 mt-6'>
						<div className='flex items-top w-full max-w-[1300px] mx-auto pl-14 pr-28 relative'>
							{/* Logo */}
							<Link href={getLocalizedUrl(lang, '/home')}>
								<Image
									src='/images/msk-logo/logo.png'
									alt='MSK'
									priority
									width={90}
									height={90}
									className='md:pt-3 w-[90px] h-auto'
								/>
							</Link>

							{/* Navegación central */}
							<div className='w-full'>
								<nav
									className={`flex items-center flex-grow justify-between py-1.5 px-4 ml-14 transition-colors duration-300 ${
										isMainView || isDiscoverView || isSpecialtyView || isSpecialtyDetailView
											? 'bg-white rounded-full'
											: isInstitutionsView
											? 'bg-[#1a1a1a]  rounded-t-3xl'
											: 'bg-white shadow-md rounded-full'
									}`}
								>
									<div className='flex items-center gap-6 px-4'>
										<button
											className={`flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-gray-900${
												isMainView || isDiscoverView || isSpecialtyView || isSpecialtyDetailView
													? ''
													: isInstitutionsView
													? 'bg-[#1a1a1a] text-white'
													: ''
											}`}
											onClick={toggleDiscover}
										>
											Descubre
											<ChevronDown
												size={16}
												className={`transition-transform pt-1 duration-300 ${
													isMainView || isDiscoverView || isSpecialtyView || isSpecialtyDetailView ? 'rotate-180' : ''
												}`}
											/>
										</button>
									</div>

									<div className='flex-grow max-w-md mx-4'>
										<SearchBar placeholder='¿Qué tema te interesa?' isMainView={true} />
									</div>
									{isLoading ? (
										<AuthButtonsSkeleton />
									) : isAuthenticated ? (
										<UserButtons />
									) : (
										<AuthButtons
											isMainView={isMainView}
											isDiscoverView={isDiscoverView}
											isInstitutionsView={isInstitutionsView}
											isSpecialtyView={isSpecialtyView}
											isSpecialtyDetailView={isSpecialtyDetailView}
										/>
									)}
								</nav>
								{isDiscoverOpen && (
									<div className='w-full max-w-6xl pl-20 pr-6 z-50 mx-auto'>
										<DropdownContent
											currentView={currentView}
											selectedCategory={selectedCategory}
											setCurrentView={setCurrentView}
											setSelectedCategory={setSelectedCategory}
											isMobile={false}
											onClose={toggleDiscover}
										/>
									</div>
								)}

								{/* Dropdown desktop debajo del navbar */}
							</div>
						</div>
					</section>
				)}
			</nav>

			{/* Contenido dinámico móvil */}
{currentView && (
  <div className="fixed inset-x-0 top-0 bottom-0 z-50 mt-16 md:hidden overflow-visible">
    <DropdownContent
      currentView={currentView}
      selectedCategory={selectedCategory}
      setCurrentView={setCurrentView}
      setSelectedCategory={setSelectedCategory}
	  isMobile={true}
	  onClose={() => {
		setIsDiscoverOpen(false);
		setCurrentView('');
		setSelectedCategory(null);
	  }}
	/>
  </div>
)}


		</header>
	);
};

export default Navbar;
