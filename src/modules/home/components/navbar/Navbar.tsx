        import React from 'react';
        import { Menu, Search } from 'react-feather';
        import Image from 'next/image';
        import Link from 'next/link';

        const Navbar = () => {
          return (
              <nav>
            {/* --- NAV MOBILE ---  Arreglar ubicacion*/}
        <div className="flex justify-between items-center pt-6 md:hidden">
        <Menu className="text-white w-7 h-7" />
        <Image src="/images/msk-logo/logo.png" alt="MSK" height={70} width={70} priority />
          
        </div>

        {/* --- NAV DESKTOP --- */}
        <div className="hidden md:flex justify-center pt-6">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="">
            <Image src="/images/msk-logo/logo.png" alt="MSK" height={70} width={70} priority />
            </div>

            {/* Navegación */}
            <nav className="flex items-center gap-6 bg-white shadow-lg rounded-full px-6 py-2">
              <button className="text-gray-700 hover:text-gray-900 flex items-center gap-1">
                Descubre
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 10l5 5 5-5" />
                </svg>
              </button>
              <button className="text-gray-700 hover:text-gray-900">Instituciones</button>

              {/* Search */}
              <div className="relative flex items-center bg-gray-100 rounded-full px-4">
                <input
                  type="text"
                  placeholder="¿Qué tema te interesa?"
                  className="bg-transparent focus:outline-none border-none w-48 text-gray-700 placeholder-gray-500"
                />
                <div className="bg-[#9200AD] p-2 rounded-full flex items-center justify-center ml-2">
                  <Search className="text-white w-5 h-5" />
                </div>
              </div>

              {/* CTA */}
              {/*temporal el HREF*/ }
<Link href="/login?form=registerForm">
  <button className="text-[#9200AD] border border-[#9200AD] rounded-3xl px-4 py-2">
    Crear cuenta
  </button>
</Link>

<Link href="/login">
  <button className="text-gray-700 border border-[#DBDDE2] rounded-3xl px-4 py-2">
    Iniciar sesión
  </button>
</Link>
            </nav>
          </div>
        </div>
        </nav>

          );
        };

export default Navbar;