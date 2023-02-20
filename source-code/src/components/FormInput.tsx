import { v4 as uuid } from "uuid";
import React, { useState } from "react";

type FormInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  labelAfter?: boolean;
  onChange?: (e: string) => void;
  onChangeOriginal?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormInput({
  label,
  labelAfter,
  onChange,
  value,
  type = "text",
  id = uuid(),
  ...inputProps
}: FormInputProps) {
  const [focused, setFocused] = useState(false);

  function handleInputFocus() {
    setFocused(true);
  }

  function handleInputBlur() {
    if (!value) {
      setFocused(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value);
  }

  return (
    <div className={`input ${focused && "input--focused"}`}>
      <input
        type={type}
        className="input__input"
        id={id}
        value={value}
        {...inputProps}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <label
        className={`input__label ${focused && "input__label--active"}`}
        htmlFor={id}
      >
        {label}
      </label>
      <div className={`input__bar ${focused && "input__bar--active"}`}></div>
    </div>
  );
}

export default FormInput;
