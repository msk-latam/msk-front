import { useState } from 'react';

interface SignupPayload {
	email: string;
	first_name: string;
	last_name: string;
	phone: string;
	country: string;
	profession: string;
	speciality: string;
	Otra_profesion: string;
	Otra_especialidad: string;
	Career: string;
	Year: string;
	type: string;
	identification: string;
	Terms_And_Conditions: boolean;
}

interface UseSignupReturn {
	signup: (payload: SignupPayload) => Promise<any>;
	loading: boolean;
	error: string | null;
	success: boolean;
}

export function useSignup(): UseSignupReturn {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<boolean>(false);

	const signup = async (payload: SignupPayload): Promise<any> => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch('/api/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(payload),
			});

			const data = await response.json();

			if (!response.ok) {
				let errorMessage = 'Ocurrió un error al registrar la cuenta.';

				let specificErrorMessageFromErrors: string | null = null;

				if (data.errors && typeof data.errors === 'object' && Object.keys(data.errors).length > 0) {
					const messages: string[] = [];
					for (const key in data.errors) {
						if (Object.prototype.hasOwnProperty.call(data.errors, key)) {
							const errorValue = data.errors[key];
							if (Array.isArray(errorValue)) {
								errorValue.forEach((msg) => {
									if (typeof msg === 'string' && msg.trim() !== '') {
										messages.push(msg.trim());
									}
								});
							} else if (typeof errorValue === 'string' && errorValue.trim() !== '') {
								messages.push(errorValue.trim());
							}
						}
					}
					if (messages.length > 0) {
						specificErrorMessageFromErrors = messages.join(', ');
					}
				}

				if (specificErrorMessageFromErrors) {
					errorMessage = specificErrorMessageFromErrors;
				} else if (data.message && typeof data.message === 'string' && data.message.trim() !== '') {
					errorMessage = data.message.trim();
				}

				setError(errorMessage);
				setLoading(false);
				return { success: false, error: errorMessage };
			}

			setSuccess(true);
			setLoading(false);
			return { success: true, data };
		} catch (err) {
			const errorMessage = 'No se pudo conectar con el servidor. Inténtalo de nuevo.';
			console.error('Error during sign up:', err);
			setError(errorMessage);
			setLoading(false);
			return { success: false, error: errorMessage };
		}
	};

	return { signup, loading, error, success };
}
