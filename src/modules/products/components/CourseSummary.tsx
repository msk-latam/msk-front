'use client';

import { Phone } from 'lucide-react'; // icono de teléfono
import Image from 'next/image';
import { useCourseSummary } from '../hooks/useCourseSummary';
import SkeletonCourseSummaryCard from '../skeletons/SkeletonCourseSummaryCard';

interface CourseSummaryProps {
	slug: string;
	lang: string;
}

export default function CourseSummary({ slug, lang }: CourseSummaryProps) {
	const { data, loading } = useCourseSummary(slug, lang);

	const enrolledFormatted = data?.enrolled;
	const modules = data?.modules;
	const duration = data?.duration + ' horas estimadas';
	const certification = data?.certification;
	const max_installments = data?.max_installments;
	const getLocale = (lang: string) => {
		const localeMap: Record<string, string> = {
			ar: 'es-AR',
			bo: 'es-BO',
			cl: 'es-CL',
			co: 'es-CO',
			cr: 'es-CR',
			ec: 'es-EC',
			sv: 'es-SV',
			gt: 'es-GT',
			hn: 'es-HN',
			mx: 'es-MX',
			pa: 'es-PA',
			py: 'es-PY',
			pe: 'es-PE',
			es: 'es-ES',
			uy: 'es-UY',
			ve: 'es-VE',
			ni: 'es-NI',
		};
		return localeMap[lang] || 'en-US';
	};

	const getCurrency = (lang: string) => {
		const currencyMap: Record<string, string> = {
			ar: 'ARS',
			bo: 'BOB',
			cl: 'CLP',
			co: 'COP',
			cr: 'CRC',
			ec: 'USD',
			sv: 'USD',
			gt: 'USD',
			hn: 'USD',
			mx: 'MXN',
			pa: 'USD',
			py: 'USD',
			pe: 'USD',
			es: 'EUR',
			uy: 'USD',
			ve: 'USD',
			ni: 'USD',
		};
		return currencyMap[lang] || 'USD';
	};

	const price = data?.price_installments
		? new Intl.NumberFormat(getLocale(lang), {
				style: 'currency',
				currency: getCurrency(lang),
				maximumFractionDigits: 0,
		  })
				.format(Number(data.price_installments))
				.replace(',', '.')
		: '';
	const total_price = data?.total_price
		? new Intl.NumberFormat(getLocale(lang), {
				style: 'currency',
				currency: getCurrency(lang),
				maximumFractionDigits: 0,
		  })
				.format(Number(data.total_price))
				.replace(',', '.')
		: '';

	const cedente = data?.cedente;
	if (loading) {
		return <SkeletonCourseSummaryCard />; // Usa el Skeleton cuando los datos están cargando
	}
	return (
		<div className='bg-white rounded-[38px] p-6 md:p-8 sticky top-10 w-full' style={{ backgroundColor: '#FFFFFF' }}>
			<Image
				src={data?.featured_images.medium ?? ''}
				alt='Curso'
				className='rounded-xl w-full object-cover mb-6'
				width={420}
				height={300}
			/>
			{/* Total y precio */}
			{data?.total_price && Number(data.total_price) > 0 && (
				<>
					<p className='text-[#1A1A1A] text-[20px] font-inter font-medium'>
						Total: {total_price} {getCurrency(lang)}
					</p>
					<p className='text-[#4F5D89] font-inter font-medium text-base'>{max_installments} pagos de:</p>
					<p className='text-2xl font-bold text-[#1A1A1A] mb-4'>
						{price} {getCurrency(lang)}
					</p>
				</>
			)}

			{/* Lista de items */}
			<ul className='text-sm text-[#4F5D89] font-inter font-medium space-y-3 mb-6'>
				<li className='flex items-center gap-2'>
					<img src='/icons/course/summary/world.svg' alt='' className='w-4 h-4' />
					Modalidad 100% a distancia
				</li>
				<li className='flex items-center gap-2'>
					<img src='/icons/course/summary/modules.svg' alt='' className='w-4 h-4' />
					{modules} módulos actualizados
				</li>
				<li className='flex items-center gap-2'>
					<img src='/icons/course/summary/hourglass.svg' alt='' className='w-4 h-4' />
					{duration}
				</li>
				<li className='flex items-center gap-2'>
					<img src='/icons/course/summary/person.svg' alt='' className='w-4 h-4' />
					{enrolledFormatted} profesionales inscriptos
				</li>
				<li className='flex items-center gap-2'>
					<img src='/icons/course/summary/download.svg' alt='' className='w-4 h-4' />
					{certification ? 'Incluye material descargable' : 'Sin material adicional'}
				</li>
			</ul>

			{cedente && (
				<>
					<p className='text-xs text-[#4F5D89] font-inter font-medium mb-2'>
						Cedente
						<br />
						<strong className='text-[#4F5D89] font-inter font-medium'>{cedente.name}</strong>
					</p>
					<div className='flex flex-col items-center justify-center mb-6 bg-[#F7F9FF] rounded-[30px] p-4 relative'>
						<Image
							src={cedente.image || '/images/fallback.jpg'}
							alt='Institución'
							width={200}
							height={80}
							className='object-contain mix-blend-multiply max-h-[80px]'
						/>
					</div>
				</>
			)}

			{/* Botones CTA */}
			<div className='space-y-3'>
				<button className='bg-[#9200AD] hover:bg-[#6b1679] text-white w-full py-3 rounded-full font-inter font-medium text-base transition'>
					Inscríbete ahora
				</button>

				<button className='w-full border border-gray-300 text-[#1A1A1A] hover:bg-gray-100 flex items-center justify-center py-3 rounded-full font-inter font-bold text-base gap-2 transition'>
					Contáctanos
					<Phone size={16} />
				</button>
			</div>
		</div>
	);
}
