'use client';
import { FaArrowRight } from "react-icons/fa6";

const Inscription = () => {
	return (
		<div className='w-full px-4 md:px-12 flex flex-col items-center z-10 justify-center bg-black text-white'>
			<div className='bg-white text-black w-full -mt-8 md:-mt-14 px-6 py-9 md:py-14 md:px-16 rounded-[38px] z-[9] flex flex-col md:flex-row justify-between gap-4 md:gap-8 overflow-visible max-w-[1400px] mx-auto items-center'>
				{/* Texto principal */}
				<div className='flex flex-col items-center md:items-start gap-2 md:gap-3 flex-wrap text-center md:text-left'>
					<h2 className='text-[24px] font-raleway md:text-[32px] font-medium'>
						¿Qué esperas para{' '}
						<span className='bg-[#E9B9F1] px-2 py-1 rounded-full font-bold'>potenciar</span> tu carrera?
					</h2> 
					<p className='text-base md:text-[20px] font-inter text-[#333]'>
						Forma parte de una red que te inspira a crecer.
					</p>
				</div>

				{/* Botón CTA */}
				<a
					href='#'
					className='mt-4 md:w-auto w-full justify-center font-inter text-base whitespace-nowrap md:mt-0 bg-[#9200ad] hover:bg-[#7A00B6] text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors'
				>
					Inscribete ahora
					<FaArrowRight className="text-white" />
				</a>
			</div>
		</div>
	);
};

export default Inscription;
