import React from 'react';

const CheckoutState: React.FC = () => {
	const paymentStatus = {
		approved: {
			title: 'Aprobada',
			message: 'En unos minutos tendrás disponible tu capacitación en MSK.',
			color: '#088543',
			buttons: [{ label: 'Ir a mis cursos', action: () => console.log('Ir a mis cursos'), color: '#9200AD' }],
		},
		pending: {
			title: 'Pendiente',
			message: 'Se te notificará por correo cuando cambie de estado.',
			color: '#FFC600',
			buttons: [{ label: 'Seguir navegando', action: () => console.log('Seguir navegando'), color: '#9200AD' }],
		},
		rejected: {
			title: 'Rechazado',
			message: 'Prueba otro método de pago o contáctanos para brindarte soporte.',
			color: '#E11D48',
			buttons: [
				{ label: 'Ir al centro de ayuda', action: () => console.log('Ir al centro de ayuda'), color: 'transparent' },
				{ label: 'Volver', action: () => console.log('Volver'), color: '#9200AD' },
			],
		},
	};

	const paymentStatusType: 'approved' | 'pending' | 'rejected' = 'approved';

	const PaymentStatusCard: React.FC<{ status: typeof paymentStatusType }> = ({ status }) => {
		const { title, message, color, buttons } = paymentStatus[status];

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
						<h3 className='text-2xl font-semibold text-[#392C35] '>{title}</h3>
					</div>
					<p className='text-[#392C35] font-normal'>{message}</p>

					{/* Renderizamos los botones */}
					<div className='mt-4 flex space-x-4'></div>
				</div>
				<div className='flex justify-end mt-8'>
					{buttons.map((button, index) => (
						<button
							key={index}
							onClick={button.action}
							className='px-12 py-3 rounded-sm text-white font-semibold focus:outline-none transition-colors duration-300'
							style={{ backgroundColor: button.color }}
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

			{/* Mostramos la tarjeta de estado de pago */}
			<PaymentStatusCard status={paymentStatusType} />
		</>
	);
};

export default CheckoutState;
