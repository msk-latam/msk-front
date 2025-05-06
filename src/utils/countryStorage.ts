// utils/countryStorage.ts
export const setUserCountry = (country: string) => {
	localStorage.setItem('msk-country', country);
};

export const getUserCountry = (): string | null => {
	return localStorage.getItem('msk-country');
};

export const clearUserCountry = () => {
	localStorage.removeItem('msk-country');
};
