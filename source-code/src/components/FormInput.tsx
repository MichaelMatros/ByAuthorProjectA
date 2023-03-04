import { v4 as uuid } from "uuid";
import React, { useMemo, useState } from "react";
import { FormControlProps, FormInputProps } from "@/types/form";
import { useValidator } from "@/hooks/useForm";
import { createClasses } from "@/utils";

type AdditionalProps = {
  prepend?: JSX.Element;
  append?: JSX.Element;
};

const FormInput = React.forwardRef(
  (
    {
      label = "",
      labelAfter,
      prepend,
      append,
      showError,
      onChange,
      value = "",
      type = "text",
      id,
      validation,
      ...inputProps
    }: FormInputProps & AdditionalProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const uniqueId = useMemo(() => id ?? uuid(), [id]);
    const { validate, errorMessage } = useValidator(
      value,
      uniqueId,
      label,
      validation
    );

    const [focused, setFocused] = useState(false);

    function handleInputFocus() {
      setFocused(true);
    }

    function handleInputBlur() {
      validate();

      if (!value) {
        setFocused(false);
      }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      onChange?.(e.target.value);
    }

    return (
      <div
        className={createClasses(
          "input",
          focused && "input--focused",
          errorMessage && "input--error",
          showError && "show-error"
        )}
      >
        <div className="input__inner">
          {prepend && <div className="input__icon--start">{prepend}</div>}
          <input
            type={type}
            className="input__control"
            id={id}
            value={value}
            placeholder={label}
            ref={ref}
            {...inputProps}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {append && <div className="input__icon--end">{append}</div>}
        </div>
        <div
          className={createClasses(
            "input__bar",
            focused && "input__bar--active"
          )}
        />
        {errorMessage && showError && (
          <span className="input__error">{errorMessage}</span>
        )}
      </div>
    );
  }
);

export default FormInput;
