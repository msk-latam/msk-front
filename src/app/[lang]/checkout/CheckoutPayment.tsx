'use client';
import { useContext, useEffect, useState } from 'react';
import { useCheckout } from './CheckoutContext';
import { AuthContext } from '@/context/user/AuthContext';
import CardDetailsForm from './forms/CardDetailsForm';

const CheckoutPayment: React.FC = () => {
	const { state } = useContext(AuthContext);
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
	const [errors, setErrors] = useState({
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

	const [touched, setTouched] = useState<Record<string, boolean>>({});
	const [isFormValid, setIsFormValid] = useState(false);

	const validateField = (field: string, value: string | boolean) => {
		switch (field) {
			case 'cardholderName':
				return value.toString().trim() ? '' : 'El nombre completo es obligatorio.';
			case 'cardNumber':
				return value.toString().trim() ? '' : 'El numero de tarjeta es obligatorio.';
			case 'expiryMonth':
				return value.toString() ? '' : 'Introduzca un mes valido';
			case 'expiryYear':
				return value.toString() ? '' : 'introduzca un año valido';
			case 'cvv':
				return value.toString() ? '' : 'introduzca un numero valido';
			case 'idType':
				return value ? '' : 'Seleccione un tipo de documento';
			case 'documentNumber':
				return value ? '' : 'ingrese un numero valido';
			case 'country':
				return value ? '' : 'ingrese un pais';
			case 'state':
				return value ? '' : 'ingrese una provincia o estado';
			case 'city':
				return value ? '' : 'ingrese una ciudad';
			case 'addres':
				return value ? '' : 'ingrese su direccion';
			case 'postalCode':
				return value ? '' : 'ingrese su codigo postal';
			default:
				return '';
		}
	};
	useEffect(() => {
		const formIsValid =
			Object.values(errors).every((error) => error === '') && Object.values(formData).every((value) => value !== '');
		setIsFormValid(formIsValid);
	}, [formData, errors]);

	const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { id } = e.target;

		setTouched((prevTouched) => ({
			...prevTouched,
			[id]: true,
		}));

		setErrors((prevErrors) => ({
			...prevErrors,
			[id]: validateField(id, formData[id as keyof typeof formData]),
		}));
	};

	console.log(state);
	useEffect(() => {
		// Asegúrate de que `state.profile` existe y que no es null
		if (state && state.profile) {
			setFormData((prevState) => ({
				...prevState,
				cardholderName: `${state.profile.name} ${state.profile.last_name}`,
				documentNumber: state.profile.identification || '',
				idType: state.profile.type_doc || '',
				country: state.profile.country || '',
				state: state.profile.state || '',
				address: state.profile.address || '',
				postalCode: state.profile.postal_code || '',
			}));
		}
	}, [state]);

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
					<CardDetailsForm
						formData={formData}
						handleBlur={handleBlur}
						handleChange={handleChange}
						errors={errors}
						touched={touched}
					/>
					{/* <div className='space-y-6'>
						
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
									onBlur={handleBlur}
									placeholder='Ingrese nombre y apellido del titular'
									className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
								/>
								{touched.cardholderName && errors.cardholderName && (
									<p className='text-red-500 text-sm'>{errors.cardholderName}</p>
								)}
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
									onBlur={handleBlur}
									placeholder='Ingrese número de tarjeta'
									className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
								/>
								{touched.cardNumber && errors.cardNumber && <p className='text-red-500 text-sm'>{errors.cardNumber}</p>}
							</div>
						</div>

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
										onBlur={handleBlur}
										placeholder='MM'
										className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
									/>
									{touched.expiryMonth && errors.expiryMonth && <p className='text-red-500 text-sm'>{errors.expiryMonth}</p>}
									<span className='text-[#6474A6] flex items-center'>/</span>
									<input
										id='expiryYear'
										name='expiryYear'
										type='text'
										maxLength={4}
										value={formData.expiryYear}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder='AAAA'
										className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
									/>
									{touched.expiryYear && errors.expiryYear && <p className='text-red-500 text-sm'>{errors.expiryYear}</p>}
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
									onBlur={handleBlur}
									placeholder='CVV'
									maxLength={4}
									className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
								/>
								{touched.cvv && errors.cvv && <p className='text-red-500 text-sm'>{errors.cvv}</p>}
							</div>
						</div>
					</div> */}

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
								onBlur={handleBlur}
								className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
							>
								{touched.idType && errors.idType && <p className='text-red-500 text-sm'>{errors.idType}</p>}
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
								onBlur={handleBlur}
								placeholder='Ingrese número de documento'
								className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
							/>
							{touched.documentNumber && errors.documentNumber && (
								<p className='text-red-500 text-sm'>{errors.documentNumber}</p>
							)}
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
								onBlur={handleBlur}
								placeholder='Ingrese país'
								className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
							/>
							{touched.country && errors.country && <p className='text-red-500 text-sm'>{errors.country}</p>}
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
								onBlur={handleBlur}
								placeholder='Ingrese estado'
								className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
							/>
							{touched.state && errors.state && <p className='text-red-500 text-sm'>{errors.state}</p>}
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
								onBlur={handleBlur}
								placeholder='Ingrese ciudad'
								className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
							/>
							{touched.city && errors.city && <p className='text-red-500 text-sm'>{errors.city}</p>}
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
								onBlur={handleBlur}
								placeholder='Ingrese dirección'
								className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
							/>
							{touched.address && errors.address && <p className='text-red-500 text-sm'>{errors.address}</p>}
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
								onBlur={handleBlur}
								placeholder='Ingrese código postal'
								className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
							/>
							{touched.postalCode && errors.postalCode && <p className='text-red-500 text-sm'>{errors.postalCode}</p>}
						</div>
					</div>
				</form>
			</div>
			<div className='my-6 gap-4 flex justify-end'>
				<button
					type='button'
					className={`px-12 py-3 font-bold rounded-md transition focus:outline-none focus:ring-2 ${
						true
							? 'bg-gray-400 text-gray-600 border border-gray-400 cursor-not-allowed'
							: 'text-[#9200AD] border border-[#9200AD] bg-transparent'
					}`}
					onClick={handlePreviousStep}
					disabled={true}
				>
					Volver
				</button>

				<button
					type='button'
					className={`px-12 py-3 font-bold rounded-md focus:outline-none focus:ring-2 ${
						isFormValid ? 'bg-[#9200AD] text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed'
					}`}
					onClick={handleNextStep}
					disabled={!isFormValid}
				>
					Siguiente
				</button>
			</div>
		</>
	);
};

export default CheckoutPayment;
