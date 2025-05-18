'use client';

import React, { useEffect, useState } from 'react';
import { Certification, useCheckout } from '../CheckoutContext';
import { getJSONByCountry } from '@/app/products';
import ssr from '@/services/ssr';

const Certificaciones = ({ product, country }: any) => {
	const { certifications, setCertifications, activeStep } = useCheckout();
	const [certificados, setCertificados] = useState<any[]>([]);

	console.log(product.certificacion_relacionada);

	const certificationsByCountry: Record<string, string[]> = {
		ar: [
			'euneiz-faro',
			'udima',
			'saxum',
			'euneiz-apostillada',
			'cmsc-consejo-medico-de-la-provincia-de-santa-cruz',
			'universidad-catolica-san-antonio-de-murcia-ucam',
		],
		cl: ['euneiz-faro', 'udima', 'saxum', 'euneiz-apostillada', 'universidad-catolica-san-antonio-de-murcia-ucam'],
		ec: [
			'euneiz-faro',
			'udima',
			'saxum',
			'euneiz-apostillada',
			'afeme-cuenca',
			'universidad-catolica-san-antonio-de-murcia-ucam',
		],
		mx: ['euneiz-faro', 'udima', 'SAXUM', 'euneiz-apostillada', 'universidad-catolica-san-antonio-de-murcia-ucam'],
		pe: ['euneiz-faro', 'spmi', 'universidad-catolica-san-antonio-de-murcia-ucam'],
		co: ['euneiz-faro', 'fmc', 'universidad-catolica-san-antonio-de-murcia-ucam'],
		cr: ['euneiz-faro', 'universidad-catolica-san-antonio-de-murcia-ucam'],
		sv: ['euneiz-faro', 'universidad-catolica-san-antonio-de-murcia-ucam'],
		gt: ['euneiz-faro', 'universidad-catolica-san-antonio-de-murcia-ucam'],
		hn: ['euneiz-faro', 'universidad-catolica-san-antonio-de-murcia-ucam'],
		ni: ['euneiz-faro', 'universidad-catolica-san-antonio-de-murcia-ucam'],
		pa: ['euneiz-faro', 'universidad-catolica-san-antonio-de-murcia-ucam'],
		py: ['euneiz-faro', 'universidad-catolica-san-antonio-de-murcia-ucam'],
		uy: ['euneiz-faro', 'universidad-catolica-san-antonio-de-murcia-ucam'],
	};

	// useEffect(() => {
	// 	const fetchCertificados = async () => {
	// 		try {
	// 			const titles = certificationsByCountry[country] || [];
	// 			const normalizedCountry = country === 'ar' ? 'arg' : country;

	// 			const requests = titles.map((title) =>
	// 				ssr.getSingleProductCMS(title, normalizedCountry).catch((err) => {
	// 					console.error(`Error al obtener certificado para: ${title}`, err);
	// 					return null; // Evita que toda la promesa falle
	// 				}),
	// 			);

	// 			const results = await Promise.all(requests);

	// 			console.log(results);

	// 			// Filtrás los nulls o falsos
	// 			const certificados = results.filter(Boolean).map((result) => result.product);

	// 			console.log(certificados);

	// 			setCertificados(certificados);
	// 		} catch (error) {
	// 			console.error('Error al obtener certificados:', error);
	// 		}
	// 	};

	// 	if (country) {
	// 		fetchCertificados();
	// 	}
	// }, [country]);

	useEffect(() => {
		if (product?.certificacion_relacionada) {
			setCertificados(product.certificacion_relacionada);
		}
	}, [product]);

	const certificaciones: Certification[] = certificados.map((cert) => ({
		name: cert.title,
		price: Number(cert.total_price.replace(/[^\d]/g, '')),
		product_code: cert.unique_code,
	}));

	const isSelected = (cert: Certification) => {
		return certifications.some((c) => c.name === cert.name && c.price === cert.price);
	};

	const toggleCertification = (cert: Certification) => {
		if (isSelected(cert)) {
			setCertifications(certifications.filter((c) => c.name !== cert.name));
		} else {
			setCertifications([...certifications, cert]);
		}
	};

	const certificationsTotal = certifications.reduce((acc, cert) => acc + cert.price, 0);
	const formatPesoArgentino = (value: number): string => {
		const hasDecimals = value % 1 !== 0;

		return new Intl.NumberFormat('es-AR', {
			minimumFractionDigits: hasDecimals ? 2 : 0,
			maximumFractionDigits: hasDecimals ? 2 : 0,
		}).format(value);
	};

	const currencies: any = {
		cl: 'CLP',
		ar: 'ARS',
		ec: 'USD',
		mx: 'MXN',
		bo: 'BOB',
		co: 'COP',
		cr: 'CRC',
		sv: 'USD',
		gt: 'USD',
		hn: 'HNL',
		ni: 'USD',
		pa: 'USD',
		py: 'PYG',
		pe: 'PEN',
		uy: 'UYU',
		ve: 'USD',
	};
	const currency = currencies[country] || 'USD';

	const isFree = product.prices.total_price === '0' || product.prices.total_price === '';

	const decodeHtml = (htmlString: string) => {
		const txt = document.createElement('textarea');
		txt.innerHTML = htmlString;
		return txt.value;
	};

	return (
		<div>
			{!isFree && (
				<>
					<h2 className='mb-4 text-lg font-semibold'>Certificaciones</h2>
					<ul className='space-y-3'>
						{activeStep !== 3 &&
							certificaciones.map((cert: any) => (
								<li key={cert.name} className='flex items-center justify-between'>
									<label className='flex items-center gap-3'>
										<input
											type='checkbox'
											checked={isSelected(cert)}
											onChange={() => toggleCertification(cert)}
											className='w-4 h-4 text-[#9200AD] border-[#9200AD] focus:ring-[#9200AD]'
										/>
										<span className='text-sm text-[#392C35] w-[200px]'>{decodeHtml(cert.name)}</span>
									</label>
									<span className='text-sm text-[#6474A6] text-right'>{`${currency} $${formatPesoArgentino(
										cert.price,
									)}`}</span>
								</li>
							))}
					</ul>
					<div className='flex justify-between mt-4'>
						<p>Total Certificaciones</p>
						<span>{`${currency} $${formatPesoArgentino(certificationsTotal)}`}</span>
					</div>
				</>
			)}
		</div>
	);
};

export default Certificaciones;
