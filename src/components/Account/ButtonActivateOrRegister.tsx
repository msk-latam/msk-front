
import { FC, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { hasText } from '@/lib/account';

interface ButtonActivateOrRegisterProps {
  isDisabledActivate: boolean;
  handleActivateClick: () => void;
  whenActivate: boolean;
  status: string;
  productSlug: string | undefined;

  isPreventa: boolean;

}

const ButtonActivateOrRegister: FC<ButtonActivateOrRegisterProps> = ({
  isDisabledActivate,
  handleActivateClick,
  whenActivate,
  status,
  productSlug,

  isPreventa,
}) => {
  const router = useRouter();

  const disabledRender = () => {
    return (
      <button
        className='course-network text-primary font-bold disabled:text-grey-disabled disabled:cursor-not-allowed disabled:opacity-70'
        onClick={() => {}}
        disabled={true}
      >
        Activar
      </button>
    );
  };

  if (isPreventa) {
    return disabledRender();
  }


  return (
    <>
      {isDisabledActivate ? (
        <button
          className='course-network text-primary font-bold disabled:text-grey-disabled disabled:cursor-not-allowed disabled:opacity-70'
          onClick={() => router.push(`/curso/${productSlug}`)}
        >
          Inscríbete
        </button>
      ) : (
        <button
          className='course-network text-primary font-bold disabled:text-grey-disabled disabled:cursor-not-allowed disabled:opacity-70'
          onClick={handleActivateClick}
          disabled={isDisabledActivate}
        >
          {whenActivate ? (
            <div className='flex justify-center items-center'>Activando...</div>
          ) : (
            hasText(status)
          )}
        </button>
      )}
    </>
  );
};

export default ButtonActivateOrRegister;
