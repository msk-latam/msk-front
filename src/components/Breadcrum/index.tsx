import React from "react";
import { Link, useLocation } from "react-router-dom";
import breadcrumHomeIcon from "../../../public/images/icons/breadcrum_home.svg";
import breadcrumArrowIcon from "../../../public/images/icons/breadcrum_arrow.svg";
import breadcrumHomeIconWhite from "../../../public/images/icons/breadcrum_home_white.svg";
import breadcrumArrowIconWhite from "../../../public/images/icons/breadcrum_arrow_white.svg";
import breadcrumMapping from "../../data/jsons/__breadcrums.json";
import specialtiesMapping from "../../data/jsons/__specialties.json";
import notesMapping from "../../data/jsons/__notes.json";
import { JsonMapping } from "data/types";

interface BreadcrumbMapping {
  [key: string]: string[];
}

interface BreadcrumProps{
    isEbook?: boolean;
    onBlog?: boolean;
    onProduct?: boolean | any;
    onNote?: boolean | any;
}

const specialtiesJSON: JsonMapping = specialtiesMapping;
const notesJSON: JsonMapping = notesMapping;


const Breadcrum: React.FC<BreadcrumProps> = ({isEbook=false, onBlog=false, onProduct=false,onNote=false}) => {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(part => part !== '');

  // Construir la ruta acumulativa
  let rutaAcumulativa = '';
  const breadcrumMap: BreadcrumbMapping = breadcrumMapping;
  
  const partsBreadcrumb = parts.map(part => {
    rutaAcumulativa += '/' + part;
    return breadcrumMap[rutaAcumulativa];
  }).filter(Boolean) as string[][];

  // Aplanar el array de segmentos
  const partsFlattened = ([] as string[]).concat(...partsBreadcrumb).map(part => {
    if (part.includes("mainCategory") && onProduct.ficha) {
        return onProduct.ficha.categorias[0].name ;
      }

    if (part.includes("mainCategory") && onNote) {
        return onNote.categories[0].name ;
      }
    if (part.includes("Curso|Guía profesional")) {
      return isEbook ? onProduct.ficha.title : onProduct.ficha.title;
    }

    if (part.includes("searchCategory")) {
        const parametroCategoria = location.search.split('?')[1]?.split('&').find(param => param.startsWith('categoria='));
        return parametroCategoria ? notesJSON[parametroCategoria.split('=')[1]] : null;
      }

    return part;
  });

  const handleUrl = (part:string) => {
        let managedURL = null;
        
        if(onProduct){
            for (const key in specialtiesJSON) {
                if (specialtiesJSON.hasOwnProperty(key) && specialtiesJSON[key] === part) {
                    managedURL = `/tienda?especialidad=${key}&recurso=curso`
                }
              }
        }
        
        if(onNote){
            for (const key in notesJSON) {
                if (notesJSON.hasOwnProperty(key) && notesJSON[key] === part) {
                    managedURL = `/archivo?categoria=${key}`
                }
              }
        }
        
        return managedURL ?? `/${part.toLowerCase()}`
  }

  return (
    <div className="flex flex-wrap md:flex-nowrap items-center mb-10">
      {/* Incluir el ícono de Home solo si no estamos en la página principal */}
      {location.pathname !== '/' && (
        <Link to="/">
          <img src={`${onBlog ? breadcrumHomeIconWhite : breadcrumHomeIcon}`} alt="Home" className="h-4" />
        </Link>
      )}

      {partsFlattened.map((part, index) => (
        <div className={`inline-flex ${index === parts.length && 'ml-4 md:ml-0 w-[220px] sm:w-auto md:w-[70%] lg:w-auto mt-2 sm:mt-0'}`} key={part}>
          <img src={`${onBlog ? breadcrumArrowIconWhite : breadcrumArrowIcon}`} className="mx-3" alt="Arrow" />

          {/* Agregar una clase para el último segmento */}
          {index === parts.length ? (
            <span className={`font-bold truncate   ${onBlog ? 'text-white' : 'text-[#ABABAB]'}`}>{part}</span>
          ) : (
            // Partes intermedias
            <Link to={handleUrl(part)}  className={`${onBlog ? 'text-white' : 'text-[#ABABAB]'} hover:underline hover:text-[#FF5D5E] `}>
              {part}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrum;
