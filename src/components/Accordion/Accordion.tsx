import React, { FC, ReactNode, useState } from "react";
import minusIcon from "/public/images/icons/minusIcon.svg";
import plusIcon from "/public/images/icons/plusIcon.svg";
import Image from "next/image";

interface Props {
  title: string;
  children: ReactNode;
  index: number;
  currentIndex: number | null;
  setCurrentIndex: (index: number) => void;
  forModules?: boolean;
  bordered?: boolean;
}

const Accordion: FC<Props> = ({
  title,
  children,
  index,
  currentIndex,
  setCurrentIndex,
  forModules = true,
  bordered = false,
}: Props) => {
  const isOpen = index === currentIndex;
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleAccordion = () => {
    if (isOpen) {
      setIsAnimating(true);
      setCurrentIndex(-1);
      setIsAnimating(false);
    } else {
      setCurrentIndex(index);
    }
  };

  const iconAccordion = isOpen ? minusIcon : plusIcon;
  const titleItem = title.replace(/^Módulo\s+\d+:\s*/, "");
  return (
    <div className={`overflow-hidden accordion ${bordered && "border"}`}>
      <div
        className={`bg-natural-100 py-3 px-1 cursor-pointer flex items-center justify-start ${
          isAnimating ? "opacity-0" : ""
        }`}
        onClick={toggleAccordion}
      >
        <div className="flex items-center text-left">
          <div className="w-[20px] mr-2">
            <Image
              src={iconAccordion.src}
              width={iconAccordion.width}
              height={iconAccordion.height}
              alt="accordion img"
              className="ml-1"
            />
          </div>
          {forModules ? (
            <h2 className="font-medium">
              Módulo {index + 1} •{" "}
              <span className="font-normal">{titleItem}</span>
            </h2>
          ) : (
            titleItem
          )}
        </div>
      </div>
      {isOpen && children}
    </div>
  );
};

export default Accordion;
