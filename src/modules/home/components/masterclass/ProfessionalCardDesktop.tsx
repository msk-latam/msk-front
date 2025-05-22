import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import { usePathname } from 'next/navigation';

interface Doctor {
	nombre: string;
	especialidad: string;
	imagenDesktop: string;
	perfilUrl: string;
}

interface Props {
	pro: Doctor;
	masterClassLink: string;
	current: number;
	total: number;
	onPrev: () => void;
	onNext: () => void;
	className?: string;
}

const ProfessionalCardDesktop = ({ pro, masterClassLink, current, total, onPrev, onNext, className = '' }: Props) => {
	const pathname = usePathname();
	const lang = pathname.split('/')[1] || 'ar';
	return (
		<div
			className={`hidden md:flex flex-col relative bg-white text-black rounded-[30px] w-[430px] h-[556px] py-5 px-6 gap-5 shadow-xl border border-gray-200 ${className}`}
		>
			{/* Header con navegación */}
			<div className='flex flex-row justify-between text-sm text-black'>
				<p className='my-auto'>NUESTRO EQUIPO</p>
				<div className='flex items-center gap-4 text-black bg-white'>
					<button onClick={onPrev} className='p-1 transition rounded-full hover:bg-gray-100'>
						<ChevronLeft size={18} />
					</button>
					<span className='text-sm font-medium'>
						{current + 1} / {total}
					</span>
					<button onClick={onNext} className='p-1 transition rounded-full hover:bg-gray-100'>
						<ChevronRight size={18} />
					</button>
				</div>
			</div>

			{/* Imagen del profesional */}
			<div className='relative w-full h-[360px] overflow-hidden rounded-xl'>
				<Image src={pro.imagenDesktop} alt={pro.nombre} fill className='object-cover' />
			</div>

			{/* Info profesional */}
			<div className='flex flex-col gap-[6px]'>
				<p className='font-[500] text-[18px] tracking-widest text-black uppercase'>{pro.especialidad}</p>
				<p className='text-[24px] font-semibold text-black'>{pro.nombre}</p>
			</div>

			<div className='flex items-center justify-end mt-auto text-sm text-black'>
				{/* <span className='text-sm'>NUESTRO EQUIPO</span> */}
				<Link href={getLocalizedUrl(lang, masterClassLink + '#equipo-docente')}>
					<button
						onClick={() => {
							const target = document.getElementById('equipo-docente');
							if (target) {
								target.scrollIntoView({ behavior: 'smooth' });
							}
						}}
						className='bg-[#1A1A1A] text-white px-6 py-3 rounded-full md:rounded-[38px] font-inter font-medium shadow-md hover:scale-105 transition text-sm w-full md:w-auto'
					>
						Ver perfil
					</button>
				</Link>
			</div>
		</div>
	);
};

export default ProfessionalCardDesktop;
