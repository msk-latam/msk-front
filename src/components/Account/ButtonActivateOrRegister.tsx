import { FC, useContext, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { hasText } from '@/lib/account';
import { GlobalStateContext } from '@/app/[lang]/mi-perfil/GlobalStateContext';

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
  const { state, dispatch1 } = useContext(GlobalStateContext);
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

  console.log(status, 'de button activate');
  console.log(state, 'estado global desde ButtonActivateOrRegister');

  // const globalStatus = state.statuses.status;
  // console.log(globalStatus);

  // console.log(hasText(globalStatus));

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
