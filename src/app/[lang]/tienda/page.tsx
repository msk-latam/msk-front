import TiendaLayout from './[category]/TiendaLayout';

export default function TiendaPage({ params }: { params: { lang: string } }) {
	return <TiendaLayout lang={params.lang} />;
}
