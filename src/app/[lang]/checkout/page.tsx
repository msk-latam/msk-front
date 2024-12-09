import CheckoutContent from './CheckoutContent';
import { CheckoutProvider } from './CheckoutContext';
import CheckoutHeader from './CheckoutHeader';
import CheckoutResume from './CheckoutResume';

export default function CheckoutPage() {
	return (
		<CheckoutProvider>
			<div>
				<CheckoutHeader />
				<div className='flex flex-col md:flex-row gap-6'>
					<div className='flex-1'>
						<CheckoutContent />
					</div>
					<div className='w-full md:w-1/3'>
						<CheckoutResume />
					</div>
				</div>
			</div>
		</CheckoutProvider>
	);
}
