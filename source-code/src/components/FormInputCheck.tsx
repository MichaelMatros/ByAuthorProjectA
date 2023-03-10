import { createClasses } from "@/utils";
import React, { useState } from "react";
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
  id = uuid(),
  checked: inputChecked,
  ...inputProps
}: FormInputCheckProps) {
  const [checked, setChecked] = useState(inputChecked);
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
    onChange?.(e.target.checked ? (value as any) ?? true : false);
  }

  return (
    <label className="input-checkbox">
      <input
        type="checkbox"
        id={id}
        value={value}
        checked={inputChecked}
        {...inputProps}
        onChange={handleInputChange}
      />
      <span
        className={createClasses(
          "checkmark",
          checked && "material-symbols-outlined"
        )}
      >
        {checked && "check"}
      </span>
      <span className="text">{label}</span>
    </label>
  );
}

export default FormInputCheck;
