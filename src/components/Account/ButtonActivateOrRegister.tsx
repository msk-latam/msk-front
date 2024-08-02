import { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { hasText } from '@/lib/account';

interface ButtonActivateOrRegisterProps {
  isDisabledActivate: boolean;
  handleActivateClick: () => void;
  whenActivate: boolean;
  status: string;
  productSlug: string | undefined;
}

const ButtonActivateOrRegister: FC<ButtonActivateOrRegisterProps> = ({
  isDisabledActivate,
  handleActivateClick,
  whenActivate,
  status,
  productSlug,
}) => {
  const router = useRouter();

  useEffect(() => {
    console.log('Component re-rendered');
    console.log('isDisabledActivate:', isDisabledActivate);
    console.log('whenActivate:', whenActivate);
    console.log('status:', status);
    console.log('productSlug:', productSlug);
  }, [isDisabledActivate, whenActivate, status, productSlug]);
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
