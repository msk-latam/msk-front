// components/navbar/views/ViewMain.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight, X } from "react-feather";
import SearchBar from "../common/SearchBar";
import ViewDiscover from "./ViewDiscover";
import ViewMainSkeleton from "../skeletons/ViewMainSkeleton";
import AuthButtons from "../common/AuthButtons";
import UserButtons from "../common/UserButtons";

interface Props {
  navigateTo: (view: string, category?: string | null) => void;
  isMobile?: boolean;
  onClose?: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const ViewMain: React.FC<Props> = ({
  navigateTo,
  isMobile = true,
  onClose,
  isAuthenticated,
  isLoading,
}) => {
  if (!isMobile) {
    return (
      <div className="z-50">
        <ViewDiscover navigateTo={navigateTo} isMobile={false} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-t-3xl mt-4 px-6 py-6 flex flex-col h-full">
      <div className="flex flex-row justify-center items-center px-6 pt-1 pb-8">
        <button
          className="absolute left-5 top-10 rounded-full border border-black p-2 text-gray-800"
          onClick={onClose}
        >
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
        <div className="flex flex-col bg-gray-200 rounded-2xl hover:rounded-2xl">
          <button
            className="flex justify-between items-center p-4 hover:bg-gray-300 rounded-2xl hover:rounded-2xl text-gray-800"
            onClick={() => navigateTo("discover")}
          >
            <span>Descubre</span>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* 👇 Botones según autenticación */}
{!isLoading ? (
  isAuthenticated ? (
    <UserButtons isMobile onClose={onClose} />
  ) : (
    <AuthButtons isMobile onClose={onClose} />
  )
) : null}

      </div>
    </div>
  );
};

export default ViewMain;
