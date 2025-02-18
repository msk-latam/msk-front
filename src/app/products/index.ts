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

export const getJSONByCountry = (country: string) => {
	if (country === 'mi') {
		country = 'ar';
	}

	const normalizedCountry = country?.toLowerCase() || 'int';
	const data = productsByCountry[normalizedCountry] || productsByCountry['int']; // Fallback a 'int'

	return data;
};
