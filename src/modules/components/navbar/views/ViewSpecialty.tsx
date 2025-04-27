import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "react-feather";
import { useSpecialtyView } from "../hooks/useSpecialtyView";
import ViewSpecialtyDetail from "./ViewSpecialtyDetail";

interface Props {
  navigateTo: (view: string, category?: string | null) => void;
  isMobile?: boolean;
}

const ViewSpecialty: React.FC<Props> = ({ navigateTo, isMobile = true }) => {
  const { data, loading, error } = useSpecialtyView();
  // New state to track the selected specialty in desktop mode
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string | null>(null);

  const specialities = data?.specialities ?? [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSpecialtyClick = (specialty: any) => {
    if (isMobile) {
      // For mobile, navigate as before
      navigateTo("specialtyDetail", specialty.id.toString());
    } else {
      // For desktop, just update the selected specialty ID
      setSelectedSpecialtyId(specialty.id.toString());
    }
  };

  // Handle going back to the specialty list (clearing selection)
  const handleBackFromDetail = () => {
    setSelectedSpecialtyId(null);
  };

  if (!isMobile) {
    return (
      <div className="grid grid-cols-4 h-fit overflow-visible  rounded-b-2xl">
        {/* Left column - Specialty list */}
        <div className="col-span-2 divide-y bg-white overflow-y-auto overflow-x-hidden h-[80vh] rounded-b-2xl">
          {specialities.map((specialty) => (
            <button
              key={specialty.id}
              className={`flex justify-between whitespace-nowrap items-center w-full py-3 px-4 hover:bg-gray-100 text-gray-800 gap-5 ${
                selectedSpecialtyId === specialty.id.toString() ? "bg-gray-100" : ""
              }`}
              onClick={() => handleSpecialtyClick(specialty)}
            >
              <span>{specialty.name}</span>
              <ChevronRight size={20} />
            </button>
          ))}
        </div>

        {/* Right column - Detail view */}
        <div className="col-span-2 rounded-b-2xl">
          {selectedSpecialtyId ? (
            <ViewSpecialtyDetail
              selectedCategory={selectedSpecialtyId}
              navigateTo={navigateTo}
              specialtyId={parseInt(selectedSpecialtyId, 10)}
              isMobile={false}
              onBack={handleBackFromDetail}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">

            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-t-3xl mt-4 h-fit">
      <div className="flex flex-row justify-center items-center px-6 py-8">
        <button className="absolute left-5 top-10 rounded-full border border-black p-2 text-gray-800" onClick={() => navigateTo("discover")}>
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-medium text-gray-800">Descubre</h2>
      </div>

      <div className="divide-y">
        {specialities.map((specialty) => (
          <button
            key={specialty.id}
            className="flex justify-between items-center px-6 py-4 w-full hover:bg-gray-100 text-gray-800"
            onClick={() => handleSpecialtyClick(specialty)}
          >
            <span>{specialty.name}</span>
            <ChevronRight size={20} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewSpecialty;