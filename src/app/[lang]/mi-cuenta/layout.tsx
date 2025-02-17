'use client';
import LayoutPage from '@/components/MSK/LayoutPage';
import { FC, useContext, useEffect, useState } from 'react';
import ModalSignOut from '@/components/Modal/SignOut';
import NcLink from '@/components/NcLink/NcLink';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from '@/context/user/AuthContext';
import Image from 'next/image';
import RedirectToTrial from '@/components/RedirectToTrial/RedirectToTrial';
// export const runtime = 'edge';
export interface PageDashboardProps {
	className?: string;
	children?: any;
}
interface DashboardLocationState {
	'/inicio'?: {};
	'/cursos'?: {};
	'/perfil'?: {};
	'/facturas'?: {};
	'/diplomas'?: {};
	'/documentos'?: {};
	'/metodo-pego'?: {};
	'/cerrar-sesion'?: {};
}
interface DashboardPage {
	sPath: any;
	// sPath: keyof DashboardLocationState;
	exact?: boolean;
	// component: ComponentType<Object>;
	icon: string;
	pageName: string;
}

const PageDashboard: FC<PageDashboardProps> = ({ children, className = '' }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleModalLogout = () => {
		setIsModalOpen(!isModalOpen);
	};

	const router = useRouter();
	const { state } = useContext(AuthContext);
	const pathname = usePathname();
	const match = pathname.match(/^\/([a-z]{2})\b/);
	let country = match ? `${match[1]}` : '';

	if (country === 'mi') {
		country = '';
	}
	useEffect(() => {
		if (state && state.stateLoaded && !state.isAuthenticated) {
			router.push(`${window.location.origin}/${country}`);
		}
	}, [state]);
	const subPages: DashboardPage[] = [
		{
			sPath:
				country === ''
					? `${window.location.origin}/mi-cuenta/inicio`
					: `${window.location.origin}/${country}/mi-cuenta/inicio`,
			exact: true,
			icon: 'home',
			pageName: 'Inicio',
		},
		{
			sPath:
				country === ''
					? `${window.location.origin}/mi-cuenta/cursos`
					: `${window.location.origin}/${country}/mi-cuenta/cursos`,
			icon: 'file',
			pageName: 'Mis cursos',
		},
		{
			sPath:
				country === ''
					? `${window.location.origin}/mi-cuenta/perfil`
					: `${window.location.origin}/${country}/mi-cuenta/perfil`,
			icon: 'personal-data',
			pageName: 'Datos personales',
		},
		{
			sPath:
				country === ''
					? `${window.location.origin}/mi-cuenta/facturas`
					: `${window.location.origin}/${country}/mi-cuenta/facturas`,
			icon: 'factura',
			pageName: 'Mis Facturas',
		},
		// {
		//   sPath: '/documentos',
		//   icon: 'factura',
		//   pageName: 'Mis Documentos',
		// },
		// {
		//   sPath: '/diplomas',
		//   icon: 'certydip',
		//   pageName: 'Diplomas y Certificaciones',
		// },
	];

	const navClassName =
		'flex px-6 py-2.5 rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 account-menu-item';
	const activeClassName =
		'bg-red-400 dark:bg-neutral-800 text-neutral-100 dark:text-neutral-100 invert-image active-account-menu-item';

	return (
		<div className={`nc-PageDashboard animate-fade-down ${className}`} data-nc-id='PageDashboard'>
			<RedirectToTrial />
			{state.isAuthenticated && (
				<>
					<LayoutPage
						heading='Mi cuenta'
						subHeading='Aquí podrás controlar todo lo referido a tus capacitaciones y tu perfil personal'
					>
						<div className='flex flex-col space-y-8 xl:space-y-0 xl:flex-row'>
							<div className='flex-shrink-0 w-100 xl:w-80 xl:pr-8'>
								<ul className='text-base space-y-1 text-neutral-6000 dark:text-neutral-400'>
									{subPages.map(({ sPath, pageName, icon }, index) => {
										return (
											<li key={index}>
												<NcLink
													className={`${pathname.includes(`/mi-cuenta${sPath}`) && activeClassName} ${navClassName}`}
													colorClass={pathname.includes(`/mi-cuenta${sPath}`) ? 'text-white' : 'text-white-900'}
													href={`${sPath}`}
												>
													<Image
														src={`/images/icons/${icon}.svg`}
														className={`mr-2 ${pathname.includes(`/mi-cuenta${sPath}`) ? 'menu-profile-icon-active' : ''}`}
														width={16}
														height={16}
														alt={`${pageName} icon`}
													/>
													{pageName}
												</NcLink>
											</li>
										);
									})}
									<li className='cursor-pointer'>
										<a href='https://ayuda.msklatam.com/' target='_blank'>
											<span className='flex px-6 py-2.5 rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100'>
												<Image src={`/images/icons/faq.svg`} width={16} height={16} alt='FAQ Icon' className='mr-2' />
												Centro de ayuda
											</span>
										</a>
									</li>
									<li className='cursor-pointer' onClick={handleModalLogout}>
										<span className='flex px-6 py-2.5 rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100'>
											<Image src={`/images/icons/session.svg`} width={16} height={16} alt='Session Icon' className='mr-2' />
											Cerrar Sesión
										</span>
									</li>
								</ul>
							</div>
							<div className='border border-neutral-100 dark:border-neutral-800 md:hidden'></div>
							<div className='flex-grow'>{children}</div>
						</div>
					</LayoutPage>
					<ModalSignOut open={isModalOpen} onClose={() => setIsModalOpen(false)} />
				</>
			)}
		</div>
	);
};

export default PageDashboard;
