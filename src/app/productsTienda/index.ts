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

export const getJSONTiendaByCountry = (country: string) => {
	const data = productsByCountry[country?.toLowerCase() || 'int'];
	if (!data) {
		throw new Error(`No se encontró información para el país: ${country}`);
	}
	return data;
};
