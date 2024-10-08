'use client';

import { CountryContext } from '@/context/country/CountryContext';
import { AuthContext } from '@/context/user/AuthContext';
import { User } from '@/data/types';
import ssr from '@/services/ssr';
import { FC, useContext, useEffect, useState } from 'react';
import { StatusCardProps } from './StatusCard';

import ButtonPrimary from '@/components/Button/ButtonPrimary';
import DocumentStatusSection from './DocumentStatusSection';
import PageDocumentosHeader from './PageDocumentosHeader';

const pageDocumentos: FC = () => {
	const { state, dispatch } = useContext(AuthContext);
	const [user, setUser] = useState<User>({} as User);
	const { countryState: countryState } = useContext(CountryContext);

	const [isLoading, setLoading] = useState(true);

	const fetchUser = async () => {
		setLoading(true);
		const res = await ssr.getUserData();
		if (!res.message) {
			if (!res.contact.state) res.contact.state = '';
			setUser(res);
			dispatch({
				type: 'FRESH',
				payload: {
					user: { name: res.name, speciality: res.contact.speciality },
				},
			});
			setLoading(false);
		} else {
			// history.push("/iniciar-sesion");
		}
	};

	useEffect(() => {
		fetchUser();
	}, [state?.profile]);

	return (
		<>
			<div className='p-6 '>
				<PageDocumentosHeader />
				<DocumentStatusSection />
			</div>
		</>
	);
};

export default pageDocumentos;
