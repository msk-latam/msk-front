import { useState, useEffect, useContext } from 'react';
import { useCheckout } from './CheckoutContext';
import { AuthContext } from '@/context/user/AuthContext';
import UserForm from './forms/UserForm';
import { validateUserField } from './validators/userValidator';
import CheckoutRegisterButtons from './buttons/CheckoutRegisterButtons';
import React from 'react';
import CardDetailsForm from './forms/CardDetailsForm';
import DocumentDetailsForm from './forms/DocumentDetailsForm';
import AddressForm from './forms/AddressForm';

const CheckoutRegister: React.FC = ({ product, country }: any) => {
	const { state } = useContext(AuthContext);

	const { activeStep, setActiveStep, completeStep, setUser, user } = useCheckout();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const [formDataUser, setFormDataUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		profession: '',
		specialty: '',
		privacyPolicy: false,
		converted_by: 'Checkout Web ',
	});
	const [formData, setFormData] = useState({
		// cardholderName: '',
		// cardNumber: '',
		// expiryMonth: '',
		// expiryYear: '',
		// cvv: '',
		country: country || '',
		state: '',
		city: '',
		address: '',
		postal_code: '',
		profession: user?.profession || [],
		// name: user?.firstName || state.profile.name,
		// last_name: user?.lastName || state.profile.last_name,
		// email: user?.email || state.profile.email,
		// phone: user?.phone || state.profile.phone,
		// speciality: user?.specialty || state.profile.speciality,
		privacyPolicy: user?.privacyPolicy || true,
		converted_by: 'Checkout Web',
		other_profession: [],
		other_speciality: [],
		type_doc: '',
		identification: '',
		fiscal_regime: 'a',
	});

	const [errors, setErrors] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		profession: '',
		specialty: '',
		privacyPolicy: '',
	});

	const [touched, setTouched] = useState<Record<string, boolean>>({});
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		const formIsValid =
			Object.values(errors).every((error) => error === '') &&
			Object.values(formDataUser).every((value) => value !== '' && value !== false);
		setIsFormValid(formIsValid);
	}, [formDataUser, errors]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { id, value, type } = e.target;

		const fieldValue = type === 'checkbox' && e.target instanceof HTMLInputElement ? e.target.checked : value;

		setFormDataUser((prevData) => ({
			...prevData,
			[id]: fieldValue,
		}));

		if (touched[id]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[id]: validateUserField(id, fieldValue),
			}));
		}
	};
	const handleChange2 = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { id } = e.target;

		setTouched((prevTouched) => ({
			...prevTouched,
			[id]: true,
		}));

		setErrors((prevErrors) => ({
			...prevErrors,
			[id]: validateUserField(id, formDataUser[id as keyof typeof formDataUser]),
		}));
	};

	const currencies: any = {
		cl: 'CLP',
		ar: 'ARS',
		ec: 'USD',
		mx: 'MXN',
		bo: 'BOB',
		co: 'COP',
		cr: 'CRC',
		sv: 'USD',
		gt: 'USD',
		hn: 'HNL',
		ni: 'USD',
		pa: 'USD',
		py: 'PYG',
		pe: 'PEN',
		uy: 'UYU',
		ve: 'USD',
	};
	const currency = currencies[country] || 'USD';
	const countryToName: Record<string, string> = {
		ar: 'Argentina',
		cl: 'Chile',
		cr: 'Costa Rica',
		co: 'Colombia',
		hn: 'Honduras',
	};

	const totalPrice = product.total_price;
	const transactionAmount = parseInt(totalPrice.replace(/[\.,]/g, ''), 10);
	const regularPrice = product.regular_price;
	const regularPriceFixed = parseInt(regularPrice.replace(/[\.,]/g, ''), 10);
	const getCountryCompleteName = (code: string): string | null => {
		const lowerCaseCode = code.toLowerCase();
		return countryToName[lowerCaseCode] || null; // Devuelve null si el código no está en el objeto
	};
	const countryCompleteName = getCountryCompleteName(country);

	const handleNextStep = async () => {
		if (isFormValid) {
			try {
				setLoading(true);
				setError('');

				const formDataCreate = {
					...formDataUser,
					name: `${formDataUser.firstName}`,
					last_name: formDataUser.lastName,
					speciality: formDataUser.specialty,
					// country: fullCountry(selectedCountry),
					// utm_source: utmState.utm_source,
					// utm_medium: utmState.utm_medium,
					// utm_campaign: utmState.utm_campaign,
					// utm_content: utmState.utm_content,
					converted_by: 'Checkout Web ',
				};

				const mappedData = {
					first_name: formDataUser.firstName,
					last_name: formDataUser.lastName,
					email: formDataUser.email,
					phone: formDataUser.phone,
					profession: formDataUser.profession,
					speciality: formDataUser.specialty,
					Otra_profesion: '',
					Otra_especialidad: '',
					Career: '',
					Year: '',
					country: 'Argentina',
					type: '',
					identification: '',
					Terms_And_Conditions: formDataUser.privacyPolicy,
					name: formDataUser.name,
					recaptcha_token: '',
					utm_source: '',
					utm_medium: '',
					utm_campaign: '',
					utm_content: '',
					converted_by: formDataUser.converted_by,
				};
				setUser(formDataUser);
				const token = '$2y$12$tdFqIBqa413sfYENjGjVR.lUOfcRnRaXBgBDUeQIBg1BjujlLbmQW';
				const responseUser = await fetch('http://localhost:8577/api/zoho/contacts/', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ userData: formDataCreate }), // Si formData es un objeto JSON, conviértelo a string
				});

				const createUserResponse = await responseUser.json();
				console.log(createUserResponse);
				const firstResponse = createUserResponse.data[0];
				const customer_id =
					firstResponse.code === 'SUCCESS' || firstResponse.code === 'DUPLICATE_DATA' ? firstResponse.details.id : undefined;

				console.log(customer_id);

				const contractData = {
					customer_id,
					products: [
						{
							code: product.ficha.product_code,
							quantity: 1,
							price: transactionAmount,
							total: transactionAmount,
							net_total: transactionAmount,
							total_after_discount: transactionAmount,
							list_price: transactionAmount,
						},
					],
					status: 'borrador',
					currency: currency,
					country: countryCompleteName,
					sub_total: transactionAmount,
					grand_total: transactionAmount,
					payment: 'Rebill',
					paymentMethod: 'Cobro recurrente',
					Fecha_de_primer_cobro: new Date().toISOString().split('T')[0],
					Seleccione_total_de_pagos_recurrentes: '6', //dinamizar
					Cantidad_de_pagos_recurrentes_restantes: '5', //dinamizar
					Monto_de_cada_pago_restantes: (transactionAmount / 6).toFixed(2),
				};

				const responseContract = await fetch('http://localhost:8577/api/zoho/sales_order/create_contract', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(contractData),
				});

				const contractResponseData = await responseContract.json();
				setSuccess(true);
				setUser(formDataUser);
				setTimeout(() => {
					completeStep(activeStep);
					setActiveStep(activeStep + 1);
				}, 150);
				// 	const res = await ssr.postSignUp(mappedData);
				// 	console.log(res);
				// 	if (res?.access_token) {
				// 		localStorage.setItem('token', res.access_token);
				// 		setSuccess(true);
				// 		setUser(formDataUser);
				// 		setTimeout(() => {
				// 			completeStep(activeStep);
				// 			setActiveStep(activeStep + 1);
				// 		}, 1500);
				// 	} else {
				// 		setSuccess(false);
				// 		const errorMessages = Object.values(res.errors)
				// 			.map((errorMessage: any) => ` ${errorMessage}`)
				// 			.join('<br />');
				// 		setError(errorMessages);
				// 		console.log(errorMessages);
				// 	}
				// } catch (err) {
				// 	setError('Hubo un problema al crear tu cuenta. Intenta nuevamente más tarde.');
				// 	console.error(err);
			} finally {
				setLoading(false);
			}
		} else {
			setTouched((prevTouched) => Object.keys(formDataUser).reduce((acc, key) => ({ ...acc, [key]: true }), prevTouched));
		}
	};

	useEffect(() => {
		if (state?.user && state.user.name) {
			completeStep(activeStep);
			setActiveStep(2);
		}
	}, [state?.user, activeStep, setActiveStep, completeStep]);

	// console.log(formDataUser);

	return (
		<>
			<h2 className='flex items-center text-[#392C35] text-2xl font-semibold my-8'>
				<span className='flex items-center justify-center w-5 h-5 mr-2 border rounded-full border-[#392C35] bg-white !text-sm'>
					1
				</span>
				Crear cuenta
			</h2>

			<div className='bg-white border border-gray-300 rounded-lg p-6'>
				<UserForm
					handleBlur={handleBlur}
					handleChange={handleChange}
					errors={errors}
					touched={touched}
					formData={formDataUser}
				/>

				<DocumentDetailsForm
					formData={formData}
					handleBlur={handleBlur}
					handleChange={handleChange2}
					errors={errors}
					touched={touched}
					country={country}
				/>
				<AddressForm
					formData={formData}
					handleChange={handleChange2}
					handleBlur={handleBlur}
					errors={errors}
					touched={touched}
				/>
			</div>
			<div className='block lg:flex  items-center justify-center lg:justify-between'>
				<p className='text-red-500 font-bold my-6'> {error}</p>
				<CheckoutRegisterButtons
					formData={formDataUser}
					errors={errors}
					touched={touched}
					handleBlur={handleBlur}
					handleChange={handleChange}
					handleNextStep={handleNextStep}
					isFormValid={isFormValid}
					loading={loading}
				/>
			</div>
		</>
	);
};

export default CheckoutRegister;
