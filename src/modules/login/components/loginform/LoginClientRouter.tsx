'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import LoginForm from '@/modules/login/components/loginform/LoginForm';
import RegisterForm from '@/modules/login/components/loginform/RegisterForm';
import RecoveryPassword from '@/modules/login/components/loginform/RecoveryPassword';
import RecoveryPasswordSent from '@/modules/login/components/loginform/RecoveryPasswordSent';

export default function LoginRouterHandler() {
	const searchParams = useSearchParams();
	const formParam = searchParams.get('form');

	const [showRegister, setShowRegister] = useState(false);
	const [showRecovery, setShowRecovery] = useState(false);
	const [showRecoverySent, setShowRecoverySent] = useState(false);

	useEffect(() => {
		if (formParam === 'registerForm') {
			setShowRegister(true);
		} else {
			setShowRegister(false);
		}
	}, [formParam]);

	return (
		<>
			{showRegister ? (
				<RegisterForm onBack={() => setShowRegister(false)} />
			) : showRecovery ? (
				showRecoverySent ? (
					<RecoveryPasswordSent
						onContinue={() => {
							setShowRecovery(false);
							setShowRecoverySent(false);
						}}
					/>
				) : (
					<RecoveryPassword onBack={() => setShowRecovery(false)} onSent={() => setShowRecoverySent(true)} />
				)
			) : (
				<LoginForm
					onCreateAccount={() => setShowRegister(true)}
					onForgotPassword={() => setShowRecovery(true)}
					onBack={() => setShowRegister(false)}
				/>
			)}
		</>
	);
}
