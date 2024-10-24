'use client';
import AccountPersonalData from '@/components/MSK/account/AccountPersonalData';
import { FC, useContext, useEffect, useState } from 'react';
import { User } from '@/data/types';
import { AuthContext } from '@/context/user/AuthContext';
import InputSkeleton from '@/components/Skeleton/InputSkeleton';
import { useRouter } from 'next/navigation';
import ssr from '@/services/ssr';

export interface PageDashboardProps {
	className?: string;
}

const PageDashboard: FC<PageDashboardProps> = ({ className = '' }) => {
	const router = useRouter();
	const { state, dispatch } = useContext(AuthContext);
	const [user, setUser] = useState<User>({} as User);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		router.prefetch('/');
	}, []);

	useEffect(() => {
		router.prefetch('/iniciar-sesion');
	}, []);

	useEffect(() => {
		if (!user.id) fetchUser();
	}, [state?.profile]);

	const fetchUser = async () => {
		setLoading(true);
		const res = await ssr.getUserData();
		// console.log({ res });
		if (!res.message) {
			if (!res.contact.state) res.contact.state = '';
			setUser(res);
			dispatch({
				type: 'FRESH',
				payload: {
					user: { name: res.name, speciality: res.contact.speciality },
				},
			});
		} else {
			router.push('/iniciar-sesion');
		}
		setLoading(false);
	};

	return (
		<div className={`nc-PageDashboard animate-fade-down ${className}`} data-nc-id='PageDashboard'>
			{isLoading ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
					{[...Array(7)].map((_, index) => (
						<InputSkeleton key={index} />
					))}
				</div>
			) : (
				<AccountPersonalData user={user} setUser={setUser} />
			)}
		</div>
	);
};

export default PageDashboard;
