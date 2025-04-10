import { useState, useContext, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { AuthContext } from '@/context/user/AuthContext';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import * as Yup from 'yup';
import api from '@/services/api';
import { usePathname, useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
import { CountryContext } from '@/context/country/CountryContext';

export const useLoginForm = () => {
	const router = useRouter();
	const { executeRecaptcha } = useGoogleReCaptcha();
	const { state, dispatch } = useContext(AuthContext);
	const [loginError, setLoginError] = useState<string>('');
	const [onRequest, setOnRequest] = useState<boolean>(false);
	const formRef = useRef<HTMLFormElement>(null);
	const { countryState: countryState } = useContext(CountryContext);

	// useEffect(() => {
	// 	router.prefetch(`/${countryState.country}/mi-perfil`);
	// }, []);

	const initialValues = {
		email: '',
		password: '',
		recaptcha_token: '',
	};

	// console.log(initialValues);

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
		password: Yup.string().required('La contraseña es requerida'),
	});

	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	const country = match ? `${match[1]}` : '';

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			setOnRequest(true);
			try {
				if (executeRecaptcha) {
					const recaptchaToken = await executeRecaptcha('login');
					// console.log(recaptchaToken, 'token de recaptcha');
					const formData = {
						...values,
						// recaptcha_token: await executeRecaptcha('login'),
						recaptcha_token: recaptchaToken,
					};
					// console.log(formData);

					const { data, status } = await api.postLogin(formData);
					// console.log(data);
					if (status == 200) {
						const { name, speciality, ...restData } = data;
						const loginData = {
							...restData,
							email: formik.values.email,
							user: { name, speciality },
						};

						dispatch({ type: 'LOGIN', payload: loginData });
						router.push(
							country === '' ? `${window.location.origin}/mi-perfil/` : `${window.location.origin}/${country}/mi-perfil/`,
						);
					} else {
						setLoginError(data?.message as string);
					}
				}
			} catch (error) {
				console.error('Error al ejecutar reCAPTCHA:', error);
			} finally {
				setOnRequest(false);
			}
		},
	});

	return { formik, loginError, onRequest, formRef, setLoginError };
};
