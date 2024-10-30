'use client';
import React, { FC, useContext, useEffect, useState } from 'react';
import Card8 from '@/components/Card8/Card8';
import HeaderFilter from './HeaderFilter';
import Card9 from '@/components/Card9/Card9';
import { FetchCourseType } from '@/data/types';
import { PostDataType } from '@/data/types';
import ImageSkeleton from './ImageSkeleton';
import CoursesSlider from '@/components/Sliders/CoursesSlider';
import { CountryContext } from '@/context/country/CountryContext';

interface SectionMagazine1Props {
	tabs: string[];
	posts: PostDataType[];
	heading?: string;
	desc?: string;
	className?: string;
}

interface Props {
	courses: FetchCourseType[];
	tabs: any;
	className: string;
	heading: string;
	desc: string;
	bestSeller?: FetchCourseType[];
	loading?: boolean;
}

const CoursesForYou: FC<Props> = ({
	courses,
	bestSeller,
	tabs,
	className = '',
	heading = 'Latest Articles 🎈 ',
	desc = '',
	loading = false,
}) => {
	const [tabActive, setTabActive] = useState<string>(tabs[0]);
	const [localCourses, setLocalCourses] = useState<FetchCourseType[]>([]);
	const { countryState: countryState } = useContext(CountryContext);
	const handleClickTab = (item: string) => {
		const updatedCourses = courses.map((course) => {
			if (countryState.country === 'mx' && course.title === 'Curso superior de diagnóstico por imágenes') {
				return {
					...course,
					title: 'Diplomado en imagenología',
				};
			}
			return course;
		});
		switch (item) {
			case 'Novedades':
				// Ordenar solo cuando `courses` esté cargado
				if (courses.length > 0) {
					const newCourses = [...updatedCourses].sort((a, b) => {
						const dateA = new Date(a.created_at);
						const dateB = new Date(b.created_at);
						return dateB.getTime() - dateA.getTime();
					});
					setLocalCourses(newCourses);
				}
				break;
			case 'Recomendados':
				if (bestSeller) setLocalCourses(bestSeller);
				break;
			case 'Especialidades':
				const specialtyCourses = courses.filter(
					(course) => !course.categories.some((category) => category.name === 'Medicina general'),
				);
				setLocalCourses(specialtyCourses);
				break;
		}
		setTabActive(item);
	};

	useEffect(() => {
		if (tabActive === 'Novedades' && courses.length > 0) {
			const newCourses = [...courses].sort((a, b) => {
				const dateA = new Date(a.created_at);
				const dateB = new Date(b.created_at);
				return dateB.getTime() - dateA.getTime();
			});
			setLocalCourses(newCourses);
		}
	}, [courses, tabActive]);

	return (
		<div className={`nc-CoursesForYou ${className}`}>
			<HeaderFilter tabActive={tabActive} tabs={tabs} desc={desc} heading={heading} onClickTab={handleClickTab} />
			{loading ? (
				<>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
						<ImageSkeleton className='col-span-2' height='200px' />
						<ImageSkeleton className='col-span-1' height='200px' />
						<ImageSkeleton className='col-span-1' height='200px' />
						<ImageSkeleton className='col-span-1' height='200px' />
						<ImageSkeleton className='col-span-1' height='200px' />
						<ImageSkeleton className='col-span-2' height='200px' />
					</div>
				</>
			) : (
				<>
					{!localCourses || (!localCourses.length && <span>No encontramos publicaciones.!</span>)}

					<CoursesSlider products={localCourses} />

					<div className='hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-6'>
						{localCourses && localCourses[0] && (
							<Card8 className='sm:col-span-2 rounded-3xl' post={localCourses[0]} kind='curso' />
						)}
						{localCourses
							?.filter((_: FetchCourseType, i: number) => i < 3 && i >= 1)
							.map((item: FetchCourseType, index: number) => (
								<Card9 key={index} post={item} badgeColor='yellow' showDescription kind='curso' />
							))}
						{localCourses
							?.filter((_: FetchCourseType, i: number) => i < 5 && i >= 3)
							.map((item: FetchCourseType, index: number) => (
								<Card9 key={index} post={item} badgeColor='yellow' showDescription kind='curso' />
							))}
						{localCourses && localCourses[5] && (
							<Card8 className='sm:col-span-2 rounded-3xl' badgeColor='yellow' post={localCourses[5]} kind='curso' />
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default CoursesForYou;
