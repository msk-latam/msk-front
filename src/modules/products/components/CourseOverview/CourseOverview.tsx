// 'use client';

// import Image from 'next/image';
// import { ChevronDown, ChevronRight } from 'react-feather';
// import { BiLike } from 'react-icons/bi';
// import { GoShieldCheck } from 'react-icons/go';
// import { PiCertificateLight } from 'react-icons/pi';
// import { useCourseOverview } from '../hooks/useCourseOverview';
// import SkeletonCourseOverview from '../skeletons/SkeletonCourseOverview'; // Importa el Skeleton

// interface CourseOverviewProps {
// 	slug: string;
// 	lang: string;
// }

// const steps = [
// 	{ step: 'Inscríbite', icon: '/icons/course/overview/step1.svg' },
// 	{ step: 'Aprende con material actualizado por expertos', icon: '/icons/course/overview/step2.svg' },
// 	{ step: 'Obtén tu certificado', icon: '/icons/course/overview/step3.svg' },
// 	{ step: 'Aplica lo aprendido a tu práctica y mejora tu futuro profesional', icon: '/icons/course/overview/step4.svg' },
// ];

// const features = [
// 	{
// 		icon: <PiCertificateLight className='text-[#9200AD] w-5 h-5' />,
// 		title: '¡Obtén tu certificado digital!',
// 		description: 'Al finalizar y aprobar, descarga tu certificado y compártelo con colegas en LinkedIn.',
// 	},
// 	{
// 		icon: <BiLike className='text-[#9200AD] w-5 h-5' />,
// 		title: 'El 97% recomienda este curso',
// 		description:
// 			'Este curso ha sido altamente valorado por profesionales de la salud por su calidad y aplicabilidad práctica.',
// 	},
// 	{
// 		icon: <GoShieldCheck className='text-[#9200AD] w-5 h-5' />,
// 		title: 'Compromiso de satisfacción',
// 		description:
// 			'Si no deseas continuar con tu cursada dentro de los primeros 30 días, te devolvemos el 100% de tu inversión.',
// 	},
// ];

// // Función corregida y segura para bold dinámico
// function formatWithThisCourse(text: unknown) {
// 	if (typeof text !== 'string') return '';

// 	// 1. Eliminar etiquetas HTML
// 	const cleanText = text.replace(/<[^>]*>?/gm, '').trim();

// 	// 2. Encontrar el índice del segundo " en "
// 	const enMatches = [...cleanText.matchAll(/\ben\b/gi)];

// 	if (enMatches.length < 2) {
// 		return cleanText; // si no hay 2 "en", devuelvo normal
// 	}

// 	const secondEnIndex = enMatches[1].index; // índice del segundo "en"
// 	if (secondEnIndex === undefined) return cleanText;

// 	// 3. Cortar en la posición del segundo "en"
// 	const beforeSecondEn = cleanText.substring(0, secondEnIndex + 3).trim(); // incluye "en "
// 	const afterSecondEn = cleanText.substring(secondEnIndex + 3).trim(); // lo que va en bold

// 	return (
// 		<>
// 			{beforeSecondEn} <strong>{afterSecondEn}</strong>
// 		</>
// 	);
// }

// export default function CourseOverview({ slug, lang }: CourseOverviewProps) {
// 	const { data, loading, error } = useCourseOverview(slug, lang);

// 	if (loading || error || !data || (!data.habilities?.length && !data.your_course_steps?.length && !data.with_this_course)) {
// 		return <SkeletonCourseOverview />;
// 	}

// 	return (
// 		<section className='py-6 max-w-5xl mx-auto'>
// 			{/* Título principal */}
// 			<h2 className='text-2xl whitespace-nowrap font-medium md:text-[34px] text-[#1A1A1A] font-raleway mb-6 text-center md:text-left'>
// 				Desarróllate en lo importante
// 			</h2>

