import React, { useState } from "react";
import { Menu, Search } from "react-feather";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);

  const toggleDiscover = () => {
    setIsDiscoverOpen(!isDiscoverOpen);
  };

  return (
    <header className="relative">
      {/* Dark overlay for the whole page when dropdown is open */}
      {isDiscoverOpen && <div className="fixed inset-0 bg-black/90 z-10"></div>}

      <nav
        className={`relative z-20 transition-colors duration-300 ${
          isDiscoverOpen ? "bg-black/90" : "bg-transparent"
        }`}
      >
        {/* --- NAV MOBILE --- */}
        <section className="flex justify-between items-center py-4 px-4 md:hidden">
          <button aria-label="Menu" className="border-0 bg-transparent">
            <Menu
              className={`w-6 h-6 ${
                isDiscoverOpen ? "text-white" : "text-white"
              }`}
            />
          </button>
          <Image
            src="/images/msk-logo/logo.png"
            alt="MSK"
            height={40}
            width={40}
            priority
          />
        </section>

        {/* --- NAV DESKTOP --- */}
        <section className="hidden md:flex justify-center py-2 mt-4">
          <div className="flex items-center max-w-6xl w-full mx-auto pl-2 pr-4">
            {/* Logo */}
            <figure>
              <Image
                src="/images/msk-logo/logo.png"
                alt="MSK"
                height={36}
                width={70}
                priority
              />
            </figure>

            {/* Navigation */}
            <nav
              className={`flex items-center flex-grow justify-between rounded-full py-2 mx-16 px-5 transition-colors duration-300 ${
                isDiscoverOpen ? "bg-transparent" : "bg-white shadow-md"
              }`}
            >
              <div className="flex items-center gap-6 px-4">
                <button
                  className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${
                    isDiscoverOpen
                      ? "text-white hover:text-gray-200"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  onClick={toggleDiscover}
                  aria-expanded={isDiscoverOpen}
                >
                  Descubre
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${
                      isDiscoverOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <path d="M7 10l5 5 5-5" />
                  </svg>
                </button>
                <button
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isDiscoverOpen
                      ? "text-white hover:text-gray-200"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Instituciones
                </button>
              </div>

              <div className="flex items-center gap-2 flex-grow max-w-xl mx-4">
                {/* Search */}
                <div className="rounded-full border border-gray-400 w-full">
                  <form
                    className={`relative flex items-center rounded-full w-full transition-colors duration-300 ${
                      isDiscoverOpen ? "bg-black/90" : "bg-white"
                    }`}
                    role="search"
                  >
                    <input
                      type="search"
                      placeholder="¿Qué tema te interesa?"
                      className={`bg-transparent w-full text-sm py-2.5 px-3 transition-colors duration-300 ${
                        isDiscoverOpen ? "text-white" : "text-gray-700"
                      } focus:outline-none focus:ring-0 focus:border-none border-none`}
                      aria-label="Buscar temas"
                    />
                    <button
                      type="submit"
                      className="bg-[#9200AD] p-2 rounded-full flex items-center justify-center mr-1"
                      aria-label="Buscar"
                    >
                      <Search className="text-white w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* CTA */}
                <Link href="/login?form=registerForm">
                  <button className="bg-[#9200AD] text-white text-sm font-medium rounded-full px-3 py-2.5 whitespace-nowrap">
                    Crear cuenta
                  </button>
                </Link>

                <Link href="/login">
                  <button
                    className={`text-sm font-medium rounded-full px-3 py-2.5 whitespace-nowrap transition-colors duration-300 ${
                      isDiscoverOpen
                        ? "text-white border border-white"
                        : "text-gray-700 border border-[#DBDDE2]"
                    }`}
                  >
                    Iniciar sesión
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        </section>
      </nav>

      {/* Discover dropdown */}
      {isDiscoverOpen && (
        <section
          className="absolute w-full bg-black/90 z-20 pt-4"
          aria-label="Menú de descubrimiento"
        >
          <div className="max-w-6xl mx-auto pb-2">
            <h3 className="text-left mb-4 uppercase tracking-wider ml-6 text-white text-xs font-semibold">
              PARTNERS
            </h3>
            <div className="grid grid-cols-5 gap-6 ml-6">
              <article className="col-span-1">
                <figure className="mb-4 relative group cursor-pointer">
                  <div className="overflow-hidden rounded-lg h-32 bg-gray-800 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                    <figcaption className="absolute bottom-4 left-4 z-10 text-white">
                      Universidades
                    </figcaption>
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </figure>
              </article>

              <section className="col-span-3">
                <ul className="grid grid-cols-3 gap-6 list-none p-0 m-0">
                  {/* Partner logos */}
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <li
                      key={i}
                      className="h-32 bg-gray-800 rounded-lg flex items-center justify-center"
                    >
                      {/* You would replace this with actual partner logos */}
                      <span className="text-center text-sm text-gray-400">
                        Partner Logo
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <article className="col-span-1">
                <figure className="mb-4 relative group cursor-pointer">
                  <div className="overflow-hidden rounded-lg h-32 bg-gray-800 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                    <figcaption className="absolute bottom-4 left-4 z-10 text-white">
                      Empresas
                    </figcaption>
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </figure>

                <figure className="mb-4 relative group cursor-pointer">
                  <div className="overflow-hidden rounded-lg h-32 bg-gray-800 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                    <figcaption className="absolute bottom-4 left-4 z-10 text-white">
                      Alianzas
                    </figcaption>
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </figure>
              </article>
            </div>
          </div>
        </section>
      )}
    </header>
  );
};

export default Navbar;
