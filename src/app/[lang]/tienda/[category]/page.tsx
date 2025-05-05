import TiendaLayout from './TiendaLayout';

export default function TiendaCategoryPage({ params }: { params: { lang: string; category: string } }) {
	return <TiendaLayout lang={params.lang} category={params.category} />;
}
