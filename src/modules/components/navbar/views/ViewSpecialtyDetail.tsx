// components/specialty/views/ViewSpecialtyDetail.tsx
import React from "react";
import { ArrowLeft, ChevronRight } from "react-feather";
import { useSpecialtyDetailView } from "../hooks/useSpecialtyDetailView";
import { Course } from "../hooks/types";
import Link from "next/link";
import ViewSpecialtyDetailSkeleton from "../skeletons/ViewSpecialtyDetailSkeleton"
import { useRouter, usePathname } from 'next/navigation';
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import { supportedLanguages } from '@/config/languages';
import { urlFormat } from '@/utils/urlFormat';
interface Props {
  selectedCategory: string | null;
  navigateTo: (view: string, category?: string | null) => void;
  specialtyId: number;
  isMobile?: boolean;
  onBack?: () => void;
  onClose?: () => void;
}

const ViewSpecialtyDetail: React.FC<Props> = ({ 
  selectedCategory, 
  navigateTo, 
  specialtyId, 
  isMobile = true, 
  onBack,
  onClose
}) => {
  const pathname = usePathname();
const firstSegment = pathname?.split('/')[1];
const lang = supportedLanguages.includes(firstSegment ?? '') ? firstSegment : 'ar';
  const { selectedSpecialty, loading, error } = useSpecialtyDetailView(specialtyId);

  if (loading) {
    return <ViewSpecialtyDetailSkeleton/>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedSpecialty) {
    return <div>Specialty not found</div>;
  }

  const router = useRouter();
  const courses: Course[] = selectedSpecialty.courses;
  const specialtyName = selectedSpecialty.specialty.name;

      const specialtySlug = specialtyName
        .toLowerCase()
        .replace(/\s+/g, '-')     
        .normalize("NFD")          
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9-]/g, ''); 
    
      const storeUrl = urlFormat(`/tienda/${specialtySlug}`);

  if (!isMobile) {
    return (
      <div className="p-4 h-fit overflow-auto w-full bg-white rounded-b-2xl">
        <div className="flex flex-col">
          {courses.length > 0 ? (
            courses.map((course, index) => {
              const newUrl = course.url.replace('/curso', '/curso');
              return (
                <Link key={index} href={getLocalizedUrl(lang, newUrl)} className="block mb-6 last:mb-0">
                  <div className="relative rounded-[30px] overflow-hidden h-48 bg-gray-300 cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-medium mb-1">{course.name}</h3>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="text-center py-8">No hay cursos disponibles para esta especialidad</div>
          )}
        </div>

        <Link href={storeUrl}
          className="mt-4 flex justify-between items-center w-full p-4 bg-gray-100 hover:bg-gray-200 rounded-2xl text-gray-800"
        >
          <span className="whitespace-nowrap">Ver todos los cursos</span>
          <ChevronRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-t-3xl mt-4 h-full overflow-auto pb-5">
    <div className="relative flex justify-center items-center px-6 w-full py-8">
      <button 
        className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full border border-black p-2 text-gray-800" 
          onClick={() => navigateTo("specialty")}
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-medium text-gray-800">{specialtyName}</h2>
      </div>

      <div className="px-6 py-4 bg-white">
        {courses.length > 0 ? (
          courses.map((course, index) => {
            const newUrl = course.url.replace('/curso', '/curso');
            return (
              <Link key={index} href={newUrl} className="block mb-6 last:mb-0" onClick={onClose}>
                <div className="relative rounded-[30px] overflow-hidden h-48 bg-gray-300 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-medium mb-1">{course.name}</h3>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-center py-8">No hay cursos disponibles para esta especialidad</div>
        )}

<Link href={storeUrl}
          className="mt-4 flex justify-between items-center w-full p-4 bg-gray-100 hover:bg-gray-200 rounded-2xl text-gray-800"
          onClick={onClose}>
          <span className="whitespace-nowrap" >Ver todos los cursos</span>
          <ChevronRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default ViewSpecialtyDetail;
