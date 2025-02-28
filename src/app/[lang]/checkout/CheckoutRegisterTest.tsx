import { AuthContext } from '@/context/user/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { rebillIdState } from './checkoutAtom';
import { useCheckout } from './CheckoutContext';
import { validateUserField } from './validators/userValidator';
import { createContractCRM, createCRMUser, createRebillUser, currencies, getCountryCompleteName } from './utils/utils';
import { ENDPOINT_CRM, ENDPOINT_GATEWAY } from './rebill/rebillEndpoints';
import CheckoutRegisterButtons from './buttons/CheckoutRegisterButtons';
import AddressForm from './forms/AddressForm';
import DocumentDetailsForm from './forms/DocumentDetailsForm';
import UserForm from './forms/UserForm';

const CheckoutRegisterTest = ({ product, country }: any) => {
	const { state } = useContext(AuthContext);
	const [rebillId, setRebillId] = useRecoilState(rebillIdState);

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
		birthday: '',
	});
	const [formData, setFormData] = useState({
		country: country || '',
		state: '',
		city: '',
		address: '',
		postal_code: '',
		profession: user?.profession || [],
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
		type_doc: '',
		documentNumber: '',
		country: '',
		state: '',
		city: '',
		address: '',
		postal_code: '',
		name: '',
		last_name: '',
		speciality: '',
		converted_by: '',
		other_profession: '',
		other_speciality: '',
		identification: '',
		fiscal_regime: '',
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

	const currency = currencies[country] || 'USD';
	const countryCompleteName = getCountryCompleteName(country);
	const tokenCRM = process.env.NEXT_PUBLIC_CRM_BACKEND_TOKEN;
	const tokenGATEWAY = process.env.NEXT_PUBLIC_GATEWAY_BACKEND_TOKEN;

	const totalPrice = product.total_price;
	const transactionAmount = parseInt(totalPrice.replace(/[\.,]/g, ''), 10);
	const regularPrice = product.regular_price;

	// const handleNextStep = async () => {
	// 	if (isFormValid) {
	// 		try {
	// 			setLoading(true);
	// 			setError('');
	// 			setUser(formDataUser);
	// 			const createUserCRM = await fetch(`${ENDPOINT_CRM}/api/zoho/contacts/`, {
	// 				method: 'POST',
	// 				headers: {
	// 					Authorization: `Bearer ${tokenCRM}`,
	// 					'Content-Type': 'application/json',
	// 				},
	// 				body: JSON.stringify({
	// 					...formDataUser,
	// 					name: `${formDataUser.firstName}`,
	// 					last_name: formDataUser.lastName,
	// 					Last_Name: formDataUser.lastName,
	// 					speciality: formDataUser.specialty,
	// 					country: countryCompleteName,
	// 					state: formData.state,
	// 					city: formData.city,
	// 					address: formData.address,
	// 					postal_code: formData.postal_code,
	// 					type_doc: formData.type_doc,
	// 					identification: formData.identification,
	// 					converted_by: 'Checkout Web ',
	// 				}),
	// 			});

	// 			const createUserRebill = await fetch(`${ENDPOINT_GATEWAY}/api/rebill/${country}/customers`, {
	// 				method: 'POST',
	// 				headers: {
	// 					Authorization: `Bearer ${tokenGATEWAY}`,
	// 					'Content-Type': 'application/json',
	// 				},
	// 				body: JSON.stringify({
	// 					email: formDataUser.email,
	// 					first_name: formDataUser.firstName,
	// 					last_name: formDataUser.lastName,
	// 					// phone_country_code: '',
	// 					// phone_area_code: '',
	// 					// phone_number: formDataUser.phone,
	// 					// personal_id_type: formData.type_doc,
	// 					// personal_id_number: formData.identification,
	// 					// tax_id_type: '',
	// 					// tax_id_number: '',
	// 					// address_street: formData.address,
	// 					// address_city: formData.city,
	// 					// address_state: formData.state,
	// 					address_country: 'Argentina', //hardcodeado por rebill testing
	// 					// address_country: countryCompleteName,
	// 					// address_zipcode: formData.postal_code,
	// 					// address_number: formData.address,
	// 					address_floor: '',
	// 					address_apartment: '',
	// 					address_description: '',
	// 					birthday: formDataUser.birthday,
	// 				}),
	// 			});

	// 			const createUserRebillResponse = await createUserRebill.json();
	// 			const createUserCRMResponse = await createUserCRM.json();
	// 			let idRebillUser = createUserRebillResponse.id;
	// 			setRebillId(idRebillUser);

	// 			const firstResponse = createUserCRMResponse.data[0];
	// 			const customer_id =
	// 				firstResponse.code === 'SUCCESS' || firstResponse.code === 'DUPLICATE_DATA' ? firstResponse.details.id : undefined;

	// 			console.log(createUserRebillResponse);
	// 			console.log(createUserCRMResponse);
	// 			console.log(customer_id);

	// 			const contractData = {
	// 				customer_id,
	// 				products: [
	// 					{
	// 						code: product.ficha.product_code,
	// 						quantity: 1,
	// 						price: transactionAmount,
	// 						total: transactionAmount,
	// 						net_total: transactionAmount,
	// 						total_after_discount: transactionAmount,
	// 						list_price: transactionAmount,
	// 					},
	// 				],
	// 				status: 'borrador',
	// 				currency: currency,
	// 				country: countryCompleteName,
	// 				sub_total: transactionAmount,
	// 				grand_total: transactionAmount,
	// 				payment: 'Rebill',
	// 				paymentMethod: 'Cobro recurrente',
	// 				Fecha_de_primer_cobro: new Date().toISOString().split('T')[0],
	// 				Seleccione_total_de_pagos_recurrentes: '6', //dinamizar
	// 				Cantidad_de_pagos_recurrentes_restantes: '5', //dinamizar
	// 				Monto_de_cada_pago_restantes: (transactionAmount / 6).toFixed(2),
	// 			};

	// 			const createContractCRM = await fetch(`${ENDPOINT_CRM}/api/zoho/sales_order/create_contract`, {
	// 				method: 'POST',
	// 				headers: {
	// 					Authorization: `Bearer ${tokenCRM}`,
	// 					'Content-Type': 'application/json',
	// 				},
	// 				body: JSON.stringify(contractData),
	// 			});

	// 			const createContractCRMResponse = await createContractCRM.json();

	// 			setSuccess(true);
	// 			setUser(formDataUser);
	// 			setTimeout(() => {
	// 				completeStep(activeStep);
	// 				setActiveStep(activeStep + 1);
	// 			}, 150);
	// 		} catch (error) {
	// 			console.log(error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	} else {
	// 		setTouched((prevTouched) => Object.keys(formDataUser).reduce((acc, key) => ({ ...acc, [key]: true }), prevTouched));
	// 	}
	// };

	const handleNextStep = async () => {
		if (!isFormValid) {
			setTouched((prevTouched) => Object.keys(formDataUser).reduce((acc, key) => ({ ...acc, [key]: true }), prevTouched));
			return;
		}

		try {
			setLoading(true);
			setError('');
			setUser(formDataUser);

			const [crmResponse, rebillResponse] = await Promise.all([
				createCRMUser(formDataUser, countryCompleteName, formData, tokenCRM),
				createRebillUser(formDataUser, country, tokenGATEWAY),
			]);

			const idRebillUser = rebillResponse.id;
			setRebillId(idRebillUser);

			const firstResponse = crmResponse.data[0];
			const customer_id =
				firstResponse.code === 'SUCCESS' || firstResponse.code === 'DUPLICATE_DATA' ? firstResponse.details.id : undefined;

			console.log(rebillResponse, crmResponse, customer_id);

			await createContractCRM(customer_id, product, transactionAmount, currency, countryCompleteName, tokenCRM);

			setSuccess(true);
			setUser(formDataUser);
			setTimeout(() => {
				completeStep(activeStep);
				setActiveStep(activeStep + 1);
			}, 150);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
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
				<div className='mt-4'>
					<DocumentDetailsForm
						formData={formData}
						handleBlur={handleBlur}
						handleChange={handleChange2}
						errors={errors}
						touched={touched}
						country={country}
					/>
				</div>
				<div className='mt-4'>
					<AddressForm
						formData={formData}
						handleChange={handleChange2}
						handleBlur={handleBlur}
						errors={errors}
						touched={touched}
					/>
				</div>
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

export default CheckoutRegisterTest;
