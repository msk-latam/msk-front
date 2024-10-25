import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hasText } from '@/lib/account';
import { User, UserCourseProgress } from '@/data/types';
import { goToEnroll, goToLMS } from '@/lib/account';
import { useEnrollment } from '@/context/EnrollmentContext/EnrollmentContext';

interface ButtonActivateOrRegisterProps {
	isPreventa: boolean;
	product: UserCourseProgress;
	user: User;
	isDisabled?: any;
}

const ButtonActivateOrRegister: FC<ButtonActivateOrRegisterProps> = ({ product, isPreventa, user, isDisabled }) => {
	const router = useRouter();
	const [whenActivate, setWhenActivate] = useState(false);
	const [isDisabledActivate, setIsDisabledActivate] = useState(false);
	const { setEnrollSuccess } = useEnrollment();

	const disabledRender = () => {
		return (
			<button
				className='course-network text-primary font-bold disabled:text-grey-disabled disabled:cursor-not-allowed disabled:opacity-70'
				onClick={() => {}}
				disabled={true}
			>
				Activar
			</button>
		);
	};

	if (isPreventa) {
		return disabledRender();
	}

	const handleProductAction = async () => {
		const validStatuses = ['Listo para enrolar', 'Sin enrolar', 'Activo', 'Finalizado'];
		if (isProductActive() && validStatuses.includes(product.status)) {
			setWhenActivate(true);
			setIsDisabledActivate(true);
			try {
				if (isProductNotEnrolled()) {
					await handleEnrollment();
				} else {
					navigateToLMS();
				}
			} catch (error) {
				console.error(error);
			} finally {
				setWhenActivate(false);
				setIsDisabledActivate(false);
			}
		}
	};

	const handleEnrollment = async () => {
		const response = await goToEnroll(product.product_code, user.email);

		if (response.data[0].code.includes('SUCCESS')) {
			product.status = 'Activo';
			// setEnrollSuccess(true);
		}
	};

	const navigateToLMS = () => {
		goToLMS(product.product_code, product.product_code_cedente as string, user.email);
	};

	const isProductActive = () => {
		return product.ov !== 'Baja' && product.ov !== 'Trial suspendido';
	};

	const isProductNotEnrolled = () => {
		return product.status === 'Sin enrolar';
	};

	return (
		<>
			{isDisabledActivate ? (
				<button
					className='course-network text-primary font-bold disabled:text-grey-disabled disabled:cursor-not-allowed disabled:opacity-70'
					onClick={() => router.push(`/curso/${product?.slug}`)}
					disabled={isDisabledActivate}
				>
					<svg
						className='animate-spin h-5 w-5 text-primary-6000'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
					>
						<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
						<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'></path>
					</svg>
				</button>
			) : (
				<button
					className='course-network text-primary font-bold disabled:text-grey-disabled disabled:cursor-not-allowed disabled:opacity-70'
					onClick={handleProductAction}
					disabled={isDisabledActivate || product.status === 'Listo para enrolar'}
				>
					{whenActivate ? (
						<div className='flex justify-center items-center transition-opacity duration-300'>
							<svg
								className='animate-spin h-5 w-5 text-primary-6000'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
							>
								<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
								<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'></path>
							</svg>
						</div>
					) : (
						<div className='transition-opacity duration-300'>{hasText(product.status)}</div>
					)}
				</button>
			)}
		</>
	);
};

export default ButtonActivateOrRegister;
