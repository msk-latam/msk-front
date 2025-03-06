import int from './int.json';

const productsByCountry: Record<string, any> = {
	ar: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/ar.json',
	bo: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/bo.json',
	cl: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/cl.json',
	co: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/co.json',
	cr: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/cr.json',
	ec: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/ec.json',
	es: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/es.json',
	gt: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/gt.json',
	hn: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/hn.json',
	int,
	mx: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/mx.json',
	ni: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/ni.json',
	pa: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/pa.json',
	pe: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/pe.json',
	py: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/py.json',
	sv: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/sv.json',
	uy: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/uy.json',
	ve: 'https://cms1.msklatam.com/wp-content/json/productos-tienda/ve.json',
};

export const getJSONTiendaByCountry = async (country: string) => {
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
