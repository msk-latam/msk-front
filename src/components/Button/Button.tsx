'use client';

import React, { ButtonHTMLAttributes, FC } from 'react';
import { Route } from '@/routers/types';
import Link from 'next/link';
import Loading from './Loading';
import twFocusClass from '@/utils/twFocusClass';

export interface ButtonProps {
  className?: string;
  translate?: string;
  sizeClass?: string;
  fontSize?: string;
  rel?: any;
  //
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  href?: Route | string;
  locale?: string;
  targetBlank?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  rounded?: string;
  bordered?: boolean;
}

const Button: FC<ButtonProps> = ({
  className = 'text-neutral-700 dark:text-neutral-200',
  translate = '',
  sizeClass = 'px-4 py-3 sm:px-6',
  fontSize = 'text-sm sm:text-base font-medium',
  rounded = 'rounded',
  disabled = false,
  bordered = false,
  href,
  children,
  targetBlank,
  type,
  loading,
  onClick = () => {},
  locale,
}) => {
  const CLASSES =
    `nc-Button relative h-auto inline-flex items-center justify-center transition-colors ${rounded} ${fontSize} ${sizeClass} ${translate} ${className} ` +
    twFocusClass(true);

  if (!!href) {
    return (
      <Link
        href={href as Route}
        locale={locale}
        className={`${CLASSES} `}
        onClick={onClick}
        type={type}
      >
        {loading && <Loading />}
        {children || `This is Link`}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || loading}
      className={`${CLASSES}`}
      onClick={onClick}
      type={type}
    >
      {loading && <Loading />}
      {children || `Button default`}
    </button>
  );
};

export default Button;
