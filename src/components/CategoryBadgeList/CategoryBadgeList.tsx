"use client";
import { PostDataType, Specialty } from "@/data/types";
import React, { FC, useEffect } from "react";
import Badge from "@/components/Badge/Badge";
import { slugifySpecialty } from "@/lib/Slugify";
import { badgeColor } from "@/lib/badgeColor";
import { JsonMapping } from "@/data/types";
import notesMapping from "@/data/jsons/__notes.json";
import { useStoreFilters } from "@/context/storeFilters/StoreProvider";
import { compareByNameOrderSet } from "@/lib/compareByNameOrderSet";

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  categories: any[];
  color?: string;
  isCourse?: boolean;
  isPost?: boolean;
  isEbook?: boolean;
  isTrial?: boolean;
  textSize?: string;
  onStore?: boolean;
}

export interface PillSwitchProps {
  value: string;
  itemClass: string;
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap text-[12px] sm:text-sm",
  itemClass,
  categories,
  color = "yellow",
  isCourse,
  isPost,
  isEbook,
  isTrial,
  textSize,
  onStore,
}) => {
  const notesJSON: JsonMapping = notesMapping;
  const [sortedCategories, setSortedCategories] = React.useState<any[]>([]);
  useEffect(() => {
    const compararPorSlug = (a: any, b: any) => {
      const slugA = a.slug?.toLowerCase();
      const slugB = b.slug?.toLowerCase();
      if (slugA?.includes("actualidad") && !slugB?.includes("actualidad")) {
        return 1;
      } else if (
        !slugA?.includes("actualidad") &&
        slugB?.includes("actualidad")
      ) {
        return -1;
      }
      return 0;
    };
    const sortedCategoriesList =
      categories.sort(compareByNameOrderSet) ||
      categories.sort(compararPorSlug);

    setSortedCategories(sortedCategoriesList);
  }, [categories]);

  const { addFilter } = useStoreFilters();
  const applyFilter = (specialty: Specialty) => {
    if (onStore) addFilter("specialties", specialty);
  };

  const pillSwitch = ({ value, itemClass }: PillSwitchProps) => {
    switch (value) {
      case "ebook":
        return (
          <Badge
            className={itemClass}
            name={"Guía profesional"}
            color={"emerald-post"}
            href={`/tienda?recurso=guias-profesionales`}
            icon="elearning"
          />
        );

      case "course":
        return (
          <>
            {sortedCategories.map((item, index) => (
              <Badge
                onClick={() => applyFilter(item)}
                className={itemClass}
                key={index}
                name={item.name}
                color={badgeColor(item.name)}
                href={`/tienda?especialidad=${slugifySpecialty(
                  item.name
                )}&recurso=curso`}
                textSize={textSize}
              />
            ))}
          </>
        );

      case "post":
        return (
          <>
            {sortedCategories.map((item, index) => (
              <Badge
                className={itemClass}
                key={index}
                name={notesJSON[slugifySpecialty(item.name)]}
                color={badgeColor(notesJSON[slugifySpecialty(item.name)])}
                href={`/archivo?categoria=${slugifySpecialty(item.name)}`}
                textSize={textSize}
              />
            ))}
          </>
        );

      case "trial":
        return (
          <Badge
            className={itemClass}
            name={categories[0]}
            color={"trial"}
            textSize={"text-[11px]"}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      {pillSwitch({
        value: isEbook ? "ebook" : "",
        itemClass: itemClass as string,
      })}
      {pillSwitch({
        value: isCourse ? "course" : "",
        itemClass: itemClass as string,
      })}
      {pillSwitch({
        value: isPost ? "post" : "",
        itemClass: itemClass as string,
      })}
      {pillSwitch({
        value: isTrial ? "trial" : "",
        itemClass: itemClass as string,
      })}
    </div>
  );
};

export default CategoryBadgeList;