// 			{/* Habilidades (tags dinámicos) */}
// 			<div className='flex flex-wrap gap-3 md:justify-start md:items-center justify-center items-center mb-8'>
// 				{data?.habilities?.map((item, index) => (
// 					<span
// 						key={index}
// 						className='bg-[#f7f9ff] text-[#29324f] text-sm font-inter font-normal md:px-4 px-2 py-2 rounded-full shadow-sm'
// 					>
// 						{item.name}
// 					</span>
// 				))}
// 			</div>

// 			{/* Texto "Con este curso..." */}
// 			<h3 className='pb-6 font-raleway font-semibold text-[#1A1A1A] text-[18px] md:text-2xl md:text-left text-center'>
// 				{formatWithThisCourse(data?.with_this_course)}
// 			</h3>

// 			{/* Paso a paso */}
// 			<div className='flex flex-col md:flex-row md:flex-nowrap md:items-center md:justify-center md:gap-4 mb-10 w-full'>
// 				{steps.map((item, idx) => (
// 					<div key={idx} className='flex items-start md:items-center gap-3 text-left'>
// 						<div className='flex flex-col items-center'>
// 							<div className='bg-[#f7f9ff] rounded-full w-16 h-16 flex items-center justify-center shrink-0'>
// 								<Image src={item.icon} alt='' width={24} height={24} />
// 							</div>
// 							{idx < steps.length - 1 && (
// 								<span className='text-gray-400 block md:hidden mt-1'>
// 									<ChevronDown />
// 								</span>
// 							)}
// 						</div>
// 						<span className='font-raleway font-semibold text-base md:text-sm text-[#1A1A1A] leading-tight pt-4 md:pt-0'>
// 							{item.step}
// 						</span>
// 						{idx < steps.length - 1 && (
// 							<span className='text-gray-400 hidden md:block'>
// 								<ChevronRight />
// 							</span>
// 						)}
// 					</div>
// 				))}
// 			</div>

// 			{/* Sección "Tu cursada paso a paso" */}
// 			<div className='bg-[#f7f9ff] rounded-[38px] p-6 mb-10'>
// 				<h3 className='pb-6 font-raleway text-[18px] font-medium text-left '>Tu cursada, paso a paso</h3>
// 				<div className='grid gap-6 md:grid-cols-2 text-sm text-[#29324f] text-left font-inter'>
// 					{data?.your_course_steps.map((step, idx) => (
// 						<div key={idx} className='flex items-start gap-3'>
// 							<Image src='/icons/msk.svg' alt='' width={20} height={20} />
// 							<p>{step.step}</p>
// 						</div>
// 					))}
// 				</div>
// 			</div>

// 			{/* Cards informativas */}
// 			<div className='grid gap-4 md:grid-cols-3'>
// 				{features.map((item, index) => (
// 					<div key={index} className='rounded-[38px] border border-gray-200 py-6 px-6 shadow-sm bg-white'>
// 						<div className='flex justify-start pl-2 mb-3'>{item.icon}</div>
// 						<h3 className='font-raleway font-bold text-md text-[#1A1A1A] mb-2 break-words w-full text-left'>{item.title}</h3>
// 						<p className='text-sm font-inter font-normal text-[#1A1A1A] md:text-left text-center'>{item.description}</p>
// 					</div>
// 				))}
// 			</div>
// 		</section>
// 	);
// }'use client';
'use client';

import { useEffect, useRef } from 'react';
import { BiLike } from 'react-icons/bi';
import { GoShieldCheck } from 'react-icons/go';
import { PiCertificateLight } from 'react-icons/pi';
import { useCourseOverview } from '../../hooks/useCourseOverview';
import SkeletonCourseOverview from '../../skeletons/SkeletonCourseOverview';
import CourseHabilities from './CourseHabilities';
import WithThisCourse from './WithThisCourse';
import StepByStep from './StepByStep';
import CourseSteps from './CourseSteps';
import InfoCards from './InfoCards';

