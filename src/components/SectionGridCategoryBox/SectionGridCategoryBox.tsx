"use client";
import CardCategory1 from "@/components/CardCategory1/CardCategory1";
import CardCategory2 from "@/components/CardCategory2/CardCategory2";
import CardCategory3 from "@/components/CardCategory3/CardCategory3";
import CardCategory4 from "@/components/CardCategory4/CardCategory4";
import CardCategory5 from "@/components/CardCategory5/CardCategory5";
import Heading from "@/components/Heading/Heading";
import { DEMO_CATEGORIES } from "@/data/taxonomies";
import { Specialty, TaxonomyType } from "@/data/types";
import React from "react";
import NcLink from "../NcLink/NcLink";

export interface SectionGridCategoryBoxProps {
  categories?: TaxonomyType[] | Specialty[];
  headingCenter?: boolean;
  categoryCardType?: "card1" | "card2" | "card3" | "card4" | "card5";
  className?: string;
}

const DATA = DEMO_CATEGORIES.filter((_, i) => i < 10);

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
  categories = DATA,
  categoryCardType = "card2",
  headingCenter = true,
  className = "",
}) => {
  let CardComponentName = CardCategory2;
  switch (categoryCardType) {
    case "card1":
      CardComponentName = CardCategory1;
      break;
    case "card2":
      CardComponentName = CardCategory2;
      break;
    case "card3":
      CardComponentName = CardCategory3;
      break;
    case "card4":
      CardComponentName = CardCategory4;
      break;
    case "card5":
      CardComponentName = CardCategory5;
      break;
    default:
      CardComponentName = CardCategory2;
  }

  return (
    <div className={`nc-SectionGridCategoryBox relative ${className}`}>
      <Heading
        desc="Elige un área de interés y descúbrelos"
        isCenter={headingCenter}
      >
        Cursos por especialidades
      </Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8 justify-center">
        {categories.map((item, i) => (
          <CardComponentName
            index={i < 1 ? `#${i + 1}` : undefined}
            key={item.id}
            taxonomy={item}
            className="rounded-lg"
          />
        ))}
        <div className="w-full col-span-2 sm:col-span-1 flex justify-items-center">
          <NcLink
            href="/tienda?recurso=curso"
            className="w-full !border-white nc-CardCategory2 h-full text-primary font-medium sm:font-semibold flex items-center justify-center text-center mx-auto  [ nc-dark-box-bg-has-hover ]"
          >
            Ver todas
          </NcLink>
        </div>
      </div>
    </div>
  );
};

export default SectionGridCategoryBox;
