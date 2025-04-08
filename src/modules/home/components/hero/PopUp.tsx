"use client";

import Link from "next/link";

const PopUp = () => {
  return (
    <section className="md:flex hidden top-0 left-0 bg-[#FFE5EC] w-full h-12 p-3 gap-5 z-50 flex-row text-black justify-center">
      <p>
        ¡Últimos cupos disponibles en nuestro Curso Especializado en
        Fonoaudiología!
      </p>
      <button>
        <div className="flex flex-row">
          {" "}
          <p className="my-auto">Impulsa tu carrera hoy</p>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 18L15.5 12L9.5 6"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </section>
  );
};

export default PopUp;
