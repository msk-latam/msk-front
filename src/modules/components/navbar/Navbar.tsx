"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DropdownContent from "./DropdownContent";
import FloatingCreateAccountButton from "./FloatingCreateAccountButton";
import { Search, ChevronDown } from "react-feather";

const Navbar = () => {
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [currentView, setCurrentView] = useState("main");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleDiscover = () => {
    setIsDiscoverOpen(!isDiscoverOpen);
    if (!isDiscoverOpen) setCurrentView("main");
  };

  const handleCreateAccount = () => {
    window.location.href = "/login";
  };

  return (
    <header className="absolute left-0 w-full z-50">
      {/* Overlay fondo oscuro móvil */}
      {isDiscoverOpen && <div className="fixed inset-0 bg-transparent z-50 md:hidden"></div>}

      <nav className="relative z-50 bg-transparent">
        {/* --- NAV MOBILE --- */}
        <section className="flex justify-start items-center mt-2 py-5 px-6 md:hidden relative">
          {/* Botón hamburguesa */}
          <button
            aria-label="Menú"
            className="relative w-6 h-6 flex items-center justify-center z-50"
            onClick={toggleDiscover}
          >
            <span
              className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ease-in-out ${
                isDiscoverOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
              }`}
            ></span>
            <span
              className={`absolute left-[2px] h-0.5 w-3 bg-white transition-all duration-300 ease-in-out ${
                isDiscoverOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ease-in-out ${
                isDiscoverOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
              }`}
            ></span>
          </button>

          {/* Logo */}
          <div className="m-auto pr-7 pb-1">
            <Image
              src="/images/msk-logo/logo.png"
              alt="MSK"
              height={30}
              width={64}
              priority
            />
          </div>
        </section>

        {/* --- NAV DESKTOP --- */}
        <section className="hidden md:flex md:flex-row items-center pt-2 mt-6">
          <div className="flex items-top max-w-6xl w-full mx-auto pl-2 pr-4 z-50 relative">
            {/* Logo */}
            <figure>
              <Image
                src="/images/msk-logo/logo.png"
                alt="MSK"
                height={36}
                width={70}
                priority
                className="md:pt-3"
              />
            </figure>

            {/* Navegación central */}
            <div className="w-full">
              <nav
                className={`flex items-center flex-grow justify-between py-2 mx-16 px-5 transition-colors duration-300 ${
                  isDiscoverOpen
                    ? "bg-white rounded-t-3xl"
                    : "bg-white shadow-md rounded-full"
                }`}
              >
                <div className="flex items-center gap-6 px-4">
                  <button
                    className="flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-gray-900"
                    onClick={toggleDiscover}
                  >
                    Descubre
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        isDiscoverOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <button
                    className="text-sm font-medium text-gray-800 hover:text-gray-900"
                    onClick={() => {
                      setIsDiscoverOpen(true);
                      setCurrentView("institutions");
                    }}
                  >
                    Instituciones
                  </button>
                </div>

                {/* Búsqueda en desktop */}
                <div className="flex-grow max-w-md mx-4">
                  <div className="rounded-full border border-gray-300 overflow-hidden">
                    <div className="relative flex items-center">
                      <input
                        type="search"
                        placeholder="¿Qué tema te interesa?"
                        className="bg-transparent w-full text-sm py-2 px-4 text-gray-800 focus:outline-none"
                      />
                      <button className="absolute right-1 bg-[#8500a0] p-1.5 rounded-full">
                        <Search className="text-white w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link href="/login?form=registerForm">
                    <button className="bg-[#8500a0] text-white text-sm font-medium rounded-full px-3 py-2.5 whitespace-nowrap hover:bg-[#6d0082]">
                      Crear cuenta
                    </button>
                  </Link>
                  <Link href="/login">
                    <button className="text-sm font-medium rounded-full px-3 py-2.5 transition-colors duration-300 text-gray-800 border border-gray-500 hover:bg-gray-100">
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
          <FloatingCreateAccountButton onClose={toggleDiscover} />
        </div>
      )}
    </header>
  );
};

export default Navbar;
