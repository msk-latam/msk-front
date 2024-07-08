import React, { FC } from "react";
import Image, { ImageProps } from "next/image";

export interface NcImageProps extends ImageProps {
  containerClassName?: string;
}

const NcImage: FC<NcImageProps> = ({
  containerClassName = "",
  alt = "nc-imgs",
  className = "object-cover w-full h-full",
  sizes = "",
  ...args
}) => {
  return (
    <div className={containerClassName}>
      <Image unoptimized={true} className={className} alt={alt} sizes={sizes} {...args} />
    </div>
  );
};

export default NcImage;
