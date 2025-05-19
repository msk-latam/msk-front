// components/specialty/views/ViewSpecialtyDetail.tsx
import React from "react";
import { ArrowLeft, ChevronRight, ChevronLeft } from "react-feather";
import { useOfferView } from "../hooks/useOfferView";
import Link from "next/link";
import ViewOfferSkeleton from "../skeletons/ViewOfferSkeleton";
import { usePathname } from "next/navigation";
import { getLocalizedUrl } from "@/utils/getLocalizedUrl";
import { supportedLanguages } from "@/config/languages";

interface Props {
  navigateTo: (view: string, category?: string | null) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const ViewOffer: React.FC<Props> = ({
  navigateTo,
  isMobile = true,
  onClose,
}) => {
  // Pass the specialtyId to the hook
  const { data, loading, error } = useOfferView();
  const pathname = usePathname();
  const firstSegment = pathname?.split("/")[1];
  const lang = supportedLanguages.includes(firstSegment ?? "")
    ? firstSegment
    : "ar";

  if (loading) {
    return <ViewOfferSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Offer not found</div>;
  }

  // Get the courses from the selected specialty

  if (!isMobile) {
    return (
      <div className="h-fit overflow-visible w-fit bg-white rounded-b-2xl">
        <div className="w-full rounded-b-2xl bg-white divide-y">
          {data.offers?.map((offer, index) => (
            <Link
              key={`offer-${index}`}
              href={getLocalizedUrl(lang, offer.link.url)}
              className="w-full flex justify-between items-center  py-3 px-4 text-gray-800 hover:bg-gray-100 rounded-lg"
            >
              <span>{offer.link.title}</span>
              <ChevronRight size={20} />
            </Link>
          ))}
        </div>

        {/* <Link href={getLocalizedUrl(lang, "/tienda")}>
          <button className="flex justify-between items-center w-full p-4 bg-gray-100 hover:bg-gray-200 rounded-2xl text-gray-800">
            <span className="whitespace-nowrap">Ver todos los cursos</span>
            <ChevronRight size={20} />
          </button>
        </Link> */}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-t-3xl mt-4 h-full overflow-auto px-4">
      <div className="flex flex-row justify-center items-center px-6 py-8">
        <button
          className="absolute left-5 top-10 rounded-full border border-black p-2 text-gray-800"
          onClick={() => navigateTo("discover")}
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-medium text-gray-800">Que ofrecemos</h2>
      </div>
      <div className="flex flex-col bg-gray-200 rounded-2xl">
        {data.offers?.map((offer, index) => (
          <Link
            key={`offer-${index}`}
            href={offer.link.url}
            className="flex flex-row justify-between items-center p-4 hover:bg-gray-300 text-gray-800"
            onClick={onClose}
          >
            <span>{offer.link.title}</span>
            <ChevronRight size={20} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ViewOffer;
