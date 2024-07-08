import { ErrorMessage, Field, useFormikContext } from "formik";
import { FC } from "react";
import errorIcon from "/public/images/icons/error-icon.svg";
import Image from "next/image";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
}

const InputField: FC<InputFieldProps> = ({
  label,
  type,
  name,
  placeholder,
  defaultValue,
}) => {
  const { errors, touched } = useFormikContext<{ [key: string]: any }>();

  const hasError = touched[name] && errors[name];

  return (
    <div className="form-input-std">
      <label className="text-neutral-800 dark:text-neutral-200 mb-1">
        {label}
      </label>
      {hasError && (
        <span className="error flex items-center">
          <Image {...errorIcon} className="h-6" alt="Error" />
          <ErrorMessage name={name} component="span" className="error" />
        </span>
      )}
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default InputField;
