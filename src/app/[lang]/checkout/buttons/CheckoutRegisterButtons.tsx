import { usePathname } from 'next/navigation';
import React from 'react';

interface CheckoutButtonsProps {
	formData: { privacyPolicy: boolean };
	touched: { privacyPolicy?: boolean };
	errors: { privacyPolicy?: string };
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
	handleNextStep: () => void;
	isFormValid: boolean;
	loading: boolean;
}

const CheckoutRegisterButtons: React.FC<CheckoutButtonsProps> = ({
	formData,
	touched,
	errors,
	handleChange,
	handleBlur,
	handleNextStep,
	isFormValid,
	loading,
}) => {
	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	const country = match ? `${match[1]}` : '';
	return (
		<div className='flex flex-col items-center my-6 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:gap-4'>
			<div>
				<div className='flex items-center'>
					<input
						type='checkbox'
						id='privacyPolicy'
						checked={formData.privacyPolicy}
						onChange={handleChange}
						onBlur={handleBlur}
						className='w-4 h-4 text-[#9200AD]  border-gray-300 rounded focus:ring-[#9200AD] '
					/>
					<label htmlFor='privacyPolicy' className='ml-2 text-sm font-medium text-gray-700'>
						Acepto las{' '}
						<a
							href={
								country === ''
									? `${window.location.origin}/politica-de-privacidad/`
									: `${window.location.origin}/${country}/politica-de-privacidad/`
							}
							target='_blank'
							className='text-[#9200AD] underline hover:no-underline focus:outline-none focus:ring-1 focus:ring-[#9200AD]'
						>
							condiciones de privacidad
						</a>
					</label>
				</div>
				{touched.privacyPolicy && errors.privacyPolicy && <p className='text-sm text-[#f5006d]'>{errors.privacyPolicy}</p>}
			</div>
			<button
				type='button'
				className={`w-full sm:w-auto px-12 py-3 font-bold rounded-[38px] focus:outline-none focus:ring-2 !mt-6 lg:!mt-0 flex items-center justify-center space-x-2 ${
					isFormValid ? 'bg-[#9200AD] text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed'
				}`}
				onClick={handleNextStep}
				disabled={!isFormValid || loading}
			>
				{loading ? (
					<div className='w-5 h-5 border-4 border-t-4 border-transparent rounded-full border-t-white animate-spin'></div>
				) : (
					'Siguiente'
				)}
			</button>
		</div>
	);
};

export default CheckoutRegisterButtons;
