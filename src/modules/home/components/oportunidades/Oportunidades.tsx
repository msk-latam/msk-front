import React, { useEffect, useState } from "react";
import CursoCard from "./cards/CursoCard";
import { mapCursoWPToCursoCard } from "@/modules/home/types";

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

  // Asegurarse de que cursosActivos sea siempre un array
  const cursosActivos = cursos[activeTab.toLowerCase()] || [];
  const cursosMapeados = Array.isArray(cursosActivos)
    ? cursosActivos.map(mapCursoWPToCursoCard)
    : [];

  const isEmpty = cursosMapeados.length === 0;

  return (
    <section className="relative w-full md:px-20 md:pt-24 pb-[240px] z-[1] pt-32" aria-labelledby="oportunidades-heading">
      <div className="relative bg-white rounded-[38px] -mt-32 -mb-64 pt-6 md:pt-[72px] md:pb-16 shadow-lg">
        <div className="px-5 md:px-16 pb-6 md:mb-0">
          <header className="md:text-left text-center max-w-4xl px-6 gap-4 md:px-0">
            <h2 id="oportunidades-heading" className="text-xl md:text-2xl font-medium mb-2">
              Te damos la bienvenida a Medical & Scientific Knowledge, el lugar ideal para estudiar medicina a distancia a través de nuestros cursos de actualización.
            </h2>
            <p className="text-sm text-neutral-600">
              Encontrá cursos de medicina y de enfermería sobre más de 20 especialidades
            </p>
          </header>

          <nav className="flex md:gap-4 gap-5 overflow-x-auto scrollbar-hide md:justify-start my-6 whitespace-nowrap" aria-label="Tipos de cursos">
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`md:px-4 md:py-2 px-5 py-3 rounded-full md:text-sm text-base font-medium transition flex-shrink-0 ${
                  activeTab === tab
                    ? "text-black border border-gray-300"
                    : "text-gray-500 border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Si no hay cursos, mostramos el mensaje */}
          {isEmpty ? (
            <div className="text-center text-lg text-gray-500 py-6">
              <p>No hay cursos disponibles en este momento</p>
            </div>
          ) : (
            <>
              {/* Grid de cards */}
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
              <div className="grid gap-6 md:hidden">
                {cursosMapeados.map((curso) => (
                  <CursoCard key={curso.id} {...curso} />
                ))}
              </div>
            </>
          )}

          <div className="mt-6 flex justify-center md:hidden">
            <button className="px-6 py-2 w-full md:w-auto bg-black text-white rounded-full font-medium">
              Ver todos →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Oportunidades;
