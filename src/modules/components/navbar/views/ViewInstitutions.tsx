import React from "react";
import { ArrowLeft, ChevronRight } from "react-feather";
import partners from "../data/partners";
import Image from "next/image";

interface Props {
  navigateTo: (view: string, category?: string | null) => void;
  isMobile?: boolean;
}

const ViewInstitutions: React.FC<Props> = ({ navigateTo, isMobile = true }) => {
  if (!isMobile) {
    // Versión desktop - sin incluir elementos del navbar
    return (
      <div className="bg-[#1a1a1a] w-full rounded-b-3xl">
        <div className="px-4 py-6">
          <h3 className="uppercase ml-52 text-white text-xs font-medium mb-4">
            PARTNERS
          </h3>

          <div className="grid grid-cols-9 gap-2">
            <div 
              className="relative  col-span-2 rounded-2xl p-4 h-24 cursor-pointer"
              onClick={() => navigateTo("institution-list", "universities")}
              style={{ backgroundImage: "url('/images/instituciones/universidades.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
            
            >
              <div className="h-full flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#35383E] rounded-2xl opacity-100"></div>
              <div className="z-10 text-white text-sm bg-cover">Universidades
                </div>
              </div>
              <ChevronRight className="z-10 absolute bottom-4 right-4 text-white h-4 w-4" />
            </div>

            {partners.slice(0, 3).map((partner, index) => (
              <div
              key={index}
              className="relative bg-[#35383E] rounded-lg h-24 flex items-center justify-center overflow-hidden"
              style={{
                backgroundImage: `url('${partner.image}')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              </div>
            ))}

            <div 
              className="relative col-span-2 rounded-2xl p-4 h-24 cursor-pointer"
              onClick={() => navigateTo("institution-list", "companies")}
              style={{ backgroundImage: "url('/images/instituciones/empresas.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
>
              <div className="h-full flex flex-col justify-between">
  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#35383E] rounded-2xl opacity-90"></div>
                <div className="text-white z-10 text-sm">Empresas</div>
              </div>
              <ChevronRight className="absolute z-10 bottom-4 right-4 text-white h-4 w-4" />
            </div>
            <div 
              className="relative col-span-2 rounded-2xl p-4 h-24 cursor-pointer z-10"
              onClick={() => navigateTo("institution-list", "alliances")}
              style={{ backgroundImage: "url('/images/instituciones/alianzas.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
>
              <div className="h-full flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#35383E] rounded-2xl opacity-90"></div>
              <div className="text-white z-10 text-sm">Alianzas</div>
              </div>
              <ChevronRight className="absolute z-10 bottom-4 right-4 text-white h-4 w-4" />
            </div>
            <div className="col-span-2"></div>
            {partners.slice(-3).map((partner, index) => (
              <div
              key={index}
              className="relative bg-[#35383E]  rounded-lg h-24 flex items-center justify-center overflow-hidden"
              style={{
                backgroundImage: `url('${partner.image}')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: "no-repeat"
              }}
            >
              </div>
            ))}
            <div className="col-span-4"></div>

          </div>
        </div>
      </div>
    );
  }
  
  // Versión móvil - Sin cambios
  return (
    <div className="bg-gray-900 rounded-t-3xl mt-4 h-full">
      <div className="flex items-center px-6 py-4">
        <button
          className="mr-4 text-white"
          onClick={() => navigateTo("main")}
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-medium text-white">Instituciones</h2>
      </div>

      <div className="px-6 pt-2 pb-6">
        <div className="rounded-2xl overflow-hidden mb-6">
          <div className="relative bg-gray-800 h-32 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-lg font-medium">Universidades</span>
            </div>
            <span className="absolute right-4">
              <ChevronRight className="text-white" />
            </span>
          </div>
        </div>

        <h3 className="uppercase text-white text-xs font-semibold mb-4">
          PARTNERS
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-2xl h-24 flex items-center justify-center"
            >
              <span className="text-sm text-white">{partner.name}</span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden mb-6">
          <div className="relative bg-gray-700 h-32 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-lg font-medium">Empresas</span>
            </div>
            <span className="absolute right-4">
              <ChevronRight className="text-white" />
            </span>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden">
          <div className="relative bg-gray-700 h-32 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-lg font-medium">Alianzas</span>
            </div>
            <span className="absolute right-4">
              <ChevronRight className="text-white" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInstitutions;