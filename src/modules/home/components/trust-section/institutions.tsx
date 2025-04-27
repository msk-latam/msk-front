'use client';

import React from "react";
import Image from "next/image";
import { useInstitutions } from "@/modules/home/hooks/useInstitution";
import InstitutionsSkeleton from "@/modules/home/skeletons/InstitutionsSkeleton"; // Importamos el skeleton

const Institutions = () => {
  const { institutions, loading, error } = useInstitutions();

  if (loading) {
    return <InstitutionsSkeleton />; // Mostramos Skeleton mientras carga
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <section className="relative bg-white rounded-[40px] overflow-visible max-w-[1600px] mx-auto md:px-4 -mt-24 translate-y-[70px] z-10 py-10 px-5 md:px-10 md:gap-4 shadow-lg">
      <h2 className="text-center md:text-left font-raleway font-[500] md:text-[27px] md:ml-24 text-[22px] mb-7">
        Nos respaldan prestigiosas instituciones de todo el mundo con sus certificaciones
      </h2>

      <div className="grid grid-cols-2 gap-6 items-center justify-center w-full md:mx-auto md:max-w-7xl md:flex md:flex-row md:flex-wrap md:gap-4">
        {institutions.map((institution) => (
          <div
            key={institution.id}
            className="bg-[#F7F9FF] rounded-[30px] md:px-10 md:p-6 p-6 flex justify-center items-center hover:scale-105 transition"
          >
            <div className="relative w-[100px] h-[100px] bg-transparent">
              <Image
                src={institution.image}
                alt={institution.title}
                fill
                className="object-contain mix-blend-multiply"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Institutions;
