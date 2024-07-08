import React, { FC } from "react";
import Heading from "@/components/Heading/Heading";
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/NavItem/NavItem";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import { useRouter } from "next/router";
import Link from "next/link";
import NcLink from "../NcLink/NcLink";

export interface HeaderFilterProps {
  tabActive: string;
  tabs: string[];
  heading: string;
  onClickTab: (item: string) => void;
  desc?: string;
  viewMore?: string;
  mobileHidden?: string;
}

const HeaderFilter: FC<HeaderFilterProps> = ({
  tabActive,
  tabs,
  heading = "🎈 Latest Articles",
  onClickTab,
  desc = "",
  viewMore = "/tienda?recurso=curso",
  mobileHidden = "hidden",
}) => {
  return (
    <div className="flex flex-col mb-8 relative">
      {desc.length || heading.length ? (
        <Heading desc={desc}>{heading}</Heading>
      ) : null}
      <div className="flex items-center justify-between">
        <Nav
          className="sm:space-x-2"
          containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
        >
          {tabs.map((item, index) => (
            <NavItem
              key={index}
              isActive={tabActive === item}
              onClick={() => onClickTab(item)}
            >
              {item}
            </NavItem>
          ))}
        </Nav>
        <NcLink href={viewMore} className={` sm:block flex-shrink-0`}>
          <ButtonSecondary
            className="!leading-none border-solid border-1 border-neutral-200 text-neutral-400"
            sizeClass="px-3 py-1 sm:py-3 sm:px-6 text-[9.3px]"
          >
            <span className="text-[9.3px] sm:text-sm">Ver más</span>
            <svg
              className="w-3 h-3 sm:w-5 sm:h-5 ml-3 rtl:rotate-180"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.5 12H20.33"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ButtonSecondary>
        </NcLink>
      </div>
    </div>
  );
};

export default HeaderFilter;
