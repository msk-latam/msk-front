// components/navbar/views/ViewSpecialty.tsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp, ChevronRight } from "react-feather";
import specialties from "../../data/specialties";

interface Props {
  navigateTo: (view: string, category?: string | null) => void;
  isMobile?: boolean;
}

const ViewSpecialty: React.FC<Props> = ({ navigateTo, isMobile = true }) => {
  const [open, setOpen] = useState(false);

  if (!isMobile) {
    return (
      <div className="flex flex-col">
        <button
          className="flex justify-between items-center py-3 px-4 text-gray-800 hover:bg-white rounded-lg font-medium"
          onClick={() => setOpen(!open)}
        >
          <span>Especialidades</span>
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {open && (
          <div className="pl-4 flex flex-col gap-1 transition-all duration-300">
            {specialties.map((specialty, index) => (
              <button
                key={index}
                className="flex justify-between items-center py-2 px-4 text-gray-700 hover:bg-gray-50 rounded-md text-sm"
                onClick={() => navigateTo("specialtyDetail", specialty)}
              >
                <span>{specialty}</span>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Modo móvil permanece igual
  return (
    <div className="bg-white rounded-t-3xl mt-4 h-full overflow-auto">
      <div className="flex items-center px-6 py-4 sticky top-0 bg-white">
        <button className="mr-4 text-gray-800" onClick={() => navigateTo("discover")}>
          <ChevronRight size={24} />
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
