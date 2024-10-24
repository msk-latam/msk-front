'use client';

import { CountryContext } from '@/context/country/CountryContext';
import { AuthContext } from '@/context/user/AuthContext';
import { Contract, User, UserCourseProgress } from '@/data/types';
import ssr from '@/services/ssr';
import { getUserCourses } from '@/services/user';
import { FC, useContext, useEffect, useState } from 'react';
import data from '@/data/jsons/__countryCurrencies.json';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import LoadingComponent from '../diplomas/LoadingComponent';
import NoContent from '../diplomas/NoContent';
import Invoices, { Invoice } from './Invoices';

const pageFacturas: FC = () => {
	const { state, dispatch } = useContext(AuthContext);
	const [user, setUser] = useState<User>({} as User);
	const { countryState: countryState } = useContext(CountryContext);

	const [courses, setCourses] = useState<UserCourseProgress[]>([]);
	const [isLoading, setLoading] = useState(true);
	const [contracts, setContracts] = useState<Invoice[]>([]);

	const getCurrency = (countryCode: string) => {
		return data[countryCode] || 'USD';
	};
	const currency = getCurrency(countryState.country);

	const fetchUser = async () => {
		setLoading(true);
		const res = await ssr.getUserData();
		const coursesList = await ssr.getAllCourses(countryState.country);
		if (!res.message) {
			if (!res.contact.state) res.contact.state = '';
			setUser(res);
			dispatch({
				type: 'FRESH',
				payload: {
					user: { name: res.name, speciality: res.contact.speciality },
				},
			});
			let userCoursesList = getUserCourses(res, coursesList);
			setCourses(userCoursesList);
			setLoading(false);
		} else {
			// history.push("/iniciar-sesion");
		}
	};

	useEffect(() => {
		fetchUser();
	}, [state?.profile]);

	useEffect(() => {
		// console.log(user);
		if (user?.contact?.contracts) {
			setContracts(user.contact.contracts);
			// console.log(contracts);
		}
	}, [user]);

	console.log(user.contact, 'contacto');
	return (
		<>
			<div>
				{isLoading ? (
					<LoadingComponent text='Cargando Facturas...' />
				) : (
					<div className=''>{contracts.length === 0 ? <NoContent /> : <Invoices data={contracts} />}</div>
				)}
			</div>
		</>
	);
};

export default pageFacturas;
