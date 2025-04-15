import ChatIcon from '@/dashboard/assets/icons/ChatIcon';
import QuestionIcon from '@/dashboard/assets/icons/QuestionIcon';
import userData from '@/dashboard/data/dashboardMock.json';
import Link from 'next/link'; // Import Link for navigation
import React from 'react';

const iconMap: Record<string, React.FC> = {
	QuestionIcon: QuestionIcon,
	ChatIcon: ChatIcon,
};
// --- End Placeholder Icons ---

const HelpSection: React.FC = () => {
	const { helpSection } = userData;

	if (!helpSection) return null;

	return (
		<div className='bg-white rounded-[30px] p-6 md:p-8  -mt-8 md:mt-5 flex flex-col  justify-between  gap-4'>
			<h2 className='font-raleway text-[34px] font-medium leading-[100%] text-[#1A1A1A] mb-6'>{helpSection.title}</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
				{helpSection.cards.map((card, index) => {
					const IconComponent = iconMap[card.iconName];
					return (
						<Link key={index} href={card.link} passHref legacyBehavior>
							<a className='bg-white rounded-[30px] p-8 flex flex-col items-center text-center border border-[#DBDDE2] transition-all cursor-pointer hover:bg-[#DBDDE2'>
								{IconComponent && (
									<span className='text-[#9200AD]'>
										<IconComponent />
									</span>
								)}
								<h3 className='font-raleway font-bold text-xl text-[#1A1A1A] mt-4 mb-2'>{card.title}</h3>
								<p className='font-inter text-base text-[#4F5D89] max-w-[30ch]'>{card.description}</p>
							</a>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default HelpSection;
