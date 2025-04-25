// components/navbar/views/ViewSpecialty.tsx
import React from "react";
import { ChevronRight, ChevronLeft } from "react-feather";
import specialties from "../data/specialties";

interface Props {
  navigateTo: (view: string, category?: string | null) => void;
  isMobile?: boolean;
  onSelectSpecialty?: (specialty: string) => void;
}

const ViewSpecialty: React.FC<Props> = ({ navigateTo, isMobile = true, onSelectSpecialty }) => {
  if (!isMobile) {
    return (
      <div className="divide-y bg-white h-[80vh] overflow-auto rounded-b-2xl">
        {specialties.map((specialty, index) => (
          <button
            key={index}
            className="flex justify-between whitespace-nowrap items-center w-full py-3 px-4 hover:bg-gray-100 text-gray-800 gap-5"
            onClick={() => {
              if (onSelectSpecialty) {
                onSelectSpecialty(specialty);
              } else {
                navigateTo("specialtyDetail", specialty);
              }
            }}
          >
            <span>{specialty}</span>
            <ChevronRight size={20} />
          </button>
        ))}
      </div>
    );
  }
  
  // Mobile mode remains unchanged
  return (
    <div className="bg-white rounded-t-3xl mt-4 h-full">
      <div className="flex flex-row justify-center items-center px-6 py-8">
        <button className="absolute left-5 top-10 rounded-full border border-black p-2 text-gray-800" onClick={() => navigateTo("discover")}>
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-medium text-gray-800">Descubre</h2>
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
};

export default ViewSpecialty;