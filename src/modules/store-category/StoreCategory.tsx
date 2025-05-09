'use client';

import { FC, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { DataContext } from '@/context/data/DataContext';
import { useStoreFilters } from '@/context/storeFilters/StoreProvider';
import { FetchCourseType, Specialty } from '@/data/types';

import TiendaHeader from './components/StoreCategoryHeader';
import SpecialtiesModal from './components/SpecialtiesModal';
import CourseCard from '@/modules/store/CourseCard';
import { categoriesData } from './data/categoriesData';
import { getJSONByCountry } from '@/app/products';
import StoreCourseCard from './components/StoreCategoryCourseCard';

interface TiendaProps {
	category: string;
	country: string | undefined;
}

const Tienda: FC<TiendaProps> = ({ category }) => {
	const country = 'ar';
	const { state: dataState } = useContext(DataContext);
	const [courses, setCourses] = useState<FetchCourseType[]>([]);
	const [filteredCourses, setFilteredCourses] = useState<FetchCourseType[]>([]);
	const [JSONProduct, setJSONProduct] = useState<{ products: any[] }>({ products: [] });
	const [isModalOpen, setIsModalOpen] = useState(false);

	const specialties: Specialty[] = useStoreFilters().specialties;

	const generateSlug = (name: string) =>
		name
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/\s+/g, '-')
			.replace(/[^\w-]+/g, '');

	const matchedSpecialty = specialties.find((specialty) => generateSlug(specialty.name) === category);
	const categoryInfo = categoriesData[category];

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const data = await getJSONByCountry(country);
				setJSONProduct(data);
			} catch (error) {
				console.error('Error al obtener los productos:', error);
				setJSONProduct({ products: [] });
			}
		};
		fetchProducts();
	}, [country]);

	useEffect(() => {
		if (JSONProduct.products.length > 0) {
			const filtered = JSONProduct.products.filter(
				(product) =>
					product.title !== 'ACCSAP. Programa de Actualización en Cardiología Clínica' &&
					product.father_post_type === 'course',
			);
			setCourses(filtered);
		}
	}, [JSONProduct]);

	useEffect(() => {
		if (courses.length) {
			const byCategory = courses.filter((course: any) => course.categories?.some((cat: any) => cat.slug === category));
			setFilteredCourses(byCategory);
		}
	}, [category, courses]);

	return (
		<>
			{categoryInfo && (
				<div className='bg-[#F5F8FF] rounded-xl p-6 mb-6 overflow-visible px-4 max-w-[1400px] mx-auto'>
					<h2 className='text-[#6474A6] text-xl font-bold mb-2'>{categoryInfo.pageTitle}</h2>
					<p className='text-[#6474A6] font-medium' dangerouslySetInnerHTML={{ __html: categoryInfo.pageDescription }} />
				</div>
			)}
			<div className='pb-[120px] overflow-visible px-4 max-w-[1400px] mx-auto '>
				{' '}
				{/* Espacio extra antes de las FAQs */}
				<div className='text-center my-10'>
					<button
						onClick={() => setIsModalOpen(true)}
						className='bg-[#9200AD] text-white text-xl font-medium rounded-[38px] px-8 py-4 whitespace-nowrap hover:bg-[#6d0082]'
					>
						Ver especialidades
					</button>
				</div>
				<SpecialtiesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} fixed='fixed' />
				{filteredCourses.length > 0 ? (
					<section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
						{filteredCourses.map((course) => (
							<StoreCourseCard key={course.id} course={course} />
						))}
					</section>
				) : (
					<p className='text-center py-10 text-gray-600'>
						No se encontraron cursos o no se ha seleccionado una especialidad.
					</p>
				)}
			</div>
		</>
	);
};

export default Tienda;
