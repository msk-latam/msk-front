import React, { FC } from "react";
import Heading from "components/Heading/Heading";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import ButtonSecondary from "components/Button/ButtonSecondary";

export interface HeaderFilterProps {
  tabActive: string;
  tabs: string[];
  heading: string;
  onClickTab: (item: string) => void;
}

const HeaderFilter: FC<HeaderFilterProps> = ({
  tabActive,
  tabs,
  heading = "🎈 Latest Articles",
  onClickTab,
}) => {
  return (
    <div className="flex flex-col mb-8 relative">
      <Heading>{heading}</Heading>
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
        <span className="hidden sm:block flex-shrink-0">
          <ButtonSecondary className="!leading-none border-solid border-1 border-neutral-200 text-neutral-400">
            <span>Ver más</span>
            <i className="ml-3 las la-arrow-right text-xl"></i>
          </ButtonSecondary>
        </span>
      </div>
    </div>
  );
};

export default HeaderFilter;
