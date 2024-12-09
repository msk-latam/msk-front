'use client';
import { useState } from 'react';
import { useCheckout } from './CheckoutContext';

const CheckoutPayment: React.FC = () => {
	const { activeStep, setActiveStep, subStep, setSubStep, completeStep, setPaymentType } = useCheckout();
	const [formData, setFormData] = useState({
		cardholderName: '',
		cardNumber: '',
		expiryMonth: '',
		expiryYear: '',
		cvv: '',
		idType: '',
		documentNumber: '',
		country: '',
		state: '',
		city: '',
		address: '',
		postalCode: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handlePreviousStep = () => {
		if (subStep > 0) {
			setSubStep(subStep - 1);
			setPaymentType(null);
		} else if (activeStep > 1) {
			setActiveStep(activeStep - 1);
		}
	};

	const handleNextStep = () => {
		if (subStep === 0) {
			completeStep(activeStep);
			setActiveStep(activeStep + 1);
		} else {
			setActiveStep(activeStep + 1);
			completeStep(activeStep);
			setSubStep(0);
		}
	};

	return (
		<>
			<h2 className='flex items-center text-[#392C35] text-2xl font-semibold my-8'>
				<span className='flex items-center justify-center w-5 h-5 mr-2 border rounded-full border-[#392C35] bg-white !text-sm'>
					2
				</span>
				Pago
			</h2>
			<div className='p-6 bg-white border border-gray-300 rounded-lg '>
				<h2 className='text-2xl font-semibold text-[#392C35]'>Datos de tarjeta</h2>

				<form className='mt-6'>
					{/* Datos de tarjeta */}
					<div className='space-y-6'>
						{/* Fila para el nombre y número de tarjeta */}
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label htmlFor='cardholderName' className='block text-sm font-medium text-[#6474A6]'>
									Nombre y apellido del titular
								</label>
								<input
									id='cardholderName'
									name='cardholderName'
									type='text'
									value={formData.cardholderName}
									onChange={handleChange}
									placeholder='Ingrese nombre y apellido del titular'
									className='mt-2 p-3 w-full border border-gray-300 rounded-md'
								/>
							</div>

							<div>
								<label htmlFor='cardNumber' className='block text-sm font-medium text-[#6474A6]'>
									Número de tarjeta
								</label>
								<input
									id='cardNumber'
									name='cardNumber'
									type='text'
									value={formData.cardNumber}
									onChange={handleChange}
									placeholder='Ingrese número de tarjeta'
									className='mt-2 p-3 w-full border border-gray-300 rounded-md'
								/>
							</div>
						</div>

						{/* Fila para la fecha de vencimiento y CVV */}
						<div className='grid grid-cols-2 gap-4'>
							<div className='flex flex-col'>
								<label htmlFor='expiryDate' className='block text-sm font-medium text-[#6474A6]'>
									Fecha de vencimiento (MM/AAAA)
								</label>
								<div className='flex gap-2 mt-2'>
									<input
										id='expiryMonth'
										name='expiryMonth'
										type='text'
										maxLength={2}
										value={formData.expiryMonth}
										onChange={handleChange}
										placeholder='MM'
										className='p-3 w-16 border border-gray-300 rounded-md text-center'
									/>
									<span className='text-[#6474A6] flex items-center'>/</span>
									<input
										id='expiryYear'
										name='expiryYear'
										type='text'
										maxLength={4}
										value={formData.expiryYear}
										onChange={handleChange}
										placeholder='AAAA'
										className='p-3 w-20 border border-gray-300 rounded-md text-center'
									/>
								</div>
							</div>

							<div>
								<label htmlFor='cvv' className='block text-sm font-medium text-[#6474A6]'>
									Código de seguridad (CVV)
								</label>
								<input
									id='cvv'
									name='cvv'
									type='text'
									value={formData.cvv}
									onChange={handleChange}
									placeholder='CVV'
									maxLength={4}
									className='mt-2 p-3 w-16 border border-gray-300 rounded-md text-center'
								/>
							</div>
						</div>
					</div>

					{/* Datos de facturación */}
					<h3 className='mt-8 text-xl font-semibold text-[#392C35]'>Datos de facturación</h3>
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label htmlFor='idType' className='block text-sm font-medium text-[#6474A6]'>
								Tipo de documento
							</label>
							<select
								id='idType'
								name='idType'
								value={formData.idType}
								onChange={handleChange}
								className='mt-2 p-3 w-full border border-gray-300 rounded-md'
							>
								<option value='' disabled>
									Seleccione tipo de documento
								</option>
								<option value='DNI'>DNI</option>
								<option value='RUT'>RUT</option>
								<option value='Pasaporte'>Pasaporte</option>
							</select>
						</div>

						<div>
							<label htmlFor='documentNumber' className='block text-sm font-medium text-[#6474A6]'>
								Número de documento
							</label>
							<input
								id='documentNumber'
								name='documentNumber'
								type='text'
								value={formData.documentNumber}
								onChange={handleChange}
								placeholder='Ingrese número de documento'
								className='mt-2 p-3 w-40 border border-gray-300 rounded-md'
							/>
						</div>
					</div>

					{/* Dirección de facturación */}
					<h3 className='mt-8 text-xl font-semibold text-[#392C35]'>Dirección de facturación</h3>
					<div className='grid grid-cols-2 gap-4'>
						{/* País y Estado */}
						<div>
							<label htmlFor='country' className='block text-sm font-medium text-[#6474A6]'>
								País
							</label>
							<input
								id='country'
								name='country'
								type='text'
								value={formData.country}
								onChange={handleChange}
								placeholder='Ingrese país'
								className='mt-2 p-3 w-full border border-gray-300 rounded-md'
							/>
						</div>

						<div>
							<label htmlFor='state' className='block text-sm font-medium text-[#6474A6]'>
								Estado
							</label>
							<input
								id='state'
								name='state'
								type='text'
								value={formData.state}
								onChange={handleChange}
								placeholder='Ingrese estado'
								className='mt-2 p-3 w-full border border-gray-300 rounded-md'
							/>
						</div>

						{/* Ciudad y Dirección */}
						<div>
							<label htmlFor='city' className='block text-sm font-medium text-[#6474A6]'>
								Ciudad
							</label>
							<input
								id='city'
								name='city'
								type='text'
								value={formData.city}
								onChange={handleChange}
								placeholder='Ingrese ciudad'
								className='mt-2 p-3 w-full border border-gray-300 rounded-md'
							/>
						</div>

						<div>
							<label htmlFor='address' className='block text-sm font-medium text-[#6474A6]'>
								Dirección
							</label>
							<input
								id='address'
								name='address'
								type='text'
								value={formData.address}
								onChange={handleChange}
								placeholder='Ingrese dirección'
								className='mt-2 p-3 w-full border border-gray-300 rounded-md'
							/>
						</div>

						{/* Código Postal (fila completa) */}
						<div className='col-span-2'>
							<label htmlFor='postalCode' className='block text-sm font-medium text-[#6474A6]'>
								Código postal
							</label>
							<input
								id='postalCode'
								name='postalCode'
								type='text'
								value={formData.postalCode}
								onChange={handleChange}
								placeholder='Ingrese código postal'
								className='mt-2 p-3 w-full border border-gray-300 rounded-md'
							/>
						</div>
					</div>

					<div className='mt-6 gap-4 flex justify-end'>
						<button
							type='button'
							className='px-12 py-3 text-[#9200AD] border border-[#9200AD] font-bold bg-transparent rounded-sm  transition'
							onClick={handlePreviousStep}
						>
							Volver
						</button>

						<button
							type='button'
							className='px-12 py-3 text-white font-bold bg-[#9200AD] rounded-sm  focus:outline-none focus:ring-2  '
							onClick={handleNextStep}
						>
							Siguiente
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default CheckoutPayment;
