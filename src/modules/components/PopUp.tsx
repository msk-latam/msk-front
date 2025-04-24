"use client";

import { useEffect, useState } from "react";

const PopUp = ({ onClose }: { onClose: () => void }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };

    // Check on mount
    handleResize();

    // Listen for resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      onClose(); // Se llama cuando se desmonta
    };
  }, [onClose]);

  if (!isDesktop) return null;

  return (
    <section className="fixed top-0 left-0 w-full h-12 bg-[#FFE5EC] p-3 z-[999] flex flex-row text-[#1A1A1A] justify-center   items-center gap-4">
      <p className="text-sm">
        ¡Últimos cupos disponibles en nuestro Curso Especializado en Fonoaudiología!
      </p>
      <button className="flex items-center text-sm font-semibold underline">
        Impulsa tu carrera hoy
        <svg
          width="20"
          height="20"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-1"
        >
          <path
            d="M9.5 18L15.5 12L9.5 6"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        onClick={onClose}
        className="absolute right-3 top-2 text-black text-lg font-bold hover:opacity-70"
        aria-label="Cerrar"
      >
        ✕
      </button>
    </section>
  );
};

export default PopUp;