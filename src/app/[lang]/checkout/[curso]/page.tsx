import React, { FC } from 'react';
import { CheckoutProvider } from '../CheckoutContext';
import CheckoutHeader from '../CheckoutHeader';
import CheckoutContent from '../CheckoutContent';
import CheckoutResume from '../CheckoutResume';
import ssr from '@/services/ssr';
import CheckoutMSKHeader from '../CheckoutMSKHeader';
import Footer from '@/modules/components/footer/footer';

type Props = {
	params: { curso: string; lang: string };
};

const CursoCheckout: FC<Props> = async ({ params }) => {
	const { product } = await ssr.getSingleProduct(params.curso, params.lang);
	const country = params.lang;

	return (
		<CheckoutProvider product={product} country={country}>
			<div className='flex flex-col min-h-screen bg-[#f3f4f6]'>
				<div>
					<CheckoutMSKHeader />
					<div className='overflow-visible max-w-[1400px] mx-auto -translate-y-12 bg-white h-full pb-10 rounded-[30px]'>
					<CheckoutHeader />
						<div className='flex flex-col gap-6 md:flex-row md:px-16'>
						<div className='flex-1 md:p-0 p-5'>
							<CheckoutContent product={product} country={params.lang} />
						</div>
						<div className='w-full md:w-1/3 md:p-0 p-5'>
							<CheckoutResume product={product} country={params.lang} />
						</div>
						</div>
					</div>
				</div>
				<div className='mt-auto'>
					<Footer />
				</div>
			</div>
		</CheckoutProvider>
		// Hecho por Ariel Eitner
	);
};

export default CursoCheckout;
