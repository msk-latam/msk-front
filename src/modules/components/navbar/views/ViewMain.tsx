// components/navbar/views/ViewMain.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight,X } from "react-feather";
import SearchBar from "../common/SearchBar";
import ViewDiscover from "./ViewDiscover";
import ViewMainSkeleton from "../skeletons/ViewMainSkeleton";

interface Props {
  navigateTo: (view: string, category?: string | null) => void;
  isMobile?: boolean;
  onClose?: () => void; 
}

const ViewMain: React.FC<Props> = ({ navigateTo, isMobile = true, onClose }) => {
  
  if (!isMobile) {
    // Versión desktop: mostramos directamente la vista "Descubre"
    return (
      <div className="z-50">
        {/* Se muestra directamente la vista Discover (desktop) */}
        <ViewDiscover navigateTo={navigateTo} isMobile={false} />


      </div>
    );
  }

  // Versión móvil (se mantiene sin cambios)
  return (
    <div className="bg-white rounded-t-3xl mt-4 px-6 py-6 flex flex-col h-full">
            <div className="flex flex-row justify-center items-center px-6 pt-1 pb-8">
        <button className="absolute left-5 top-10 rounded-full border border-black p-2 text-gray-800" onClick={onClose}>
          <X size={24} />
        </button>
        <Image
          src="/images/msk-logo/logo.svg"
          alt="MSK"
          height={30}
          width={60}
          priority
        />
      </div>

      <div className="mb-6">
        <SearchBar placeholder="¿Qué tema te interesa?" />
      </div>

      <div className="flex flex-col gap-4 overflow-hidden">
        <div className="flex flex-col bg-gray-200 rounded-2xl">
        <button
          className="flex justify-between items-center p-4 hover:bg-gray-300 text-gray-800"
          onClick={() => navigateTo("discover")}
        >
          <span>Descubre</span>
          <ChevronRight size={20} />
        </button>
        {/* <button
          className="flex justify-between items-center p-4 hover:bg-gray-300 text-gray-800"
          onClick={() => navigateTo("institutions")}
        >
          <span>Instituciones</span>
          <ChevronRight size={20} />
        </button> */}
        </div>
        <Link href="/login">
  <button className="w-full flex justify-between rounded-2xl bg-gray-200 items-center p-4 hover:bg-gray-300 text-gray-800">
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
<Link href="/login">

<button className="rounded-2xl bg-gray-200 w-full flex justify-between items-center p-4 hover:bg-gray-300 text-gray-800">
        Crear Cuenta
        <span>
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
      </Link>
      </div>
    </div>

  );
};

export default ViewMain;