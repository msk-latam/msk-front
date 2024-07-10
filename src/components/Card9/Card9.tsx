"use client";

import React, { FC, useContext } from "react";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import Link from "next/link";
import NcImage from "@/components/NcImage/NcImage";
import { CountryContext } from "@/context/country/CountryContext";
import Showing from "@/components/Showing/Showing";
import moduleIcon from "/public/images/icons/moduleIcon.svg";
import timeIcon from "/public/images/icons/timeIcon.svg";

export interface Card9Props {
  className?: string;
  ratio?: string;
  post: any;
  hoverClass?: string;
  showDescription?: boolean;
  badgeColor?: string;
  kind: "curso" | "guia" | "blog";
}

const Card9: FC<Card9Props> = ({
  className = "h-full",
  ratio = "aspect-w-3 aspect-h-3 sm:aspect-h-4",
  post,
  hoverClass = "",
  showDescription = false,
  badgeColor = "yellow",
  kind,
}) => {
  const { title, categories, id, slug, image } = post;
  const { countryState } = useContext(CountryContext);
  const imageURL = image
    ? image.replace(`${countryState.country || "mx"}.`, "")
    : "";

  const renderMeta = () => {
    return (
      <div className="inline-flex items-center text-xs text-neutral-300">
        <div className="block ">
          <h4 className="block text-lg font-semibold text-white mb-2">
            <span className="text-xl font-raleway font-bold" title={title}>
              {title}
            </span>
          </h4>
          {post.cantidad_modulos && (
            <Showing
              title={`${post.cantidad_modulos} temas`}
              icon={moduleIcon.src}
              className="mb-2"
            />
          )}
          {post.duration && (
            <Showing
              title={`${post.duration} horas estimadas`}
              icon={timeIcon.src}
            />
          )}
          <>
            {showDescription && post.lista_de_cedentes ? (
              <div className="sm:block mt-2">
                <span className="text-neutral-300 text-[10px] line-clamp-1">Certificación</span>

                <span className="text-neutral-300 text-sm line-clamp-1 ">
                  {post.lista_de_cedentes[0].post_title}
                </span>
              </div>
            ) : null}
          </>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-Card9 relative flex flex-col group rounded-3xl overflow-hidden z-0 ${hoverClass} ${className}`}
    >
      {/* 
        <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between transition-all opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 duration-300">
          <PostCardLikeAndComment className="relative" />
          <PostCardSaveAction hidenReadingTime className="relative" />
        </div> 
      */}
      <div className={`flex items-start relative w-full ${ratio}`}></div>
      <Link href={`/curso/${slug}`}>
        <NcImage
          containerClassName="absolute inset-0 rounded-2xl sm:rounded-3xl"
          src={imageURL}
          fill
          sizes="200px"
          alt="categories"
          className="object-cover"
        />

        <span className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-100 md:opacity-80 group-hover:opacity-100 transition-opacity"></span>
      </Link>
      <Link
        href={`/curso/${slug}`}
        className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black opacity-50"
      ></Link>
      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col flex-grow">
        <Link href={`/curso/${slug}`} className="absolute inset-0"></Link>
        <div className="mb-3">
          <CategoryBadgeList
            categories={categories}
            color={badgeColor}
            isPost={kind === "blog"}
            isCourse={kind === "curso"}
            isEbook={kind === "guia"}
          />
        </div>
        {renderMeta()}
      </div>
    </div>
  );
};

export default Card9;
