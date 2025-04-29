import React, { useState, useEffect } from "react";
import { Search } from "react-feather";
import { useSpecialtyDetailView } from "../hooks/useSpecialtyDetailView";
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import { usePathname, useRouter } from 'next/navigation';
import { supportedLanguages } from '@/config/languages';

interface SearchBarProps {
  placeholder: string;
  isMainView?: boolean;
  isDiscoverView?: boolean;
  isSpecialtyView?: boolean;
  isSpecialtyDetailView?: boolean;
  isInstitutionsView?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  isMainView = false,
  isDiscoverView = false,
  isSpecialtyView = false,
  isSpecialtyDetailView = false,
  isInstitutionsView = false,
  className = "",
}) => {
  const { data, loading } = useSpecialtyDetailView();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const firstSegment = pathname?.split('/')[1];
  const lang = supportedLanguages.includes(firstSegment ?? '') ? firstSegment : 'ar';

  const inputTextStyle =
    isMainView || isDiscoverView || isSpecialtyView || isSpecialtyDetailView
      ? ""
      : isInstitutionsView
      ? "text-[#838790] border-[#989ca4]"
      : "";

  // 🔁 Buscar por nombre de curso
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResults([]);
    } else {
      const allCourses = data.flatMap(item => item.courses);
      const filtered = allCourses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  }, [searchTerm, data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // ✅ Redirige a /tienda/curso.url
  const handleItemClick = (course: any) => {
    const coursePath = course.url.replace(/^\/(course|curso)/, '');
    const storeUrl = getLocalizedUrl(lang, `/tienda${coursePath}`);
    router.push(storeUrl);
    setSearchTerm("");
  };

  return (
    <div className={`relative ${className}`}>
      <div className="rounded-full border border-[#DBDDE2]-100 overflow-hidden relative flex items-center">
        <input
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          className={`bg-transparent w-full text-sm py-3 pl-4 pr-12 border-transparent focus:border-transparent focus:ring-0 focus:outline-none ${inputTextStyle}`}
        />
        <button className="absolute right-1 bg-[#9200AD] p-3 rounded-full">
          <Search className="text-white w-4 h-4" />
        </button>
      </div>

      {searchTerm && filteredResults.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-2 rounded-lg shadow-md max-h-60 overflow-y-auto">
          {filteredResults.map((course) => (
            <li
              key={course.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick(course)}
            >
              {course.name}
            </li>
          ))}
        </ul>
      )}

      {searchTerm && !loading && filteredResults.length === 0 && (
        <div className="absolute z-10 w-full bg-white border mt-2 rounded-lg shadow-md p-4 text-gray-500">
          No se encontraron resultados.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
