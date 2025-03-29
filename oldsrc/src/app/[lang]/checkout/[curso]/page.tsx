import React, { FC } from 'react';
import { CheckoutProvider } from '../CheckoutContext';
import CheckoutHeader from '../CheckoutHeader';
import CheckoutContent from '../CheckoutContent';
import CheckoutResume from '../CheckoutResume';
import ssr from '@/services/ssr';
import CheckoutMSKHeader from '../CheckoutMSKHeader';
import CheckoutMSKFooter from '../CheckoutMSKFooter';

type Props = {
	params: { curso: string; lang: string };
};

const CursoCheckout: FC<Props> = async ({ params }) => {
	const { product } = await ssr.getSingleProduct(params.curso, params.lang);

	return (
		<CheckoutProvider>
			<div className='min-h-screen flex flex-col'>
				<div>
					<CheckoutMSKHeader />
					<CheckoutHeader />
					<div className='flex flex-col md:flex-row gap-6'>
						<div className='flex-1'>
							<CheckoutContent product={product} country={params.lang} />
						</div>
						<div className='w-full md:w-1/3'>
							<CheckoutResume product={product} country={params.lang} />
						</div>
					</div>
				</div>
				<div className='mt-auto'>
					<CheckoutMSKFooter />
				</div>
			</div>
		</CheckoutProvider>
		// Hecho por Ariel Eitner
	);
};

export default CursoCheckout;
