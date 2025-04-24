'use client';
import Image from 'next/image';
import { useCourseSummary } from '../hooks/useCourseSummary';

interface CourseSummaryProps {
	slug: string;
}

export default function CourseSummary({ slug }: CourseSummaryProps) {
	const { data, loading, error } = useCourseSummary(slug);

	console.log('data', data);

	// const enrolledFormatted = data?.enrolled.toLocaleString();
	/* mock for now */

	/* {
    "sale_price": "0",
    "max_installments": "12",
    "price_installments": "39.504",
    "duration": "50",
    "enrolled": 2000,
    "modules": 5,
    "certification": true
} */

	const enrolledFormatted = data?.enrolled;
	const modules = data?.modules;
	const duration = data?.duration + ' horas estimadas';
	const certification = data?.certification;
	const max_installments = data?.max_installments;
	const price = data?.price_installments
		? new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(Number(data.price_installments))
		: '';
	const total_price = data?.total_price
		? new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(Number(data.total_price))
		: '';

	const cedente = data?.cedente;

	// const [enrolledFormatted, setEnrolledFormatted] = useState<string | number>(enrolled);
	// useEffect(() => {
	// 	setEnrolledFormatted(enrolled.toLocaleString());
	// }, [enrolled]);

	return (
		<div className='bg-white rounded-[38px] shadow p-6 md:p-8 sticky top-10 w-full'>
			{/* <img src='/images/productpage/course.svg' alt='Curso' className='rounded-xl w-full object-cover mb-6' /> */}
			<Image
				src={data?.featured_images.medium ?? ''}
				alt='Curso'
				className='rounded-xl w-full object-cover mb-6'
				width={420}
				height={300}
			/>

			<p className='text-[#3b476c] text-[20px] font-inter font-bold'>Total: {total_price} ARS</p>
			<p className='font-inter text-base'>{max_installments} pagos de:</p>
			<p className='text-2xl font-bold text-[#1a1a1a] mb-4'>{price}</p>

			<ul className='text-sm text-[#3b476c] space-y-3 mb-4'>
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

			<p className='text-xs text-gray-500 mb-2'>
				Cedente
				<br />
				<strong className='text-[#3b476c] '>{cedente?.name}</strong>
			</p>

			<div className='flex items-center justify-center mb-4 w-full bg-[#F7F9FF] rounded-[30px] p-2'>
				<Image src={cedente?.image ?? ''} alt='Certificado' className='h-20 mix-blend-multiply' width={80} height={80} />
			</div>

			<button className='bg-[#9200AD] hover:bg-[#6b1679] text-white w-full py-3 rounded-full font-medium transition'>
				Inscribite ahora
			</button>

			<button className='w-full mt-2 py-3 text-sm text-[#9200AD] border hover:border-bg-[#6b1679] rounded-full'>
				Contáctanos
			</button>
		</div>
	);
}
