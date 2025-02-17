'use client';
import { FC, useEffect, useState } from 'react';
import LayoutPage from '@/components/MSK/LayoutPage';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import NcLink from '@/components/NcLink/NcLink';
import ShowErrorMessage from '@/components/ShowErrorMessage';

import { useLoginForm } from './useLoginForm';
import { FormikProvider, Form } from 'formik';
import LoginInput from './LoginInputField';
import { useLoader } from '@/context/loader/LoaderContext';
import { Loading } from '@/utils/Loading';
import { usePathname } from 'next/navigation';

export interface PageLoginProps {
	className?: string;
}

const PageLogin: FC<PageLoginProps> = ({ className = '' }) => {
	const { formik, loginError, onRequest, formRef, setLoginError } = useLoginForm();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const pathName = usePathname();
	const match = pathName.match(/^\/([a-z]{2})\b/);
	const country = match ? `${match[1]}` : '';

	return (
		<div className={`nc-PageLogin ${className} animate-fade-down`} data-nc-id='PageLogin'>
			<LayoutPage subHeading='Accede a tu perfil personal' heading='Iniciar sesión'>
				<div className='max-w-md mx-auto space-y-6'>
					<FormikProvider value={formik}>
						<Form onSubmit={formik.handleSubmit} action='#' className='' autoComplete='off' ref={formRef}>
							<LoginInput label='E-mail' name='email' placeholder='Ingresar e-mail' />
							<LoginInput
								label='Contraseña'
								name='password'
								type='password'
								placeholder='Ingresar contraseña'
								showPassword={showPassword}
								toggleShowPassword={() => setShowPassword(!showPassword)}
								isPassword
							/>
							<ButtonPrimary type='submit' className='w-full' disabled={onRequest}>
								{onRequest ? 'Accediendo ...' : 'Acceder'}
							</ButtonPrimary>
						</Form>
					</FormikProvider>
					<ShowErrorMessage text={loginError} visible={loginError != ''} />
					<span className='block text-center text-neutral-700 dark:text-neutral-300'>
						¿No tienes una cuenta? {` `}
						<NcLink
							href={
								country === ''
									? `${window.location.origin}/crear-cuenta`
									: `${window.location.origin}/${country}/crear-cuenta`
							}
						>
							Créala aquí
						</NcLink>
					</span>
				</div>
			</LayoutPage>
		</div>
	);
};

export default PageLogin;
