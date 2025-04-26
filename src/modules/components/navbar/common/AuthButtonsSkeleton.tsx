const AuthButtonsSkeleton = () => {
	return (
		<div className='flex items-center gap-3 animate-pulse'>
			{/* Skeleton for 'Crear cuenta' button */}
			<div className='bg-gray-300 rounded-full px-6 py-3 h-[42px] w-[120px]'></div>
			{/* Skeleton for 'Iniciar sesión' button */}
			<div className='bg-gray-300 rounded-full px-6 py-3 h-[42px] w-[120px]'></div>
		</div>
	);
};

export default AuthButtonsSkeleton;
