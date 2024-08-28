import DateProductExpiration from '@/components/Account/DateProductExpiration';
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList';
import {
  CancelTrialButton,
  ProductAccountButton,
} from '@/components/Containers/profile/ProductAccountButton';
import CancelTrialModal from '@/components/Modal/CancelTrial';

import { CountryContext } from '@/context/country/CountryContext';
import { STATUS } from '@/data/MSK/statusCourses';
import { User, UserCourseProgress } from '@/data/types';
import useInterval from '@/hooks/useInterval';
import { goToEnroll, goToLMS, statusCourse } from '@/lib/account';
import Image from 'next/image';
import { FC, useContext, useRef, useState } from 'react';
import darDeBaja from '@/public/images/icons/darDeBaja.svg';

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

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const { isDisabled } = statusCourse(product?.status);
  const { isRunning, startWatch } = useInterval(user.email);

  const [onRequest, setOnRequest] = useState<boolean>(false);

  const activeProductRef = useRef(
    product?.status !== 'Inactivo' &&
      product?.status !== 'Expirado' &&
      product?.status !== STATUS.SUSPEND,
  );

  const imageUrl = product.thumbnail.high?.replace(
    `${'mx' || countryState.country}.`,
    '',
  );

  const handleProductAction = async () => {
    if (isProductActive() && activeProductRef.current) {
      setOnRequest(true);
      try {
        if (isProductNotEnrolled()) {
          await handleEnrollment();
        } else {
          navigateToLMS();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setOnRequest(false);
      }
    }
  };

  const isProductActive = () => {
    return product.ov !== 'Baja' && product.ov !== 'Trial suspendido';
  };

  const isProductNotEnrolled = () => {
    return product.status === 'Sin enrolar';
  };

  const handleEnrollment = async () => {
    const response = await goToEnroll(product.product_code, user.email);

    if (response.data[0].code.includes('SUCCESS')) {
      const watching = await startWatch(product.product_code);
      console.log('watching 68', watching);
      console.log(!!watching, { watching });
      setOnRequest(!!watching);
    } else {
      setOnRequest(false);
    }
  };

  const navigateToLMS = () => {
    goToLMS(
      product.product_code,
      product.product_code_cedente as string,
      user.email,
    );
  };

  console.log(product);

  const visibleCategories = showAll
    ? product.categories
    : product.categories.slice(0, 1);

  return (
    <div className='flex flex-col bg-white shadow-lg rounded-sm overflow-hidden w-full  h-[400px] mb-8'>
      <div className='relative w-full h-[180px]'>
        <Image
          src={imageUrl}
          alt='course-img'
          layout='fill'
          objectFit='cover'
          className='w-full h-full'
        />
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
          <h3 className='text-lg font-bold my-2 leading-tight line-clamp-2 group-hover:line-clamp-none'>
            {product.title}
          </h3>
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
          {product.ov === 'Trial' && product.status === 'Sin enrolar' && (
            <div className='flex gap-1'>
              <Image src={darDeBaja} alt='Dar de Baja' height={15} width={15} />
              <CancelTrialButton
                onClick={() => setShowCancelTrial(true)}
                linkText='Dar de baja'
              />
            </div>
          )}
        </div>
      </div>
      {product ? (
        <ProductAccountButton
          product={product}
          onRequest={onRequest}
          isRunning={isRunning}
          onClick={handleProductAction}
        />
      ) : null}
      <CancelTrialModal
        isOpenProp={showCancelTrial}
        item={product}
        onCloseModal={() => setShowCancelTrial(false)}
      />
    </div>
  );
};

export default CursoPerfil;
