import React, { useEffect } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	size?: 'small' | 'medium' | 'large';
	title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, size = 'medium', title }) => {
	// Prevent scrolling on body when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	// Close modal on ESC key
	useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};
		window.addEventListener('keydown', handleEsc);
		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, [onClose]);

	if (!isOpen) return null;

	// Define size classes
	const sizeClasses = {
		small: 'max-w-md',
		medium: 'max-w-2xl',
		large: 'max-w-4xl',
	};

	return (
		<div className='fixed inset-0 z-[9999]' style={{ isolation: 'isolate' }}>
			<div className='fixed inset-0 flex items-center justify-center p-4 md:p-6'>
				{/* Backdrop */}
				<div className='fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity' onClick={onClose}></div>

				{/* Modal */}
				<div
					className={`relative ${sizeClasses[size]} w-full bg-white rounded-3xl shadow-lg transition-all p-6 md:p-8`}
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header with close button */}
					<div className='flex justify-between items-center mb-4'>
						{title && <h2 className='text-2xl font-medium text-center flex-grow'>{title}</h2>}
						<button
							onClick={onClose}
							className='p-2 rounded-full hover:bg-gray-100 transition-colors absolute right-4 top-4'
							aria-label='Close'
						>
							<svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M17.1328 7.56641L7.13281 17.5664M7.13281 7.56641L17.1328 17.5664'
									stroke='black'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</div>

					{/* Modal content wrapper for scrolling */}
					<div className='overflow-y-auto scrollbar-none max-h-[calc(90vh-8rem)]'>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
