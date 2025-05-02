// components/BurgerButton.tsx
interface BurgerButtonProps {
	isOpen: boolean;
	onClick: () => void;
	color?: string;
	uniformWidth?: boolean;
}

export const BurgerButton = ({ isOpen, onClick, color = 'white', uniformWidth = false }: BurgerButtonProps) => {
	const commonClass = `absolute h-[1.8px] rounded-full transition-opacity duration-200 ease-in-out`;
	const style = { backgroundColor: color };

	return (
		<button aria-label='Menú' className='relative w-6 h-5 flex items-center justify-center z-50' onClick={onClick}>
			{/* Superior */}
			<span className={`${commonClass} w-5 top-0 ${isOpen ? 'opacity-0' : 'opacity-100'}`} style={style} />

			{/* Medio */}
			<span
				className={`
					${commonClass}
					${isOpen ? 'opacity-0' : 'opacity-100'}
					${uniformWidth ? 'w-5' : 'left-0.5 w-3'}
				`}
				style={{ ...style, top: '50%', transform: 'translateY(-50%)' }}
			/>

			{/* Inferior */}
			<span className={`${commonClass} w-5 bottom-0 ${isOpen ? 'opacity-0' : 'opacity-100'}`} style={style} />
		</button>
	);
};
