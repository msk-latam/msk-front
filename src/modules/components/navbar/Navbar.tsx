"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DropdownContent from "./DropdownContent";
import FloatingCreateAccountButton from "./FloatingCreateAccountButton";
import { Search, ChevronDown } from "react-feather";
import { BurgerButton } from "@/modules/components/navbar/common/BurguerButton";
import SearchBar from "./common/SearchBar";

const Navbar = () => {
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
              height={30}
              width={64}
              priority
            />
          </Link>
        </section>

        {/* --- NAV DESKTOP --- */}
        <section className="hidden md:flex md:flex-row items-center pt-2 mt-6">
          <div className="flex items-top max-w-6xl w-full mx-auto pl-2 pr-4 z-50 relative">
            {/* Logo */}
            <Link href="/home">
              <Image
                src="/images/msk-logo/logo.png"
                alt="MSK"
                height={36}
                width={70}
                priority
                className="md:pt-3"
              />
            </Link>

            {/* Navegación central */}
            <div className="w-full">
              <nav
                className={`flex items-center flex-grow justify-between py-2 mx-16 px-5 transition-colors duration-300 ${
                  isMainView ||
                  isDiscoverView ||
                  isSpecialtyView ||
                  isSpecialtyDetailView
                    ? "bg-white rounded-t-3xl"
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
                  </button>
                </div>

                {/* Búsqueda en desktop */}
                {/* <div className="flex-grow max-w-md mx-4">
                  <div className="rounded-full border border-gray-300 overflow-hidden">
                    <div className="relative flex items-center">
                      <input
                        type="search"
                        placeholder="¿Qué tema te interesa?"
                        className={`bg-transparent w-full text-sm py-3 border-transparent focus:border-transparent  focus:ring-0 focus:ring-transparent  focus:outline-none ${
                          isMainView ||
                          isDiscoverView ||
                          isSpecialtyView ||
                          isSpecialtyDetailView
                            ? ""
                            : isInstitutionsView
                            ? "text-[#838790] border-[#989ca4]"
                            : ""
                        }`}
                      />
                      <button className="absolute right-2 bg-[#8500a0] p-3 rounded-full">
                        <Search className="text-white w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div> */}

                <div className="flex-grow max-w-md mx-4">
                  <SearchBar
                    placeholder="¿Qué tema te interesa?"
                    isMainView={true}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Link href="/login?form=registerForm">
                    <button className="bg-[#8500a0] text-white text-sm font-medium  rounded-[38px] px-6 py-3.5 whitespace-nowrap hover:bg-[#6d0082]">
                      Crear cuenta
                    </button>
                  </Link>
                  <Link href="/login">
                    <button
                      className={`text-sm font-medium whitespace-nowrap rounded-[38px] px-6 py-3.5 transition-colors duration-300 text-gray-800 border border-gray-500 hover:bg-gray-300${
                        isMainView ||
                        isDiscoverView ||
                        isSpecialtyView ||
                        isSpecialtyDetailView
                          ? ""
                          : isInstitutionsView
                          ? " text-white hover:bg-gray-300 hover:text-gray-800"
                          : ""
                      }`}
                    >
                      Iniciar sesión
                    </button>
                  </Link>
                </div>
              </nav>

              {/* Dropdown desktop debajo del navbar */}
              {isDiscoverOpen && (
                <div className="w-full max-w-6xl px-16 z-50 mx-auto">
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
      <FloatingCreateAccountButton
        isOpen={isDiscoverOpen}
        onToggle={toggleDiscover}
      />
    </header>
  );
};

export default Navbar;
