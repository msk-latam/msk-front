'use client';

import React, { useEffect, useReducer, useState } from 'react';
import { CountryContext } from './CountryContext';
import { countryReducer } from './CountryReducer';
import { CountryState } from '@/data/types';
import { countries } from '@/data/countries';
import Cookies from 'js-cookie';

import { getCountryFromUrl } from '@/utils/getCountryFromUrl';
import { getCountryFromIp } from '@/utils/getCountryFromIP';

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
	const [showBanner, setShowBanner] = useState(false);
	const [userCountry, setUserCountry] = useState('');
	const [urlCountry, setUrlCountry] = useState('');

	const validCountries = countries.map((item) => item.id);

	function isFirstLoad(): boolean {
		const [entry] = performance.getEntriesByType('navigation');
		return (entry as PerformanceNavigationTiming)?.type === 'reload';
	}

	useEffect(() => {
		const fetchData = async () => {
			const geo = await getCountryFromIp();
			const geoCountry = geo?.country?.toLowerCase() || 'ar';
			const path = window.location.pathname;
			const urlCountryFromPath = getCountryFromUrl(path);
			const hasValidUrlPrefix = validCountries.includes(urlCountryFromPath);
			const alreadyRedirected = Cookies.get('initial_geo_redirect_done');

			// Redirección inicial automática si entra por `/`
			if (
				path === '/' &&
				geoCountry !== 'ar' &&
				!hasValidUrlPrefix &&
				!alreadyRedirected &&
				validCountries.includes(geoCountry)
			) {
				Cookies.set('initial_geo_redirect_done', 'true', { expires: 7 });
				Cookies.set('country', geoCountry, { path: '/', expires: 365 });
				window.location.href = `/${geoCountry}/home`;
				return;
			}

			const fallbackCountry = hasValidUrlPrefix ? urlCountryFromPath : 'ar';
			let currentCountry = fallbackCountry;

			let storedDismissed = null;
			if (typeof window !== 'undefined') {
				storedDismissed = sessionStorage.getItem('dismissed_banner_this_session');
			}

			const previousIpCountry = Cookies.get('ip_country');

			try {
				if (typeof geoCountry === 'string' && validCountries.includes(geoCountry)) {
					if (previousIpCountry && previousIpCountry !== geoCountry) {
						Cookies.remove('dismissed_banner_this_session');
					}

					Cookies.set('ip_country', geoCountry, { expires: 7 });

					if (geoCountry !== fallbackCountry) {
						const isReload = isFirstLoad();
						if (isReload || !storedDismissed) {
							setUserCountry(geoCountry);
							setUrlCountry(fallbackCountry);
							setShowBanner(true);
						}
					}

					currentCountry = geoCountry;
				}
			} catch (err) {
				console.warn('Could not determine geo country:', err);
			}

			dispatch({ type: 'SET_COUNTRY', payload: { country: currentCountry } });
		};

		fetchData(); // ✅ Solo se ejecuta una vez
	}, []); // ⬅️ IMPORTANTE: sin pathname como dependencia

	const handleSwitchCountry = () => {
		const path = window.location.pathname;
		const segments = path.split('/').filter(Boolean);
		const hasValidPrefix = validCountries.includes(segments[0]);
		const restOfPath = hasValidPrefix ? segments.slice(1).join('/') : segments.join('/');
		const newUrl = `/${userCountry}${restOfPath ? '/' + restOfPath : ''}${window.location.search}`;
		Cookies.set('country', userCountry, { path: '/', expires: 365 });
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
			{children}

			{showBanner && (
				<div
					className={`fixed top-0 left-0 w-full bg-[#9200AD] text-white p-4 z-[9999] flex items-center justify-center transition-transform duration-300 ${
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
							onClick={() => {
								sessionStorage.setItem('dismissed_banner_this_session', 'true');
								setShowBanner(false);
							}}
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
