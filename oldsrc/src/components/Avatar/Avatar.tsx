"use client";

import { avatarColors } from "@/contains/contants";
import { _getAvatarRd } from "@/contains/fakeData";
import Image, { StaticImageData } from "next/image";
import React, { FC, useEffect, useState } from "react";

export interface AvatarProps {
  containerClassName?: string;
  sizeClass?: string;
  radius?: string;
  imgUrl?: string | StaticImageData;
  userName?: string;
}

const _setBgColor = (name: string) => {
  const backgroundIndex = Math.floor(name.charCodeAt(0) % avatarColors.length);
  return avatarColors[backgroundIndex];
};

const _setInitials = (name: string) => {
  const initials = name.trim().split(" ");
  if (initials.length === 1) {
    return initials[0].charAt(0);
  } else {
    const firstInitial = initials[0].charAt(0);
    const secondInitial = initials[1].charAt(0);
    return firstInitial + secondInitial;
  }
};

const Avatar: FC<AvatarProps> = ({
  containerClassName = "ring-1 ring-white dark:ring-neutral-900",
  sizeClass = "h-6 w-6 text-sm",
  radius = "rounded-full",
  imgUrl,
  userName,
}) => {
  const name = userName || "John Doe";
  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
      style={{ backgroundColor: imgUrl ? undefined : _setBgColor(name) }}
    >
      {imgUrl && (
          <Image
            fill
            sizes="100px"
            className="absolute inset-0 w-full h-full object-cover"
            src={imgUrl}
            alt={name}
          />
      )}


      <span className="wil-avatar__name font-semibold">
        {_setInitials(name)}
      </span>
    </div>
  );
};

export default Avatar;
