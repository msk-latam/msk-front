import React, { useState, useEffect } from "react";
import { Search, ChevronRight, ChevronDown, ArrowLeft } from "react-feather";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isDiscoverOpen, setIsDiscoverOpen] = useState(false);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [currentView, setCurrentView] = useState("main"); // main, discover, institutions, specialty
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleDiscover = () => {
    setIsDiscoverOpen(!isDiscoverOpen);
    if (!isDiscoverOpen) {
      setCurrentView("main");
    }
  };

  const handleCreateAccount = () => {
    window.location.href = "/login";
  };

  const navigateTo = (view, category = null) => {
    setCurrentView(view);
    if (category) {
      setSelectedCategory(category);
    }
  };

  // Control de scroll para mostrar/ocultar el botón flotante
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setShowFloatingMenu(true);
      } else {
        setShowFloatingMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lista de especialidades médicas
  const specialties = [
    "Administración y gestión",
    "Anestesiología y dolor",
    "Cardiología",
    "Cirugía",
    "Dermatología",
    "Diabetes",
    "Emergentología",
    "Endocrinología",
    "Gastroenterología",
    "Geriatría",
    "Ginecología",
    "Hematología",
    "Infectología",
    "Medicina familiar",
    "Medicina general",
    "Medicina intensiva",
    "Nefrología",
    "Necrología",
    "Nutrición",
    "Obstetricia",
    "Oncología",
    "Pediatría",
    "Psiquiatría",
    "Radiología e imagenología",
    "Traumatología",
    "Urología",
  ];

  // Datos para la vista de administración y gestión
  const adminCourses = [
    {
      title: "Auditoría médica",
      certification:
        "Certificación Colegio de Médicos de la Provincia de Buenos Aires - Distrito III",
      image: "/images/courses/audit.jpg",
    },
    {
      title: "Curso superior de administración y gestión hospitalaria",
      certification:
        "Certificación Colegio de Médicos de la Provincia de Buenos Aires - Distrito III",
      image: "/images/courses/admin.jpg",
    },
    {
      title: "Curso superior de seguridad y prevención de riesgos",
      certification:
        "Certificación Colegio de Médicos de la Provincia de Buenos Aires - Distrito III",
      image: "/images/courses/safety.jpg",
    },
  ];

  // Datos para la vista de instituciones
  const partners = [
    { name: "TROPOS Formación", logo: "/images/partners/tropos.png" },
    {
      name: "Escuela Andaluza de Salud Pública",
      logo: "/images/partners/andaluza.png",
    },
    {
      name: "American College of Cardiology",
      logo: "/images/partners/acc.png",
    },
    { name: "EUNEIZ", logo: "/images/partners/euneiz.png" },
    { name: "CONAMEGE", logo: "/images/partners/conamege.png" },
    { name: "AFEME", logo: "/images/partners/afeme.png" },
  ];


  // Componente del botón flotante "Crear Cuenta"
  const FloatingCreateAccountButton = () => (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center bg-white rounded-full shadow-lg">
      <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 rounded-l-full">
        Crear Cuenta
        <span className="flex items-center justify-center p-1 text-gray-800">
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
        </span>
      </button>
      <button
        className="p-2 rounded-r-full bg-gray-100 text-gray-800"
        onClick={() => setIsDiscoverOpen(false)}
      >
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
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );

  // Renderiza el contenido del menú desplegable según la vista actual
  const renderDropdownContent = () => {
    switch (currentView) {
      case "main":
        return (
          <div className="bg-white rounded-t-3xl mt-4 px-6 py-6 flex flex-col h-full">
            <div className="flex items-center justify-center mb-6">
              <Image
                src="/images/msk-logo/logo.png"
                alt="MSK"
                height={30}
                width={60}
                priority
              />
            </div>

            <div className="relative rounded-full bg-gray-200 mb-6 flex items-center">
              <input
                type="search"
                placeholder="¿Qué tema te interesa?"
                className="bg-transparent w-full text-sm py-3 pl-4 pr-12 rounded-full focus:outline-none text-gray-800"
              />
              <button className="absolute right-1 bg-[#8500a0] p-2 rounded-full">
                <Search className="text-white w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col bg-gray-200 rounded-lg overflow-hidden">
              <button
                className="flex justify-between items-center p-4 hover:bg-gray-300 text-gray-800"
                onClick={() => navigateTo("discover")}
              >
                <span>Descubre</span>
                <ChevronRight size={20} />
              </button>
              <button
                className="flex justify-between items-center p-4 hover:bg-gray-300 text-gray-800"
                onClick={() => navigateTo("institutions")}
              >
                <span>Instituciones</span>
                <ChevronRight size={20} />
              </button>
              <Link href="/login">
                <button className="flex justify-between items-center p-4 hover:bg-gray-300 text-gray-800">
                  <span>Iniciar sesión</span>
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
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        );

      case "discover":
        return (
          <div className="bg-white rounded-t-3xl mt-4 h-full">
            <div className="flex items-center px-6 py-4">
              <button
                className="mr-4 text-gray-800"
                onClick={() => navigateTo("main")}
              >
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-xl font-medium text-gray-800">Descubre</h2>
            </div>

            <div className="px-6 pt-4 pb-6 flex flex-col gap-2">
              <button
                className="flex justify-between items-center bg-gray-200 p-4 rounded-lg text-gray-800"
                onClick={() => navigateTo("specialty", "Especialidades")}
              >
                <span>Especialidades</span>
                <ChevronDown size={20} />
              </button>

              <button className="flex justify-between items-center bg-gray-200 p-4 rounded-lg text-gray-800">
                <span>Que ofrecemos</span>
                <ChevronDown size={20} />
              </button>

              <button className="flex justify-between items-center bg-gray-200 p-4 rounded-lg text-gray-800">
                <span>Recursos</span>
                <ChevronDown size={20} />
              </button>
            </div>
          </div>
        );

      case "specialty":
        return (
          <div className="bg-white rounded-t-3xl mt-4 h-full overflow-auto">
            <div className="flex items-center px-6 py-4 sticky top-0 bg-white">
              <button
                className="mr-4 text-gray-800"
                onClick={() => navigateTo("discover")}
              >
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-xl font-medium text-gray-800">
                Especialidades
              </h2>
            </div>

            <div className="divide-y">
              {specialties.map((specialty, index) => (
                <button
                  key={index}
                  className="flex justify-between items-center px-6 py-4 w-full hover:bg-gray-100 text-gray-800"
                  onClick={() => navigateTo("specialtyDetail", specialty)}
                >
                  <span>{specialty}</span>
                  <ChevronRight size={20} />
                </button>
              ))}
            </div>
          </div>
        );

      case "specialtyDetail":
        return (
          <div className="bg-white rounded-t-3xl mt-4 h-full overflow-auto">
            <div className="flex items-center px-6 py-4 sticky top-0 bg-white">
              <button
                className="mr-4 text-gray-800"
                onClick={() => navigateTo("specialty")}
              >
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-xl font-medium text-gray-800">
                {selectedCategory}
              </h2>
            </div>

            <div className="px-6 py-4">
              {adminCourses.map((course, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="relative rounded-lg overflow-hidden mb-2">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                    <div className="h-48 bg-gray-300 relative">
                      {/* Placeholder for course image */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-medium mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm opacity-100">
                          {course.certification}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button className="flex justify-between items-center w-full py-4 text-left text-gray-800">
                <span>Ver todos los cursos</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );

      case "institutions":
        return (
          <div className="bg-gray-900 rounded-t-3xl mt-4 h-full">
            <div className="flex items-center px-6 py-4">
              <button
                className="mr-4 text-white"
                onClick={() => navigateTo("main")}
              >
                <ArrowLeft size={24} />
              </button>
              <h2 className="text-xl font-medium text-white">Instituciones</h2>
            </div>

            <div className="px-6 pt-2 pb-6">
              <div className="rounded-lg overflow-hidden mb-6">
                <div className="relative bg-gray-800 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-lg font-medium">Universidades</span>
                  </div>
                  <span className="absolute right-4">
                    <ChevronRight className="text-white" />
                  </span>
                </div>
              </div>

              <h3 className="uppercase text-white text-xs font-semibold mb-4">
                PARTNERS
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-lg h-24 flex items-center justify-center"
                  >
                    <span className="text-sm text-white">{partner.name}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-lg overflow-hidden mb-6">
                <div className="relative bg-gray-700 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-lg font-medium">Empresas</span>
                  </div>
                  <span className="absolute right-4">
                    <ChevronRight className="text-white" />
                  </span>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden">
                <div className="relative bg-gray-700 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-lg font-medium">Alianzas</span>
                  </div>
                  <span className="absolute right-4">
                    <ChevronRight className="text-white" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
        <section
          className={`flex justify-start items-center mt-2 py-5 px-6 md:hidden relative ${
            showFloatingMenu ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
        >
          {/* Custom Hamburger Icon */}
          <button
            aria-label="Menu"
            className="relative w-6 h-6 flex items-center justify-center z-20"
            onClick={toggleDiscover}
          >
            {/* Línea superior */}
            <span
              className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ease-in-out ${
                isDiscoverOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
              }`}
            ></span>

            {/* Línea del medio (más corta) */}
            <span
              className={`absolute left-[2px] h-0.5 w-3 bg-white transition-all duration-300 ease-in-out ${
                isDiscoverOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>

            {/* Línea inferior */}
            <span
              className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ease-in-out ${
                isDiscoverOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
              }`}
            ></span>
          </button>

          {/* Logo centrado */}
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

        {/* --- Floating "Crear Cuenta" Button (Mobile) --- */}
        {showFloatingMenu && !isDiscoverOpen && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center bg-white rounded-full shadow-lg md:hidden">
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 rounded-l-full"
              onClick={handleCreateAccount}
            >
              Crear Cuenta
              <span className="flex items-center justify-center p-1 text-gray-800">
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
              </span>
            </button>
            <button
              className="p-2 rounded-r-full bg-gray-100 text-gray-800"
              onClick={toggleDiscover}
              aria-label="Toggle Menu"
            >
              {isDiscoverOpen ? (
                // Icono de cruz
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                // Icono de menú hamburguesa
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
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        )}

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
                      : "text-gray-800 hover:text-gray-900"
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
                      : "text-gray-800 hover:text-gray-900"
                  }`}
                >
                  Instituciones
                </button>
              </div>

              <div className="flex items-center gap-2 flex-grow max-w-xl mx-4">
                {/* Search */}
                <div className="rounded-full border border-gray-500 w-full">
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
                        isDiscoverOpen ? "text-white" : "text-gray-800"
                      } focus:outline-none focus:ring-0 focus:border-none border-none`}
                      aria-label="Buscar temas"
                    />
                    <button
                      type="submit"
                      className="bg-[#8500a0] p-2 rounded-full flex items-center justify-center mr-1"
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
                  <button className="bg-[#8500a0] text-white text-sm font-medium rounded-full px-3 py-2.5 whitespace-nowrap hover:bg-[#6d0082]">
                    Crear cuenta
                  </button>
                </Link>

                <Link href="/login">
                  <button
                    className={`text-sm font-medium rounded-full px-3 py-2.5 whitespace-nowrap transition-colors duration-300 ${
                      isDiscoverOpen
                        ? "text-white border border-white hover:bg-white/10"
                        : "text-gray-800 border border-gray-500 hover:bg-gray-100"
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

      {/* Mobile dropdown content */}
      {isDiscoverOpen && (
        <div className="fixed inset-x-0 top-0 bottom-0 z-20 mt-16 md:hidden overflow-auto">
          {renderDropdownContent()}
          <FloatingCreateAccountButton />
        </div>
      )}

      {/* Desktop Discover dropdown */}
      {isDiscoverOpen && (
        <section
          className="absolute w-full bg-black/90 z-20 pt-4 hidden md:block"
          aria-label="Menú de descubrimiento"
        >
          <div className="max-w-6xl mx-auto pb-2">
            <h3 className="text-left mb-4 uppercase tracking-wider ml-6 text-white text-xs font-semibold">
              PARTNERS
            </h3>
            <div className="grid grid-cols-5 gap-6 ml-6">
              <article className="col-span-1">
                <figure className="mb-4 relative group cursor-pointer">
                  <div className="overflow-hidden rounded-lg h-32 bg-gray-700 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
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
                  {partners.map((partner, index) => (
                    <li
                      key={index}
                      className="h-32 bg-gray-700 rounded-lg flex items-center justify-center"
                    >
                      <span className="text-center text-sm text-white">
                        {partner.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <article className="col-span-1">
                <figure className="mb-4 relative group cursor-pointer">
                  <div className="overflow-hidden rounded-lg h-32 bg-gray-700 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
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
                  <div className="overflow-hidden rounded-lg h-32 bg-gray-700 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
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
