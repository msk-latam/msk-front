import ButtonPrimary from '@/components/Button/ButtonPrimary';
import { FetchSingleProduct } from '@/data/types';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { cedenteTropos } from './LandingsVariables';
import bannerCTA from '@/public/webp-images/landing-images/banner-temario-CTA.png';
import NcModal from '@/components/NcModal/NcModal';
import ContactFormSection from '@/components/MSK/ContactForm';
import api from '@/services/api';

interface LandingProps {
	product: FetchSingleProduct;
	country: string;
}

const LandingTemarioCTA: FC<LandingProps> = ({ product, country }) => {
	const [showDownloadModal, setShowDownloadModal] = useState(false);
	const [isFormSent, setIsFormSent] = useState(false);
	const cedenteImage =
		product.params.slug === 'medicina-interna'
			? '/webp-images/landing-icons/cedente-tropos.svg'
			: '/webp-images/landing-icons/cedente-accsap.svg';

	const onOpenDownloadModal = () => {
		setIsFormSent(false);
		setShowDownloadModal(true);
	};

	const linkTemario =
		product.params.slug === 'medicina-interna'
			? 'https://ar.wp.msklatam.com/wp-content/uploads/2023/07/Medicina-interna-1.pdf'
			: 'https://ar.wp.msklatam.com/wp-content/uploads/2022/09/ACCSAP-6.pdf';

	const slug = product.params.slug;
	const updateFormSent = async (value: boolean, body: any) => {
		try {
			if (linkTemario && slug) await api.temarioDownload(body, linkTemario, slug);
			setIsFormSent(value);
		} catch (e) {
			// console.log("error", e);
		}
	};

	const aprendeTitle =
		slug === 'medicina-interna'
			? 'Aprende con 60 módulos de material actualizado '
			: 'Aprende con 130 temas divididos en 10 módulos';

	return (
		<>
			<div
				className='border border-[#DBDBDB] rounded-lg p-4 lg:py-6 lg:px-12 flex flex-col lg:flex-row lg:justify-between lg:items-center bg-cover bg-center'
				style={{ backgroundImage: `url(${bannerCTA.src})` }}
			>
				{/* Texto a la izquierda */}
				<div className='text-[#392C35] font-light !font-raleway text-base lg:text-2xl '>
					<p className='w-52 lg:w-auto text-xl'>{aprendeTitle}</p>
					<p className='mr-14 lg:mr-0 text-xl'>¡Obtén el temario y descubre todo su contenido!</p>
					<div className='flex flex-col lg:flex-row relative z-0'>
						<div className='flex gap-1  py-6 lg:py-6 lg:pr-4 lg:pl-0 justify-start  items-center  lg:w-auto  lg:translate-x-0 absolute lg:static top-0 h-[100px] '>
							<div className='rounded-full p-2 bg-white'>
								<Image src={cedenteImage} alt='Cedente' width={50} height={50} className='rounded-full' />
							</div>

							<div className='flex flex-col '>
								<p className='text-[#6474A6] font-bold font-inter text-sm'>CEDENTE</p>
								<div className='flex gap-1'>
									<p className='font-inter font-medium text-[#392C35] text-base'>
										{product.lista_de_cedentes?.[0]?.post_title}
									</p>
									<p className='font-inter font-medium text-[#392C35] text-base'> {cedenteTropos(product)} </p>
								</div>
							</div>
						</div>

						<div className='h-[170px] lg:h-0'></div>

						<div className=' flex gap-6 bg-opacity-50 px-2  lg:p-6 justify-start lg:justify-center items-center  lg:w-auto  lg:translate-x-0 absolute lg:static top-[100px] '>
							<div className=''>
								<p className='text-[#6474A6] font-inter font-bold text-sm'>DURACIÓN</p>
								<div className='flex gap-2'>
									<p className='font-inter font-medium text-[#392C35] text-base'>{product.details.duration.value} horas</p>
									{/* <p>|</p> */}
									{/* <p>{product.cantidad_modulos} módulos</p> */}
								</div>
							</div>
							<div>
								<p className='text-[#6474A6] font-bold font-inter text-sm'>Modalidad</p>
								<p className='font-inter font-medium text-[#392C35] text-base'>100% online</p>
							</div>
						</div>
					</div>
				</div>

				{/* Botón a la derecha */}
				<ButtonPrimary onClick={() => onOpenDownloadModal()} className='!text-lg !font-bold !py-2'>
					Descargar temario
				</ButtonPrimary>
			</div>
			<div>
				<NcModal
					isOpenProp={showDownloadModal}
					onCloseModal={() => {
						setShowDownloadModal(false);
					}}
					renderTrigger={() => {
						return null;
					}}
					contentExtraClass={'max-w-screen-md'}
					renderContent={() => (
						<div>
							{isFormSent ? (
								<div
									className='thank-you-wrp py-16'
									style={{
										display: isFormSent ? 'block' : 'none',
									}}
								>
									<h1 className='text-center thank-you-title'>¡Listo!</h1>
									<div className='max-w-2xl mx-auto space-y-6'>
										<p className='text-center text-natural-600 md:px-20 px-8'>
											Ya descargaste el temario completo de este curso en tu dispositivo
											<ButtonPrimary onClick={() => setShowDownloadModal(false)}>Seguir navegando</ButtonPrimary>
										</p>
									</div>
								</div>
							) : (
								<ContactFormSection
									updateFormSent={updateFormSent}
									submitText='Descargar'
									submitReason='Solicitud de temario'
									hideContactPreference
									isDownload
									hideHeader
									hideSideInfo
								/>
							)}
						</div>
					)}
					modalTitle={isFormSent ? ' ' : 'Descarga el temario completo'}
				/>
			</div>
		</>
	);
};

export default LandingTemarioCTA;
