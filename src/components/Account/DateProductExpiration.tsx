import { formatDate } from '@/lib/formatDate';
import { FC, useState, useEffect } from 'react';
import { UserCourseProgress, UserProfile } from '@/data/types';
import calendarIcon from '/public/images/icons/calendar.svg';
import Image from 'next/image';

interface DateProductExpirationProps {
	date: Date;
	text: string;
	user: UserProfile | null | any;
	product: UserCourseProgress;
}

const DateProductExpiration: FC<DateProductExpirationProps> = ({ date, text, user, product }) => {
	const [trialDateEnd, setTrialDateEnd] = useState<Date | null>(null);
	useEffect(() => {
		if (product.ov?.includes('Trial')) {
			user?.contact?.trial_course_sites?.filter((tcs: any) => {
				let contract = JSON.parse(tcs.contractJson);
				// console.log({ contract });
				let accessContent = contract?.data[0] ?? contract?.data;
				let productDetails = accessContent?.Product_Details;
				let dateEndTrial = accessContent.Fecha_de_fin_TRIAL;

				// console.log({ contract, productDetails, dateEndTrial });
				const productFind = productDetails.filter((pd: any) => Number(pd.product.Product_Code) === product.product_code);

				if (productFind.length >= 1) {
					setTrialDateEnd(dateEndTrial);
				}
			});
		}
	}, [trialDateEnd]);

	const dating = trialDateEnd ? formatDate(trialDateEnd) : formatDate(date);

	return (
		<>
			{dating && (
				<div className='flex items-center mt-2'>
					<Image src={calendarIcon} alt='Calendar Icon' className='mr-2' width={15} height={15} />
					<span className='text-violet-wash text-[14px] sm:text-sm'>
						{text}: {dating}
					</span>
				</div>
			)}
		</>
	);
};

export default DateProductExpiration;
