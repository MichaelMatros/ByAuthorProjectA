import useForm, { useMultistep } from "@/hooks/useForm";
import { FormBtnProps } from "@/types/form";
import React, { useMemo } from "react";
import Loader from "./Loader";
import Space from "./Space";
import { createClasses } from "@/utils";

function FormBtn({
  disabled,
  loading,
  loadingText,
  label,
  disableOnError,
  validate: validateOnClick,
  className,
  onClick,
  type = "button",
  next,
  icon,
  hover = true,
  ...props
}: FormBtnProps) {
  const { hasError, validate, errors } = useForm();
  const { nextIndex } = useMultistep();

  const buttonDisabled = useMemo(
    () => !!((hasError && disableOnError) || loading || disabled),
    [hasError, disableOnError, loading, disabled]
  );

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onClick?.(e);

    if (validateOnClick && !buttonDisabled && validate) {
      validate();
    }

    if (next && !buttonDisabled) {
      nextIndex();
    }
  }

  return (
    <button
      type={type}
      className={createClasses(
        "btn",
        loading && "btn--loading",
        hover && "can-hover",
        className
      )}
      onClick={handleClick}
      {...props}
      disabled={buttonDisabled}
    >
      {loading ? loadingText ?? label : label}

      {loading ? (
        <>
          <Space />
          <Loader />
        </>
      ) : (
        icon && (
          <>
            <Space />
            {icon}
          </>
        )
      )}
    </button>
  );
}

export default FormBtn;
