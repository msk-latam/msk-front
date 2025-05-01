'use client';

import React from "react";
import Image from "next/image";
import { useInstitutions } from "@/modules/home/hooks/useInstitution";
import InstitutionsSkeleton from "@/modules/home/skeletons/InstitutionsSkeleton"; // Skeleton

const Institutions = () => {
  const { institutions, loading, error } = useInstitutions();

  if (loading) {
    return <InstitutionsSkeleton />; 
  }

  if (error) {
    return <div className="text-center text-[#f5006d]">Error: {error}</div>;
  }

  return (
    <section className="relative bg-white rounded-[40px] overflow-visible max-w-[1600px] mx-auto md:px-4 -mt-24 translate-y-[70px] z-10 py-10 px-5 md:gap-4 shadow-lg">
      <h2 className="text-center md:text-left font-raleway font-[500] md:text-[27px] md:ml-24 text-[22px] mb-7">
        Nos respaldan prestigiosas instituciones de todo el mundo con sus certificaciones
      </h2>

      <div className="grid grid-cols-2 gap-6 items-center justify-center w-full md:mx-auto md:max-w-7xl md:flex md:flex-row md:flex-wrap md:gap-4">
        {institutions.map((institution, idx) => (
          <div
            key={institution.id}
            className="bg-[#F7F9FF] rounded-[30px] md:px-9 md:p-6 p-6 flex justify-center items-center hover:scale-105 transition"
          >
            <div className="flex items-center justify-center w-32 h-20 bg-transparent">
  <Image
    src={institution.image}
    alt={institution.title}
    width={100}
    height={100}
    className="object-contain mix-blend-multiply"
    loading="lazy"
    sizes="(max-width: 768px) 50px, 100px"
  />
</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Institutions;
