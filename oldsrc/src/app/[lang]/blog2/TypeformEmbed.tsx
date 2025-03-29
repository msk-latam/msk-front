'use client';

import React, { useEffect } from 'react';

interface TypeformEmbedProps {
	id: string; // El ID de Typeform que se pasará como parámetro
}

const TypeformEmbed: React.FC<TypeformEmbedProps> = ({ id }) => {
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://embed.typeform.com/next/embed.js';
		script.async = true;
		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return <div data-tf-live={id}></div>;
};

export default TypeformEmbed;
