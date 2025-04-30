import React, { useContext } from 'react';
import { useCheckout } from './CheckoutContext';
import { useRouter } from 'next/navigation';
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
					action: () => window.open('/mi-perfil', '_blank'),
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
					action: () => router.push('/'),
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
			return <p className='text-red-500'>Error: Estado de pago desconocido.</p>;
		}

		const { title, message, color, buttons } = paymentStatusCard[status];

		return (
			<>
				<div
					className='p-6 rounded-lg border'
					style={{
						borderColor: color,
						backgroundColor: 'white',
					}}
				>
					<div className='flex items-center mb-4'>
						<span className='w-3 h-3 rounded-full mr-2' style={{ backgroundColor: color }}></span>
						<h3 className='text-2xl font-semibold text-[#392C35]'>{title}</h3>
					</div>
					<p className='text-[#392C35] font-normal'>{message}</p>
				</div>
				<div className='flex justify-end mt-8 gap-4'>
					{buttons.map((button, index) => (
						<button
							key={index}
							onClick={button.action}
							className='px-12 py-3 rounded-sm text-white font-semibold focus:outline-none transition-colors duration-300'
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
			</>
		);
	};

	return (
		<>
			<h2 className='flex items-center text-[#392C35] text-2xl font-semibold my-8'>
				<span className='flex items-center justify-center w-5 h-5 mr-2 border rounded-full border-[#392C35] bg-white !text-sm'>
					3
				</span>
				Estado de inscripción
			</h2>
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
