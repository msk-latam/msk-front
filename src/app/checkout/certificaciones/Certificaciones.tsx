'use client';

import React, { useEffect, useState } from 'react';
import { Certification, useCheckout } from '../CheckoutContext';
import { getJSONByCountry } from '@/app/products';

const Certificaciones = ({ product, country }: any) => {
	const { certifications, setCertifications } = useCheckout();
	const [certificados, setCertificados] = useState<any[]>([]);

	const certificationsByCountry: Record<string, string[]> = {
		ar: [
			'EUNEIZ FARO',
			'UDIMA',
			'EUNEIZ',
			'SAXUM',
			'EUNEIZ APOSTILLADA',
			'CMSC - Consejo Médico de la Provincia de Santa Cruz',
			'Universidad Católica San Antonio de Murcia (UCAM)',
		],
		cl: [
			'EUNEIZ FARO',
			'UDIMA',
			'EUNEIZ',
			'SAXUM',
			'EUNEIZ APOSTILLADA',
			'Universidad Católica San Antonio de Murcia (UCAM)',
		],
		ec: [
			'EUNEIZ FARO',
			'UDIMA',
			'EUNEIZ',
			'SAXUM',
			'EUNEIZ APOSTILLADA',
			'AFEME/CUENCA',
			'Universidad Católica San Antonio de Murcia (UCAM)',
		],
		mx: [
			'EUNEIZ FARO',
			'UDIMA',
			'EUNEIZ',
			'SAXUM',
			'EUNEIZ APOSTILLADA',
			'Universidad Católica San Antonio de Murcia (UCAM)',
		],
		pe: ['EUNEIZ FARO', 'SPMI', 'Universidad Católica San Antonio de Murcia (UCAM)'],
		co: ['EUNEIZ FARO', 'FMC', 'Universidad Católica San Antonio de Murcia (UCAM)'],
		cr: ['EUNEIZ FARO', 'Universidad Católica San Antonio de Murcia (UCAM)'],
		sv: ['EUNEIZ FARO', 'Universidad Católica San Antonio de Murcia (UCAM)'],
		gt: ['EUNEIZ FARO', 'Universidad Católica San Antonio de Murcia (UCAM)'],
		hn: ['EUNEIZ FARO', 'Universidad Católica San Antonio de Murcia (UCAM)'],
		ni: ['EUNEIZ FARO', 'Universidad Católica San Antonio de Murcia (UCAM)'],
		pa: ['EUNEIZ FARO', 'Universidad Católica San Antonio de Murcia (UCAM)'],
		py: ['EUNEIZ FARO', 'Universidad Católica San Antonio de Murcia (UCAM)'],
		uy: ['EUNEIZ FARO', 'Universidad Católica San Antonio de Murcia (UCAM)'],
	};

	useEffect(() => {
		const fetchCertificados = async () => {
			try {
				const data = await getJSONByCountry(country);
				const allProducts = data.products || [];

				const validTitles = certificationsByCountry[country] || [];

				const filtered = allProducts.filter((product: any) => validTitles.includes(product.title));

				setCertificados(filtered);
			} catch (error) {
				console.error('Error al obtener certificados:', error);
			} finally {
			}
		};

		if (country) {
			fetchCertificados();
		}
	}, [country]);

	const certificaciones: Certification[] = certificados.map((cert) => ({
		name: cert.title,
		price: Number(cert.total_price.replace(/[^\d]/g, '')), // admite decimales
		product_code: cert.product_code,
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

	return (
		<div>
			<h2 className='mb-4 text-lg font-semibold'>Certificaciones</h2>
			<ul className='space-y-3'>
				{certificaciones.map((cert: any) => (
					<li key={cert.name} className='flex items-center justify-between'>
						<label className='flex items-center gap-3'>
							<input
								type='checkbox'
								checked={isSelected(cert)}
								onChange={() => toggleCertification(cert)}
								className='w-4 h-4 text-[#9200AD] border-[#9200AD] focus:ring-[#9200AD]'
							/>
							<span className='text-sm text-[#392C35] w-[200px]'>{cert.name}</span>
						</label>
						<span className='text-sm text-[#6474A6] text-right'>{`${currency} $${formatPesoArgentino(cert.price)}`}</span>
					</li>
				))}
			</ul>
			<div className='flex justify-between mt-4'>
				<p>Total Certificaciones</p>
				<span>{`${currency} $${formatPesoArgentino(certificationsTotal)}`}</span>
			</div>
		</div>
	);
};

export default Certificaciones;
