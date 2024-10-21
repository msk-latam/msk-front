import ButtonPrimary from '@/components/Button/ButtonPrimary';
import StoreProduct from '@/components/MSK/Store/StoreProduct';
import NoResultFound from '@/components/NoResultFound';
import StoreSkeleton from '@/components/Skeleton/StoreSkeleton';
import { DataContext } from '@/context/data/DataContext';
import { FetchCourseType } from '@/data/types';
import { useSearchParams } from 'next/navigation';
import { FC, useContext, useEffect, useState } from 'react';
import SpecialtiesModal from './SpecialtiesModal';

interface TiendaProps {
	category: string;
	country: string | undefined;
}

const TiendaProductos: FC<TiendaProps> = ({ category, country }) => {
	const { state: dataState } = useContext(DataContext);
	const { storeCourses, allStoreProfessions } = dataState;
	const [currentItems, setCurrentItems] = useState<FetchCourseType[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const searchParams = useSearchParams();

	const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
	const itemsPerPage = 18;

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const resourceFilter = searchParams.get('recurso');
	const durationFilter = searchParams.get('duracion');
	const professionFilter = searchParams.get('profesion');

	useEffect(() => {
		const filterCourses = () => {
			let filteredCourses = storeCourses;

			// Filtra por categoría
			if (category) {
				filteredCourses = storeCourses.filter((course: any) => course.categories.some((cat: any) => cat.slug === category));
			}

			filteredCourses = filteredCourses.filter((course: any) => course.father_post_type === 'course');

			// if (resourceFilter) {
			//   filteredCourses = filteredCourses.filter(course => {
			//     if (resourceFilter === 'guias-profesionales') {
			//       return course.father_post_type === 'downloadable';
			//     } else if (resourceFilter === 'curso') {
			//       return course.father_post_type === 'course';
			//     }
			//     return true;
			//   });
			// }

			// if (durationFilter) {
			//   filteredCourses = filteredCourses.filter(course => {
			//     const duration = parseInt(course.duration, 10); // Convertir a número entero
			//     if (durationFilter === 'dur_1') {
			//       return duration <= 100;
			//     } else if (durationFilter === 'dur_2') {
			//       return duration > 100 && duration <= 300;
			//     } else if (durationFilter === 'dur_3') {
			//       return duration > 300;
			//     }
			//     return true;
			//   });
			// }

			// if (professionFilter) {
			//   filteredCourses = filteredCourses.filter(course => {
			//     if (professionFilter === 'medicos') {
			//       return course.professions.some(
			//         profession => profession.name === 'medicos',
			//       );
			//     } else if (professionFilter === 'enfermeros-auxiliares') {
			//       return course.professions.some(
			//         profession => profession.name === 'enfermeros-auxiliares',
			//       );
			//     } else if (professionFilter === 'otra-profesion') {
			//       return course.professions.some(
			//         profession => profession.name === 'otra-profesion',
			//       );
			//     }
			//     return true;
			//   });
			// }

			const paginatedCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

			console.log(filterCourses);

			setCurrentItems(paginatedCourses);
		};

		filterCourses();
	}, [
		category,
		country,
		storeCourses,
		resourceFilter,
		durationFilter,
		professionFilter,
		indexOfFirstItem,
		indexOfLastItem,
		currentPage,
	]);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	console.log(currentItems);
	return (
		<>
			<SpecialtiesModal isOpen={isModalOpen} onClose={toggleModal} fixed='fixed' />
			<ButtonPrimary onClick={toggleModal}>Ver Especialidades</ButtonPrimary>

			<div className='flex gap-6 mb-10'>
				<div>
					{!storeCourses?.length ? (
						<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mb-12'>
							<StoreSkeleton />
							<StoreSkeleton />
							<StoreSkeleton />
							<StoreSkeleton />
						</div>
					) : (
						<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mb-12'>
							{currentItems.length ? (
								currentItems.map((product, index) => (
									<StoreProduct product={product} key={`${product.slug}_${index}`} kind={product.father_post_type} />
								))
							) : (
								<NoResultFound />
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default TiendaProductos;
