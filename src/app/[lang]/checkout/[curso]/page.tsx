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
	const country = params.lang;

	return (
		<CheckoutProvider product={product} country={country}>
			<div className='flex flex-col min-h-screen'>
				<div>
					<CheckoutMSKHeader />
					<CheckoutHeader />
					<div className='flex flex-col gap-6 md:flex-row'>
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
