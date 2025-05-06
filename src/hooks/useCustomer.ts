import { useState } from 'react';

// Export this interface
export interface UpdateCustomerPayload {
	document_type?: string;
	identification?: string;
	company_name?: string;
	name?: string;
	surname?: string;
	country?: string;
	gender?: string;
	password?: string;
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
}

interface UseCustomerReturn {
	mutate: (payload: UpdateCustomerPayload) => Promise<any>;
	loading: boolean;
	error: Error | null;
	data: any | null;
}

export function useCustomer(): UseCustomerReturn {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [data, setData] = useState<any | null>(null);

	const updateCustomerMutate = async (payload: UpdateCustomerPayload): Promise<any> => {
		setLoading(true);
		setError(null);
		setData(null);

		try {
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
