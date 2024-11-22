'use client';
import { FetchSingleProduct } from '@/data/types';

import React from 'react';

// Función para decodificar entidades HTML
const decodeHtmlEntities = (str: string) => {
	const parser = new DOMParser();
	const decodedString = parser.parseFromString(str, 'text/html').body.textContent || '';
	return decodedString;
};

interface CertificadosWidgetProps {
	product: FetchSingleProduct;
}

const CertificadosWidget: React.FC<CertificadosWidgetProps> = ({ product }) => {
	return (
		<div>
			<h1>Curso: {decodeHtmlEntities(product.ficha.title)}</h1>

			<div>
				<h2>Avales:</h2>
				<ul>
					{product.avales.map((aval) => (
						<li key={aval.id}>
							<h3>{decodeHtmlEntities(aval.title)}</h3>
							<p>{decodeHtmlEntities(aval.description)}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default CertificadosWidget;
