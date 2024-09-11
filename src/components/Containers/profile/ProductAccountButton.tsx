import React, { FC, useContext, useState } from 'react';
import Link from 'next/link';
import CancelTrialModal from '@/components/Modal/CancelTrial';
import ButtonActivateOrRegister from '@/components/Account/ButtonActivateOrRegister';
import Image from 'next/image';
import { UserCourseProgress } from '@/data/types';
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

// ProductAccountButton Component
export const ProductAccountButton: FC<{
  product: UserCourseProgress;
  onRequest: boolean;
  isRunning: boolean;
  onClick: () => void;
}> = ({ product, onRequest, isRunning, onClick }) => {
  const [showCancelTrial, setShowCancelTrial] = useState(false);
  const { state, dispatch1 } = useContext(GlobalStateContext);

  const { status } = product;
  const mappedStatus = state.statuses[product.product_code]
    ? state.statuses[product.product_code]
    : product.status;
  // const { isDisabled } = statusCourse(status);
  const { isDisabled } = statusCourse(mappedStatus);
  const statusOV = statusOrdenVenta(product?.ov, mappedStatus);
  const textStatus = statusOV.isDisabled
    ? statusOV.disabledText
    : statusOV.hasText;
  const iconStatus = getStatusIcon(textStatus);

  console.log(textStatus, 'TEXT STATUS');

  console.log(product, 'PRODUCT');
  console.log(status, 'STATUS');
  console.log(state, 'STATE');

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
          isDisabledActivate={isDisabled || statusOV.isDisabled}
          handleActivateClick={onClick}
          whenActivate={
            onRequest ||
            isRunning ||
            (typeof textStatus === 'string' &&
              textStatus.includes('Listo para enrolar'))
          }
          status={status}
          // status={state.statuses.status}
          productSlug={product.slug}
          isPreventa={statusOV.hasText === 'Preventa'}
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
