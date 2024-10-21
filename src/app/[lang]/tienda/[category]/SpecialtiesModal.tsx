import { useStoreFilters } from '@/context/storeFilters/StoreProvider';
import { Specialty } from '@/data/types';
import { slugifySpecialty } from '@/lib/Slugify';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	fixed?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, fixed }) => {
	if (!isOpen) return null;

	let specialties: Specialty[] = useStoreFilters().specialties;
	console.log(specialties);

	return (
		<div className={`${fixed || ''} inset-0 flex items-center justify-center z-50 backdrop-blur-[2px] rounded-3xl`}>
			<div className={`${fixed || ''} inset-0 bg-black opacity-50`} onClick={onClose}></div>
			<div className='bg-white rounded-3xl shadow-lg z-10 relative max-h-[90vh] overflow-y-auto'>
				<div className='flex justify-center items-center p-4'>
					<h2 className='text-xl font-bold text-center flex-1'>Especialidades</h2>
					<button className='text-gray-600 text-2xl font-bold' onClick={onClose}>
						&times;
					</button>
				</div>
				<hr className=' border-t border-gray-300' />
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8 '>
					{specialties
						.filter((specialty) => specialty.name !== 'Oftalmología')
						.sort((a, b) => a.name.localeCompare(b.name))
						.map((specialty, index) => (
							<Link key={index} href={`/tienda/${slugifySpecialty(specialty.name)}`} onClick={onClose}>
								<div className='flex gap-2 items-center'>
									<div className='flex items-center justify-center'>
										<Image
											src={`/images/medicina-icons/${slugifySpecialty(specialty.name).toLowerCase()}.png`}
											alt={`${specialty.name} icon`}
											width={50}
											height={50}
											className='mb-2'
										/>
									</div>
									<span className='hover:text-red-500 cursor-pointer text-center'>{specialty.name}</span>
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
};

export default Modal;
