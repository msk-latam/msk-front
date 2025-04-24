import Image from 'next/image';
import { ChevronDown, ChevronRight } from 'react-feather';
import { BiLike } from 'react-icons/bi';
import { GoShieldCheck } from 'react-icons/go';
import { PiCertificateLight } from 'react-icons/pi';
import { useCourseOverview } from '../hooks/useCourseOverview'; // Ajustá la ruta si es necesario

interface CourseOverviewProps {
	slug: string;
}
const steps = [
	{
		step: 'Inscribite',
		icon: '/icons/course/overview/step1.svg',
	},
	{
		step: 'Aprende con material actualizado por expertos',
		icon: '/icons/course/overview/step2.svg',
	},
	{
		step: 'Obtén tu certificado',
		icon: '/icons/course/overview/step3.svg',
	},
	{
		step: 'Aplica lo aprendido a tu práctica y mejora tu futuro profesional',
		icon: '/icons/course/overview/step4.svg',
	},
];

// const courseSteps = [
//   "Lectura de módulos teóricos",
//   "Autoevaluación al finalizar cada módulo",
//   "Clases interactivas con mirada práctica aplicada a casos clínicos",
//   "Examen final",
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
		description:
			'Este curso ha sido altamente valorado por profesionales de la salud por su calidad y aplicabilidad práctica.',
	},
	{
		icon: <GoShieldCheck className='text-[#9200AD] w-5 h-5' />,
		title: 'Compromiso de satisfacción',
		description:
			'Si no deseas continuar con tu cursada dentro de los primeros 30 días, te devolvemos el 100% de tu inversión.',
	},
];

export default function CourseOverview({ slug }: CourseOverviewProps) {
	const { data, loading, error } = useCourseOverview(slug);
	console.log(data);
	return (
		<section className='py-6 max-w-5xl mx-auto'>
			<h2 className='text-3xl font-medium md:text-[34px] ont-raleway mb-6 text-center md:text-left'>
				Desarróllate en lo importante
			</h2>

			{/* Tags dinámicos */}
			<div className='flex flex-wrap gap-4 justify-center items-center mb-8'>
				{data?.habilities?.map((item, index) => (
					<span key={index} className='bg-[#f7f9ff] text-[#29324f] text-sm font-medium px-4 py-2 rounded-full shadow-sm'>
						{item.name}
					</span>
				))}
			</div>
			<h3
				className='pb-6 font-raleway text-[18px] md:text-2xl font-medium md:text-left text-center'
				dangerouslySetInnerHTML={{ __html: data?.with_this_course ?? '' }}
			/>

			{/* Step by step */}
			<div className='flex flex-col md:flex-row md:flex-nowrap md:items-center md:justify-center md:gap-4 mb-10 text-sm text-[#29324f] w-full'>
				{steps.map((item, idx) => (
					<div key={idx} className='flex items-start md:items-center gap-3 text-left'>
						<div className='flex flex-col items-center'>
							<div className='bg-[#f7f9ff] rounded-full w-16 h-16 flex items-center justify-center shrink-0'>
								<Image src={item.icon} alt='' width={24} height={24} />
							</div>
							{idx < steps.length - 1 && (
								<span className='text-gray-400 block md:hidden mt-1'>
									<ChevronDown />
								</span>
							)}
						</div>
						<span className='font-raleway font-bold text-base md:text-sm leading-tight pt-4 md:pt-0'>{item.step}</span>
						{idx < steps.length - 1 && (
							<span className='text-gray-400 hidden md:block'>
								<ChevronRight />
							</span>
						)}
					</div>
				))}
			</div>

			{/* Steps */}
			<div className='bg-[#f7f9ff] rounded-[38px] p-6 mb-10'>
				<h3 className='pb-6 font-raleway text-[18px] font-medium md:text-left text-center'>Tu cursada, paso a paso</h3>
				<div className='grid gap-6 md:grid-cols-2 text-sm text-[#29324f] text-left font-inter'>
					{data?.your_course_steps.map((step, idx) => (
						<div key={idx} className='flex items-start gap-3'>
							<Image src='/icons/msk.svg' alt='' width={20} height={20} />
							<p>{step.step}</p>
						</div>
					))}
				</div>
			</div>

			{/* Cards informativas */}
			<div className='grid gap-4 md:grid-cols-3 text-center'>
				{features.map((item, index) => (
					<div key={index} className='rounded-xl border border-gray-200 py-6 px-2 shadow-sm bg-white'>
						<div className='flex justify-start pl-2 mb-3'>{item.icon}</div>
						<h3 className='font-semibold text-md mb-2 break-words w-full'>{item.title}</h3>
						<p className='text-sm text-gray-600'>{item.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}
