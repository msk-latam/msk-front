import React from "react";
export interface RadioProps {
  name: string;
  label?: string;
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Radio: React.FC<RadioProps> = ({ name, label, id, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        name={name}
        type="radio"
        className="focus:ring-action-primary h-4 w-4 text-action-primary border-primary"
        onChange={onChange}
        required
      />
      {label && (
        <label
          htmlFor={id}
          className="ml-3 block text-paragraph-small text-black dark:text-white"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Radio;
