import React, { useEffect, useState } from "react";
import CursoCard from "./cards/CursoCard";
import { mapCursoWPToCursoCard } from "@/modules/home/types";
import Link from "next/link";

const tabs = ["Novedades", "Recomendados", "Gratuitos"];

const Oportunidades = () => {
  const [activeTab, setActiveTab] = useState("Novedades");
  const [cursos, setCursos] = useState<Record<string, any[]>>({});

  useEffect(() => {
    fetch("/api/home/oportunidades")
      .then((res) => res.json())
      .then((data) => setCursos(data))
      .catch(console.error);
  }, []);

  const cursosActivos = cursos[activeTab.toLowerCase()] || [];
  const cursosMapeados = Array.isArray(cursosActivos)
    ? cursosActivos.map(mapCursoWPToCursoCard)
    : [];

  const isEmpty = cursosMapeados.length === 0;

  return (
    <section className="relative w-full overflow-visible max-w-[1600px] mx-auto md:px-4 md:pt-24 pb-[240px] z-[1] pt-32" aria-labelledby="oportunidades-heading">
      <div className="relative bg-white rounded-[38px] -mt-32 -mb-64 pt-6 md:pt-[72px] md:pb-16 shadow-lg">
        <div className="px-5 md:px-16 pb-6 md:mb-0">
        <header className="md:text-left text-center max-w-7xl px-6 gap-4 md:px-0">
  <h2
    id="oportunidades-heading"
    className="mb-2 md:text-[34px] text-[20px] leading-[100%] text-[#1A1A1A] align-middle"
  >
    {/* Mobile */}
    <span className="block md:hidden font-Raleway leading-[32px]">
      Te damos la bienvenida a <br />
      Medical & Scientific Knowledge, <br />
      el lugar ideal para estudiar <br />
      medicina a distancia a través de <br />
      nuestros cursos de actualización.
    </span>

    {/* Desktop */}
    <span className="hidden md:inline">
      Te damos la bienvenida a Medical & Scientific Knowledge, el lugar ideal para 
      estudiar medicina a distancia a través de nuestros cursos de actualización.
    </span>
  </h2>

  <p className="md:text-[18px] text-[14px] font-[400] text-[#838790] align-middle">
    <span className="block md:hidden">
      Encuentra cursos de medicina y cursos de <br />
      enfermería sobre más de 20 especialidades y  <br /> 
      transforma tu carrera en salud con MSK
    </span>

    <span className="hidden md:inline">
      Encuentra cursos de medicina y cursos de enfermería sobre más de 20 especialidades y transforma tu carrera en salud con MSK
    </span>
  </p>
</header>


          {/* NAV + Botón Ver Todos → */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-4 gap-5 my-6">
            <nav className="flex md:gap-4 gap-5 overflow-x-auto scrollbar-hide md:overflow-visible md:flex-wrap whitespace-nowrap" aria-label="Tipos de cursos">
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`md:px-4 md:py-2 px-5 py-3 rounded-full md:text-sm text-base font-medium flex-shrink-0 
                    transition-colors duration-300
                    ${
                      activeTab === tab
                        ? "bg-gray-100 text-black border border-gray-200 hover:text-[#6E737C]"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#6E737C]"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {/* Botón Ver todos (solo desktop) */}
            <Link href={"https://msklatam.com/tienda/?recurso=curso"} passHref>
            <div className="hidden md:block">
              <button className="px-6 py-2 bg-black text-white rounded-full font-medium hover:scale-105 transition">
                Ver todos →
              </button>

            </div>
            </Link>
          </div>

          {/* Si no hay cursos, mostramos el mensaje */}
          {isEmpty ? (
            <div className="text-center text-lg text-gray-500 py-6">
              <p>No hay cursos disponibles en este momento</p>
            </div>
          ) : (
            <>
              {/* Grid de cards (desktop) */}
              <div className="hidden md:w-full md:grid gap-5 auto-rows-[399px]" style={{ gridTemplateColumns: "1fr 1fr 84px 1fr 1fr" }}>
                {cursosMapeados.slice(0, 6).map((curso, idx) => (
                  <div key={curso.id} className={idx === 0 || idx === 5 ? "col-span-3" : ""}>
                    <CursoCard
                      {...curso}
                      variant={idx === 0 || idx === 5 ? "large" : "small"}
                      className="h-full"
                    />
                  </div>
                ))}
              </div>

              {/* Grid mobile */}
              {/* Grid mobile - solo 3 cursos */}
<div className="grid gap-6 md:hidden">
  {cursosMapeados.slice(0, 3).map((curso) => (
    <CursoCard key={curso.id} {...curso} />
  ))}
</div>
            </>
          )}

          {/* Botón Ver todos (solo mobile) */}
          <Link href={"https://msklatam.com/tienda/?recurso=curso"} passHref>
          <div className="mt-6 flex justify-center md:hidden">
            <button className="px-6 py-2 w-full md:w-auto bg-black text-white rounded-full font-medium hover:scale-105 transition">
              Ver todos →
            </button>
          </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Oportunidades;
