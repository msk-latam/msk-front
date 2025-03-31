import ButtonPrimary from '@/components/Button/ButtonPrimary';
import ButtonSecondary from '@/components/Button/ButtonSecondary';
import NcModal from '@/components/NcModal/NcModal';
import { AuthContext } from '@/context/user/AuthContext';
import { UTMAction } from '@/context/utm/UTMContext';
import { utmInitialState, utmReducer } from '@/context/utm/UTMReducer';
import { FC, useContext, useEffect, useReducer, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
	const [_, dispatchUTM] = useReducer(utmReducer, utmInitialState);
	const pathname = usePathname();

	const [loading, setLoading] = useState(false);

	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	let country = match ? `${match[1]}` : '';

	if (country === 'mi') {
		country = '';
	}

	const handleLogout = async () => {
		setLoading(true);
		try {
			dispatchUTM(clearUTMAction);
			dispatch({ type: 'LOGOUT' });
			router.push(`${window.location.origin}/${country}`);
			onClose();
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};

	useEffect(() => {
		const isCountryRoute = /^\/[a-z]{2}\//.test(pathname);
		if (isCountryRoute) {
			onClose();
		}
		setTimeout(() => {
			setLoading(false);
		}, 3000); // Espera 300ms o el tiempo que tarde el modal en cerrarse completamente
	}, [pathname]);

	return (
		<div className='flex flex-col items-center justify-center gap-3'>
			<p className='raleway text-lg'>Estás saliendo de tu cuenta.</p>
			<ButtonSecondary
				onClick={handleLogout}
				sizeClass='py-3 '
				className='border-solid border-1 border-primary-6000 text-primary-6000 logout-button w-[160px]'
				bordered
			>
				{loading ? (
					<div className='flex items-center justify-center gap-2'>
						<svg
							className='animate-spin h-5 w-5 text-primary-6000'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
						>
							<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
							<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'></path>
						</svg>
					</div>
				) : (
					'Confirmar'
				)}
			</ButtonSecondary>
			<ButtonPrimary onClick={() => setShow(false)} sizeClass='py-3 ' className='font-semibold logout-button w-[160px]'>
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
			renderContent={() => signOutContent({ setShow: handleCloseModal, onClose })}
		/>
	);
};

export default ModalSignOut;
