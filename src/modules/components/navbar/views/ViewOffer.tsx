
// components/specialty/views/ViewSpecialtyDetail.tsx
import React from "react";
import { ArrowLeft, ChevronRight } from "react-feather";
import { useOfferView } from "../hooks/useOfferView";
import { Course } from "../hooks/types";

interface Props {
    navigateTo: (view: string, category?: string | null) => void;
    isMobile?: boolean;
  }

const ViewOffer: React.FC<Props> = ({ navigateTo, isMobile = true }) => {

  // Pass the specialtyId to the hook
  const { data, loading, error } = useOfferView();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Specialty not found</div>;
  }

  // Get the courses from the selected specialty


  if (!isMobile) {
    return (
      <div className="p-4 h-fit overflow-visible w-full bg-white rounded-b-2xl">
 <div className="w-full rounded-b-2xl bg-white p-4">
            {data.offers.map((offer, index) => (
              <button
                key={`offer-${index}`}
                className="w-full flex justify-between items-center p-4 text-gray-800 hover:bg-gray-100 rounded-lg"
                onClick={() => navigateTo("offer", offer.link.url)}
              >
                <span>{offer.link.title}</span>
                <ChevronRight size={20} />
              </button>
            ))}
          </div>

        <button className="mt-4 flex justify-between items-center w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-2xl text-gray-800">
          <span className="whitespace-nowrap">Ver todos los cursos</span>
          <ChevronRight size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-t-3xl mt-4 h-full overflow-auto px-4">
      <div className="flex flex-row justify-center items-center px-6 py-8">
        <button 
          className="absolute left-5 top-10 rounded-full border border-black p-2 text-gray-800" 
          onClick={() => navigateTo("specialty")}
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-medium text-gray-800">Que ofrecemos</h2>
      </div>
      <div className="flex flex-col bg-gray-200 rounded-2xl">
            {data.offers.map((offer, index) => (
        <button
        className="flex justify-between items-center p-4 hover:bg-gray-300 text-gray-800"
        onClick={() => navigateTo("offer", offer.link.url)}
              >
                <span>{offer.link.title}</span>
                <ChevronRight size={20} />
              </button>
            ))}
          </div>
    </div>
  );
};

export default ViewOffer;