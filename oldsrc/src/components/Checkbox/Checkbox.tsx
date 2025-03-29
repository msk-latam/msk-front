import React, { FC } from "react";

export interface CheckboxProps {
  label?: string;
  inputClass?: string;
  subLabel?: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  subLabel = "",
  label = "",
  inputClass = "",
  name,
  onChange,
}) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={name}
          name={name}
          type="checkbox"
          className={inputClass + " cursor-pointer h-4 w-4 text-primary border-primary rounded-full"}
          onChange={onChange}
        />
      </div>
      {label && (
        <div className="ml-3 text-sm">
          <label
            htmlFor={name}
            className="text-paragraph-small text-black dark:text-white"
          >
            {label}
          </label>
          {subLabel && <p className="text-neutral-500">{subLabel}</p>}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
