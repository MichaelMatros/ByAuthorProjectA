import { createClasses } from "@/utils";
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

function SkillItem({
  label,
  onChange,
  value,
  id = uuid(),
  checked,
  ...inputProps
}: FormInputCheckProps) {
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.checked ? (value as any) ?? true : false);
  }

  return (
    <label
      className={createClasses(
        "skill__item",
        checked && "skill__item--selected"
      )}
    >
      <span
        className={createClasses(
          "checkmark",
          checked && "material-symbols-outlined"
        )}
      >
        {checked && "check_circle"}
      </span>
      <input
        type="checkbox"
        id={id}
        value={value}
        checked={checked}
        {...inputProps}
        onChange={handleInputChange}
      />
      <span className="text">{label}</span>
    </label>
  );
}

export default SkillItem;
