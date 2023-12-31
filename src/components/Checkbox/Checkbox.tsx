import React, { FC } from "react";

export interface CheckboxProps {
  label?: string;
  subLabel?: string;
  name: string;
  useStateCallback?: Function
  value?: boolean
  required?: boolean
}

const Checkbox: FC<CheckboxProps> = ({ subLabel = "", label = "", name, value = false, required = true, useStateCallback = () => { } }) => {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={name}
          name={name}
          type="checkbox"
          className="focus:ring-action-primary h-4 w-4 text-primary border-gray-400 rounded-sm"
          onChange={() => useStateCallback(!value)}
          required={required}
        />
      </div>
      {label && (
        <div className="ml-3 text-sm">
          <label
            htmlFor={name}
            className="text-paragraph-small text-gray-600 dark:text-white"
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
