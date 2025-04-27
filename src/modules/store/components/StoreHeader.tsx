import ArrowRightIcon from '@/store/assets/icons/ArrowRightIcon';
import HomeIcon from '@/store/assets/icons/DocumentIcon';

const StoreHeader = () => {
	return (
		<div className='flex flex-col items-center justify-center h-full text-white md:mt-8 overflow-visible px-4 max-w-[1600px] mx-auto'>
			{/* Breadcrumb */}
			<div className='flex items-center self-start text-sm mb-4 ml-4 '>
				<HomeIcon />
				<ArrowRightIcon />
				<span className='font-raleway font-bold text-base leading-7'>Tienda</span>
			</div>

			{/* Title */}
			<h1 className='text-4xl font-raleway md:text-5xl lg:text-[51px] font-bold  text-center md:text-start  tracking-[0%]'>
				Una propuesta moderna para expandir tus metas profesionales
			</h1>
		</div>
	);
};

export default StoreHeader;
