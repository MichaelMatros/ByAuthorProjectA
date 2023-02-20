import React from "react";
import { v4 as uuid } from "uuid";

type FormInputCheckProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  onChange?: (e: boolean | string) => void;
  onChangeOriginal?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormInputCheck({
  label,
  onChange,
  value,
  type = "text",
  id = uuid(),
  ...inputProps
}: FormInputCheckProps) {
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.checked ? (value as any) ?? true : false);
  }

  return (
    <label className="input-checkbox">
      <input
        type="checkbox"
        id={id}
        value={value}
        {...inputProps}
        onChange={handleInputChange}
      />
      <span className="checkmark"></span>
      <span className="text">{label}</span>
    </label>
  );
}

export default FormInputCheck;
