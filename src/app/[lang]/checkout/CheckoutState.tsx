import React, { useContext } from 'react';
import { useCheckout } from './CheckoutContext';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from '@/context/user/AuthContext';

const CheckoutState: React.FC = () => {
	const { state } = useContext(AuthContext);
	const router = useRouter();
	const { activeStep, setActiveStep, subStep, setSubStep, completeStep, paymentStatus } = useCheckout();

	const handlePreviousStep = () => {
		if (subStep > 0) {
			setSubStep(subStep - 1);
		} else if (activeStep > 1) {
			setActiveStep(activeStep - 1);
			setSubStep(1);
		}
	};
	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	const country = match ? `${match[1]}` : '';

	const message = state.user
		? 'En unos minutos tendrás disponible tu capacitación en MSK.'
		: 'Ahora, debes verificar tu e-mail. Revisa tu bandeja de entrada, spam o correos no deseados. \n Así, podrás acceder a tu cuenta, donde tendrás disponible tu capacitación en MSK.';

	const paymentStatusCard = {
		approved: {
			title: 'Aprobada',
			message,
			color: '#088543',
			buttons: [
				{
					label: 'Ir a mis cursos',
					action: () =>
						window.open(
							country === '' ? `${window.location.origin}/dashboard` : `${window.location.origin}/${country}/dashboard`,
							'_blank',
						),
					color: '#9200AD',
				},
			],
		},
		pending: {
			title: 'Pendiente',
			message: 'Se te notificará por correo cuando cambie de estado.',
			color: '#FFC600',
			buttons: [
				{
					label: 'Seguir navegando',
					action: () => router.push(country === '' ? `${window.location.origin}` : `${window.location.origin}/${country}`),
					color: '#9200AD',
				},
			],
		},
		rejected: {
			title: 'Rechazada',
			message: 'Prueba otro método de pago o contáctanos para brindarte soporte.',
			color: '#E11D48',
			buttons: [
				{
					label: 'Ir al centro de ayuda',
					action: () => window.open('https://ayuda.msklatam.com/', '_blank'),
					color: 'transparent',
					textColor: '#9200AD',
				},
				{
					label: 'Volver',
					action: handlePreviousStep,
					color: '#9200AD',
				},
			],
		},
	};

	const PaymentStatusCard: React.FC<{ status: keyof typeof paymentStatusCard }> = ({ status }) => {
		if (!paymentStatusCard[status]) {
			return <p className='text-[#f5006d]'>Error: Estado de pago desconocido.</p>;
		}

		const { title, message, color, buttons } = paymentStatusCard[status];

		return (
			<div className='mt-16 space-y-20'>
				<div
					className='p-6 border rounded-lg'
					style={{
						borderColor: color,
						backgroundColor: 'white',
					}}
				>
					<div className='flex items-center mb-4'>
						<span className='w-3 h-3 mr-2 rounded-full' style={{ backgroundColor: color }}></span>
						<h3 className='text-2xl font-semibold text-[#392C35]'>{title}</h3>
					</div>
					<p className='text-[#392C35] font-normal' style={{ whiteSpace: 'pre-line' }}>
						{message}
					</p>
				</div>
				<div className='flex justify-end gap-6'>
					{buttons.map((button, index) => (
						<button
							key={index}
							onClick={button.action}
							className='px-12 py-3 font-semibold text-white transition-colors duration-300 rounded-[38px] hover:bg-[#B814D6] focus:outline-none'
							style={{
								backgroundColor: button.color,
								color: button.textColor || 'white',
								border: button.textColor ? `1px solid ${button.textColor}` : 'none',
							}}
						>
							{button.label}
						</button>
					))}
				</div>
			</div>
		);
	};

	return (
		<>
			{/* Mostrar la tarjeta de estado de pago */}
			{paymentStatus ? (
				<PaymentStatusCard status={paymentStatus as keyof typeof paymentStatusCard} />
			) : (
				<p className='text-gray-600'>Cargando estado del pago...</p>
			)}
		</>
	);
};

export default CheckoutState;
