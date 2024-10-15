'use client';
import CardCategory1 from '@/components/CardCategory1/CardCategory1';
import CardCategory2 from '@/components/CardCategory2/CardCategory2';
import CardCategory3 from '@/components/CardCategory3/CardCategory3';
import CardCategory4 from '@/components/CardCategory4/CardCategory4';
import CardCategory5 from '@/components/CardCategory5/CardCategory5';
import Heading from '@/components/Heading/Heading';
import { DEMO_CATEGORIES } from '@/data/taxonomies';
import { Specialty, TaxonomyType } from '@/data/types';
import React, { useEffect, useRef, useState } from 'react';
import NcLink from '../NcLink/NcLink';
import SpecialtiesModal from '@/app/[lang]/tienda/[category]/SpecialtiesModal';

export interface SectionGridCategoryBoxProps {
	categories?: TaxonomyType[] | Specialty[];
	headingCenter?: boolean;
	categoryCardType?: 'card1' | 'card2' | 'card3' | 'card4' | 'card5';
	className?: string;
}

const DATA = DEMO_CATEGORIES.filter((_, i) => i < 10);

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
	categories = DATA,
	categoryCardType = 'card2',
	headingCenter = true,
	className = '',
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalTop, setModalTop] = useState(0);
	const modalRef = useRef<HTMLDivElement>(null);
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};
	let CardComponentName = CardCategory2;
	switch (categoryCardType) {
		case 'card1':
			CardComponentName = CardCategory1;
			break;
		case 'card2':
			CardComponentName = CardCategory2;
			break;
		case 'card3':
			CardComponentName = CardCategory3;
			break;
		case 'card4':
			CardComponentName = CardCategory4;
			break;
		case 'card5':
			CardComponentName = CardCategory5;
			break;
		default:
			CardComponentName = CardCategory2;
	}

	// useEffect(() => {
	// 	if (isModalOpen) {
	// 		// Desactivar el scroll del body y del html
	// 		document.documentElement.style.overflow = 'hidden';
	// 		document.body.style.overflowY = 'hidden';
	// 	} else {
	// 		// Restaurar el scroll
	// 		document.documentElement.style.overflow = '';
	// 		document.body.style.overflowY = '';
	// 	}

	// 	return () => {
	// 		// Asegurarse de restaurar el scroll cuando se desmonte
	// 		document.documentElement.style.overflow = '';
	// 		document.body.style.overflowY = '';
	// 	};
	// }, [isModalOpen]);

	useEffect(() => {
		if (isModalOpen) {
			const modalHeight = modalRef.current?.offsetHeight || 0; // Obtener la altura del modal
			const windowHeight = window.innerHeight; // Altura del viewport
			const calculatedTop = (windowHeight - modalHeight) / 2; // Centrar verticalmente
			setModalTop(calculatedTop); // Actualizar la posición top
		}
	}, [isModalOpen]);

	return (
		<>
			<div className={`nc-SectionGridCategoryBox relative ${className}`}>
				<Heading desc='Elige un área de interés y descúbrelos' isCenter={headingCenter}>
					Cursos por especialidades
				</Heading>
				<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8 justify-center'>
					{categories.map((item, i) => (
						<CardComponentName
							index={i < 1 ? `#${i + 1}` : undefined}
							key={item.id}
							taxonomy={item}
							className='rounded-lg'
						/>
					))}
					<div className='w-full col-span-2 sm:col-span-1 flex justify-items-center'>
						<button
							onClick={toggleModal}
							className='w-full !border-white nc-CardCategory2 h-full text-primary font-medium sm:font-semibold flex items-center justify-center text-center mx-auto  [ nc-dark-box-bg-has-hover ]'
						>
							Ver todas
						</button>
					</div>
				</div>
			</div>
			<div className={`relative inset-0 flex items-center justify-center w-full ${isModalOpen ? 'z-10' : '-z-10'}`}>
				<div className='absolute'>
					<div
						onClick={() => setIsModalOpen(false)}
						style={{ top: `${modalTop}px` }}
						className={`fixed top-[20rem]  w-screen h-[100rem]  bg-opacity-50 left-1/2  transform  -translate-x-1/2  flex items-center justify-center ${
							isModalOpen ? 'bg-black' : 'bg-white'
						} rounded-lg `}
					>
						<div onClick={(e) => e.stopPropagation()} className='rounded-lg'>
							<SpecialtiesModal isOpen={isModalOpen} onClose={toggleModal} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SectionGridCategoryBox;
