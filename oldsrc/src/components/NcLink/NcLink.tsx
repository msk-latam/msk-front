import { Route } from "@/routers/types";
import Link from "next/link";
import React, { FC, ReactNode, MouseEvent } from "react";

export interface NcLinkProps {
  className?: string;
  colorClass?: string;
  href: string;
  children?: ReactNode;
  target?: string;
  onClick?: (event: MouseEvent) => void;
}

const NcLink: FC<NcLinkProps> = ({
  className = "font-medium",
  colorClass = "text-primary-6000 hover:text-red-2 dark:text-primary-500 dark:hover:text-primary-6000",
  children,
  href,
  target = "_self",
  onClick,
  ...args
}) => {
  const handleClick = (event: MouseEvent) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Link
      className={`nc-NcLink ${colorClass} ${className}`}
      href={href as Route}
      target={target}
      onClick={handleClick} // Pass the handleClick function to onClick
      {...args}
    >
      {children}
    </Link>
  );
};

export default NcLink;
