'use client';

import React, { useEffect, useState } from 'react';
import { Certification, useCheckout } from '../CheckoutContext';

const Certificaciones = ({ product, country }: any) => {
	const { certifications, setCertifications, activeStep } = useCheckout();
	const [certificados, setCertificados] = useState<any[]>([]);

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

	const decodeHtml = (htmlString: string) => {
		const txt = document.createElement('textarea');
		txt.innerHTML = htmlString;
		return txt.value;
	};

	const isFree = product.prices.total_price === '0' || product.prices.total_price === '';
	const mskCert: Certification = {
		name: 'MSK Digital',
		price: isFree ? 25000 : 0,
		product_code: 2000012,
	};
	useEffect(() => {
		if (!isFree) {
			toggleCertification(mskCert);
		}
	}, [isFree]);

	return (
		<div>
			{
				<>
					<h2 className='mb-4 text-lg font-semibold'>Certificaciones</h2>
					<ul className='space-y-3'>
						{activeStep !== 3 && (
							<>
								{!isFree && (
									<li key={mskCert.name} className='flex items-center justify-between'>
										<label className='flex items-center gap-3'>
											<input
												type='checkbox'
												checked={!isFree || isSelected(mskCert)}
												onChange={() => toggleCertification(mskCert)}
												disabled={!isFree}
												className='w-4 h-4 text-[#9200AD] border-[#9200AD] focus:ring-[#9200AD]'
											/>
											<span className='text-sm text-[#392C35] w-[200px]'>{decodeHtml(mskCert.name)}</span>
										</label>
										<span className={`text-sm ${isFree ? 'text-[#6474A6]' : 'text-green-600'} text-right`}>
											{isFree ? `${currency} $${formatPesoArgentino(mskCert.price)}` : 'Bonificado'}
										</span>
									</li>
								)}

								{/* Otras certificaciones */}
								{certificaciones.map((cert: any) => (
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
										<span className='text-sm text-[#6474A6] text-right'>
											{`${currency} $${formatPesoArgentino(cert.price)}`}
										</span>
									</li>
								))}
							</>
						)}
					</ul>
					<div className='flex justify-between mt-4'>
						<p>Total Certificaciones</p>
						<span>{`${currency} $${formatPesoArgentino(certificationsTotal)}`}</span>
					</div>
				</>
			}
		</div>
	);
};

export default Certificaciones;
