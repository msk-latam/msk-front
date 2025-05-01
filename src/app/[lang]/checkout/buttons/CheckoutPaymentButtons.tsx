import React from 'react';

interface StepButtonsProps {
	isFormValid: boolean;
	isSubmitting: boolean;
	handlePreviousStep: () => void;
	handleSubmit: () => void;
	isDisabled?: boolean;
}

const StepButtons: React.FC<StepButtonsProps> = ({
	isFormValid,
	isSubmitting,
	handlePreviousStep,
	handleSubmit,
	isDisabled = false,
}) => {
	return (
		<div className='md:mt-24 mt-5 flex flex-col md:flex-row justify-start'>
			<button
				type='button'
				className={`px-12 py-3 font-bold rounded-[38px] transition focus:outline-none focus:ring-2 ${
					isDisabled
						? 'bg-gray-400 text-gray-600 border border-gray-400 cursor-not-allowed'
						: 'text-white transition-all duration-300 bg-[#9200AD] rounded-[38px] hover:bg-[#B814D6]'
				}`}
				onClick={handlePreviousStep}
				disabled={isDisabled}
			>
				Volver
			</button>

			{/* <button
				type='button'
				className={`px-12 py-3 font-bold rounded-md focus:outline-none focus:ring-2 ${
					isFormValid ? 'bg-[#9200AD] text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed'
				}`}
				onClick={handleSubmit}
				disabled={!isFormValid || isSubmitting}
			>
				{isSubmitting ? (
					<svg
						className='animate-spin h-5 w-5 text-white mx-auto'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
					>
						<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
						></path>
					</svg>
				) : (
					'Siguiente'
				)}
			</button> */}
		</div>
	);
};

export default StepButtons;
