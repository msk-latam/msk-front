'use client';
import { useState } from 'react';
import { ENDPOINT_GATEWAY } from './rebill/rebillEndpoints';
import { createPaymentRebill, currencies, updateContractCRM } from './utils/utils';
import { AuthContext } from '@/context/user/AuthContext';

const CheckoutStripe = () => {
	const [formData, setFormData] = useState({
		quote_amount: 170,
		total_contract_amount: 2040,
		currency: 'PEN',
		quotes: 12,
		contract_id: '5344455000199991681',
		contract_so: '5344455000199991682',
		customer: {
			name: 'Albert Reis',
			email: 'areis@msklatam.com',
			first_name: 'Albert',
			last_name: 'Reis',
			reference: '5344455000199886983',
			country: 'Brasil',
		},
		product: {
			name: 'ACCSAP',
			product_code: '9005817',
			amount: 2040,
		},
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		const keys = name.split('.');
		if (keys.length > 1) {
			setFormData((prev) => ({
				...prev,
				[keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
			}));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const token = '$2y$12$O4BEY9Ghrs2GCb5MtrNBWeeaG4H9MlWJsViHO7vKYhMb2ChNcPYRK';
		try {
			const response = await fetch(`${ENDPOINT_GATEWAY}/api/stripe/subscription/ecommerce`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();
			if (response.ok) {
				console.log('Pago procesado con éxito');
			} else {
				console.log(`Error: ${result.message}`);
			}
		} catch (error) {
			console.log('Error al procesar el pago');
		}
	};

	return (
		<form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg'>
			<h2 className='text-xl font-bold mb-4'>Formulario de Pago</h2>

			{Object.entries(formData).map(([key, value]) =>
				typeof value === 'object' ? (
					<div key={key}>
						<h3 className='font-semibold mt-4'>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
						{Object.entries(value).map(([subKey, subValue]) => (
							<label key={subKey} className='block mb-2'>
								{subKey.charAt(0).toUpperCase() + subKey.slice(1)}:
								<input
									type={typeof subValue === 'number' ? 'number' : 'text'}
									name={`${key}.${subKey}`}
									value={subValue}
									onChange={handleChange}
									className='input'
								/>
							</label>
						))}
					</div>
				) : (
					<label key={key} className='block mb-2'>
						{key.charAt(0).toUpperCase() + key.slice(1)}:
						<input
							type={typeof value === 'number' ? 'number' : 'text'}
							name={key}
							value={value}
							onChange={handleChange}
							className='input'
						/>
					</label>
				),
			)}

			<button type='submit' className='w-full mt-4 bg-blue-600 text-white p-2 rounded-lg'>
				Enviar Pago
			</button>
		</form>
	);
};

const CheckoutPaymentStripe = ({ product, country }: any) => {
	return (
		<div>
			<CheckoutStripe />
		</div>
	);
};

export default CheckoutPaymentStripe;
