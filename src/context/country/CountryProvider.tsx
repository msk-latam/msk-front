'use client';
import React, { useEffect, useReducer, useState } from 'react';
import { CountryContext } from './CountryContext';
import { countryReducer } from './CountryReducer';
import { CountryState } from '@/data/types';
import { countries } from '@/data/countries';
import api from '@/services/api';
import Cookies from 'js-cookie';
import { Loading } from '@/utils/Loading';

interface Props {
	children: React.ReactNode;
}

export const CountryProvider: React.FC<Props> = ({ children }) => {
	const initialState: CountryState = {
		country: Cookies.get('NEXT_LOCALE') || 'int',
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
				const currentPathName = window.location.pathname.split('/')[1];

				if (validCountries.includes(currentPathName)) {
					if (currentCountry !== currentPathName) {
						console.log(`Estás en ${currentCountry}, viendo contenido de ${currentPathName}`);
						setUserCountry(currentCountry);
						setUrlCountry(currentPathName);
						setShowBanner(true);
					}

					dispatch({ type: 'SET_COUNTRY', payload: { country: currentPathName } });
					setLoading(false);
					return;
				}

				if (!validCountries.includes(currentCountry)) {
					currentCountry = 'int';
				}

				const newPath = window.location.pathname.replace(/^\/[^/]+/, `/${currentCountry}`);
				if (window.location.pathname !== newPath) {
					console.log(`Redirigiendo a: ${newPath}`);
					window.location.href = newPath;
				}

				dispatch({ type: 'SET_COUNTRY', payload: { country: currentCountry } });
				setLoading(false);
			} catch (error) {
				console.error(error);
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
		do: 'República Dominicana',
		gt: 'Guatemala',
		hn: 'Honduras',
		sv: 'El Salvador',
		ni: 'Nicaragua',
		cu: 'Cuba',
		pr: 'Puerto Rico',
		es: 'España',
	};

	// Función para obtener el nombre del país
	const getCountryName = (code: string): string => {
		return countryNames[code.toLowerCase()] || 'Internacional';
	};

	return (
		<CountryContext.Provider value={{ countryState, dispatch }}>
			{loading ? <Loading /> : children}

			{/* 🔥 Banner de cambio de país */}
			{showBanner && (
				<div
					className={`fixed top-0 left-0 w-full bg-[#9200AD] text-white p-4 z-50 flex items-center justify-center transition-transform duration-300 ${
						showBanner ? 'translate-y-0' : '-translate-y-full'
					}`}
				>
					<p className='text-sm md:text-base'>
						Estás en <strong>{getCountryName(userCountry)}</strong>, viendo contenido de{' '}
						<strong>{getCountryName(urlCountry)}</strong>. ¿Quieres cambiar de país?
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