// const steps = [
// 	{ step: 'Inscríbite', icon: '/icons/course/overview/step1.svg' },
// 	{ step: 'Aprende con material actualizado por expertos', icon: '/icons/course/overview/step2.svg' },
// 	{ step: 'Obtén tu certificado', icon: '/icons/course/overview/step3.svg' },
// 	{ step: 'Aplica lo aprendido a tu práctica y mejora tu futuro profesional', icon: '/icons/course/overview/step4.svg' },
// ];

const features = [
	{
		icon: <PiCertificateLight className='text-[#9200AD] w-5 h-5' />,
		title: '¡Obtén tu certificado digital!',
		description: 'Al finalizar y aprobar, descarga tu certificado y compártelo con colegas en LinkedIn.',
	},
	{
		icon: <BiLike className='text-[#9200AD] w-5 h-5' />,
		title: 'El 97% recomienda este curso',
		description: 'Este curso ha sido altamente valorado por profesionales de la salud por su calidad y aplicabilidad práctica.',
	},
	{
		icon: <GoShieldCheck className='text-[#9200AD] w-5 h-5' />,
		title: 'Compromiso de satisfacción',
		description: 'Si no deseas continuar con tu cursada dentro de los primeros 30 días, te devolvemos el 100% de tu inversión.',
	},
];

function formatWithThisCourse(text: unknown) {
	if (typeof text !== 'string') return '';
	const cleanText = text.replace(/<[^>]*>?/gm, '').trim();
	const enMatches = [...cleanText.matchAll(/\ben\b/gi)];
	if (enMatches.length < 2) return cleanText;
	const secondEnIndex = enMatches[1].index;
	if (secondEnIndex === undefined) return cleanText;
	const before = cleanText.substring(0, secondEnIndex + 3).trim();
	const after = cleanText.substring(secondEnIndex + 3).trim();
	return (
		<>
			{before} <strong>{after}</strong>
		</>
	);
}

interface CourseOverviewProps {
	slug: string;
	lang: string;
	onHideEmpty?: () => void;
	isDownloadable: boolean;
}

export default function CourseOverview({ slug, lang, onHideEmpty, isDownloadable }: CourseOverviewProps) {
	const { data, loading, error } = useCourseOverview(slug, lang);
	const hasNotified = useRef(false);

	const hasHabilities = Array.isArray(data?.habilities) && data.habilities.length > 0;
	const hasWithThisCourse =
		(Array.isArray(data?.with_this_course) && data.with_this_course.length > 0) ||
		(typeof data?.with_this_course === 'string' && data.with_this_course.trim() !== '');
	const hasCourseSteps = Array.isArray(data?.your_course_steps) && data.your_course_steps.length > 0;

	const isEmptyDynamicContent = !hasHabilities && !hasWithThisCourse && !hasCourseSteps;

	useEffect(() => {
		if (!hasNotified.current && !loading && (error || !data || isEmptyDynamicContent)) {
			onHideEmpty?.();
			hasNotified.current = true;
		}
	}, [loading, error, data, isEmptyDynamicContent, onHideEmpty]);

	if (loading) return <SkeletonCourseOverview />;
	if (error || !data || isEmptyDynamicContent) return null;

	const formattedWithThis = hasWithThisCourse
		? formatWithThisCourse(
				Array.isArray(data.with_this_course)
					? data.with_this_course.join(' ')
					: data.with_this_course
		  )
		: null;
console.log('CourseOverview render: shouldHide', isEmptyDynamicContent);

	return (
		<section className='py-6 max-w-5xl mx-auto'>
			{hasHabilities && <CourseHabilities habilities={data.habilities} />}
			{hasWithThisCourse && <WithThisCourse formattedContent={formattedWithThis} />}
			<StepByStep isDownloadable={isDownloadable} />
			{hasCourseSteps && <CourseSteps steps={data.your_course_steps} />}
			<InfoCards features={features} />
		</section>
	);
}
