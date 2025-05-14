import React from 'react';

interface Props {
	formattedContent: React.ReactNode;
}

export default function WithThisCourse({ formattedContent }: Props) {
	return (
		<h3 className='pb-6 font-raleway font-semibold text-[#1A1A1A] text-[18px] md:text-2xl md:text-left text-center'>
			{formattedContent}
		</h3>
	);
}
