import { UserCourseProgress } from '@/data/types';
import { FC, useContext, useRef } from 'react';
import ButtonAccessCourse from './ButtonAccessCourse';
import { colorStatus, goToEnroll, statusCourse, statusOrdenVenta } from '@/lib/account';
import Badge from '@/components/Badge/Badge';
import InfoText from '@/components/InfoText/InfoText';
import CentroAyudaLink from '@/components/CentroAyudaLink/CentroAyudaLink';
import DateProductExpiration from './DateProductExpiration';
import NcImage from '@/components/NcImage/NcImage';
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList';
import ButtonOffTrial from './ButtonOffTrial';
import { AuthContext } from '@/context/user/AuthContext';
import ButtonAccessOrSignCourse from './ButtonAccessOrSignCourse';

interface DesktopCourseItemProps {
	item: UserCourseProgress;
	email: string;
	goToLMS: (product_code: number, cod_curso: string, email: string) => Promise<void>;
}

const DesktopCourseItem: FC<DesktopCourseItemProps> = ({ item, email, goToLMS }) => {
	const { isDisabled } = statusCourse(item.status);
	const statusOV = statusOrdenVenta(item.ov);
	const productExpiration = useRef(new Date(item.expiration));
	const productExpirationEnroll = useRef(new Date(item.limit_enroll));
	const trialName = item.ov.includes('suspendido') ? 'Prueba cancelada' : 'Prueba';
	const { state: authState } = useContext(AuthContext);

	// console.log(statusOV, 'status ov');
	// console.log(item, 'item status');

	return (
		<tr key={item.product_code}>
			<td className='px-6 py-4'>
				<div className='flex items-center w-96 lg:w-auto max-w-md overflow-hidden'>
					<NcImage
						containerClassName='flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14'
						src={item.featured_image}
						width='1000'
						height='1000'
						alt=''
					/>
					<div className='flex-wrap'>
						<div className='ml-4 flex-grow'>
							<span className='inline-flex line-clamp-2 font-normal  dark:text-neutral-300'>{item.title || '-'}</span>
						</div>
						{item.ov !== 'Baja' && item.ov !== 'Trial suspendido' && (
							<>
								{item.expiration ? (
									<DateProductExpiration
										date={productExpiration.current}
										text='Fecha de expiración'
										product={item}
										user={authState.profile}
									/>
								) : (
									<DateProductExpiration
										date={productExpirationEnroll.current}
										text='Fecha límite de activación'
										product={item}
										user={authState.profile}
									/>
								)}
							</>
						)}

						{(isDisabled && !item?.status?.includes('Listo para enrolar')) ||
							(statusOV.isDisabled && <CentroAyudaLink addClassNames='mt-2 ml-3' />)}

						{item?.status?.includes('Listo para enrolar') && (
							<InfoText addClassNames='mt-2 ml-3' text='¿No ves resultados? Intenta refrescar la pantalla.' />
						)}
					</div>
				</div>
			</td>
			<td className='px-6 py-4 status-badge'>
				{item.ov.includes('Trial') ? (
					<CategoryBadgeList categories={[trialName]} isTrial={item.ov.includes('Trial')} />
				) : (
					<Badge
						name={statusOV.isDisabled ? statusOV.disabledText : statusOV.hasText}
						color={colorStatus(statusOV.isDisabled ? statusOV.hasText : item.status)}
						textSize='text-sm'
					/>
				)}
			</td>
			<td className='px-6 py-4  text-xs text-neutral-500 dark:text-neutral-400'>
				<span className='text-sm'> {item.avance ? item.avance : 0}%</span>
			</td>
			<td className='px-4'>
				<div className='w-[110px] my-2'>
					<ButtonAccessOrSignCourse email={email} goToEnroll={goToEnroll} goToLMS={goToLMS} item={item} />
				</div>
			</td>
		</tr>
	);
};

export default DesktopCourseItem;
