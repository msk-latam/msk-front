'use client';
import React, { useEffect, useReducer } from 'react';
import { UTMContext } from './UTMContext';
import { utmInitialState, utmReducer } from './UTMReducer';
import { setCookie } from '@/utils/cookies';

interface Props {
	children: React.ReactNode;
}

export const UTMProvider: React.FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(utmReducer, utmInitialState);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;

		const newUTMs: Partial<typeof utmInitialState> = {};

		keys.forEach((key) => {
			const value = urlParams.get(key);
			if (value) {
				newUTMs[key] = value;
				sessionStorage.setItem(key, value); // Para formularios
				setCookie(key, value, 1); // Para persistencia
			}
		});

		if (Object.keys(newUTMs).length > 0) {
			dispatch({ type: 'SET_UTMS_ALL', payload: newUTMs });
		}
	}, []);

	useEffect(() => {
		// Refuerza persistencia en cookie si cambian desde otro lugar del app
		setCookie('utm_source', state.utm_source, 1);
		setCookie('utm_medium', state.utm_medium, 1);
		setCookie('utm_campaign', state.utm_campaign, 1);
		setCookie('utm_content', state.utm_content, 1);
	}, [state]);

	return <UTMContext.Provider value={{ state, dispatch }}>{children}</UTMContext.Provider>;
};

export default UTMProvider;
