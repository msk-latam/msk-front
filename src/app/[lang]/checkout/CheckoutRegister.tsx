import { useState, useEffect, useContext } from 'react';
import { useCheckout } from './CheckoutContext';
import { AuthContext } from '@/context/user/AuthContext';
import ssr from '@/services/ssr';
import UserForm from './forms/UserForm';
import { validateUserField } from './validators/userValidator';

const CheckoutRegister: React.FC = () => {
	const { state } = useContext(AuthContext);
	const { activeStep, setActiveStep, completeStep, setUser } = useCheckout();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const [formData, setFormData] = useState({
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
			Object.values(formData).every((value) => value !== '' && value !== false);
		setIsFormValid(formIsValid);
	}, [formData, errors]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { id, value, type } = e.target;

		const fieldValue = type === 'checkbox' && e.target instanceof HTMLInputElement ? e.target.checked : value;

		setFormData((prevData) => ({
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
			[id]: validateUserField(id, formData[id as keyof typeof formData]),
		}));
	};

	const handleNextStep = async () => {
		if (isFormValid) {
			try {
				setLoading(true);
				setError('');

				const formDataCreate = {
					...formData,
					name: `${formData.firstName} ${formData.lastName}`,
					// country: fullCountry(selectedCountry),
					// utm_source: utmState.utm_source,
					// utm_medium: utmState.utm_medium,
					// utm_campaign: utmState.utm_campaign,
					// utm_content: utmState.utm_content,
					converted_by: 'Checkout Web ',
				};

				const mappedData = {
					first_name: formData.firstName,
					last_name: formData.lastName,
					email: formData.email,
					phone: formData.phone,
					profession: formData.profession,
					speciality: formData.specialty,
					Otra_profesion: '',
					Otra_especialidad: '',
					Career: '',
					Year: '',
					country: 'Argentina',
					type: '',
					identification: '',
					Terms_And_Conditions: formData.privacyPolicy,
					name: formData.name,
					recaptcha_token: '',
					utm_source: '',
					utm_medium: '',
					utm_campaign: '',
					utm_content: '',
					converted_by: formData.converted_by,
				};

				const res = await ssr.postSignUp(mappedData);
				if (res?.access_token) {
					setSuccess(true);
					setUser(formData);
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
				}
			} catch (err) {
				setError('Hubo un problema al crear tu cuenta. Intenta nuevamente más tarde.');
				console.error(err);
			} finally {
				setLoading(false);
			}
		} else {
			setTouched((prevTouched) => Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), prevTouched));
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
					formData={formData}
				/>
			</div>

			<div className='flex items-center justify-end space-y-4 gap-4 my-6'>
				<div className='flex items-center'>
					<input
						type='checkbox'
						id='privacyPolicy'
						checked={formData.privacyPolicy}
						onChange={handleChange}
						onBlur={handleBlur}
						className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
					/>
					<label htmlFor='privacyPolicy' className='ml-2 text-sm font-medium text-gray-700'>
						Acepto las{' '}
						<a
							href='/politica-de-privacidad/'
							target='_blank'
							className='text-[#9200AD] underline hover:no-underline focus:outline-none focus:ring-1 focus:ring-[#9200AD]'
						>
							condiciones de privacidad
						</a>
					</label>
				</div>
				{touched.privacyPolicy && errors.privacyPolicy && <p className='text-red-500 text-sm'>{errors.privacyPolicy}</p>}
				<button
					type='button'
					className={`px-12 py-3 font-bold rounded-sm focus:outline-none focus:ring-2 !mt-0 flex items-center justify-center space-x-2 ${
						isFormValid ? 'bg-[#9200AD] text-white' : 'bg-gray-400 text-gray-600 cursor-not-allowed'
					}`}
					onClick={handleNextStep}
					disabled={!isFormValid || loading}
				>
					{loading ? (
						<div className='w-5 h-5 border-4 border-t-4 border-transparent border-t-white rounded-full animate-spin'></div>
					) : (
						'Siguiente'
					)}
				</button>
			</div>
		</>
	);
};

export default CheckoutRegister;
