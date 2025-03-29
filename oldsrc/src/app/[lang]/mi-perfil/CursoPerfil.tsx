import DateProductExpiration from '@/components/Account/DateProductExpiration';
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList';
import { CancelTrialButton, ProductAccountButton } from '@/components/Containers/profile/ProductAccountButton';
import CancelTrialModal from '@/components/Modal/CancelTrial';
import { CountryContext } from '@/context/country/CountryContext';
import { User, UserCourseProgress } from '@/data/types';
import Image from 'next/image';
import { FC, useContext, useRef, useState } from 'react';
import darDeBaja from '@/public/images/icons/darDeBaja.svg';
import CentroAyudaLink from '@/components/CentroAyudaLink/CentroAyudaLink';

interface Props {
	product: UserCourseProgress;
	user: User;
}

const CursoPerfil: FC<Props> = ({ product, user }) => {
	const { countryState } = useContext(CountryContext);
	const productExpiration = useRef(new Date(product.expiration));
	const productExpirationEnroll = useRef(new Date(product.limit_enroll));
	const [showCancelTrial, setShowCancelTrial] = useState(false);
	const [showAll, setShowAll] = useState(false);

	// const handleToggleShowAll = () => {
	//   setShowAll(!showAll);
	// };

	const imageUrl = product.thumbnail.high?.replace(`${'mx' || countryState.country}.`, '');

	const visibleCategories = showAll ? product.categories : product.categories.slice(0, 1);

	return (
		<div className='flex flex-col bg-white shadow-lg rounded-sm overflow-hidden w-full  h-[400px] mb-8'>
			<div className='relative w-full h-[180px]'>
				<Image src={imageUrl} alt='course-img' layout='fill' objectFit='cover' className='w-full h-full' />
			</div>
			<div className='p-4 flex flex-col justify-between flex-grow '>
				<CategoryBadgeList
					categories={visibleCategories}
					color='yellow'
					isCourse={true}
					textSize='text-[11px]'
					itemClass='!py-0.5 !px-1'
				/>

				<div className='group'>
					<h3 className='text-lg font-bold my-2 leading-tight line-clamp-2 group-hover:line-clamp-none'>{product.title}</h3>
				</div>
				<div className='mt-auto'>
					{product.expiration ? (
						<DateProductExpiration
							date={productExpiration.current}
							text='Fecha de expiración'
							user={user.contact}
							product={product}
						/>
					) : (
						<DateProductExpiration
							date={productExpirationEnroll.current}
							text='Fecha límite de activación'
							user={user.contact}
							product={product}
						/>
					)}
					{product.ov === 'Baja' && <CentroAyudaLink addClassNames='my-2' />}
					{product.ov === 'Trial' && product.status === 'Sin enrolar' && (
						<div className='flex gap-1'>
							<Image src={darDeBaja} alt='Dar de Baja' height={15} width={15} />
							<CancelTrialButton onClick={() => setShowCancelTrial(true)} linkText='Dar de baja' />
						</div>
					)}
				</div>
			</div>
			{product ? <ProductAccountButton product={product} user={user} /> : null}
			<CancelTrialModal isOpenProp={showCancelTrial} item={product} onCloseModal={() => setShowCancelTrial(false)} />
		</div>
	);
};

export default CursoPerfil;
