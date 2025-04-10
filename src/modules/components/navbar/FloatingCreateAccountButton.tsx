// components/navbar/FloatingCreateAccountButton.tsx
import React from "react";

interface Props {
  onClose: () => void;
}

const FloatingCreateAccountButton: React.FC<Props> = ({ onClose }) => {
  const handleRedirect = () => {
    window.location.href = "/login";
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center bg-white rounded-full shadow-lg md:hidden">
      <button
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 rounded-l-full"
        onClick={handleRedirect}
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
        onClick={onClose}
        aria-label="Cerrar menú"
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
};

export default FloatingCreateAccountButton;
