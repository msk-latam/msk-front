import React, { FC, useContext, useState } from 'react';
import Link from 'next/link';
import CancelTrialModal from '@/components/Modal/CancelTrial';
import ButtonActivateOrRegister from '@/components/Account/ButtonActivateOrRegister';
import Image from 'next/image';
import { User, UserCourseProgress } from '@/data/types';
import { getStatusIcon, statusCourse, statusOrdenVenta } from '@/lib/account';
import { GlobalStateContext } from '@/app/[lang]/mi-perfil/GlobalStateContext';

// CancelTrialButton Component
export const CancelTrialButton: FC<{
  onClick: () => void;
  text?: string;
  linkText: string;
}> = ({ onClick, text = '', linkText }) => {
  return (
    <div className='ml-1 inline-block'>
      {text && `- ${text} `}
      <Link
        href='#'
        onClick={onClick}
        className='underline text-violet-custom hover:text-violet-custom'
      >
        {linkText}
      </Link>
    </div>
  );
};

export const ProductAccountButton: FC<{
  product: UserCourseProgress;

  user: User;
}> = ({ product, user }) => {
  const [showCancelTrial, setShowCancelTrial] = useState(false);
  const { state, dispatch1 } = useContext(GlobalStateContext);

  const { status } = product;
  const mappedStatus = state.statuses[product.product_code]
    ? state.statuses[product.product_code]
    : product.status;

  const { isDisabled } = statusCourse(mappedStatus);
  const statusOV = statusOrdenVenta(product?.ov, mappedStatus);
  const textStatus = statusOV.isDisabled
    ? statusOV.disabledText
    : statusOV.hasText;
  const iconStatus = getStatusIcon(textStatus);

  return (
    <div className='product-button-wrp'>
      <div className='product-button-footer text-grey-course '>
        <div className='coursee-clock'>
          <Image {...iconStatus} alt={textStatus as string} />
          <span className='ml-2'>
            {textStatus === '' ? status : textStatus}
            {/* {statusOV.hasText === 'Prueba' && (
              <CancelTrialButton
                onClick={() => setShowCancelTrial(true)}
                linkText='Dar de baja'
              />
            )} */}
          </span>
        </div>
        <ButtonActivateOrRegister
          product={product}
          user={user}
          isPreventa={statusOV.hasText === 'Preventa'}
          isDisabled={isDisabled}
        />
      </div>

      <CancelTrialModal
        isOpenProp={showCancelTrial}
        item={product}
        onCloseModal={() => setShowCancelTrial(false)}
      />
    </div>
  );
};
