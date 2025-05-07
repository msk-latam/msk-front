import { useState } from 'react';

// Export this interface
export interface UpdateCustomerPayload {
	document_type?: string;
	identification?: string;
	company_name?: string;
	first_name?: string;
	last_name?: string;
	country?: string;
	gender?: string;
	password?: string;
	career?: string;
	phone?: string;
	profession?: string;
	specialty?: string;
	workplace?: string;
	school_associate?: boolean;
	school_name?: string;
	canton_place?: string;
	parish_place?: string;
	income_source?: string;
	invoice_required?: boolean;
	billing_email?: string;
	billing_phone?: string;
	tax_regime?: string;
	interests?: {
		specialty_interests: string[] | null;
		content_interests: string[] | null;
		other_interests: string[] | null;
	};
}

interface UseCustomerReturn {
	mutate: (payload: UpdateCustomerPayload) => Promise<any>;
	loading: boolean;
	error: Error | null;
	data: any | null;
}

export function useCustomer(action: 'update' | 'create' = 'update'): UseCustomerReturn {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [data, setData] = useState<any | null>(null);

	const updateCustomerMutate = async (payload: UpdateCustomerPayload): Promise<any> => {
		setLoading(true);
		setError(null);
		setData(null);

		try {
			// Si estamos creando un usuario nuevo, obtenemos datos adicionales de las cookies
			if (action === 'create') {
				const cookies = document.cookie.split(';').reduce((acc, cookie) => {
					const [key, value] = cookie.trim().split('=');
					acc[key] = decodeURIComponent(value);
					return acc;
				}, {} as Record<string, string>);

				// Añadir email, first_name y last_name de las cookies si están disponibles
				payload = {
					...payload,
					first_name: cookies.first_name,
					last_name: cookies.last_name,
				};
			}

			const response = await fetch('/api/customer', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			const responseData = await response.json();

			if (!response.ok) {
				const errorMessage = responseData.message || `Failed to update customer: ${response.status}`;
				throw new Error(errorMessage);
			}

			/* Save interest  in api/interests */
			const interestsResponse = await fetch('/api/interests', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload.interests),
			});

			const interestsResponseData = await interestsResponse.json();

			if (!interestsResponse.ok) {
				const errorMessage = interestsResponseData.message || `Failed to update interests: ${interestsResponse.status}`;
				throw new Error(errorMessage);
			}

			setData(responseData);
			setLoading(false);
			return responseData;
		} catch (err: any) {
			console.error('Error updating customer:', err);
			setError(err);
			setLoading(false);
			throw err;
		}
	};

	return { mutate: updateCustomerMutate, loading, error, data };
}
