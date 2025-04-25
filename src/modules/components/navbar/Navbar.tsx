//navbar
"use client";

import { BurgerButton } from "@/modules/components/navbar/common/BurguerButton";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "react-feather";
import SearchBar from "./common/SearchBar";
import DropdownContent from "./DropdownContent";
import AuthButtons from './common/AuthButtons'; // ✅ CORRECTO
import UserButtons from "./common/UserButtons";
import { usePathname } from "next/navigation";
import { supportedLanguages } from '@/config/languages';


type NavbarProps = {
	isDashboard?: boolean;
  };
  
  const Navbar = ({ isDashboard = false }: NavbarProps) => {
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [currentView, setCurrentView] = useState("main");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleDiscover = () => {
    setIsDiscoverOpen(!isDiscoverOpen);
    if (!isDiscoverOpen) setCurrentView("main");
  };

 



  const toggleInstitutions = () => {
    if (isDiscoverOpen && currentView === "institutions") {
      // Si ya está abierto en instituciones, lo cerramos
      setIsDiscoverOpen(false);
    } else {
      // Si está cerrado o en otra vista, abrimos instituciones
      setIsDiscoverOpen(true);
      setCurrentView("institutions");
    }
  };

  const pathname = usePathname();
const firstSegment = pathname.split('/')[1];
const lang = supportedLanguages.includes(firstSegment) ? firstSegment : 'ar';
// ✅ Esta es la verdadera URL que deberías usar en el logo
const logoHref = lang === 'ar' ? '/' : `/${lang}/`;
  const handleCreateAccount = () => {
    window.location.href = "/login";
  };

  const isMainView = isDiscoverOpen && currentView === "main";
  const isDiscoverView = isDiscoverOpen && currentView === "discover";
  const isInstitutionsView = isDiscoverOpen && currentView === "institutions";
  const isSpecialtyView = isDiscoverOpen && currentView === "specialty";
  const isSpecialtyDetailView =
    isDiscoverOpen && currentView === "specialtyDetail";

  return (
    <header className="absolute left-0 w-full z-50">
      {/* Overlay fondo oscuro móvil */}
      {isDiscoverOpen && (
        <div className="fixed inset-0 bg-transparent z-50 md:hidden"></div>
      )}

      <nav className="relative z-50 bg-transparent">
        {/* --- NAV MOBILE --- */}
        <section className="flex justify-start items-center mt-2 py-5 px-6 md:hidden relative">
          {/* Botón hamburguesa */}
          <BurgerButton isOpen={isDiscoverOpen} onClick={toggleDiscover} />

          {/* Logo */}
          <Link href="/home" className="m-auto pr-7 pb-1">
            <Image
              src="/images/msk-logo/logo.png"
              alt="MSK"
              priority
              width={64}
              height={64}
              className="w-16 h-auto"
            />
          </Link>
        </section>

        {/* --- NAV DESKTOP --- */}
        <section className="hidden md:flex md:flex-row items-center pt-2 mt-6">
          <div className="flex items-top w-full max-w-[1300px] mx-auto pl-14 pr-28 z-50 relative">
            {/* Logo */}
            <Link href={logoHref}>
  <Image
    src="/images/msk-logo/logo.png"
    alt="MSK"
    priority
    width={90}
    height={90}
    className="md:pt-3 w-[90px] h-auto"
  />
</Link>

            {/* Navegación central */}
            <div className="w-full">
              <nav
                className={`flex items-center flex-grow justify-between py-1.5 px-4 ml-28 transition-colors duration-300 ${
                  isMainView ||
                  isDiscoverView ||
                  isSpecialtyView ||
                  isSpecialtyDetailView
                    ? "bg-white rounded-full"
                    : isInstitutionsView
                    ? "bg-[#1a1a1a]  rounded-t-3xl"
                    : "bg-white shadow-md rounded-full"
                }`}
              >
                <div className="flex items-center gap-6 px-4">
                  <button
                    className={`flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-gray-900${
                      isMainView ||
                      isDiscoverView ||
                      isSpecialtyView ||
                      isSpecialtyDetailView
                        ? ""
                        : isInstitutionsView
                        ? "bg-[#1a1a1a] text-white"
                        : ""
                    }`}
                    onClick={toggleDiscover}
                  >
                    Descubre
                    <ChevronDown
                      size={16}
                      className={`transition-transform pt-1 duration-300 ${
                        isMainView ||
                        isDiscoverView ||
                        isSpecialtyView ||
                        isSpecialtyDetailView
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>
{/* 
                  <button
                    className={`text-sm font-medium flex gap-1  flex-row items-center text-gray-800 hover:text-gray-900${
                      isMainView ||
                      isDiscoverView ||
                      isSpecialtyView ||
                      isSpecialtyDetailView
                        ? ""
                        : isInstitutionsView
                        ? " bg-[#35383E] text-white rounded-[38px] px-6 py-3.5 hover:text-gray-500 hover:bg-gray-100"
                        : ""
                    }`}
                    onClick={toggleInstitutions}
                  >
                    Instituciones
                    <ChevronDown
                      size={16}
                      className={`transition-transform pt-1 duration-300 ${
                        isInstitutionsView ? "hidden" : ""
                      }`}
                    />
                  </button> */}
                </div>

                <div className="flex-grow max-w-md mx-4">
                  <SearchBar
                    placeholder="¿Qué tema te interesa?"
                    isMainView={true}
                  />
                </div>
				{isDashboard ? (
        <UserButtons />
      ) : (
        <AuthButtons
          isMainView={isMainView}
          isDiscoverView={isDiscoverView}
          isInstitutionsView={isInstitutionsView}
          isSpecialtyView={isSpecialtyView}
          isSpecialtyDetailView={isSpecialtyDetailView}
        />
      )}
              </nav>
              {isDiscoverOpen && (
                <div className="w-full max-w-6xl pl-28 z-50 mx-auto">
                  <DropdownContent
                    currentView={currentView}
                    selectedCategory={selectedCategory}
                    setCurrentView={setCurrentView}
                    setSelectedCategory={setSelectedCategory}
                    isMobile={false}
                    onClose={toggleDiscover}
                  />
                </div>
              )}

              {/* Dropdown desktop debajo del navbar */}
            </div>
          </div>
        </section>
      </nav>

      {/* Contenido dinámico móvil */}
      {isDiscoverOpen && (
        <div className="fixed inset-x-0 top-0 bottom-0 z-50 mt-16 md:hidden overflow-auto">
          <DropdownContent
            currentView={currentView}
            selectedCategory={selectedCategory}
            setCurrentView={setCurrentView}
            setSelectedCategory={setSelectedCategory}
            isMobile={true}
            onClose={toggleDiscover}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;