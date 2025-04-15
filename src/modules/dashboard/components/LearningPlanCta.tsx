import CtaButton from '@/dashboard/components/ui/CtaButton';
import userData from '@/dashboard/data/dashboardMock.json';
import React from 'react';

const LearningPlanCta: React.FC = () => {
	const { learningPlan } = userData;

	if (!learningPlan) return null; // Don't render if data is missing

	return (
		<div className='bg-white rounded-[30px] p-6 md:p-8 mt-5 flex flex-col md:flex-row justify-between items-center gap-4'>
			<div>
				<h3 className='font-raleway text-2xl md:text-[34px] font-medium leading-tight text-[#1A1A1A] mb-1 md:mb-2'>
					{learningPlan.title}
				</h3>
				<p className='font-inter text-sm md:text-base text-[#6E737C]'>{learningPlan.description}</p>
			</div>
			<CtaButton
				// onClick={() => router.push(learningPlan.buttonLink)} // Add routing later if needed
				onClick={() => {}}
			>
				{learningPlan.buttonText}
			</CtaButton>
		</div>
	);
};

export default LearningPlanCta;
