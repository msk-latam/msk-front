'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import LoginForm from '@/modules/login/components/loginform/LoginForm';
import RegisterForm from '@/modules/login/components/loginform/RegisterForm';
import RecoveryPassword from '@/modules/login/components/loginform/RecoveryPassword';
import RecoveryPasswordSent from '@/modules/login/components/loginform/RecoveryPasswordSent';

export default function LoginRouterHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const formParam = searchParams.get('form');

  const [showRegister, setShowRegister] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [showRecoverySent, setShowRecoverySent] = useState(false);

  useEffect(() => {
    setShowRegister(formParam === 'registerForm');
  }, [formParam]);

  const handleSwitchToRegister = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('form', 'registerForm');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSwitchToLogin = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('form');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {showRegister ? (
        <RegisterForm onBack={handleSwitchToLogin} />
      ) : showRecovery ? (
        showRecoverySent ? (
          <RecoveryPasswordSent
            onContinue={() => {
              setShowRecovery(false);
              setShowRecoverySent(false);
            }}
          />
        ) : (
          <RecoveryPassword
            onBack={() => setShowRecovery(false)}
            onSent={() => setShowRecoverySent(true)}
          />
        )
      ) : (
        <LoginForm
          onCreateAccount={handleSwitchToRegister}
          onForgotPassword={() => setShowRecovery(true)}
          onBack={handleSwitchToLogin}
        />
      )}
    </>
  );
}
