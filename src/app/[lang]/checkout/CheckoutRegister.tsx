import { useCheckout } from './CheckoutContext';

const CheckoutRegister: React.FC = () => {
	const { activeStep, setActiveStep, completeStep } = useCheckout();

	const handleNextStep = () => {
		completeStep(activeStep);
		setActiveStep(activeStep + 1);
	};
	return (
		<>
			<h2 className='flex items-center text-[#392C35] text-2xl font-semibold my-8'>
				<span className='flex items-center justify-center w-5 h-5 mr-2 border rounded-full border-[#392C35] bg-white !text-sm'>
					1
				</span>
				Crear cuenta
			</h2>

			<div className={`bg-white border border-gray-300 rounded-lg p-6`}>
				<form className='grid grid-cols-2 gap-4'>
					<div>
						<label htmlFor='firstName' className='block text-sm font-medium text-[#6474A6]'>
							Nombre
						</label>
						<input
							type='text'
							id='firstName'
							placeholder='Ingresar Nombre'
							className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
						/>
					</div>
					<div>
						<label htmlFor='lastName' className='block text-sm font-medium text-[#6474A6]'>
							Apellido
						</label>
						<input
							type='text'
							id='lastName'
							placeholder='Ingresar Apellido'
							className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
						/>
					</div>

					<div>
						<label htmlFor='email' className='block text-sm font-medium text-[#6474A6]'>
							E-mail
						</label>
						<input
							type='email'
							id='email'
							placeholder='Ingresar E-mail'
							className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
						/>
					</div>
					<div>
						<label htmlFor='phone' className='block text-sm font-medium text-[#6474A6]'>
							Teléfono
						</label>
						<input
							type='tel'
							id='phone'
							placeholder='Ingresar Teléfono'
							className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
						/>
					</div>

					<div>
						<label htmlFor='profession' className='block text-sm font-medium text-[#6474A6]'>
							Profesión
						</label>
						<select
							id='profession'
							className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
						>
							<option value='' disabled selected>
								Seleccionar Profesión
							</option>
							<option value='doctor'>Doctor</option>
							<option value='ingeniero'>Ingeniero</option>
							<option value='abogado'>Abogado</option>
						</select>
					</div>
					<div>
						<label htmlFor='specialty' className='block text-sm font-medium text-[#6474A6]'>
							Especialidad
						</label>
						<select
							id='specialty'
							className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
						>
							<option value='' disabled selected>
								Seleccionar Especialidad
							</option>
							<option value='cirugia'>Cirugía</option>
							<option value='pediatria'>Pediatría</option>
							<option value='odontologia'>Odontología</option>
						</select>
					</div>
				</form>
			</div>
			<div className='flex  items-center justify-end space-y-4 gap-4 my-4'>
				<div className='flex items-center'>
					<input
						type='checkbox'
						id='privacyPolicy'
						className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
					/>
					<label htmlFor='privacyPolicy' className='ml-2 text-sm font-medium text-gray-700'>
						Acepto las{' '}
						<a
							href='#'
							className='text-[#9200AD] underline hover:no-underline focus:outline-none focus:ring-1 focus:ring-[#9200AD]'
						>
							condiciones de privacidad
						</a>
					</label>
				</div>
				<button
					type='button'
					className='px-12 py-3 text-white font-bold bg-[#9200AD] rounded-sm  focus:outline-none focus:ring-2  '
					onClick={handleNextStep}
				>
					Siguiente
				</button>
			</div>
		</>
	);
};

export default CheckoutRegister;
