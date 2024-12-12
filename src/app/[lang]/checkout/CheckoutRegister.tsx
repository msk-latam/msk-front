import { useState, useEffect, useContext } from 'react';
import { useCheckout } from './CheckoutContext';
import { AuthContext } from '@/context/user/AuthContext';
import ssr from '@/services/ssr';

const CheckoutRegister: React.FC = () => {
	const { state } = useContext(AuthContext);
	const { activeStep, setActiveStep, completeStep } = useCheckout();
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

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validateField = (field: string, value: string | boolean) => {
		switch (field) {
			case 'firstName':
				return value.toString().trim() ? '' : 'El nombre es obligatorio.';
			case 'lastName':
				return value.toString().trim() ? '' : 'El apellido es obligatorio.';
			case 'email':
				return validateEmail(value.toString()) ? '' : 'El correo electrónico no es válido.';
			case 'phone':
				return value.toString().trim() ? '' : 'El teléfono es obligatorio.';
			case 'profession':
				return value.toString() ? '' : 'Debe seleccionar una profesión.';
			case 'specialty':
				return value.toString() ? '' : 'Debe seleccionar una especialidad.';
			case 'privacyPolicy':
				return value ? '' : 'Debe aceptar las condiciones de privacidad.';
			default:
				return '';
		}
	};

	useEffect(() => {
		const formIsValid =
			Object.values(errors).every((error) => error === '') &&
			Object.values(formData).every((value) => value !== '' && value !== false);
		setIsFormValid(formIsValid);
	}, [formData, errors]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { id, value, type } = e.target;

		// Verificar si el elemento es un input de tipo checkbox
		const fieldValue = type === 'checkbox' && e.target instanceof HTMLInputElement ? e.target.checked : value;

		setFormData((prevData) => ({
			...prevData,
			[id]: fieldValue,
		}));

		if (touched[id]) {
			// Revalidar el campo si ya fue tocado
			setErrors((prevErrors) => ({
				...prevErrors,
				[id]: validateField(id, fieldValue),
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
			[id]: validateField(id, formData[id as keyof typeof formData]),
		}));
	};

	const handleNextStep = async () => {
		if (isFormValid) {
			try {
				setLoading(true); // Activar el estado de carga
				setError(''); // Limpiar cualquier error previo

				// Prepara los datos que necesitas enviar para registrar al usuario
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
					Otra_profesion: '', // Si no tienes valor para este campo, déjalo vacío o con valor predeterminado
					Otra_especialidad: '', // Lo mismo para este campo
					Career: '', // Lo mismo para este campo
					Year: '', // Lo mismo para este campo
					country: 'Argentina', // Si tienes un valor predeterminado o lo tomas de algún lugar, inclúyelo
					type: 'DNI', // También puedes dejar esto como valor fijo si se ajusta a tu caso
					identification: '', // Si no tienes valor para este campo, déjalo vacío
					Terms_And_Conditions: formData.privacyPolicy, // Asumí que 'privacyPolicy' mapea con 'Terms_And_Conditions'
					name: formData.name,
					recaptcha_token: '', // Este campo se genera en el backend o con alguna librería de reCAPTCHA, así que déjalo vacío por ahora
					utm_source: '',
					utm_medium: '',
					utm_campaign: '',
					utm_content: '',
					converted_by: formData.converted_by,
				};

				// Aquí deberías hacer la solicitud POST para registrar al usuario
				const res = await ssr.postSignUp(mappedData); // Usar el endpoint adecuado

				if (res?.access_token) {
					setSuccess(true);
					setTimeout(() => {
						completeStep(activeStep);
						setActiveStep(activeStep + 1);
					}, 1500);
				} else {
					setSuccess(false);
					const errorMessages = Object.values(res.errors)
						.map((errorMessage: any) => ` ${errorMessage}`)
						.join('<br />');
					setError(errorMessages); // Mostrar el error en caso de fallo
				}
			} catch (err) {
				setError('Hubo un problema al crear tu cuenta. Intenta nuevamente más tarde.');
				console.error(err); // Puedes agregar más detalles del error si es necesario
			} finally {
				setLoading(false); // Desactivar el estado de carga
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
				<form className='grid grid-cols-2 gap-4'>
					<div>
						<label htmlFor='firstName' className='block text-sm font-medium text-[#6474A6]'>
							Nombre
						</label>
						<input
							type='text'
							id='firstName'
							value={formData.firstName}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='Ingresar Nombre'
							className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
						/>
						{touched.firstName && errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName}</p>}
					</div>
					<div>
						<label htmlFor='lastName' className='block text-sm font-medium text-[#6474A6]'>
							Apellido
						</label>
						<input
							type='text'
							id='lastName'
							value={formData.lastName}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='Ingresar Apellido'
							className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
						/>
						{touched.lastName && errors.lastName && <p className='text-red-500 text-sm'>{errors.lastName}</p>}
					</div>
					<div>
						<label htmlFor='email' className='block text-sm font-medium text-[#6474A6]'>
							Correo electrónico
						</label>
						<input
							type='email'
							id='email'
							value={formData.email}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='Ingresar Correo'
							className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
						/>
						{touched.email && errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
					</div>
					<div>
						<label htmlFor='phone' className='block text-sm font-medium text-[#6474A6]'>
							Teléfono
						</label>
						<input
							type='text'
							id='phone'
							value={formData.phone}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder='Ingresar Teléfono'
							className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
						/>
						{touched.phone && errors.phone && <p className='text-red-500 text-sm'>{errors.phone}</p>}
					</div>
					<div>
						<label htmlFor='profession' className='block text-sm font-medium text-[#6474A6]'>
							Profesión
						</label>
						<select
							id='profession'
							value={formData.profession}
							onChange={handleChange}
							onBlur={handleBlur}
							className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
						>
							<option value=''>Seleccione una profesión</option>
							<option value='Doctor'>Doctor</option>
							<option value='Enfermero'>Enfermero</option>
							<option value='Otro'>Otro</option>
						</select>
						{touched.profession && errors.profession && <p className='text-red-500 text-sm'>{errors.profession}</p>}
					</div>
					<div>
						<label htmlFor='specialty' className='block text-sm font-medium text-[#6474A6]'>
							Especialidad
						</label>
						<select
							id='specialty'
							value={formData.specialty}
							onChange={handleChange}
							onBlur={handleBlur}
							className='mt-1 block w-full border-transparent py-4 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-[#F8F8F9]'
						>
							<option value=''>Seleccione una especialidad</option>
							<option value='Cardiología'>Cardiología</option>
							<option value='Pediatría'>Pediatría</option>
							<option value='Otra'>Otra</option>
						</select>
						{touched.specialty && errors.specialty && <p className='text-red-500 text-sm'>{errors.specialty}</p>}
					</div>
				</form>
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
