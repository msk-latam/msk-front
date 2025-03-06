import int from './int.json';

const productsByCountry: Record<string, any> = {
	ar: 'https://cms1.msklatam.com/wp-content/json/productos/ar.json',
	bo: 'https://cms1.msklatam.com/wp-content/json/productos/bo.json',
	cl: 'https://cms1.msklatam.com/wp-content/json/productos/cl.json',
	co: 'https://cms1.msklatam.com/wp-content/json/productos/co.json',
	cr: 'https://cms1.msklatam.com/wp-content/json/productos/cr.json',
	ec: 'https://cms1.msklatam.com/wp-content/json/productos/ec.json',
	es: 'https://cms1.msklatam.com/wp-content/json/productos/es.json',
	gt: 'https://cms1.msklatam.com/wp-content/json/productos/gt.json',
	hn: 'https://cms1.msklatam.com/wp-content/json/productos/hn.json',
	int,
	mx: 'https://cms1.msklatam.com/wp-content/json/productos/mx.json',
	ni: 'https://cms1.msklatam.com/wp-content/json/productos/ni.json',
	pa: 'https://cms1.msklatam.com/wp-content/json/productos/pa.json',
	pe: 'https://cms1.msklatam.com/wp-content/json/productos/pe.json',
	py: 'https://cms1.msklatam.com/wp-content/json/productos/py.json',
	sv: 'https://cms1.msklatam.com/wp-content/json/productos/sv.json',
	uy: 'https://cms1.msklatam.com/wp-content/json/productos/uy.json',
	ve: 'https://cms1.msklatam.com/wp-content/json/productos/ve.json',
};

export const getJSONByCountry = async (country: string) => {
	if (country === 'mi') {
		country = 'ar';
	}

	const normalizedCountry = country?.toLowerCase() || 'int';
	const data = productsByCountry[normalizedCountry] || productsByCountry['int'];

	if (typeof data === 'string') {
		try {
			const response = await fetch(data);
			const json = await response.json();

			return json;
		} catch (error) {
			console.error('Error cargando JSON de la tienda:', error);
			return productsByCountry['int'];
		}
	} else {
		return data;
	}
};
