import { AuthContext } from '@/context/user/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { rebillIdState } from './checkoutAtom';
import { useCheckout } from './CheckoutContext';
import { validateUserField } from './validators/userValidator';
import {
	createContractCRM,
	createCRMUser,
	createRebillUser,
	currencies,
	getCountryCompleteName,
	getCRMUser,
	rebillCountries,
} from './utils/utils';
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
	const [loadingUser, setLoadingUser] = useState(false);

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

	const totalPrice = product.total_price;
	const transactionAmount = parseInt(totalPrice.replace(/[\.,]/g, ''), 10);
	const regularPrice = product.regular_price;
	const paymentProcessor = rebillCountries.includes(country) ? 'rebill' : 'stripe';

	const handleNextStep = async () => {
		if (!isFormValid) {
			setTouched((prevTouched) => Object.keys(formDataUser).reduce((acc, key) => ({ ...acc, [key]: true }), prevTouched));
			return;
		}

		try {
			setLoading(true);
			setError('');
			setUser(formDataUser);

			const crmResponse = await createCRMUser(formDataUser, countryCompleteName, formData);
			const rebillResponse = rebillCountries.includes(country) ? await createRebillUser(formDataUser, country) : null;

			const idRebillUser = rebillResponse?.id;
			setRebillId(idRebillUser);

			const firstResponse = crmResponse.data[0];
			const customer_id =
				firstResponse.code === 'SUCCESS' || firstResponse.code === 'DUPLICATE_DATA' ? firstResponse.details.id : undefined;

			const paymentProcessor = rebillCountries.includes(country) ? 'rebill' : 'stripe';

			const createContractResponse = await createContractCRM(
				customer_id,
				product,
				transactionAmount,
				currency,
				countryCompleteName,
				paymentProcessor,
			);
			const contract_id = createContractResponse.data[0].details.id;

			const updatedFormDataUser = { ...formDataUser, contract_id };

			setSuccess(true);
			setUser(updatedFormDataUser);
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

	//este useEffet se ejecuta si el usuario ya esta registrado en msklatam
	useEffect(() => {
		if (state?.user && state.user.name) {
			const fetchUser = async () => {
				try {
					setLoadingUser(true);
					const user = await getCRMUser(state?.email);
					if (user) {
						const updatedFormDataUser = {
							...formDataUser,
							email: user.Email,
							firstName: user.First_Name,
							lastName: user.Last_Name,
						};
						setFormDataUser(updatedFormDataUser);
						const customer_id = user.id;
						const rebillResponse = rebillCountries.includes(country) ? await createRebillUser(formDataUser, country) : null;
						const createContractResponse = await createContractCRM(
							customer_id,
							product,
							transactionAmount,
							currency,
							countryCompleteName,
							paymentProcessor,
						);
						const contract_id = createContractResponse.data[0].details.id;
						const idRebillUser = rebillResponse?.id;
						setRebillId(idRebillUser);
						const finalFormDataUser = { ...updatedFormDataUser, contract_id };
						setUser(finalFormDataUser);
						completeStep(activeStep);
						setActiveStep(2);
					}
				} catch (error) {
					console.error('Error fetching user:', error);
				} finally {
					setLoadingUser(false);
				}
			};

			fetchUser();
		}
	}, [state?.user, activeStep, setActiveStep, completeStep]);

	if (loadingUser) {
		return (
			<div className='flex items-center justify-center h-40'>
				<span className='animate-spin w-8 h-8 border-4 border-gray-300 border-t-[#392C35] rounded-full'></span>
				<p className='ml-3 text-[#392C35] font-semibold'>Cargando datos de usuario, por favor espere...</p>
			</div>
		);
	}

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
