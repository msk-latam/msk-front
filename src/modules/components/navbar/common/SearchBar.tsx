import React, { useState, useEffect } from "react";
import { Search } from "react-feather";
import { useSpecialtyDetailView } from "../hooks/useSpecialtyDetailView"; // Ajustá la ruta si es necesario
import { getLocalizedUrl } from '@/utils/getLocalizedUrl';
import { usePathname, useRouter } from 'next/navigation'; // para detectar el idioma
import { supportedLanguages } from '@/config/languages'; // para validar


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
  const { data, loading, error } = useSpecialtyDetailView();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<typeof data>([]);
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

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResults([]);
    } else {
      const filtered = data.filter(item =>
        item.specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  }, [searchTerm, data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle item click and redirect to store with filter
  const handleItemClick = (specialty: any) => {
    const specialtySlug = specialty.name
      .toLowerCase()
      .replace(/\s+/g, '-')     
      .normalize("NFD")          
      .replace(/[\u0300-\u036f]/g, "") 
      .replace(/[^a-z0-9-]/g, ''); 
  
    const storeUrl = `${getLocalizedUrl(lang, '/tienda')}?especialidades=${specialtySlug}`;
  
    router.push(storeUrl); // ✅ ahora navegación SPA
  
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

      {/* Lista de resultados */}
      {searchTerm && filteredResults.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-2 rounded-lg shadow-md max-h-60 overflow-y-auto">
          {filteredResults.map((item) => (
            <li
              key={item.specialty.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick(item.specialty)}
            >
              {item.specialty.name}
            </li>
          ))}
        </ul>
      )}

      {/* Mensaje si no hay resultados */}
      {searchTerm && !loading && filteredResults.length === 0 && (
        <div className="absolute z-10 w-full bg-white border mt-2 rounded-lg shadow-md p-4 text-gray-500">
          No se encontraron resultados.
        </div>
      )}
    </div>
  );
};

export default SearchBar;