"use client";
import React from "react";
import breadcrumHomeIcon from "/public/images/icons/breadcrum_home.svg";
import breadcrumArrowIcon from "/public/images/icons/breadcrum_arrow.svg";
import breadcrumHomeIconWhite from "/public/images/icons/breadcrum_home_white.svg";
import breadcrumArrowIconWhite from "/public/images/icons/breadcrum_arrow_white.svg";
import breadcrumMapping from "@/data/jsons/__breadcrums.json";
import specialtiesMapping from "@/data/jsons/__specialties.json";
import notesMapping from "@/data/jsons/__notes.json";
import { JsonMapping } from "@/data/types";
import NcLink from "../NcLink/NcLink";
import Image from "next/image";
import {usePathname} from "next/navigation";

interface BreadcrumbMapping {
  [key: string]: string[];
}

interface BreadcrumProps {
  isEbook?: boolean;
  onBlog?: boolean;
  onProduct?: boolean | any;
  onNote?: boolean | any;
}

const specialtiesJSON: JsonMapping = specialtiesMapping;
const notesJSON: JsonMapping = notesMapping;

const Breadcrum: React.FC<BreadcrumProps> = ({
  isEbook = false,
  onBlog = false,
  onProduct = false,
  onNote = false,
}) => {
  const pathname = usePathname();
  const parts = pathname.split("/").filter((part) => part !== "");

  // Construir la ruta acumulativa
  const breadcrumMap: BreadcrumbMapping = breadcrumMapping;

  const partsBreadcrumb = parts.map((part) => {
      if (part.length === 2 && /^[a-z]+$/i.test(part)) {
        // Si es un código ISO de país, no lo agregamos a la ruta acumulativa
        return false;
      }


      let rutaAcumulativa = "";
      rutaAcumulativa += "/" + part;
      return breadcrumMap[rutaAcumulativa];
    }).filter(Boolean) as string[][];


  // Aplanar el array de segmentos
  const partsFlattened = ([] as string[])
    .concat(...partsBreadcrumb)
    .map((part) => {
      if (part.includes("mainCategory") && onProduct.ficha) {
        return onProduct.ficha.categorias[0].name;
      }

      if (part.includes("mainCategory") && onNote) {
        return onNote.categories[0].name;
      }
      if (part.includes("Curso|Guía profesional")) {
        return isEbook ? onProduct.ficha.title : onProduct?.ficha?.title;
      }

      if (part.includes("searchCategory")) {
        if (typeof window === "undefined") return part;
        const parametroCategoria = location.search
          .split("?")[1]
          ?.split("&")
          .find((param) => param.startsWith("categoria="));
        return parametroCategoria
          ? notesJSON[parametroCategoria.split("=")[1]]
          : null;
      }

      return part;
    });

  let searchQuery = "";
  if (typeof window !== "undefined"){
    //Check if the url has a search query parameter "especialidad" and add it to the parts array
    searchQuery = location.search.split("?")[1];
  }

  if (searchQuery) {
    const searchQueryParts = searchQuery.split("&");
    let especialidad = searchQueryParts.find((part) =>
      part.startsWith("especialidad=")
    );
    if (especialidad) {
      especialidad = especialidad.split("=")[1];
      // @ts-ignore
      if (specialtiesMapping[especialidad] !== undefined){
        // @ts-ignore
        partsFlattened.push(specialtiesMapping[especialidad]);
      }
    }
  }


  const handleUrl = (part: string) => {
    let managedURL = null;

    if (onProduct) {
      for (const key in specialtiesJSON) {
        if (
          specialtiesJSON.hasOwnProperty(key) &&
          specialtiesJSON[key] === part
        ) {
          managedURL = `/tienda?especialidad=${key}&recurso=curso`;
        }
      }
    }

    if (onNote) {
      for (const key in notesJSON) {
        if (notesJSON.hasOwnProperty(key) && notesJSON[key] === part) {
          managedURL = `/archivo?categoria=${key}`;
        }
      }
    }

    return managedURL ?? `/${part.toLowerCase()}`;
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap items-center mb-5 w-full">
      {/* Incluir el ícono de Home solo si no estamos en la página principal */}
      {pathname !== "/" && (
        <NcLink href="/" className="">
          <Image
            src={`${
              onBlog ? breadcrumHomeIconWhite.src : breadcrumHomeIcon.src
            }`}
            width={20}
            height={20}
            alt="Home"
            className="h-4 breadcrumb-home"
          />
        </NcLink>
      )}

      {partsFlattened.map((part, index) => (
        <div
          className={`inline-flex ${
            index === parts.length &&
            "ml-4 md:ml-0 w-[220px] sm:w-auto md:w-[70%] lg:w-auto mt-2 sm:mt-0"
          }`}
          key={part}
        >
          <img
            src={`${
              onBlog ? breadcrumArrowIconWhite.src : breadcrumArrowIcon.src
            }`}
            className="mx-3"
            alt="Arrow"
          />

          {index === partsFlattened.length - 1 ? (
            <span
              className={`truncate max-w-[230px] sm:max-w-[500px] md:max-w-[300px] lg:max-w-[420px] xl:max-w-[400px]
              ${onBlog ? "font-bold text-white" : "text-[#ABABAB]"}
              ${onProduct ? "font-bold" : ""}
              ${onNote ? "font-bold" : ""}
              `}
            >
              {part}
            </span>
          ) : (
            // Partes intermedias
            <NcLink
              href={handleUrl(part)}
              colorClass=""
              className={`${
                onBlog ? "text-white" : "text-[#ABABAB]"
              } hover:underline hover:text-[#FF5D5E] `}
            >
              {part}
            </NcLink>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrum;
