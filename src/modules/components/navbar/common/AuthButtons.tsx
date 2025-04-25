'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import { supportedLanguages } from '@/config/languages'; // AGREGA ESTA IMPORTACIÓN

interface AuthButtonsProps {
  isMainView: boolean;
  isDiscoverView: boolean;
  isInstitutionsView: boolean;
  isSpecialtyView: boolean;
  isSpecialtyDetailView: boolean;
}

const AuthButtons = ({
  isMainView,
  isDiscoverView,
  isInstitutionsView,
  isSpecialtyView,
  isSpecialtyDetailView,
}: AuthButtonsProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ Mejor detección de idioma actual
  const firstSegment = pathname.split('/')[1];
  const lang = supportedLanguages.includes(firstSegment) ? firstSegment : 'ar';

  const loginUrl = getLocalizedUrl(lang, '/login');
  const registerUrl = getLocalizedUrl(lang, '/login?form=registerForm');

  const isOnLoginPage = pathname.endsWith('/login');
  const formParam = searchParams.get('form');

  const handleLoginClick = () => {
    if (!isOnLoginPage || formParam) {
      router.replace(loginUrl); // reemplaza a login limpio
    }
  };

  const handleRegisterClick = () => {
    const isAlreadyRegister = isOnLoginPage && formParam === 'registerForm';
    if (!isAlreadyRegister) {
      router.replace(registerUrl); // reemplaza a register limpio
    }
  };

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
          isMainView ||
          isDiscoverView ||
          isSpecialtyView ||
          isSpecialtyDetailView
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
