// components/navbar/AuthButtons.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const lang = pathname.split('/')[1] || 'ar';
  return (
    <div className="flex items-center gap-3">
      <Link href={`/${lang}/login?form=registerForm`}>
        <button className="bg-[#9200AD] text-white text-sm font-medium  rounded-[38px] px-6 py-3 whitespace-nowrap hover:bg-[#6d0082]">
          Crear cuenta
        </button>
      </Link>
      <Link href={`/${lang}/login`}>
        <button
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
      </Link>
    </div>
  );
};

export default AuthButtons;
