import { useState, useContext, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { AuthContext } from '@/context/user/AuthContext';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import * as Yup from 'yup';
import api from '@/services/api';
import { useRouter } from 'next/navigation';
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

	useEffect(() => {
		router.prefetch(`/${countryState.country}/mi-perfil`);
	}, []);

	const initialValues = {
		email: '',
		password: '',
		recaptcha_token: '',
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
		password: Yup.string().required('La contraseña es requerida'),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			setOnRequest(true);
			try {
				if (executeRecaptcha) {
					const formData = {
						...values,
						recaptcha_token: await executeRecaptcha('login'),
					};
					const { data, status } = await api.postLogin(formData);
					if (status == 200) {
						const { name, speciality, ...restData } = data;
						const loginData = {
							...restData,
							email: formik.values.email,
							user: { name, speciality },
						};

						dispatch({ type: 'LOGIN', payload: loginData });
						router.push('/mi-perfil');
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
