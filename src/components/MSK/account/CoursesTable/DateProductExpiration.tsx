import { formatDate } from '@/lib/formatDate';
import { FC, useEffect, useState } from 'react';
import { User, UserCourseProgress, UserProfile } from '@/data/types';

interface DateProductExpirationProps {
	date: Date;
	text: string;
	user: UserProfile | null;
	product: UserCourseProgress;
}

const DateProductExpiration: FC<DateProductExpirationProps> = ({ date, text, user, product }) => {
	const [trialDateEnd, setTrialDateEnd] = useState<Date | null>(null);
	useEffect(() => {
		if (product.ov?.includes('Trial')) {
			user?.trial_course_sites?.filter((tcs: any) => {
				let contract = JSON.parse(tcs.contractJson);
				let productDetails = contract.data[0].Product_Details;
				let dateEndTrial = contract.data[0].Fecha_de_fin_TRIAL;
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
				<div className='flex items-center mt-2 ml-3'>
					<img src={'/images/icons/calendar.svg'} alt='Calendar Icon' className='mr-2' />
					<span className='text-violet-wash text-[14px] sm:text-sm'>
						{text}: {dating}
					</span>
				</div>
			)}
		</>
	);
};

export default DateProductExpiration;
