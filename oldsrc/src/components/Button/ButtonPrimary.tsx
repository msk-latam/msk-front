"use client";

import Button, { ButtonProps } from "@/components/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  const isNotDisabled =
    !args.disabled &&
    "hover:bg-red-500 hover:text-neutral-50 disabled:cursor-not-allowed";
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:cursor-not-allowed disabled:bg-grey-disabled bg-primary-6000 text-neutral-50 ${isNotDisabled} ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
