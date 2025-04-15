// components/navbar/views/ViewSpecialty.tsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft, ArrowLeft } from "react-feather";
import specialties from "../data/specialties";

interface Props {
  navigateTo: (view: string, category?: string | null) => void;
  isMobile?: boolean;
}

const ViewSpecialty: React.FC<Props> = ({ navigateTo, isMobile = true }) => {
  const [open, setOpen] = useState(false);

  if (!isMobile) {
    return null;
  }

  // Mobile mode remains unchanged
  return (
    <div className="bg-white rounded-t-3xl mt-4 h-full overflow-auto">
      <div className="flex flex-row justify-center items-center px-6 py-8">
        <button className="absolute left-5 top-10 rounded-full border border-black p-2 text-gray-800" onClick={() => navigateTo("main")}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-medium text-gray-800">Especialidades</h2>
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