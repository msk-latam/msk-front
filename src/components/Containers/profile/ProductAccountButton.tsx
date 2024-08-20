import React, { FC, useState } from 'react';
import Link from 'next/link';
import CancelTrialModal from '@/components/Modal/CancelTrial';
import ButtonActivateOrRegister from '@/components/Account/ButtonActivateOrRegister';
import Image from 'next/image';
import { UserCourseProgress } from '@/data/types';
import { getStatusIcon, statusCourse, statusOrdenVenta } from '@/lib/account';

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
  const { status } = product;
  const { isDisabled } = statusCourse(status);
  const statusOV = statusOrdenVenta(product?.ov, status);
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
            {statusOV.hasText === 'Prueba' && (
              <CancelTrialButton
                onClick={() => setShowCancelTrial(true)}
                linkText='Dar de baja'
              />
            )}
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
