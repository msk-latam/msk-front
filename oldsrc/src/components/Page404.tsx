'use client';
import { usePathname, useRouter } from 'next/navigation';
import ButtonPrimary from './Button/ButtonPrimary';
import Image from 'next/image';
import notFoundImg from '@/public/webp-images/404-msk.webp';

const Page404 = () => {
	const router = useRouter();
	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	const country = match ? `${match[1]}` : '';

	return (
		<div className='nc-Page404 animate-fade-down'>
			<div className='container relative py-16 lg:py-20'>
				{/* HEADER */}
				<header className='text-center max-w-2xl mx-auto space-y-7'>
					<Image src={notFoundImg} alt='No encontrado' className='object-center mx-auto' />
					<h6 className='text-md font-medium font-inter tracking-widest text-violet-wash'>Ha habido un error</h6>
					<h1 className='block text-3xl text-neutral-800 whitespace-pre-wrap dark:text-neutral-200 tracking-wider font-bold'>
						En estos momentos no se <br /> puede abrir esta página
					</h1>
					<ButtonPrimary
						href={country === '' ? `${window.location.origin}` : `${window.location.origin}/${country}`}
						className='mt-4 mr-3 border border-solid border-violet-custom hover:border-red-500'
					>
						Volver al inicio
					</ButtonPrimary>

					<ButtonPrimary
						onClick={() => router.back()}
						className='mt-4 px-5 text-violet-custom bg-transparent border border-solid border-violet-custom hover:border-red-500'
					>
						Atrás
					</ButtonPrimary>
				</header>
			</div>
		</div>
	);
};

export default Page404;
