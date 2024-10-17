'use client';
import React, { useContext, useState } from 'react';
import ButtonClose from '@/components/ButtonClose/ButtonClose';
import Logo from '@/components/Logo/Logo';
import { Disclosure } from '@headlessui/react';
import { NavItemType } from './NavigationItem';
import { NAVIGATION_MSK, NAVIGATION_USER } from '@/data/navigation';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import { AuthContext } from '@/context/user/AuthContext';
import SearchProducts from '@/components/Header/SearchProducts';
import { DurationFilter, Profession, ResourceFilter, Specialty } from '@/data/types';
import { useStoreFilters } from '@/context/storeFilters/StoreProvider';
import ModalSignOut from '@/components/Modal/SignOut';
import Link from 'next/link';
import { useLocation } from 'react-use';
import resourcesMapping from '@/data/jsons/__resources.json';
import durationsMapping from '@/data/jsons/__durations.json';
import CategoriesDropdown from '../Header/categoriesDropdown/CategoriesDropdown';

export interface NavMobileProps {
	data?: NavItemType[];
	userNav?: NavItemType[];
	onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ data = NAVIGATION_MSK, userNav = NAVIGATION_USER, onClickClose }) => {
	const _renderMenuChild = (item: NavItemType) => {
		return (
			<ul className='nav-mobile-sub-menu pb-1 text-base'>
				{item.children?.map((item, index) => _renderItem(item, index, true))}{' '}
			</ul>
		);
	};

	const _renderMenuChildUser = (item: NavItemType) => {
		return (
			<ul className='nav-mobile-sub-menu pl-5 pb-1 text-base'>
				{item.children?.map((item, index) => _renderItem(item, index, true))}{' '}
			</ul>
		);
	};

	const _renderItemHasChild = (item: NavItemType, index: number, isChild: boolean) => {
		return (
			<Disclosure key={index}>
				{({ open }) => (
					<li className='text-neutral-900 dark:text-white'>
						<div
							className={`flex items-center font-regular text-md hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${
								isChild ? '' : ' tracking-wide'
							}`}
						>
							<Disclosure.Button
								as='button'
								className='py-1 px-4 flex flex-1 items-center select-none focus:outline-none focus:ring-0'
							>
								{item.name}
								{open ? (
									<ChevronUpIcon className='ml-2 mr-auto h-4 w-4 text-neutral-500' aria-hidden='true' />
								) : (
									<ChevronDownIcon className='ml-2 mr-auto h-4 w-4 text-neutral-500' aria-hidden='true' />
								)}
							</Disclosure.Button>
						</div>
						<Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
					</li>
				)}
			</Disclosure>
		);
	};

	const _renderItemNoChild = (item: NavItemType, index: number, isChild: boolean) => {
		return (
			<li key={index} className='text-neutral-900 dark:text-white' onClick={onClickClose}>
				<Link
					className={`flex w-full items-center py-1 px-4 font-regular text-md hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${
						isChild ? 'text-neutral-400' : 'tracking-wide'
					}`}
					href={{
						pathname: item.href || undefined,
						search: item.search,
					}}
				>
					{item.name}
				</Link>
			</li>
		);
	};

	const _renderItem = (item: NavItemType, index: number, isChild: boolean) => {
		if (item.children) {
			return _renderItemHasChild(item, index, isChild);
		}
		return _renderItemNoChild(item, index, isChild);
	};

	const { state } = useContext(AuthContext);

	let specialties: Specialty[] = useStoreFilters().specialties;
	let professions: Profession[] = useStoreFilters().professions;
	let resources = resourcesMapping;
	let durations = durationsMapping;

	const { addFilter, removeFilter, updateFilter, storeFilters } = useStoreFilters();

	const isChecked = (type: string, value: any) => {
		switch (type) {
			case 'professions':
				return !!storeFilters[type as keyof typeof storeFilters].filter((profession: any) => {
					return profession.slug == value.slug;
				}).length;
			case 'specialties':
				return !!storeFilters[type as keyof typeof storeFilters].filter((specialty: any) => {
					return specialty.name == value.name;
				}).length;
			case 'resources':
				return !!storeFilters[type as keyof typeof storeFilters].filter((resource: any) => {
					return resource.id == value.id;
				}).length;
		}
	};

	const onChangeProfession = (profession: Profession) => {
		const professionExists = storeFilters.professions.filter((item: Profession) => {
			return item.slug == profession.slug;
		});
		if (professionExists.length) removeFilter('professions', profession);
		else addFilter('professions', profession);
	};

	const onChangeResource = (resource: ResourceFilter) => {
		// console.log(resource);
		updateFilter('page', {
			id: 1,
			name: String(1),
			total: 1,
		});
		const resourceExists = storeFilters.resources.filter((item: ResourceFilter) => {
			return item.id == resource.id;
		});
		if (resourceExists.length) {
			removeFilter('resources', resource);
		} else addFilter('resources', resource);
	};

	const onChangeDuration = (duration: DurationFilter) => {
		const durationExists = storeFilters.duration.filter((item: DurationFilter) => {
			return item.value == duration.value;
		});
		if (durationExists.length) {
			removeFilter('duration', duration);
		} else addFilter('duration', duration);
	};

	const setSpecialtyFilter = (specialty: Specialty, action: string) => {
		updateFilter('page', {
			id: 1,
			name: String(1),
			total: 1,
		});
		action == 'add' ? addFilter('specialties', specialty) : removeFilter('specialties', specialty);
	};

	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleModalLogout = () => {
		setIsModalOpen(!isModalOpen);
	};

	const location = useLocation();

	return (
		<div className='w-full h-full py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 border-r border-transparent dark:border-neutral-700'>
			<div className='py-4 px-5 flex justify-between'>
				<Logo isOnBlog={typeof window !== 'undefined' && window.location.href.includes('blog')} />
				<ButtonClose onClick={onClickClose} />
			</div>
			<div className='z-10 px-4 pb-4'>
				<SearchProducts />
				<div className='px-2'>
					<CategoriesDropdown onClick={onClickClose} />
				</div>
			</div>
			<div className='mobile-nav-container'>
				<ul className='flex flex-col py-2 px-2 space-y-1'>{data.map((item, index) => _renderItem(item, index, false))}</ul>
				{location && typeof location.pathname != 'undefined' && location.pathname.includes('/tienda') && (
					<>
						<div className='border-t border-neutral-200 dark:border-neutral-700 w-[90%] mx-auto px-2 space-y-1' />
						<ul className='flex flex-col py-2 px-2 space-y-1 store-menu'></ul>
					</>
				)}
				{/*<div className="border-t border-neutral-200 dark:border-neutral-700 w-[90%] mx-auto px-2 space-y-1" />*/}
				{state.isAuthenticated ? (
					<ul className='relative flex flex-col py-2 px-2 space-y-1 mt-14 z-50 justify-end container'>
						{userNav.map((item, index) => _renderItem(item, index, false))}
						<li>
							<ButtonSecondary
								onClick={() => handleModalLogout()}
								sizeClass='px-4 py-2 sm:px-5 w-full mt-4'
								className='border-solid border-1 border-neutral-200 rounded-md'
								bordered
							>
								Cerrar sesión
							</ButtonSecondary>
						</li>
					</ul>
				) : (
					<ul className='relative flex flex-col py-2 px-2 space-y-1  z-50 container gap-2 bg-white pt-4'>
						<ButtonSecondary
							href={'/iniciar-sesion'}
							sizeClass='px-4 py-2 sm:px-5'
							className='border-solid border-1 border-[#E5E7EB]  text-neutral-500 rounded-md '
							bordered
						>
							Iniciar sesión
						</ButtonSecondary>
						<ButtonPrimary href={'/crear-cuenta'} sizeClass='px-4 py-2 sm:px-5 rounded-md' className='font-semibold'>
							Crear cuenta
						</ButtonPrimary>
					</ul>
				)}
			</div>
			<ModalSignOut open={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</div>
	);
};

export default NavMobile;
