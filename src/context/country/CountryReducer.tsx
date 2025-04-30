import { CountryState, AuthAction } from '@/data/types';
import { countries } from '@/data/countries';
import { getCurrencyByCountry, getInstallmentsByCountry } from '@/utils/country';

export const countryReducer = (state: CountryState, action: AuthAction): CountryState => {
	switch (action.type) {
		case 'SET_COUNTRY': {
			const countryId = action.payload.country;

			// Validamos que sea un país permitido
			const validCountries = countries.map((item) => item.id);
			if (!validCountries.includes(countryId)) {
				return state;
			}

			// Extendemos el estado con currency e installments
			return {
				...state,
				country: countryId,
				currency: getCurrencyByCountry(countryId),
				installments: getInstallmentsByCountry(countryId),
				error: '',
			};
		}

		case 'SET_ERROR':
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};
