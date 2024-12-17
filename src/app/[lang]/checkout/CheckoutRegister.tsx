import { useState, useEffect, useContext } from 'react';
import { useCheckout } from './CheckoutContext';
import { AuthContext } from '@/context/user/AuthContext';
import ssr from '@/services/ssr';
import UserForm from './forms/UserForm';
import { validateUserField } from './validators/userValidator';
import CheckoutRegisterButtons from './buttons/CheckoutRegisterButtons';

const CheckoutRegister: React.FC = () => {
	const { state } = useContext(AuthContext);
	const { activeStep, setActiveStep, completeStep, setUser } = useCheckout();
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

	const handleNextStep = async () => {
		if (isFormValid) {
			try {
				setLoading(true);
				setError('');

				const formDataCreate = {
					...formDataUser,
					name: `${formDataUser.firstName} ${formDataUser.lastName}`,
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

				const res = await ssr.postSignUp(mappedData);
				console.log(res);
				if (res?.access_token) {
					localStorage.setItem('token', res.access_token);
					setSuccess(true);
					setUser(formDataUser);
					setTimeout(() => {
						completeStep(activeStep);
						setActiveStep(activeStep + 1);
					}, 1500);
				} else {
					setSuccess(false);
					const errorMessages = Object.values(res.errors)
						.map((errorMessage: any) => ` ${errorMessage}`)
						.join('<br />');
					setError(errorMessages);
					console.log(errorMessages);
				}
			} catch (err) {
				setError('Hubo un problema al crear tu cuenta. Intenta nuevamente más tarde.');
				console.error(err);
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
			</div>
			<div className='flex  items-center justify-center lg:justify-between'>
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
