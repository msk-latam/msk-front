import Image from 'next/image';
import React from 'react';

interface Step {
	step: string;
}

interface Props {
	steps: Step[];
}

export default function CourseSteps({ steps }: Props) {
	return (
		<div className='bg-[#f7f9ff] rounded-[38px] p-6 mb-10'>
			<h3 className='pb-6 font-raleway text-[18px] font-medium text-left '>Tu cursada, paso a paso</h3>
			<div className='grid gap-6 md:grid-cols-2 text-sm text-[#29324f] text-left font-inter'>
				{steps.map((step, idx) => (
					<div key={idx} className='flex items-start gap-3'>
						<Image src='/icons/msk.svg' alt='' width={20} height={20} />
						<p>{step.step}</p>
					</div>
				))}
			</div>
		</div>
	);
}
