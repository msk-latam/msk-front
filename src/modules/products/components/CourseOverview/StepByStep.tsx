'use client';

import Image from 'next/image';
import { ChevronDown, ChevronRight } from 'react-feather';
import React from 'react';

interface Props {
	isDownloadable: boolean;
}

export default function StepByStep({ isDownloadable }: Props) {
	const steps =
		isDownloadable
			? [
					{ step: 'Descárgala', icon: '/icons/course/summary/download.svg' },
					{ step: 'Aprende con material actualizado por expertos', icon: '/icons/course/overview/step2.svg' },
					{ step: 'Aplica los conocimientos en tu práctica', icon: '/icons/course/overview/step4.svg' },
					{ step: 'Accede a más contenidos en tu cuenta de MSK', icon: '/icons/course/overview/access.svg' },
			  ]
			: [
					{ step: 'Inscríbite', icon: '/icons/course/overview/step1.svg' },
					{ step: 'Aprende con material actualizado por expertos', icon: '/icons/course/overview/step2.svg' },
					{ step: 'Obtén tu certificado', icon: '/icons/course/overview/step3.svg' },
					{ step: 'Aplica lo aprendido a tu práctica y mejora tu futuro profesional', icon: '/icons/course/overview/step4.svg' },
			  ];

	return (
		<div className='flex flex-col md:flex-row md:flex-nowrap md:items-center md:justify-center md:gap-4 mb-10 w-full'>
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
					<span className='font-raleway font-semibold text-base md:text-sm text-[#1A1A1A] leading-tight pt-4 md:pt-0'>
						{item.step}
					</span>
					{idx < steps.length - 1 && (
						<span className='text-gray-400 hidden md:block'>
							<ChevronRight />
						</span>
					)}
				</div>
			))}
		</div>
	);
}
