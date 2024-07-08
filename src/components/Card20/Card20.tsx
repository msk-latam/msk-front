import React, { FC, useContext } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { Aval, PostDataType } from "@/data/types";
import { CountryContext } from "@/context/country/CountryContext";
import Tooltip from "@/components/Tooltip/Tooltip";
import Image from "next/image";
import { removeFirstSubdomain } from "@/utils/removeFirstSubdomain";

export interface Card20Props {
  className?: string;
  index?: number;
  post: Aval;
}

const Card20: FC<Card20Props> = ({ className = "h-full", post, index }) => {
  let { title, description, image } = post;
  const { state } = useContext(CountryContext);
  if (image) {
    image = removeFirstSubdomain(image);
  }

  return (
    <div
      className={`nc-Card20 group relative flex flex-col ${className}`}
      data-nc-id="Card20"
    >
      <div className="block bg-white flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-lg ">
        <NcImage
          containerClassName="absolute inset-0"
          src={image}
          alt={title}
          width="300"
          height="300"
        />
      </div>
      <Tooltip text={description} className={`absolute bottom-5`}>
        <Image
          src={"/images/icons/info_tooltip.svg"}
          width={15}
          height={15}
          alt="info cedente"
          className="ml-auto mr-4"
        />
      </Tooltip>
    </div>
  );
};

export default Card20;
