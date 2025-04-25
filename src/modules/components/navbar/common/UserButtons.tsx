'use client';

import { useAuthStatus } from '@/hooks/useAuthStatus';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FiBell, FiUser } from 'react-icons/fi';
import { mutate } from 'swr';

const UserButtons = () => {
	const { isLoggedIn, isLoading } = useAuthStatus();
	const router = useRouter();
	const params = useParams();
	const lang = params.lang || 'es';

	const handleLogout = async () => {
		try {
			const response = await fetch('/api/auth/logout-c', {
				method: 'POST',
			});

			if (response.ok) {
				console.log('Logout successful');
				mutate('/api/auth/status');
				router.push(`/${lang}/login`);
			} else {
				console.error('Logout failed:', await response.text());
			}
		} catch (error) {
			console.error('Error during logout fetch:', error);
		}
	};

	return (
		<div className='flex items-center gap-3'>
			<button
				className={`text-sm font-medium whitespace-nowrap rounded-[38px] px-6 py-3 transition-colors duration-300 text-gray-800 border border-gray-500 hover:bg-gray-300`}
				onClick={handleLogout}
			>
				Cerrar sesión
			</button>
			<Link href='/login?form=registerForm'>
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
