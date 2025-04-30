'use client';

import React, { useEffect, useReducer, useState } from 'react';
import { CountryContext } from './CountryContext';
import { countryReducer } from './CountryReducer';
import { CountryState } from '@/data/types';
import { countries } from '@/data/countries';
import { getCurrencyByCountry, getInstallmentsByCountry } from '@/utils/country';
import Cookies from 'js-cookie';
import { Loading } from '@/utils/Loading';
import { getCountryFromUrl } from '@/utils/getCountryFromUrl';
import { getCountryFromIp } from '@/utils/getCountryFromIP';
import { usePathname } from 'next/navigation';

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

	const pathname = usePathname();
	const validCountries = countries.map((item) => item.id);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const currentCountryFromUrl = getCountryFromUrl(pathname);
			const fallbackCountry = validCountries.includes(currentCountryFromUrl) ? currentCountryFromUrl : 'ar';

			let currentCountry = fallbackCountry;

			try {
				const geo = await getCountryFromIp();

				console.log('[GEO]', geo);

				if (geo.country && validCountries.includes(geo.country.toLowerCase())) {
					currentCountry = geo.country.toLowerCase();
				}
			} catch (err) {
				console.warn('Could not determine geo country:', err);
			}

			dispatch({ type: 'SET_COUNTRY', payload: { country: currentCountry } });
			setLoading(false);
		};

		fetchData();
	}, [pathname]);

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
		</CountryContext.Provider>
	);
};

export default CountryProvider;
