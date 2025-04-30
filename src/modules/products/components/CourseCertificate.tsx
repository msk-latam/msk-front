'use client';

import { useCourseCertificate } from '../hooks/useCourseCertificate';
import SkeletonLoader from '../skeletons/CourseCertificateSkeleton'; // Import the skeleton loader

type Props = {
	slug: string;
	lang: string;
};

export default function CourseCertificate({ slug, lang }: Props) {
	const { data: hasCertificate, loading, error } = useCourseCertificate(slug, lang);

	if (loading || error) {
		return <SkeletonLoader />; // Show skeleton loader when loading or error
	}

	if (!hasCertificate) {
		return null; // harcodeado para QA
	}

	return (
		<section className='bg-white text-center md:text-left w-full rounded-[38px] md:py-10 md:px-9 px-6 py-12'>
			<h2 className='text-2xl md:text-[34px] font-raleway font-medium mb-6'>Obtén tu Certificado Médico Profesional</h2>

			<div className='flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-9'>
				{/* Imagen */}
				<div className='flex justify-center md:justify-start'>
					<img
						src='/images/productpage/certificado-mockup.svg'
						alt='Certificado del curso'
						className='rounded-lg shadow-md w-full max-w-xs md:max-w-sm'
					/>
				</div>

				{/* Texto */}
				<div className='font-raleway font-normal text-[#1A1A1A] md:text-lg md:leading-loose text-sm md:max-w-xl md:flex-1'>
					<p className='mb-4'>
						Al finalizar este curso, obtendrás un <strong>certificado de validez internacional</strong> sobre los nuevos
						conocimientos y habilidades clínicas adquiridos, potenciando tu perfil profesional.
					</p>
					<p>¡Podrás compartirlo de forma digital en LinkedIn o imprimirlo para sumarlo a tu consultorio!</p>
				</div>
			</div>
		</section>
	);
}
