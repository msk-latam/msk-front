import ButtonPrimary from '@/components/Button/ButtonPrimary';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import NcModal from '@/components/NcModal/NcModal';
import { AuthContext } from '@/context/user/AuthContext';
import { UTMAction } from '@/context/utm/UTMContext';
import { utmInitialState, utmReducer } from '@/context/utm/UTMReducer';
import { FC, useContext, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '@/utils/Loading';

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => any;
}

const signOutContent: FC<Props> = ({ setShow, onClose }) => {
  const { dispatch } = useContext(AuthContext);
  const router = useRouter();
  const clearUTMAction: UTMAction = {
    type: 'CLEAR_UTM',
    payload: {} as any,
  };
  const [utmState, dispatchUTM] = useReducer(utmReducer, utmInitialState);

  const [hasRedirected, setHasRedirected] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true); // Activar estado de carga
    try {
      // Aquí podrías realizar alguna llamada API o lógica adicional
      dispatchUTM(clearUTMAction);
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false); // Desactivar estado de carga
      onClose(); // Cerrar el modal después de redirigir
      router.push('/');
    }
  };

  // const handleLogout = () => {
  //   setLoading(true);
  //   // onClose();
  //   setHasRedirected(true);
  //   router.push('/');
  // };

  // useEffect(() => {
  //   if (hasRedirected) {
  //     dispatchUTM(clearUTMAction);
  //     dispatch({ type: 'LOGOUT' });
  //   }
  //   setHasRedirected(false);
  //   setLoading(false);
  // }, [hasRedirected]);

  // if (loading) {
  //   return <Loading />;
  // }

  useEffect(() => {
    router.prefetch('/');
  }, []);

  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      <p className='raleway text-lg'>Estás saliendo de tu cuenta.</p>
      <ButtonSecondary
        onClick={handleLogout}
        sizeClass='py-3 '
        className='border-solid border-1 border-primary-6000 text-primary-6000 logout-button w-[160px]'
        bordered
      >
        {loading ? 'Cargando...' : 'Confirmar'}
      </ButtonSecondary>
      <ButtonPrimary
        onClick={() => setShow(false)} // Triggeamos setShow(false) al hacer clic
        sizeClass='py-3 '
        className='font-semibold logout-button w-[160px]'
      >
        Cancelar
      </ButtonPrimary>
    </div>
  );
};

interface ModalProps {
  open?: boolean;
  onClose: () => any;
}

const ModalSignOut: FC<ModalProps> = ({ open = false, onClose }) => {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  const handleCloseModal = () => {
    setShow(false);
    onClose();
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={handleCloseModal}
      renderTrigger={() => {
        return null;
      }}
      contentExtraClass='signout-modal'
      renderContent={() =>
        signOutContent({ setShow: handleCloseModal, onClose })
      }
    />
  );
};

export default ModalSignOut;
