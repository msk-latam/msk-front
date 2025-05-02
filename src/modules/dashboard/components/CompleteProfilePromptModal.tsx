import Modal from '@/modules/dashboard/components/ui/Modal';
import React from 'react';

interface CompleteProfilePromptModalProps {
	isOpen: boolean;
	onClose: () => void;
	onCompleteNow: () => void; // Function to proceed to the actual edit modal
}

const CompleteProfilePromptModal: React.FC<CompleteProfilePromptModalProps> = ({ isOpen, onClose, onCompleteNow }) => {
	if (!isOpen) return null;

	return (
		<Modal isOpen={isOpen} onClose={onClose} title='¿Por qué completar tu perfil?' size='large'>
			<div className='flex flex-col items-center justify-center'>
				<p className='text-[#6E737C] mb-6 font-light text-center text-lg'>
					Podremos personalizar tu experiencia en MSK con contenido acorde a tus intereses.
				</p>
				<button
					onClick={onCompleteNow}
					className='bg-[#9200AD] hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
				>
					Completar ahora
				</button>
			</div>
		</Modal>
	);
};

export default CompleteProfilePromptModal;
