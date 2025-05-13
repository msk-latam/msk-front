'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import { supportedLanguages } from '@/config/languages';
import Link from 'next/link';

interface AuthButtonsProps {
  isMainView?: boolean;
  isDiscoverView?: boolean;
  isInstitutionsView?: boolean;
  isSpecialtyView?: boolean;
  isSpecialtyDetailView?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
}

const AuthButtons = ({
  isMainView,
  isDiscoverView,
  isInstitutionsView,
  isSpecialtyView,
  isSpecialtyDetailView,
  isMobile = false,
  onClose,
}: AuthButtonsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const firstSegment = pathname.split('/')[1];
  const lang = supportedLanguages.includes(firstSegment) ? firstSegment : 'ar';

  const loginUrl = getLocalizedUrl(lang, '/login');
  const registerUrl = getLocalizedUrl(lang, '/login?form=registerForm');

  const isOnLoginPage = pathname.endsWith('/login');
  const formParam = searchParams.get('form');

  const handleLoginClick = () => {
    if (!isOnLoginPage || formParam) {
      router.replace(loginUrl);
    }
  };

  const handleRegisterClick = () => {
    const isAlreadyRegister = isOnLoginPage && formParam === 'registerForm';
    if (!isAlreadyRegister) {
      router.replace(registerUrl);
    }
  };

  if (isMobile) {
    return (
      <>
      <button
        onClick={handleLoginClick}
            className="w-full flex justify-between rounded-2xl bg-gray-200 items-center p-4 hover:bg-gray-300 text-gray-800"
          >
            <span>Iniciar sesión</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </button>
      <button
        onClick={handleRegisterClick}
            className="rounded-2xl bg-gray-200 w-full flex justify-between items-center p-4 hover:bg-gray-300 text-gray-800"
          >
            Crear Cuenta
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </span>
          </button>
      </>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleRegisterClick}
        className="bg-[#9200AD] text-white text-sm font-medium rounded-[38px] px-6 py-3 whitespace-nowrap hover:bg-[#6d0082]"
      >
        Crear cuenta
      </button>
      <button
        onClick={handleLoginClick}
        className={`text-sm font-medium whitespace-nowrap rounded-[38px] px-6 py-3 transition-colors duration-300 text-gray-800 border border-gray-500 hover:bg-gray-300${
          isMainView || isDiscoverView || isSpecialtyView || isSpecialtyDetailView
            ? ''
            : isInstitutionsView
            ? ' text-white hover:bg-gray-300 hover:text-gray-800'
            : ''
        }`}
      >
        Iniciar sesión
      </button>
    </div>
  );
};

export default AuthButtons;
