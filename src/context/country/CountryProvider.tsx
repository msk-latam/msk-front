'use client';

import React, { useEffect, useReducer, useState } from 'react';
import { CountryContext } from './CountryContext';
import { countryReducer } from './CountryReducer';
import { CountryState } from '@/data/types';
import { countries } from '@/data/countries';
import { getCurrencyByCountry, getInstallmentsByCountry } from '@/utils/country';
import api from '@/services/api';
import Cookies from 'js-cookie';
import { Loading } from '@/utils/Loading';

interface Props {
	children: React.ReactNode;
}

export const CountryProvider: React.FC<Props> = ({ children }) => {
	const initialState: CountryState = {
		country: '',
		currency: 'USD',
		installments: {
			gateway: 'REBILL',
			quotes: null,
		},
		error: '',
	};

	const [countryState, dispatch] = useReducer(countryReducer, initialState);
	const [loading, setLoading] = useState(true);
	const [showBanner, setShowBanner] = useState(false);
	const [userCountry, setUserCountry] = useState('');
	const [urlCountry, setUrlCountry] = useState('');

	const validCountries = countries.map((item) => item.id);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				let currentCountry = await api.getCountryCode();
				let currentPathName = window.location.pathname.split('/')[1];

				if (currentPathName === 'mi' && window.location.pathname === '/mi-perfil') {
					currentPathName = ''; // Tratar "mi" como "ar"
				}

				if (validCountries.includes(currentPathName)) {
					if (currentCountry !== currentPathName) {
						setUserCountry(currentCountry);
						setUrlCountry(currentPathName);
						setShowBanner(true);
					}
					dispatch({ type: 'SET_COUNTRY', payload: { country: currentPathName } });
					setLoading(false);
					return;
				}

				if (!validCountries.includes(currentPathName)) {
					let newPath = `/${currentCountry}${window.location.pathname}${window.location.search}`;
					if (currentCountry === 'ar') {
						newPath = `${window.location.origin}${window.location.pathname}${window.location.search}`;
					}
					if (window.location.href !== newPath) {
						window.location.href = newPath;
						return;
					}
				}

				dispatch({ type: 'SET_COUNTRY', payload: { country: currentCountry } });
				setLoading(false);
			} catch (error) {
				console.error(`❗ Error en fetchData: ${error}`);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleSwitchCountry = () => {
		const newUrl = window.location.pathname.replace(/^\/[^/]+/, `/${userCountry}`);
		window.location.href = newUrl;
	};

	const countryNames: Record<string, string> = {
		ar: 'Argentina',
		mx: 'México',
		cl: 'Chile',
		cr: 'Costa Rica',
		co: 'Colombia',
		pe: 'Perú',
		uy: 'Uruguay',
		py: 'Paraguay',
		bo: 'Bolivia',
		ec: 'Ecuador',
		ve: 'Venezuela',
		pa: 'Panamá',
		gt: 'Guatemala',
		hn: 'Honduras',
		sv: 'El Salvador',
		ni: 'Nicaragua',
		es: 'España',
	};

	const getCountryName = (code: string): string => {
		return countryNames[code.toLowerCase()] || 'Internacional';
	};

	return (
		<CountryContext.Provider value={{ countryState, dispatch }}>
			{loading ? <Loading /> : children}

			{showBanner && (
				<div
					className={`fixed top-0 left-0 w-full bg-[#9200AD] text-white p-4 z-50 flex items-center justify-center transition-transform duration-300 ${
						showBanner ? 'translate-y-0' : '-translate-y-full'
					}`}
				>
					<p className='text-sm md:text-base'>
						Estás visitando <strong>MSK {getCountryName(urlCountry)}</strong> desde{' '}
						<strong>{getCountryName(userCountry)}</strong>. ¿Quieres cambiar de país?
					</p>

					<div className='ml-4 flex space-x-3'>
						<button
							onClick={handleSwitchCountry}
							className='bg-white text-[#9200AD] px-3 py-1 rounded hover:bg-gray-200 transition'
						>
							Sí
						</button>
						<button
							onClick={() => setShowBanner(false)}
							className='bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition'
						>
							No
						</button>
					</div>
				</div>
			)}
		</CountryContext.Provider>
	);
};

export default CountryProvider;
