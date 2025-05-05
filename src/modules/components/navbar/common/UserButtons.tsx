'use client';

import { useLogout } from '@/hooks/useLogout';
import Link from 'next/link';
import { FiBell, FiUser } from 'react-icons/fi';
import { urlFormat } from '@/utils/urlFormat';
const UserButtons = () => {
	const { logout } = useLogout();

	return (
		<div className='flex items-center gap-3'>
			<button
				className={`text-sm font-medium whitespace-nowrap rounded-[38px] px-6 py-3 transition-colors duration-300 text-gray-800 border border-gray-500 hover:bg-gray-300`}
				onClick={logout}
			>
				Cerrar sesión
			</button>
			<Link href={urlFormat('/dashboard')}>
				<button className='px-4 py-3.5'>
					<FiUser className='scale-125' />
				</button>
			</Link>
			<button className='bg-[#DBDDE2] rounded-full p-4'>
				<FiBell className='scale-125' />
			</button>
		</div>
	);
};

export default UserButtons;
