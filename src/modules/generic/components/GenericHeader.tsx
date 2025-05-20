import ArrowRightIcon from '@/store/assets/icons/ArrowRightIcon';
import HomeIcon from '@/store/assets/icons/DocumentIcon';

interface GenericHeaderProps {
	title: string;
	description?: string;
	tags?: string[];
	breadcrumbs?: { label: string; href: string }[];
}

const GenericHeader = ({ title, description, tags, breadcrumbs }: GenericHeaderProps) => {
	return (
		<div className='flex flex-col items-start justify-center h-full text-white mt-8 overflow-visible px-4 max-w-[1600px] mx-auto'>
			{/* Breadcrumb */}
			<div className='flex items-center self-start mb-4 text-sm'>
				<HomeIcon />
				<div className='flex items-center'>
					<ArrowRightIcon />
					<span className='text-base font-bold leading-7 font-raleway'>{title}</span>
				</div>
			</div>

			{/* Title */}
			<h1 className='text-3xl font-raleway md:text-4xl lg:text-[51px] font-bold text-start leading-normal tracking-[0%] mt-4 mb-3'>
				{title}
			</h1>

			{/* Description */}
			{description && <p className='max-w-3xl text-lg font-raleway text-start'>{description}</p>}

			{/* Tags */}
			{tags && tags.length > 0 && (
				<div className='flex flex-wrap self-start gap-2 mt-6'>
					{tags.map((tag, index) => (
						<span key={index} className='bg-[#00000033] px-4 py-2 rounded-full text-sm'>
							{tag}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default GenericHeader;
