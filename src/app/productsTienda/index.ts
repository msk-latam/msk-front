import ar from './ar.json';
import bo from './bo.json';
import cl from './cl.json';
import co from './co.json';
import cr from './cr.json';
import ec from './ec.json';
import es from './es.json';
import gt from './gt.json';
import hn from './hn.json';
import int from './int.json';
import mx from './mx.json';
import ni from './ni.json';
import pa from './pa.json';
import pe from './pe.json';
import py from './py.json';
import sv from './sv.json';
import uy from './uy.json';
import ve from './ve.json';

const productsByCountry: Record<string, any> = {
	ar,
	// ar: 'https://cms1.msklatam.com/wp-content/json/productos/ar.json',
	bo,
	cl,
	co,
	cr,
	ec,
	es,
	gt,
	hn,
	int,
	mx,
	ni,
	pa,
	pe,
	py,
	sv,
	uy,
	ve,
};

export const getJSONTiendaByCountry = async (country: string) => {
	if (country === 'mi') {
		country = 'ar';
	}
	if (country === '') {
		country = 'ar';
	}

	const normalizedCountry = country?.toLowerCase() || 'int';
	const data = productsByCountry[normalizedCountry] || productsByCountry['int'];

	if (typeof data === 'string') {
		// Si es una URL (caso de 'ar'), hacemos un fetch
		try {
			const response = await fetch(data);
			const json = await response.json();
			// console.log(json, 'de funcion');
			return json;
		} catch (error) {
			console.error('Error cargando JSON de la tienda:', error);
			return productsByCountry['int']; // Retornar el JSON por defecto si hay error
		}
	} else {
		// Si es un JSON importado, lo devolvemos tal cual
		return data;
	}
};
