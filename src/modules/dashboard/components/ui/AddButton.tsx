import AddIcon from '@/dashboard/assets/icons/AddIcon';
import React from 'react';

interface AddButtonProps {
	onClick: () => void;
	filled?: boolean;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, filled = false }) => {
	const baseClasses = 'w-9 h-9 flex items-center justify-center cursor-pointer rounded-full  transition-all';
	const colorClasses = filled ? 'bg-[#9200AD] hover:bg-[#7a0092] text-white' : 'bg-white text-[#4F5D89] hover:bg-gray-100';

	return (
		<button onClick={onClick} className={`${baseClasses} ${colorClasses}`} aria-label='Editar usuario'>
			<div className='w-5 h-5'>
				<AddIcon />
			</div>
		</button>
	);
};

export default AddButton;
